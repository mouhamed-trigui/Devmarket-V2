#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.5.2 (swiftlang-1300.0.47.5 clang-1300.0.29.30)
#ifndef CRISP_SWIFT_H
#define CRISP_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Foundation;
@import ObjectiveC;
@import UIKit;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="Crisp",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif


@class NSString;
@class NSBundle;
@class UIViewController;
@class NSCoder;
@class NSNumber;
@class UIToolbar;
@class UIGestureRecognizer;
@protocol UINavigationControllerDelegate;
@class UIPanGestureRecognizer;
@class UITapGestureRecognizer;

SWIFT_CLASS_NAMED("ChatViewController")
@interface CRSPChatViewController : UINavigationController
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithNavigationBarClass:(Class _Nullable)navigationBarClass toolbarClass:(Class _Nullable)toolbarClass OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nonnull instancetype)initWithNibName:(NSString * _Nullable)nibNameOrNil bundle:(NSBundle * _Nullable)nibBundleOrNil OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nonnull instancetype)initWithRootViewController:(UIViewController * _Nonnull)rootViewController OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder SWIFT_UNAVAILABLE;
@property (nonatomic, readonly) UIInterfaceOrientationMask supportedInterfaceOrientations SWIFT_UNAVAILABLE;
@property (nonatomic) UIModalPresentationStyle modalPresentationStyle SWIFT_UNAVAILABLE;
@property (nonatomic, getter=isNavigationBarHidden) BOOL navigationBarHidden SWIFT_UNAVAILABLE;
- (void)setNavigationBarHidden:(BOOL)hidden animated:(BOOL)animated SWIFT_UNAVAILABLE;
- (void)pushViewController:(UIViewController * _Nonnull)viewController animated:(BOOL)animated SWIFT_UNAVAILABLE;
- (UIViewController * _Nullable)popViewControllerAnimated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
- (NSArray<UIViewController *> * _Nullable)popToViewController:(UIViewController * _Nonnull)viewController animated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
- (NSArray<UIViewController *> * _Nullable)popToRootViewControllerAnimated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIViewController * _Nullable topViewController SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIViewController * _Nullable visibleViewController SWIFT_UNAVAILABLE;
@property (nonatomic, copy) NSArray<UIViewController *> * _Nonnull viewControllers SWIFT_UNAVAILABLE;
- (void)setViewControllers:(NSArray<UIViewController *> * _Nonnull)viewControllers animated:(BOOL)animated SWIFT_UNAVAILABLE;
@property (nonatomic, getter=isToolbarHidden) BOOL toolbarHidden SWIFT_UNAVAILABLE;
- (void)setToolbarHidden:(BOOL)hidden animated:(BOOL)animated SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIToolbar * _Null_unspecified toolbar SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIGestureRecognizer * _Nullable interactivePopGestureRecognizer SWIFT_UNAVAILABLE;
@property (nonatomic, strong) id <UINavigationControllerDelegate> _Nullable delegate SWIFT_UNAVAILABLE;
- (void)showViewController:(UIViewController * _Nonnull)vc sender:(id _Nullable)sender SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsWhenKeyboardAppears SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsOnSwipe SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIPanGestureRecognizer * _Nonnull barHideOnSwipeGestureRecognizer SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsWhenVerticallyCompact SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsOnTap SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UITapGestureRecognizer * _Nonnull barHideOnTapGestureRecognizer SWIFT_UNAVAILABLE;
@end


@class NSURL;
@class CRSPEmployment;
@class CRSPGeolocation;

SWIFT_CLASS_NAMED("Company")
@interface CRSPCompany : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable name;
@property (nonatomic, readonly, copy) NSURL * _Nullable url;
@property (nonatomic, readonly, copy) NSString * _Nullable companyDescription;
@property (nonatomic, readonly, strong) CRSPEmployment * _Nullable employment;
@property (nonatomic, readonly, strong) CRSPGeolocation * _Nullable geolocation;
- (nonnull instancetype)initWithName:(NSString * _Nullable)name url:(NSURL * _Nullable)url companyDescription:(NSString * _Nullable)companyDescription employment:(CRSPEmployment * _Nullable)employment geolocation:(CRSPGeolocation * _Nullable)geolocation OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end



@class NSLocale;
@class CRSPUser;
@class CRSPSession;

SWIFT_CLASS("_TtC5Crisp8CrispSDK")
@interface CrispSDK : NSObject
+ (void)configureWithWebsiteID:(NSString * _Nonnull)websiteID;
+ (void)setTokenIDWithTokenID:(NSString * _Nonnull)tokenID;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, copy) NSLocale * _Nonnull locale;)
+ (NSLocale * _Nonnull)locale SWIFT_WARN_UNUSED_RESULT;
+ (void)setLocale:(NSLocale * _Nonnull)value;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, strong) CRSPUser * _Nonnull user;)
+ (CRSPUser * _Nonnull)user SWIFT_WARN_UNUSED_RESULT;
+ (void)setUser:(CRSPUser * _Nonnull)value;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, strong) CRSPSession * _Nonnull session;)
+ (CRSPSession * _Nonnull)session SWIFT_WARN_UNUSED_RESULT;
+ (void)setSession:(CRSPSession * _Nonnull)value;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





SWIFT_CLASS_NAMED("Employment")
@interface CRSPEmployment : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable title;
@property (nonatomic, readonly, copy) NSString * _Nullable role;
- (nonnull instancetype)initWithTitle:(NSString * _Nullable)title role:(NSString * _Nullable)role OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





SWIFT_CLASS_NAMED("Geolocation")
@interface CRSPGeolocation : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable city;
@property (nonatomic, readonly, copy) NSString * _Nullable country;
- (nonnull instancetype)initWithCity:(NSString * _Nullable)city country:(NSString * _Nullable)country OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





@class CRSPSessionEvent;

SWIFT_CLASS_NAMED("Session")
@interface CRSPSession : NSObject
/// Returns true if a session is ongoing (ie. messages have been received or sent), else false.
@property (nonatomic, readonly) BOOL isOngoing;
/// Returns the current session identifier (or null if not yet loaded).
@property (nonatomic, readonly, copy) NSString * _Nullable identifier;
/// Set the session data for given key, with a value (value must be either a string, boolean or number)
- (void)setBool:(BOOL)value forKey:(NSString * _Nonnull)key;
- (void)setInt:(NSInteger)value forKey:(NSString * _Nonnull)key;
- (void)setString:(NSString * _Nonnull)value forKey:(NSString * _Nonnull)key;
- (NSString * _Nullable)getStringForKey:(NSString * _Nonnull)key SWIFT_WARN_UNUSED_RESULT;
- (void)pushEvent:(CRSPSessionEvent * _Nonnull)event;
@property (nonatomic, copy) NSString * _Nullable segment;
/// Resets the chatbox session to a new session (reload controls whether to reload page upon
/// reset or not, reloading is required to start from a fresh state, defaults to true).
- (void)reset;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

enum CRSPSessionEventColor : NSInteger;

SWIFT_CLASS_NAMED("SessionEvent")
@interface CRSPSessionEvent : NSObject
@property (nonatomic, copy) NSString * _Nonnull name;
@property (nonatomic) enum CRSPSessionEventColor color;
- (nonnull instancetype)initWithName:(NSString * _Nonnull)name color:(enum CRSPSessionEventColor)color OBJC_DESIGNATED_INITIALIZER;
- (void)setBool:(BOOL)value forKey:(NSString * _Nonnull)key;
- (void)setInt:(NSInteger)value forKey:(NSString * _Nonnull)key;
- (void)setString:(NSString * _Nonnull)value forKey:(NSString * _Nonnull)key;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


typedef SWIFT_ENUM_NAMED(NSInteger, CRSPSessionEventColor, "SessionEventColor", open) {
  CRSPSessionEventColorRed = 0,
  CRSPSessionEventColorOrange = 1,
  CRSPSessionEventColorYellow = 2,
  CRSPSessionEventColorGreen = 3,
  CRSPSessionEventColorBlue = 4,
  CRSPSessionEventColorPurple = 5,
  CRSPSessionEventColorPink = 6,
  CRSPSessionEventColorBrown = 7,
  CRSPSessionEventColorGrey = 8,
  CRSPSessionEventColorBlack = 9,
};









SWIFT_CLASS_NAMED("User")
@interface CRSPUser : NSObject
@property (nonatomic, copy) NSString * _Nullable email;
@property (nonatomic, copy) NSString * _Nullable nickname;
@property (nonatomic, copy) NSString * _Nullable phone;
@property (nonatomic, copy) NSURL * _Nullable avatar;
@property (nonatomic, strong) CRSPCompany * _Nullable company;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#elif defined(__x86_64__) && __x86_64__
// Generated by Apple Swift version 5.5.2 (swiftlang-1300.0.47.5 clang-1300.0.29.30)
#ifndef CRISP_SWIFT_H
#define CRISP_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Foundation;
@import ObjectiveC;
@import UIKit;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="Crisp",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif


@class NSString;
@class NSBundle;
@class UIViewController;
@class NSCoder;
@class NSNumber;
@class UIToolbar;
@class UIGestureRecognizer;
@protocol UINavigationControllerDelegate;
@class UIPanGestureRecognizer;
@class UITapGestureRecognizer;

SWIFT_CLASS_NAMED("ChatViewController")
@interface CRSPChatViewController : UINavigationController
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithNavigationBarClass:(Class _Nullable)navigationBarClass toolbarClass:(Class _Nullable)toolbarClass OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nonnull instancetype)initWithNibName:(NSString * _Nullable)nibNameOrNil bundle:(NSBundle * _Nullable)nibBundleOrNil OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nonnull instancetype)initWithRootViewController:(UIViewController * _Nonnull)rootViewController OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder SWIFT_UNAVAILABLE;
@property (nonatomic, readonly) UIInterfaceOrientationMask supportedInterfaceOrientations SWIFT_UNAVAILABLE;
@property (nonatomic) UIModalPresentationStyle modalPresentationStyle SWIFT_UNAVAILABLE;
@property (nonatomic, getter=isNavigationBarHidden) BOOL navigationBarHidden SWIFT_UNAVAILABLE;
- (void)setNavigationBarHidden:(BOOL)hidden animated:(BOOL)animated SWIFT_UNAVAILABLE;
- (void)pushViewController:(UIViewController * _Nonnull)viewController animated:(BOOL)animated SWIFT_UNAVAILABLE;
- (UIViewController * _Nullable)popViewControllerAnimated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
- (NSArray<UIViewController *> * _Nullable)popToViewController:(UIViewController * _Nonnull)viewController animated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
- (NSArray<UIViewController *> * _Nullable)popToRootViewControllerAnimated:(BOOL)animated SWIFT_WARN_UNUSED_RESULT SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIViewController * _Nullable topViewController SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIViewController * _Nullable visibleViewController SWIFT_UNAVAILABLE;
@property (nonatomic, copy) NSArray<UIViewController *> * _Nonnull viewControllers SWIFT_UNAVAILABLE;
- (void)setViewControllers:(NSArray<UIViewController *> * _Nonnull)viewControllers animated:(BOOL)animated SWIFT_UNAVAILABLE;
@property (nonatomic, getter=isToolbarHidden) BOOL toolbarHidden SWIFT_UNAVAILABLE;
- (void)setToolbarHidden:(BOOL)hidden animated:(BOOL)animated SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIToolbar * _Null_unspecified toolbar SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIGestureRecognizer * _Nullable interactivePopGestureRecognizer SWIFT_UNAVAILABLE;
@property (nonatomic, strong) id <UINavigationControllerDelegate> _Nullable delegate SWIFT_UNAVAILABLE;
- (void)showViewController:(UIViewController * _Nonnull)vc sender:(id _Nullable)sender SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsWhenKeyboardAppears SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsOnSwipe SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UIPanGestureRecognizer * _Nonnull barHideOnSwipeGestureRecognizer SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsWhenVerticallyCompact SWIFT_UNAVAILABLE;
@property (nonatomic) BOOL hidesBarsOnTap SWIFT_UNAVAILABLE;
@property (nonatomic, readonly, strong) UITapGestureRecognizer * _Nonnull barHideOnTapGestureRecognizer SWIFT_UNAVAILABLE;
@end


@class NSURL;
@class CRSPEmployment;
@class CRSPGeolocation;

SWIFT_CLASS_NAMED("Company")
@interface CRSPCompany : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable name;
@property (nonatomic, readonly, copy) NSURL * _Nullable url;
@property (nonatomic, readonly, copy) NSString * _Nullable companyDescription;
@property (nonatomic, readonly, strong) CRSPEmployment * _Nullable employment;
@property (nonatomic, readonly, strong) CRSPGeolocation * _Nullable geolocation;
- (nonnull instancetype)initWithName:(NSString * _Nullable)name url:(NSURL * _Nullable)url companyDescription:(NSString * _Nullable)companyDescription employment:(CRSPEmployment * _Nullable)employment geolocation:(CRSPGeolocation * _Nullable)geolocation OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end



@class NSLocale;
@class CRSPUser;
@class CRSPSession;

SWIFT_CLASS("_TtC5Crisp8CrispSDK")
@interface CrispSDK : NSObject
+ (void)configureWithWebsiteID:(NSString * _Nonnull)websiteID;
+ (void)setTokenIDWithTokenID:(NSString * _Nonnull)tokenID;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, copy) NSLocale * _Nonnull locale;)
+ (NSLocale * _Nonnull)locale SWIFT_WARN_UNUSED_RESULT;
+ (void)setLocale:(NSLocale * _Nonnull)value;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, strong) CRSPUser * _Nonnull user;)
+ (CRSPUser * _Nonnull)user SWIFT_WARN_UNUSED_RESULT;
+ (void)setUser:(CRSPUser * _Nonnull)value;
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, strong) CRSPSession * _Nonnull session;)
+ (CRSPSession * _Nonnull)session SWIFT_WARN_UNUSED_RESULT;
+ (void)setSession:(CRSPSession * _Nonnull)value;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





SWIFT_CLASS_NAMED("Employment")
@interface CRSPEmployment : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable title;
@property (nonatomic, readonly, copy) NSString * _Nullable role;
- (nonnull instancetype)initWithTitle:(NSString * _Nullable)title role:(NSString * _Nullable)role OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





SWIFT_CLASS_NAMED("Geolocation")
@interface CRSPGeolocation : NSObject
@property (nonatomic, readonly, copy) NSString * _Nullable city;
@property (nonatomic, readonly, copy) NSString * _Nullable country;
- (nonnull instancetype)initWithCity:(NSString * _Nullable)city country:(NSString * _Nullable)country OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end





@class CRSPSessionEvent;

SWIFT_CLASS_NAMED("Session")
@interface CRSPSession : NSObject
/// Returns true if a session is ongoing (ie. messages have been received or sent), else false.
@property (nonatomic, readonly) BOOL isOngoing;
/// Returns the current session identifier (or null if not yet loaded).
@property (nonatomic, readonly, copy) NSString * _Nullable identifier;
/// Set the session data for given key, with a value (value must be either a string, boolean or number)
- (void)setBool:(BOOL)value forKey:(NSString * _Nonnull)key;
- (void)setInt:(NSInteger)value forKey:(NSString * _Nonnull)key;
- (void)setString:(NSString * _Nonnull)value forKey:(NSString * _Nonnull)key;
- (NSString * _Nullable)getStringForKey:(NSString * _Nonnull)key SWIFT_WARN_UNUSED_RESULT;
- (void)pushEvent:(CRSPSessionEvent * _Nonnull)event;
@property (nonatomic, copy) NSString * _Nullable segment;
/// Resets the chatbox session to a new session (reload controls whether to reload page upon
/// reset or not, reloading is required to start from a fresh state, defaults to true).
- (void)reset;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

enum CRSPSessionEventColor : NSInteger;

SWIFT_CLASS_NAMED("SessionEvent")
@interface CRSPSessionEvent : NSObject
@property (nonatomic, copy) NSString * _Nonnull name;
@property (nonatomic) enum CRSPSessionEventColor color;
- (nonnull instancetype)initWithName:(NSString * _Nonnull)name color:(enum CRSPSessionEventColor)color OBJC_DESIGNATED_INITIALIZER;
- (void)setBool:(BOOL)value forKey:(NSString * _Nonnull)key;
- (void)setInt:(NSInteger)value forKey:(NSString * _Nonnull)key;
- (void)setString:(NSString * _Nonnull)value forKey:(NSString * _Nonnull)key;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


typedef SWIFT_ENUM_NAMED(NSInteger, CRSPSessionEventColor, "SessionEventColor", open) {
  CRSPSessionEventColorRed = 0,
  CRSPSessionEventColorOrange = 1,
  CRSPSessionEventColorYellow = 2,
  CRSPSessionEventColorGreen = 3,
  CRSPSessionEventColorBlue = 4,
  CRSPSessionEventColorPurple = 5,
  CRSPSessionEventColorPink = 6,
  CRSPSessionEventColorBrown = 7,
  CRSPSessionEventColorGrey = 8,
  CRSPSessionEventColorBlack = 9,
};









SWIFT_CLASS_NAMED("User")
@interface CRSPUser : NSObject
@property (nonatomic, copy) NSString * _Nullable email;
@property (nonatomic, copy) NSString * _Nullable nickname;
@property (nonatomic, copy) NSString * _Nullable phone;
@property (nonatomic, copy) NSURL * _Nullable avatar;
@property (nonatomic, strong) CRSPCompany * _Nullable company;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#endif
