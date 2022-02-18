---
sidebar_position: 2
---
# Biometric Authentication

## Overview

This document describes how to implement the Biometric authentication features with the iOS SDK.

<br/>

## Feature Description
Biometric authentication is the additional authentication for GCCS. The biometric information stored in the iOS device will be used, and if there is no biometric information, the PIN or pattern will be used for authentication instead.
```
To fully utilize the app, it is recommended to have iOS version higher than 13.0.
This version was developed base on the LAContext class provided by iOS.
```

## Biometric Information Registration
Biometric information needs to be registered for the authentication.   
Use `registerBiometric()` from `GuardianSdk` to call the API.

### Parameter
- none

### Example
```java
//Biometric information registration
public func registerBiometric(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, 
        onFailed: @escaping(RtCode, String)-> Void) {
        ...
    }
```
### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|biometricType|Array|Biometric information type|

When the API call for registration is successful, the `rtCode` will be `0` and the biometric information will be registered to the app.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error Message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---

## Biometric Authentication
Use `authenticate()` from `GuardianSdk` to call the API.   
Fingerprint or facial information that is registered in the device will be used for authentication.   
If there is no biometric information, PIN or pattern will be used as a substitute.

### Parameter
- msg : Pass `String` type `msg` as a parameter.

### Example
```java
// Biometric authentication
public func authenticate(msg: String, onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, 
        onFailed: @escaping(RtCode, String?)-> Void) {
        ...
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|biometricType|Array|Biometric information type|

When the API call for authentication is successful, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---

## Biometric Information Change Detection
Use `hasNewBiometricEnrolled()` from `GuardianSdk` to call the API.   
By calling this API, changes made to the biometric information of the device can be detected.   
That is to say the iOS SDK can figure out whether there has been a change or another biometric added to it.

### Parameter
- none

### Example
```java
// Biometric information change detection
public func hasNewBiometricEnrolled(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, 
        onFailed: @escaping(RtCode, String)-> Void) {
        ...
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|9000|Result code|
|rtMsg|String|Result message|
|biometricType|Array|Biometric information type|

When the API call for change detection is successful and confirmed no difference, the `rtCode` will be `9000`.       
Otherwise, the `rtCode` will be `9006`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---

## Biometric Information Reset
Use `initBiometric()` from `GuardianSdk` to call the API.
If any biometric information has been changed, `resetBiometric()` can be used for resetting the previous biometric information.   
In order to proceed, the user must be authenticated with his/her biometric information beforehand.   
when the authentication is done, the previous biometric information will be deleted accordingly.

### Parameter
- none

### Example
```java
// Biometric information reset
public func resetBiometric(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, 
        onFailed: @escaping(RtCode, String)-> Void) {
        ...
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for information reset is successful, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode#Biometric-authentication-error)**

---