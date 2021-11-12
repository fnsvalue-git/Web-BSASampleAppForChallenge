---
sidebar_position: 2
---
# User status management

## Overview
This document describes how to check and retrieve the user status from the Android SDK.

<br/>

## Check user status
To check the user status, `me()` from `GuardianSdk` can be used to call the API.   
User status may be one of the following types : registered user, not registered user, withdrawn user, temporarily suspended user...etc.

### Parameter
- none

### Example
```java
// Check user status
GuardianSdk.getInstance().me(new GuardianResponseCallback<MeResponse>() {
    @Override
    public void onSuccess(MeResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
        Log.i(TAG, "Member ID : " + result.data.userKey);
        Log.i(TAG, "Member's name : " + result.data.name);
        Log.i(TAG, "Member's email : " + result.data.email);
        Log.i(TAG, "Member's phone number : " + result.data.phoneNum);
        Log.i(TAG, "Member's additional authentication type : " + result.data.authType);
        Log.i(TAG, "Member last updated date : " + result.data.uptDt);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### MeResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|map|. User ID<br/>. User name<br/>. Email<br/>. Phone number<br/>. Additional authentication type<br/>. Last updated date|

The `rtCode` will be `0` if the user is properly registered, and the information of that user will come as a `data`.   
However, if that specific user doesn't exist or a withdrawn user, the result code and message will appear as follows.

### ResultCode
|Result Code|Description|Solution|
|------|---|---|
|2007 or 2008|Unregistered user or different mobile device |- In case of unregistered user, check sign in status and register if necessary <br/> - If the mobile device has been changed, register new device|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within a certain period of time|

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`



