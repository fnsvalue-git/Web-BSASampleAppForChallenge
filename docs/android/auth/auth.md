---
sidebar_position: 1
---
# GCCS Authentication

## Overview
This document describes how to implement GCCS authentication features with the Android SDK.

<br/>

## Feature Description
With GCCS authentication, the user can be verified without any password.   
Throughout the whole process from authentication request to node verification, the token will be provided if the user has passed without any trouble. The token is used for API features such as checking authentication history.

## Authentication Request
Use `requestAuth()` from `GuardianSdk` to call the API.    
It is only available for devices registered to GCCS.

### Parameter
- none

### Example
```java
// Authentication request
GuardianSdk.getInstance().requestAuth(new GuardianResponseCallback<AuthRequestResponse>(){
    @Override
    public void onSuccess(AuthRequestResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error code : " + errorResult.getErrorMessage());
    }
});
```
### AuthRequestResponse
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

## Start Authentication
Once the `rtCode` returned as `0`, it is time to request for actual authentication to start.    
Use `startAuth()` from `GuardianSdk` to call the API.   
Authentication status is available to see throughout the process.

### Parameter
- none

### Example
```java
// Authentication Start
GuardianSdk.getInstance().startAuth(new GuardianAuthResponseCallback<AuthStartResponse>() {
    @Override
    public void onSuccess(AuthStartResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
        Log.i(TAG, "Additional authentication type : " + result.data.authType);
    }

    @Override
    public void onProcess(AuthProcessResponse process) {
        Log.i(TAG, "Authentication status : " + process.status);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```
### AuthProcessResponse
|Key|Value|Description|
|------|---|---|
|status|String|Authentication status|

After calling for authentication, GCCS authentication status will appear in order.   

Below are description of each status value : 

- CreateChannel : Created the channel.
- SelectNodes : Selected the nodes. 
- StartVerificationOfNodes : Started the verification of nodes.
- CompleteVerificationOfNodes : Completed the verification of nodes.

### AuthStartResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|authType|Int|Secondary authentication type|

We can check the authentication type and, with that, we can proceed the authentication process accordingly.

When the API call for starting authentication is successful, the `rtCode` will be `0`.   
According to the `authType`, secondary authentication type can differ.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

## Complete Authentication
This will check whether the authentication is completed.  
We can call this API by using the `completeAuth()` function from `GuardianSdk`.   
Call API by using the `completeAuth()` from `GuardianSdk` after proceeding the additional/secondary authentication.

### Parameter
|Key|Value|Description|
|------|---|---|
|isAuth|Boolean|When the additional authentication is successful, it will return as `true` <br/> Otherwise, it will return as `false`|

### Example
```java
// Authentication completion
GuardianSdk.getInstance().completeAuth(true, new GuardianResponseCallback<AuthCompleteResponse>() {
    @Override
    public void onSuccess(AuthCompleteResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```

### AuthCompleteResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for authentication completion is successful, the `rtCode` will be `0`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---

## Authentication Result 

Use `resultAuth()` from `GuardianSdk` to call the API.   
The token will be given if API call is successfully done.

### Parameter
- none

### Example
```java
// Authentication result
GuardianSdk.getInstance().resultAuth(new GuardianResponseCallback<AuthResultResponse>() {
    @Override
    public void onSuccess(AuthResultResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
        Log.i(TAG, "Token : " + result.data);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```

### AuthResultResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|String|Token|

When the API call for authentication result is successful, the `rtCode` will be `0` and the token will be given.   
That token will be used for API calls such as checking authentication history.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---

## Cancel Authentication
Call the API by using `cancelAuth()` from `GuardianSdk`.   
Using this API enables cancellation of the invalid authentication/authentication in-process.

### Parameter
- none

### Example
```java
// Authentication Cancellation
GuardianSdk.getInstance().cancelAuth(new GuardianResponseCallback<AuthCancelResponse>() {
    @Override
    public void onSuccess(AuthCancelResponse result) {
        Log.i(TAG, "Result code : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "Error code : " + errorResult.getErrorCode());
        Log.e(TAG, "Error message : " + errorResult.getErrorMessage());
    }
});
```

### AuthCancelResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for authentication cancellation is successful, the `rtCode` will be `0` and the authentication in-process will be canceled.   

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error code|

If API call fails, the user will receive an `errorCode`.   
More in detail can be found in the **[error code](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**

---