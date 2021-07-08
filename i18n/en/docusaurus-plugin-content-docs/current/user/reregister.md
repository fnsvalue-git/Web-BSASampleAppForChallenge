---
sidebar_position: 3
---
# Device Re-registration

## Android
This document introduces the wau to implement GCCS device re-registration with Guardian SDK for Android.

<br/>

## Feature Description
GuardianSDK provides the device re-registration feature where we can verify the user information and re-register your device in case the current users change their devices. With this, the user can proceed the GCCS authentication in a different device.
The feature will check the user information and then send the OTP number to the user's email or phone number in order to proceed the re-registration.

## User check and OTP delivery
As for user check and OTP delivery, please use the `verityUserToOtp()` function from `GuardianSdk` to call the API.   
If the user information is correct, an OTP code will be sent to the user email or phone number.
### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|This is depending on the `verifyType`.<br/>- CMMDUP001 refers email, <br/>- CMMDUP002 refers to phone number|
The data type of the value should be in form of `Map<String, Object>`.

### Example
```java
// User check and OTP delivery
Map<String, Object> params = new HashMap<>();
params.put("userKey", "fnstest");
params.put("name", "test");
params.put("verifyType", "CMMDUP001");
params.put("verifyData", "fnstest@fnsvalue.co.kr");

GuardianSdk.getInstance().verityUserToOtp(params, new GuardianResponseCallback<VerityUserToOtpResponse>() {
    @Override
    public void onSuccess(VerityUserToOtpResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
        Log.i(TAG, "seq : " + result.data.seq);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### VerityUserToOtpResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|seq|Int|seq|
If the user check and OTP delivery API is being called successfully, the `rtCode` will be `0`. The value of `seq` will be use to verify with the `verityOtp()` function.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

---

## OTP Verification
As for OTP code verification, please use the `verityOtp()` function from `GuardianSdk` to call the API to verify the OTP code delivered using `verityUserToOtp()`.
### Parameter
|Key|Value|Description|
|------|---|---|
|authNum|String|OTP code (6 digits) in the user email or SMS |
|name|String|`verityUserToOtp()` result value - seq|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|This is depending on the `verifyType`.<br/>- CMMDUP001 refers email, <br/>- CMMDUP002 refers to phone number|
The data type of the value should be in form of `Map<String, Object>`.

### Example
```java
// OTP Verificaiton
Map<String, Object> params = new HashMap<>();
params.put("authNum", "567232");
params.put("seq", 3);
params.put("verifyType", "CMMDUP001");
params.put("verifyData", "fnstest@fnsvalue.co.kr");

GuardianSdk.getInstance().verityOtp(params, new GuardianResponseCallback<VerityOtpResponse>() {
    @Override
    public void onSuccess(VerityOtpResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
        Log.i(TAG, "data token : " + result.data);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### VerityOtpResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|String|Token to verify re-registration OTP|
If the user check and OTP delivery is being called correctly, the `rtCode` will be `0`.  
The token value in `data` will be used to re-register the device with the `reRegisterClientUser()` function.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|
---

## Device re-registration
As for device registration, please use the `reRegisterClientUser()` function from `GuardianSdk` to call the API. 
The token verified with `verityOtp()` is required and when the device re-registration is complete, the user can use GCCS authentication as normal.
### Parameter
|Key|Value|Description|
|------|---|---|
|disposeToken|String|Token resulted from `verityOtp()`|
|otpType|String|Verification type when calling `verityUserToOtp()` <br/>- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
The data type of the value should be in form of `Map<String, Object>`.

### Example
```java
// OTP Verification
Map<String, Object> params = new HashMap<>();
params.put("disposeToken", "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyS2V5Ijoid2Fyc2hpcCIsImNsaWVudFNlcSI6MiwiY2xpZW50S2V5IjoidGVzdF9jbGllbnQiLCJ1c2VyVHlwZSI6IkNNTU1DTDAwMSIsImV4cCI6MzQ4Njk1MjgwOH0.jgsqNOJUoGm2BkphMyXqpS9PGud96HIPlade_SJ8GInVKSKbnE303KTLm-AUkA5g");
params.put("otpType", "CMMDUP001");

GuardianSdk.getInstance().reRegisterClientUser(params, new GuardianResponseCallback<ReRegisterClientUserResponse>() {
    @Override
    public void onSuccess(ReRegisterClientUserResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
}

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### ReRegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
If re-registration is being call successfully, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|
---



