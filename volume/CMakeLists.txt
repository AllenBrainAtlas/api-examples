cmake_minimum_required(VERSION 2.8)

project(VolumeDemoApp)

find_package(VTK REQUIRED)
include(${VTK_USE_FILE})

find_package(Qt4 COMPONENTS QtCore QtGui QtNetwork REQUIRED)
include(${QT_USE_FILE})

include_directories("${PROJECT_BINARY_DIR}")

set(DemoSrcs main.cxx MainWindow.cxx)
set(DemoUI MainWindow.ui)
set(DemoHeaders MainWindow.h)

qt4_wrap_ui(DemoUISrcs ${DemoUI})
qt4_wrap_cpp(DemoMOCSrcs ${DemoHeaders})

add_executable(VolumeDemoApp ${DemoSrcs} ${DemoUISrcs} ${DemoMOCSrcs})
target_link_libraries(VolumeDemoApp QVTK)

