---
sidebar_position: 3
---
# Device Re-registration

## Overview
This document describes how to implement GCCS device re-registration and integrate with the iOS SDK.
<br/>

## Feature Description
What can be done if the user wishes to continue using GCCS after changing his/her mobile device?   
It is possible to use GCCS features like before by user information verification and re-registration.   
In this way, the user can use GCCS with a new mobile device.   
To do so, the iOS SDK will first check the user history and then verify the user by sending OTP code to their email or phone number.

## User Verification and OTP Delivery
Use `sendOTPInRegisterDevice()` from `GuardianSdk` to call the API.  
If the user has been verified in the past, he/she will receive the OTP code via email or SMS.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|Depends on the `verifyType`<br/>- If verifyType is CMMDUP001, verifyData is email <br/>- If verifyType is CMMDUP002, verifyData is phone number|

The value must be `Dictionary<KeyType, ValueType>` type.

### Example
```java
// User check and OTP delivery
GuardianAPI.sharedInstance.sendOTPInRegisterDevice(userKey: userKey,
                                                    name: name,
                                                    verifyType: verifyType,
                                                    verifyData: verifyData) { rtCode, response in
    ...
    } onFailed: { error in
    ...
    }
```
### SendOTPInRegisterDevice
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|seq|Int|seq|

When the API call to verify the user and deliver OTP code is successful, the `rtCode` will be `0`.   
The `seq` value will be used for `verifyOTPByEmail()` and `verifyOTPBySms()`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.

---

## OTP Verification
Use `sendOTPInRegisterDevice()` from `GuardianSdk` to call the API that can send OTP code to the user.  
Then with `verifyOTPByEmail()` and `verifyOTPBySms()`, verify user by comparing the OTP code.

### Parameter
|Key|Value|Description|
|------|---|---|
|clientKey|String|Client key|
|email, phoneNum|String|For `verifyOTPByEmail()`, email will be used. For `verifyOTPBySms()`, phone number will be used|
|authNum|String|OTP code (6 digits) delivered to the user's email or phone number |
|seq|String|`sendOTPInRegisterDevice()` result seq|

The value must be in `Dictionary<KeyType, ValueType>` type.

### Example
```java
// OTP Verification
GuardianAPI().verifyOTPByEmail(email: params["email"] as! String,
                            authNum: otpNumber) { rtCode, result, data  in
    ...              
    } onFailed: { error, errorMsg in
    ...
    }
```
### VerityOtpResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|String|Token to verify OTP code for re-registration|

When the API call to verify the user and deliver OTP code is successful, the `rtCode` will be `0`   
The `data` value will be used for re-registration with the `requestReMemberRegister()`

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`

---

## Device re-registration
Use `requestReMemberRegister()` from `GuardianSdk` to call the API. 
The token verified with `VerifyOtpByEmail()` and `VerifyOtpBySms()` is required.   
When the re-registration is complete, the user can utilize GCCS authentication as usual.

### Parameter
|Key|Value|Description|
|------|---|---|
|disposeToken|String|Token resulted from `VerifyOtpByEmail()`and `VerifyOtpBySms()`|
|otpType|String|Verification type when calling `verityUserToOtp()` <br/>- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|result|Bool|OTP authentication result|

The value must be in `Dictionary<KeyType, ValueType>` type.

### Example
```java
// Device registration
GuardianService.sharedInstance.requestReMemberRegister(memberObject: self.params) { rtCode, rtMsg, data in
    ...
    } onFailed: { error, errMsg in
    ...
    }
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