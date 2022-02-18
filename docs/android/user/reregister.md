---
sidebar_position: 3
---
# Device Re-registration

## Overview
This document describes how to implement GCCS device re-registration and integrate with the Android SDK.
<br/>

## Feature Description
What can be done if the user wishes to continue using GCCS after changing his/her mobile device?   
It is possible to use GCCS features like before by user information verification and re-registration.   
In this way, the user can use GCCS with a new mobile device.   
To do so, the Android SDK will first check the user history and then verify the user by sending OTP code to their email or phone number.

## User Verification and OTP Delivery
Use `verityUserToOtp()` from `GuardianSdk` to call the API.  
If the user has been verified in the past, he/she will receive the OTP code via email or SMS. 

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|Depends on the `verifyType`<br/>- If verifyType is CMMDUP001, verifyData is email <br/>- If verifyType is CMMDUP002, verifyData is phone number|

The value must be `Map<String, Object>` type.

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

When the API call to verify the user and deliver OTP code is successful, the `rtCode` will be `0`.   
The `seq` value will be used for `verityOtp()`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.

---

## OTP Verification
Use `verityUserToOtp()` from `GuardianSdk` to call the API that can send OTP code to the user.  
Then with `verityOtp()`, verify user by comparing the OTP code.

### Parameter
|Key|Value|Description|
|------|---|---|
|authNum|String|OTP code (6 digits) delivered to the user's email or phone number |
|name|String|`verityUserToOtp()` result value - seq|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|Depends on the `verifyType`<br/>- If verifyType is CMMDUP001, verifyData is email <br/>- If verifyType is CMMDUP002, verifyData is phone number|

The value must be in `Map<String, Object>` type.

### Example
```java
// OTP Verification
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
|data|String|Token to verify OTP code for re-registration|

When the API call to verify the user and deliver OTP code is successful, the `rtCode` will be `0`   
The `data` value will be used for re-registration with the `reRegisterClientUser()`

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`

---

## Device re-registration
Use `reRegisterClientUser()` from `GuardianSdk` to call the API.   
The token verified with `verityOtp()` is required.   
When the re-registration is complete, the user can utilize GCCS authentication as usual. 

### Parameter
|Key|Value|Description|
|------|---|---|
|disposeToken|String|Token resulted from `verityOtp()`|
|otpType|String|Verification type when calling `verityUserToOtp()` <br/>- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|

The value must be in `Map<String, Object>` type.

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

When the API call to re-register is successful, the `rtCode` will be `0`

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`

---



