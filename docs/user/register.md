---
sidebar_position: 2
---
# Membership registration and integration

## Android
This document introduces the way to implement membership registration and integration with Guardian SDK for Android.

<br/>

## Feature Description
GuardianSDK provides features to register and integrate user into GCCS system by using the user basic information.

## Duplicated registration information check
Before registering to GCCS, we have to check whether the user information GCCS is dupplicated by using the `hasRegisterDuplicateValue()` function from `GuardianSdk` to call the API.
We can check whether the user information exist according the `verifyType`.

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|This is depending on the `verifyType`.<br/>- CMMDUP001 refers email, <br/>- CMMDUP002 refers to phone number|

### Example
```java
// Duplicated registration information check
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
When the registration information duplication API will being called successfully, if there is no duplication, the `rtCode` will be `0`. Otherwise, if there is a duplication, the `rtCode` will be `2019`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

When we fail to call this API, we will receive an `errorCode`, which can be as follows.

---

## GCCS Registration
As for GCCS registration request, please use the `registerClientUser()` function from `GuardianSdk` to call the API.   
We will proceed the membership registration with the website ID (accountId) to be integrated with the user information.
### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|phoneNum|String|Phone number|
|email|String|Email|
|accountId|String|Website ID to be integrated
The data type of the value should be in form of `Map<String, Object>`.

### Example
```java
// GCCS Registration
Map<String, Object> params = new HashMap<>();
params.put("userKey", "test123");
params.put("name", "jhkim");
params.put("email", "fnstest@fnsvalue.co.kr");
params.put("phoneNum", "작성중");
params.put("accountId", "jhkim");

GuardianSdk.getInstance().registerClientUser(params, new GuardianResponseCallback<RegisterClientUserResponse>() {
    @Override
    public void onSuccess(RegisterClientUserResponse result) {

    }

    @Override
    public void onFailed(ErrorResult errorResult) {

    }
});
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
If the GCCS registration API is being called successfully, the `rtCode` will be `0` and the Membership registration and integration will be complete.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If the GCCS registration API call fails, we will receive the `errorCode`, which can be as follows.

## Membership Deactivation
As for membership deactivation call, please use the `unRegisterClientUser()` function from `GuardianSdk` to call the API. 
After becoming a deactivated member, the user can no longer use GCCS authentication. Also, it will appear as deactivated device when checking membership or status inquiry.  
We can use the **[Membership Re-registration](https://developers.fnsvalue.co.kr/docs/user/reregister)** to re-activate our account.
### Parameter
- none

### Example
```java
// Membership Deactivation
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
If the membership deactivation is being called successfully, the `rtCode` will be `0` and the membership will be deactivated.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If the membership deactivation call fails, we will receive an `error` code, which can be as follows.

