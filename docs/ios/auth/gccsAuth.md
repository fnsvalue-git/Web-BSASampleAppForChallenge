---
sidebar_position: 1
---
# GCCS Authentication

## Overview
This document describes how to implement GCCS authentication features with the iOS SDK.

<br/>

## Feature Description
With GCCS authentication, the user can be verified without any password.   
Throughout the whole process from authentication request to node verification, the token will be provided if the user has passed without any trouble. The token is used for API features such as checking authentication history.

## Authentication Request
Use `requestAuthRequest()` from `iOS SDK` to call the API.    
It is only available for devices registered to GCCS.

### Parameter
- none

### Example
```java
// Authentication request
GuardianService.sharedInstance.requestAuthRequest { rtCode, rtMsg, authType, connectIp, userKey, clientKey in
        ...  
    } onProcess: { status in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
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
Use `requestAuthRequest()` from `GuardianSdk` to call the API.   
Authentication status is available to see throughout the process.

### Parameter
- none

### Example
```java
//Start authentication
GuardianService.sharedInstance.requestAuthRequest { rtCode, rtMsg, authType, connectIp, userKey, clientKey in
        ...  
    } onProcess: { status in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
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
We can call this API by using the `requestAuthResult()` function from `GuardianSdk`.   
Call API by using the `requestAuthResult()` from `GuardianSdk` after proceeding the additional/secondary authentication.

### Parameter
|Key|Value|Description|
|------|---|---|
|isSecondaryCertification|Boolean|When the additional authentication is successful, it will return as `true` <br/> Otherwise, it will return as `false`|

### Example
```java
// Complete authentication
GuardianService.sharedInstance.requestAuthResult(isSecondaryCertification: true) { rtCode, rtMsg in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
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

Use `getAuthResultToken()` from `GuardianSdk` to call the API.   
The token will be given if API call is successfully done.

### Parameter
- none

### Example
```java
// Authentication result
GuardianService.sharedInstance.getAuthResultToken { rtCode, result in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
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
Call the API by using `requestAuthCancel()` from `GuardianSdk`.   
Using this API enables cancellation of the invalid authentication/authentication in-process.

### Parameter
- none

### Example
```java
//Cancel authentication
GuardianService.sharedInstance.requestAuthCancel { rtCode, msg in
    ...
    } onFailed: { errCode, errMsg in
    ...
    }
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