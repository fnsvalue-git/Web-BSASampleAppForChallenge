---
sidebar_position: 2
---
# User registration and integration

## Overview
This document describes how to implement user registration and integration with the Android SDK.

<br/>

## Feature Description
Android SDK provides features to register and integrate user into GCCS system by using the basic information.

## User Information Uniqueness Check
Previous to GCCS registration, each user must have unique and original information and does not contain duplicate value.  
Check uniqueness by using `hasRegisterDuplicateValue()` to call the API from `GuardianSdk`.   

Whether user information is unique or not can be identified upon the `verifyType`. 

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|Depends on the `verifyType`<br/>- If verifyType is CMMDUP001, verifyData is email <br/>- If verifyType is CMMDUP002, verifyData is phone number|

### Example
```java
// Checking user information uniqueness
GuardianSdk.getInstance().hasRegisterDuplicateValue("CMMDUP001", "fnstest@fnsvalue.co.kr", new GuardianResponseCallback<RegisterDuplicateValueResponse>() {
    @Override
    public void onSuccess(RegisterDuplicateValueResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
    }
});
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call to check registered information uniqueness is successful and there is no duplicate value, the `rtCode` will be `0` and if not, the `rtCode` will be `2019`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If API call fails, the user will receive an `errorCode`.

---

## GCCS Registration 
Use `registerClientUser()` from `GuardianSdk` to call the API that can handle GCCS registration request.
User registration will be done with website ID(account ID) that is integrated with the user information.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|phoneNum|String|Phone number|
|email|String|Email|
|accountId|String|Website ID for integration|

The value must be in `Map<String, Object>` type.

### Example
```java
// GCCS Registration
GuardianSdk.getInstance().registerClientUser(params, new GuardianResponseCallback<RegisterClientUserResponse>() {
    @Override
    public void onSuccess(RegisterClientUserResponse result) {
        ...
    }
    
    @Override
    public void onFailed(ErrorResult errorResult) {
        ...
    }
});
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for biometric authentication is successful, the `rtCode` will be `0`   
The user registration and integration is complete then.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If API call fails, the user will receive an `errorCode`

## User account deactivation
To deactivate the account, use `unRegisterClientUser()` from `GuardianSdk` to call the API.   
Deactivating the account means that the user won't be able to use GCCS authentication.   
Furthermore, the device will be sorted out as a deactivated device at the user status.   
Reactivating the user account is viable through re-registration. More in detail can be found in the **[Device Re-registration](https://developers.fnsvalue.co.kr/docs/user/reregister)**

### Parameter



- none

### Example
```java
// User account deactivation
GuardianSdk.getInstance().unRegisterClientUser(new GuardianResponseCallback<UnRegisterClientUserResponse>() {
    @Override
    public void onSuccess(UnRegisterClientUserResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
    }
});
```
### UnRegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for user deactivation is successful, the `rtCode` will be `0`.   
The user account deactivation is complete then.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If API call fails, the user will receive an `errorCode`.

