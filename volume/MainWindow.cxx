// Copyright 2012 Allen Institute for Brain Science
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include "ui_MainWindow.h"
#include "MainWindow.h"

#include <vtkColorTransferFunction.h>
#include <vtkContourFilter.h> 
#include <vtkDataArray.h>
#include <vtkDataSetMapper.h>
#include <vtkElevationFilter.h>
#include <vtkFloatArray.h>
#include <vtkImageActor.h>
#include <vtkImageData.h>
#include <vtkImageViewer2.h>
#include <vtkMetaImageReader.h>
#include <vtkPiecewiseFunction.h>
#include <vtkPointData.h>
#include <vtkProperty.h>
#include <vtkQtTableView.h>
#include <vtkRenderer.h>
#include <vtkRendererCollection.h>
#include <vtkRenderWindow.h>
#include <vtkSmartPointer.h>
#include <vtkSmartVolumeMapper.h>
#include <vtkVolumeProperty.h>

#include <QByteArray>
#include <QFileDialog>
#include <QInputDialog>
#include <QMessageBox>

// Default values for setting up the transfer functions.
const float DEFAULT_SLICE_ENERGY_LEVEL = 10.0f;
const float DEFAULT_SLICE_ENERGY_WINDOW = 20.0f;

MainWindow::MainWindow()
{
	// Trigger the UI layout.
	this->ui = new Ui_MainWindow;
	this->ui->setupUi(this);

	// Initialize the energy visualization pipeline objects.
	this->EnergyReader = vtkSmartPointer<vtkMetaImageReader>::New();
	this->EnergyVolume = vtkSmartPointer<vtkVolume>::New();
	this->EnergyMapper = vtkSmartPointer<vtkSmartVolumeMapper>::New();
	this->EnergyOpacity = vtkSmartPointer<vtkPiecewiseFunction>::New();
	this->EnergyColor = vtkSmartPointer<vtkColorTransferFunction>::New();

	// Initialize the reference visualization pipeline objects.
	this->ReferenceReader = vtkSmartPointer<vtkMetaImageReader>::New();
	this->ReferenceVolume = vtkSmartPointer<vtkVolume>::New();
	this->ReferenceMapper = vtkSmartPointer<vtkSmartVolumeMapper>::New();
	this->ReferenceOpacity = vtkSmartPointer<vtkPiecewiseFunction>::New();
	this->ReferenceColor = vtkSmartPointer<vtkColorTransferFunction>::New();
  
	// Initialize VTK Renderers.  
	vtkSmartPointer<vtkRenderer> mainRenderer = vtkSmartPointer<vtkRenderer>::New();
	vtkSmartPointer<vtkRenderer> xyRenderer = vtkSmartPointer<vtkRenderer>::New();
	vtkSmartPointer<vtkRenderer> xzRenderer = vtkSmartPointer<vtkRenderer>::New();
	vtkSmartPointer<vtkRenderer> yzRenderer = vtkSmartPointer<vtkRenderer>::New();

	// The pipelines will be connected once data is loaded.  For now just
	// add the actors and volumes to the renderer.
	mainRenderer->AddVolume(this->ReferenceVolume);
	mainRenderer->AddVolume(this->EnergyVolume);

 
	// VTK/Qt wedded.  These are QVTKWidgets, which are essentially Qt-wrapped
	// vtkRenderWindows.  All render windows need renderers.
	this->ui->mainWidget->GetRenderWindow()->AddRenderer(mainRenderer);
	this->ui->xyWidget->GetRenderWindow()->AddRenderer(xyRenderer);
	this->ui->xzWidget->GetRenderWindow()->AddRenderer(xzRenderer);
	this->ui->yzWidget->GetRenderWindow()->AddRenderer(yzRenderer);

	// Initialize the slice visualization objects.
	SliceView xyView = { vtkSmartPointer<vtkImageViewer2>::New(), 
						 this->ui->xyWidget, 
						 this->ui->xySlider };

	SliceView xzView = { vtkSmartPointer<vtkImageViewer2>::New(), 
						 this->ui->xzWidget, 
						 this->ui->xzSlider };

	SliceView yzView = { vtkSmartPointer<vtkImageViewer2>::New(), 
						 this->ui->yzWidget, 
						 this->ui->yzSlider };
	
	// Tell the slice visualizations what their orientation should be.
	xyView.viewer->SetSliceOrientationToXY();
	xzView.viewer->SetSliceOrientationToXZ();
	yzView.viewer->SetSliceOrientationToYZ();

	// Transform the slice actors so that they conform to a standard way of 
	// viewing axial/sagittal/coronal images.
	xyView.viewer->GetImageActor()->SetScale(1.0,-1.0,1.0);
	xzView.viewer->GetImageActor()->RotateY(90.0);
	yzView.viewer->GetImageActor()->SetScale(1.0,-1.0,1.0);
	yzView.viewer->GetImageActor()->RotateX(90.0);

	this->SliceViews.push_back(xyView);
	this->SliceViews.push_back(xzView);
	this->SliceViews.push_back(yzView);
};

MainWindow::~MainWindow()
{
	delete this->NetworkManager;
}

void MainWindow::on_actionQuit_triggered() 
{
	qApp->exit();
}

void MainWindow::on_xySlider_valueChanged(int val) 
{
	this->UpdateSliceView(0);
}

void MainWindow::on_xzSlider_valueChanged(int val) 
{
	this->UpdateSliceView(1);
}

void MainWindow::on_yzSlider_valueChanged(int val) 
{
	this->UpdateSliceView(2);
}

void MainWindow::on_energySpinBox_valueChanged(double val)
{
	double ov1[] = {val-5.0, 0.0,       .5, 0};
	double ov2[] = {val+5.0, 0.01,      .5, 0};
	this->EnergyOpacity->SetNodeValue(1,ov1);
	this->EnergyOpacity->SetNodeValue(2,ov2);

	double cv1[] = {val-5.0, 0.0, 0.0, 0.0, .5, 0};
	double cv2[] = {val+5.0, 1.0, 0.0, 0.0, .5, 0};
	this->EnergyColor->SetNodeValue(1,cv1);
	this->EnergyColor->SetNodeValue(2,cv2);

	this->ui->mainWidget->GetRenderWindow()->Render();
}

void MainWindow::on_referenceSpinBox_valueChanged(double val)
{
	double ov[] = {val, 1.0,           .5, 0};
	double cv[] = {val, 1.0, 1.0, 1.0, .5, 0};
	this->ReferenceOpacity->SetNodeValue(1,ov);
	this->ReferenceColor->SetNodeValue(1,cv);
	this->ui->mainWidget->GetRenderWindow()->Render();
}

// This is called via the "Load Energy Volume" menu item 
void MainWindow::on_actionLoadEnergy_triggered()
{
	// Open a Qt dialog for to select a `.mhd` file.
	QString fileName = QFileDialog::getOpenFileName(
		this, tr("Open Meta Image"), ".", tr("Image Files (*.mhd)"));

	// `fileName` will be `NULL` if the user clicked "Cancel".
	if (fileName != NULL)
	{
		// Read in the mhd file.
		this->EnergyReader->SetFileName(fileName.toAscii());
		this->EnergyReader->Update();
				
		this->InitializeEnergy();
	}
}

void MainWindow::on_actionLoadReference_triggered()
{
	// Open a Qt dialog for to select a `.mhd` file.
	QString fileName = QFileDialog::getOpenFileName(
		this, tr("Open Meta Image"), ".", tr("Image Files (*.mhd)"));

	// `fileName` will be `NULL` if the user clicked "Cancel".
	if (fileName != NULL)
	{
		// Read in the mhd file.
		this->ReferenceReader->SetFileName(fileName.toAscii());
		this->ReferenceReader->Update();
				
		this->InitializeReference();
	}
}

void MainWindow::InitializeEnergy()
{
	// All of the widgets are disabled at first (set with Qt Designer). This 
	// function only gets called after data has been loaded, so it's now safe
	// to enabled them.
	this->ui->energySpinBox->setEnabled(true);
	this->ui->xySlider->setEnabled(true);
	this->ui->xzSlider->setEnabled(true);
	this->ui->yzSlider->setEnabled(true);
		
	// Initialize the visualizations.
	this->Initialize3dView();
	this->InitializeSliceViews();
}

// Initialize the opacity and color transfer functions for the energy volume.
// This is a composite volume rendering, so opacities and colors of data values
// are visually accumulated toward the viewer's eye.
void MainWindow::Initialize3dView()
{
	this->EnergyMapper->SetInputConnection(this->EnergyReader->GetOutputPort());
	this->EnergyMapper->SetBlendModeToComposite();

	// Ramp from black to red near around the selected data value.
	double v = this->ui->energySpinBox->value();
	this->EnergyColor->AddRGBPoint(0,     0,0,0);
	this->EnergyColor->AddRGBPoint(v-5.0, 0,0,0);
	this->EnergyColor->AddRGBPoint(v+5.0, 1,0,0);

	// Ramp from transparent to slightly dense around the selected value.
	this->EnergyOpacity->AddPoint(0, 0);
	this->EnergyOpacity->AddPoint(v-5.0, 0);
	this->EnergyOpacity->AddPoint(v+5.0, 0.01);
	
	vtkSmartPointer<vtkVolumeProperty> property = vtkSmartPointer<vtkVolumeProperty>::New();
	property->SetScalarOpacity(this->EnergyOpacity);
	property->SetColor(this->EnergyColor);
	property->ShadeOff();
	property->SetInterpolationTypeToLinear();

	this->EnergyVolume->SetProperty(property);
	this->EnergyVolume->SetMapper(this->EnergyMapper);

	// Reset the camera. This causes the volume rendering to fill the viewport.
	vtkRenderer* ren = 	this->GetRenderer(this->ui->mainWidget);
	ren->ResetCamera();
	ren->GetRenderWindow()->Render();
}

// Connect each slice vis. pipeline.  These are short: `vtkImageViewer2` 
// has its own RenderWindow, so assign that to the QVTKWidget.
void MainWindow::InitializeSliceViews()
{
	for (unsigned int i=0; i<3; i++)
	{
		SliceView& view = this->SliceViews[i];

		view.viewer->SetInputConnection(this->EnergyReader->GetOutputPort());
		view.widget->SetRenderWindow(view.viewer->GetRenderWindow());
		view.viewer->SetupInteractor(view.widget->GetRenderWindow()->GetInteractor());

		view.viewer->SetColorLevel(DEFAULT_SLICE_ENERGY_LEVEL);
		view.viewer->SetColorWindow(DEFAULT_SLICE_ENERGY_WINDOW);

		// Initialize to the middle slice on this axis.
		int* dims = this->EnergyReader->GetOutput()->GetDimensions();
		view.viewer->SetSlice(dims[i]/2);

		vtkRenderer* ren = this->GetRenderer(view.widget);
		ren->ResetCamera();
		view.widget->GetRenderWindow()->Render();
	}
}

// Update a particular slice visualization's pipeline.
void MainWindow::UpdateSliceView(int index)
{
	SliceView& view = this->SliceViews[index];

	// convert the slider's index to a [0,1] float.
	float p = static_cast<float>(view.slider->value() - view.slider->minimum()) / 
		(view.slider->maximum() - view.slider->minimum());

	// Set the slice index according to the image dimensions on this axis.
	int* dims = this->EnergyReader->GetOutput()->GetDimensions();
	view.viewer->SetSlice(p * dims[index]);
}

// Initialize the color and opacity transfer functions for the reference atlas
// volume renderer.  This is a maximum intensity projection, so only the color
// and opacity of the maximum data value is shown, without any accumulation.
void MainWindow::InitializeReference()
{
	this->ui->referenceSpinBox->setEnabled(true);

	this->ReferenceMapper->SetInputConnection(this->ReferenceReader->GetOutputPort());
	this->ReferenceMapper->SetBlendModeToMaximumIntensity();

	// Ramp opacity from transparent to opaque between 0 and the selected value.
	double v = this->ui->referenceSpinBox->value();
	this->ReferenceOpacity->AddSegment(0,0, v,1);

	// Color is always white.
	this->ReferenceColor->AddRGBSegment(0, 1,1,1, 
										v, 1,1,1);
	
	vtkSmartPointer<vtkVolumeProperty> property = vtkSmartPointer<vtkVolumeProperty>::New();
	property->SetScalarOpacity(this->ReferenceOpacity);
	property->SetColor(this->ReferenceColor);
	property->ShadeOff();
	property->SetInterpolationTypeToLinear();

	this->ReferenceVolume->SetProperty(property);
	this->ReferenceVolume->SetMapper(this->ReferenceMapper);

	// Reset the camera.  This causes the contour geometry to fill the viewport.
	vtkRenderer* ren = 	this->GetRenderer(this->ui->mainWidget);
	ren->ResetCamera();
	ren->GetRenderWindow()->Render();
}

vtkRenderer* MainWindow::GetRenderer(QVTKWidget* widget)
{
	return widget->GetRenderWindow()->GetRenderers()->GetFirstRenderer();
}
