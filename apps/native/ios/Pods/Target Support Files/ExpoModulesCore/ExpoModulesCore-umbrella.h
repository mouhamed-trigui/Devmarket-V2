#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "ExpoModulesCore/EXAppDelegateWrapper.h"
#import "ExpoModulesCore/EXBridgeModule.h"
#import "ExpoModulesCore/EXDefines.h"
#import "ExpoModulesCore/EXErrorCodes.h"
#import "ExpoModulesCore/EXExportedModule.h"
#import "ExpoModulesCore/ExpoModulesCore.h"
#import "ExpoModulesCore/EXSingletonModule.h"
#import "ExpoModulesCore/EXUnimodulesCompat.h"
#import "ExpoModulesCore/EXUtilities.h"
#import "ExpoModulesCore/EXViewManager.h"
#import "ExpoModulesCore/EXBarcodeScannerInterface.h"
#import "ExpoModulesCore/EXBarcodeScannerProviderInterface.h"
#import "ExpoModulesCore/EXCameraInterface.h"
#import "ExpoModulesCore/EXConstantsInterface.h"
#import "ExpoModulesCore/EXFaceDetectorManagerInterface.h"
#import "ExpoModulesCore/EXFaceDetectorManagerProviderInterface.h"
#import "ExpoModulesCore/EXFilePermissionModuleInterface.h"
#import "ExpoModulesCore/EXFileSystemInterface.h"
#import "ExpoModulesCore/EXFontManagerInterface.h"
#import "ExpoModulesCore/EXFontProcessorInterface.h"
#import "ExpoModulesCore/EXFontScalerInterface.h"
#import "ExpoModulesCore/EXFontScalersManagerInterface.h"
#import "ExpoModulesCore/EXImageLoaderInterface.h"
#import "ExpoModulesCore/EXPermissionsInterface.h"
#import "ExpoModulesCore/EXPermissionsMethodsDelegate.h"
#import "ExpoModulesCore/EXUserNotificationCenterProxyInterface.h"
#import "ExpoModulesCore/EXAccelerometerInterface.h"
#import "ExpoModulesCore/EXBarometerInterface.h"
#import "ExpoModulesCore/EXDeviceMotionInterface.h"
#import "ExpoModulesCore/EXGyroscopeInterface.h"
#import "ExpoModulesCore/EXMagnetometerInterface.h"
#import "ExpoModulesCore/EXMagnetometerUncalibratedInterface.h"
#import "ExpoModulesCore/EXTaskConsumerInterface.h"
#import "ExpoModulesCore/EXTaskInterface.h"
#import "ExpoModulesCore/EXTaskLaunchReason.h"
#import "ExpoModulesCore/EXTaskManagerInterface.h"
#import "ExpoModulesCore/EXTaskServiceInterface.h"
#import "ExpoModulesCore/EXModuleRegistry.h"
#import "ExpoModulesCore/EXModuleRegistryDelegate.h"
#import "ExpoModulesCore/EXModuleRegistryAdapter.h"
#import "ExpoModulesCore/EXModuleRegistryHolderReactModule.h"
#import "ExpoModulesCore/EXViewManagerAdapterClassesRegistry.h"
#import "ExpoModulesCore/EXModuleRegistryProvider.h"
#import "ExpoModulesCore/EXNativeModulesProxy.h"
#import "ExpoModulesCore/EXAppLifecycleListener.h"
#import "ExpoModulesCore/EXAppLifecycleService.h"
#import "ExpoModulesCore/EXEventEmitter.h"
#import "ExpoModulesCore/EXEventEmitterService.h"
#import "ExpoModulesCore/EXInternalModule.h"
#import "ExpoModulesCore/EXJavaScriptContextProvider.h"
#import "ExpoModulesCore/EXKernelService.h"
#import "ExpoModulesCore/EXLogHandler.h"
#import "ExpoModulesCore/EXModuleRegistryConsumer.h"
#import "ExpoModulesCore/EXUIManager.h"
#import "ExpoModulesCore/EXUtilitiesInterface.h"
#import "ExpoModulesCore/EXLogManager.h"
#import "ExpoModulesCore/EXReactFontManager.h"
#import "ExpoModulesCore/EXReactLogHandler.h"
#import "ExpoModulesCore/EXReactNativeAdapter.h"
#import "ExpoModulesCore/EXReactNativeEventEmitter.h"
#import "ExpoModulesCore/EXPermissionsService.h"
#import "ExpoModulesCore/EXReactNativeUserNotificationCenterProxy.h"
#import "ExpoModulesCore/EXViewManagerAdapter.h"

FOUNDATION_EXPORT double ExpoModulesCoreVersionNumber;
FOUNDATION_EXPORT const unsigned char ExpoModulesCoreVersionString[];

