#ifndef __MainWindow_h
#define __MainWindow_h

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
 
#include "vtkSmartPointer.h"
#include <QMainWindow>
#include <QNetworkAccessManager>
#include <QSlider>
#include <vector>
 
// Forward Qt and VTK class declarations
class Ui_MainWindow;

class QVTKWidget;
class vtkActor;
class vtkColorTransferFunction;
class vtkMetaImageReader;
class vtkContourFilter;
class vtkDataSetMapper;
class vtkImageData;
class vtkImageViewer2;
class vtkPiecewiseFunction;
class vtkRenderer;
class vtkSmartVolumeMapper;
class vtkVolume;

// A simple struct for grouping objects related to a slice view.
struct SliceView
{
	vtkSmartPointer<vtkImageViewer2> viewer;
	QVTKWidget* widget;
	QSlider* slider;
};

typedef std::vector<SliceView> SliceViewList;

// This is the class that the Qt GUI interacts with.  For those unfamiliar 
// with Qt, this header is not proper C++.  Qt adds a few keywords that help
// manage GUI events.  All Qt classes can declare 'slots', which can be called
// via 'signals' in the GUI (e.g. button presses).
class MainWindow : public QMainWindow
{
  Q_OBJECT

public:

  MainWindow(); 
  ~MainWindow();
 
  // Qt slots can be named however you want, but if you follow Qt's naming
  // convention, they will be automatically connected to the signals specified.
  // The format is `on_<object>_<signal>(args)`.  Note that if you follow
  // the standard syntax but `<object>` or `<signal>` does not exist, a soft
  // error will be thrown at runtime.

public slots:
 
  virtual void on_actionQuit_triggered();
  virtual void on_actionLoadEnergy_triggered();
  virtual void on_actionLoadReference_triggered();
  
  virtual void on_xySlider_valueChanged(int);
  virtual void on_xzSlider_valueChanged(int);
  virtual void on_yzSlider_valueChanged(int);
  virtual void on_energySpinBox_valueChanged(double);
  virtual void on_referenceSpinBox_valueChanged(double);
 
protected:

  // VTK has a smart pointer that will take care of object deletion when this 
  // class instance falls out of scope.  These classes connect to form a VTK 3D 
  // isocontour visualization pipeline.
  vtkSmartPointer<vtkMetaImageReader> EnergyReader;
  vtkSmartPointer<vtkVolume> EnergyVolume;
  vtkSmartPointer<vtkSmartVolumeMapper> EnergyMapper;
  vtkSmartPointer<vtkPiecewiseFunction> EnergyOpacity;
  vtkSmartPointer<vtkColorTransferFunction> EnergyColor;

  vtkSmartPointer<vtkMetaImageReader> ReferenceReader;
  vtkSmartPointer<vtkVolume> ReferenceVolume;
  vtkSmartPointer<vtkSmartVolumeMapper> ReferenceMapper;
  vtkSmartPointer<vtkPiecewiseFunction> ReferenceOpacity;
  vtkSmartPointer<vtkColorTransferFunction> ReferenceColor;

  // A vector of objects related to 2D slice plane visualizations.
  SliceViewList SliceViews;

  // The class responsible for making networked download requests.
  QNetworkAccessManager* NetworkManager;

  // Update all visualization pipelines.
  void InitializeEnergy();
  
  // Update all 2D slice visualization pipelines.
  void InitializeSliceViews();

  // Update a particular slice visualization pipeline.
  void UpdateSliceView(int);

  // Update the 3D isocontour visualization pipeline.
  void Initialize3dView();

  // Update all visualization pipelines.
  void InitializeReference();

  // A helpful method for getting the primary renderer out of a QVTKWidget.
  static vtkRenderer* GetRenderer(QVTKWidget*);

private:
 
  // Designer form
  Ui_MainWindow *ui;

};
 
#endif // MainWindow_H
