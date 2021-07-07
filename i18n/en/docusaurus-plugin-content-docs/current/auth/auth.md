---
sidebar_position: 1
---
# GCCS Authentication

## Android
This document introduces the way to implement GCCS authentication features with Guardian SDK for Android.
<br/>

## Feature Description
The GCCS authentication feature provides the authentication technology to verify GCCS member without any password.
A token will be provided when the member proceed the authentication from authentication request until node verification  properly. The token is used for API functions such as authentication history inquiry.

## Authentication Request
As for GCCS authentication request, we have to use the `requestAuth()` function from `GuardianSdk` to request the API. In addition, we can only request to the devices that are subscribed to GCCS.
### Parameter
- none
### Example
```java
// Authentication Request
GuardianSdk.getInstance().requestAuth(new GuardianResponseCallback<AuthRequestResponse>() {
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
The `rtCode` will be `0` if the authentication request is successful.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

When the authentication request fails, we will receive the error code. Please refer to the **[error code](http://localhost:3000/docs/auth/errorcode)** for more information.

---

## Authentication Start
After completing authentication request, we have to request for authentication start. We can call the API by using the `startAuth()` function from `GuardianSdk`.   
We can check the status of the authentication request.
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
|status|String|Authentication progress status|
After calling the authentication start, we will recieve the GCCS authentication progress status.   
The explanations for the status value are as follows:
- CreateChannel : The channel is created.
- SelectNodes : The nodes are selected.
- StartVerificationOfNodes : The verification of nodes is started
- CompleteVerificationOfNodes : The verification of nodes is completed.

### AuthStartResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|authType|Int|Secondary authentication type|

The `rtCode` will be `0` if the authentication start API is being called succesfully. We can check the authentication type and, with that, we can proceed the authentication process accordingly.
- 작성 중.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

When the authentication start api call fails, we will receive the error code. Please refer to the  **[Error code](http://localhost:3000/docs/auth/errorcode)** for more information.

## Authentication Completion
This will check if the authentication is completed.We can call this API by using the `completeAuth()` function from `GuardianSdk`.    
We call this Authentication Completion API after proceeding the additional/secondary authentication. We will need to call this API even though there is no additional authentication.
### Parameter
|Key|Value|Description|
|------|---|---|
|isAuth|Boolean|When there is no additional authentication or when the additional authentication is successful, it will return as `true`; otherwise, when the additional authentication fails, it will return as `false`|
### Example
```java
// Authentication Completion
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

The `rtCode` will be `0` if the authentication completion API is being called succesfully.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

When the authentication completion API call fails, we will receive the error code. Please refer to the  **[Error Code](http://localhost:3000/docs/auth/errorcode)** for more information.

---

## Authentication Result
This will return the authentication result. We can call this API by using the `resultAuth()` function from `GuardianSdk`.
When successful, we will recieve a token.
### Parameter
- none
### Example
```java
// Authentication Rresult
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

If the authentication result API is being called succesfully, the `rtCode` will be `0` and a token will be provided.
This token will be used to call the other APIs such as authentication history inquiry.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error message|

When the authentication result API call fails, we will receive the error code. Please refer to the  **[Error Code](http://localhost:3000/docs/auth/errorcode)** for more information.

---

## Authentication Cancellation
This will cancel the authentication. We can call this API by using `cancelAuth()` from `GuardianSdk`.
We use this in order to cancel the invalid authentication or ongoing authentication process overall.
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

If the authentication cancellation API is being called succesfully, the `rtCode` will be `0` and the ongoing authentication process will be cancelled.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|ErrorMessage|String|Error code|

When the authentication cancellationlation API call fails, we will receive the error code. Please refer to the  **[Error Code](http://localhost:3000/docs/auth/errorcode)** for more information.

---

















