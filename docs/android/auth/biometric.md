---
sidebar_position: 2
---
# Biometric Authentication

## Android
This document introduces the way to implement Biometric authentication feature with Guardian SDK for Android.

<br/>

## Feature Description
Biometric authentication is used as an additional means of authentication after GCCS authentication. We will use biometric information on Android devices registered by the user, and if the biometric information is not registered, we will use the device pattern or password registered by the user instead.

```
Devices with Android version 6.0(Marshmallow) or lower do not supprt biometric authentication. 
Thus we user the device pattern or password instead.
```

```
This feature was developed using BiometricPrompt provided by Android.
If an app using the Guardian for Android SDK is already in use, you can use the biometrics information that the app is using.
```

## Biometric Information Registration
When registering a biometric information, please use the `registerBiometric()` function from `GuardianSdk` to call the API.   
In order to use the biometric authentication, we need to register this biometric information.
### Parameter
- FragmentActivity :  In case of using `AppCompatActivity`, please leave it as `this`.
### Example
```java
// Biometric Information Registration
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

If the biometric authentication registration API is being called succesfully, the `rtCode` will be `0` and biometric information will be registered.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error Message|

If the biometric information registration api call fails, we will receive the error code. Please refer to the  **[Error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** for more information.

---

## Biometric Authentication
When calling biometric authentication API, please use the `authenticateBiometric()` function from `GuardianSdk` to call this API. This will use the fingerprint or facial information registered in the user's device to authenticate. 
If the biometric information is not registered, we will use the device pattern or password registered by the user instead.
### Parameter
- FragmentActivity : In case of using `AppCompatActivity`, please leave it as `this`.
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

If the biometric authentication API is being called succesfully, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If the biometric authentication api call fails, we will receive the error code. Please refer to the  **[Error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** for more information.
- 작성 중
---

## Biometric change check
This will check if the biometric information has been changed. Please use the `hasNewBiometricEnrolled()` function from `GuardianSdk` to call this api.  
This api is used to check if there is any change in biometric information in case the biometric information has been changed or added to the device.
### Parameter
- none
### Example
```java
// Biometric Information Change-check
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

When the biometric change check API is being called successfully, if there is no change of biometric information, the `rtCode` will be `9000`. Otherwise, the `rtCode` will be `9006`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If the biometric change check api call fails, we will receive the error code. Please refer to the  **[Error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** for more information.

---

## Biometric Information Reset
As for resetting the biometric information, please use the `resetBiometricChange()` function from `GuardianSdk` to call the API.  
In case there is any change of biometric information, please this method to reset the biometric information. When resetting, the user need to proceed the biometric authentication and if the authentication is successful, then the biometric information will be also be successfully reset.
### Parameter
- FragmentActivity : In case of using `AppCompatActivity`, please leave it as `this`.
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

If the biometric information reset API is being called successfully, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If the biometric information reset api call fails, we will receive the error code. Please refer to the  **[Error code](http://localhost:3000/docs/auth/errorcode#Biometric-authentication-related-error)** for more information.

---






















