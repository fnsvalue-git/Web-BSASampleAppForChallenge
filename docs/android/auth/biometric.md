---
sidebar_position: 2
---
# Biometric Authentication

## Overview

This document describes how to implement the Biometric authentication features with the Android SDK.

<br/>

## Feature Description
Biometric authentication is the additional authentication for GCCS. The biometric information stored in the Android device will be used, and if there is no biometric information, the PIN or pattern will be used for authentication instead.
```
If the device has Android Version6.0(Marshmallow) or lower, it can't support biometric authentication.
PIN or pattern authentication will be used as a substitute.
```

```
Android provides BiobetricPromt and this feature was developed based on that.
If the app that applied Android SDK is already in use, biometric information of the app can be used. 
```

## Biometric Information Registration
Use `registerBiometric()` from `GuardianSdk` to call the API.   
Biometric information needs to be registered for the authentication.

### Parameter
- FragmentActivity :  If the class is extending `AppCompatActivity`, use `this` when passing a parameter.

### Example
```java
// Biometric information registration
GuardianSdk.getInstance().registerBiometric(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, result.rtCode); // Result code
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

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
Use `authenticateBiometric()` from `GuardianSdk` to call the API.   
Fingerprint or facial information that is registered in the device will be used for authentication.   
If there is no biometric information, PIN or pattern will be used as an authentication method as a substitute.   

### Parameter
- FragmentActivity :  If the class is extending `AppCompatActivity`, use `this` when passing a parameter.

### Example
```java
// Biometric Authentication
GuardianSdk.getInstance().authenticateBiometric(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

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
That is to say the Android SDK can figure out whether there has been a change or another biometric added to it. 

### Parameter
- none

### Example
```java
// Biometric information change detection
GuardianSdk.getInstance().hasNewBiometricEnrolled(new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode); // 9000 or 9006
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|9000|Result code|
|rtMsg|String|Result message|

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
Use `resetBiometricChange()` from `GuardianSdk` to call the API.
If any biometric information has been changed, this method can be used for resetting the previous biometric information.   
In order to proceed, the user must be authenticated with his/her biometric information beforehand.   
when the authentication is done, the previous biometric information will be deleted accordingly. 

### Parameter
- FragmentActivity : If the class is extending `AppCompatActivity`, use `this` when passing a parameter.

### Example
```java
// Biometric Information Reset
GuardianSdk.getInstance().resetBiometricChange(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode); // Result code
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
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