---
sidebar_position: 2
---
# Member status and status inquiry

## Android
This document introduces the way to implement member status and status inquiry with Guardian SDK for Android.

<br/>

## Member status inquiry
As for inquiring the user's status, please use the `me()` from `GuardianSdk` to call the API.   
The user status can be as follows: registered member or non-registered user, withdrawn member, temporary suspended user...etc.
### Parameter
- none

### Example
```java
// Member status inquiry
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
|data|map|. User ID<br/>. User's name<br/>. Email<br/>. Phone number<br/>. Additional authentication type<br/>. Last updated date|

If the user is a proper user, the `rtCode` will be `0`, and user information will be returned in `data`.   
If the user does not exist, or has withdrawn his/her account, the result code will be as follows:

### ResultCode
|Result Code|Description|Solution|
|------|---|---|
|2007 or 2008|Non-registered member or the device has been changed|- In case of non-registered member, membership registration is required. <br/> - In case the device has been changed, device registration is required.|
|5005|Unauthorized user|We would like to recommend the unauthorized user contact the administrator.|
|5006|Temporary suspended user|We would like to recommend the temporary suspended user contact the administrator.|
|5007|Permanently suspanded user|We would like to recommend the permanently suspanded user contact the administrator.|
|5008|Withdrawn user|We would like to recommend the withdrawn user to recover his/her account via the account recovery feature within a certain period of time.|

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

If we fail to call the member status inquiry API, we will recieve an `errorCode`. The error code can be as follows.
