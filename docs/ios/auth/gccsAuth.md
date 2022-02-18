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
Use `requestAuthRequest()` from `GuardianService` to call the API.    
It is only available for devices registered to GCCS.

### Parameter
- none

### Example
```java
// Authentication request
public func requestAuthRequest(onSuccess: @escaping(RtCode, String, Int, String, String, String)-> Void, onProcess: @escaping(String) -> Void,  onFailed: @escaping(RtCode, String)-> Void) {
    ...
     self.callHttpMethod(params: params, api: apiUrl, method: .post) { (data: JSON) in
        let rtCode = data["rtCode"].intValue
        let rtMsg = data["rtMsg"].string ?? ""
        if (rtCode == RtCode.AUTH_SUCCESS.rawValue){
                guard let authData = data["data"] as? JSON else {
                    onFailed(RtCode.API_ERROR, rtMsg)
                    return
                }
        } errorCallBack: { (errorCode, errorMsg) in
        print("onFailed(RtCode.API_ERROR, errorMsg)")
        onFailed(RtCode.API_ERROR, errorMsg)
        }
    } 
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
Use `requestAuthRequest()` from `GuardianService` to call the API.   
Authentication status is available to see throughout the process.

### Parameter
- none

### Example
```java
//Start authentication
public func requestAuthRequest(onSuccess: @escaping(RtCode, String, Int, String, String, String)-> Void, onProcess: @escaping(String) -> Void,  onFailed: @escaping(RtCode, String)-> Void) {
    ...
    StompSocketService.sharedInstance.connect(dataMap: socketDataMap, connectCallback: {(isConnect: Bool) -> Void in
        ...
            switch status! {
            case AuthStatus.COMPLETE_VERIFICATION_OF_NODES.rawValue:
                self._authRequestSuccess(RtCode.AUTH_SUCCESS, status!, self.authType, self.connectIp, self.userKey, self.clientKey)
                break
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
We can call this API by using the `requestAuthResult()` function from `GuardianService`.   
Call API by using the `requestAuthResult()` from `GuardianService` after proceeding the additional/secondary authentication.

### Parameter
|Key|Value|Description|
|------|---|---|
|isSecondaryCertification|Boolean|When the additional authentication is successful, it will return as `true` <br/> Otherwise, it will return as `false`|

### Example
```java
// Complete authentication
public func requestAuthResult(isSecondaryCertification : Bool, 
        onSuccess: @escaping(RtCode, String)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
    var params = Dictionary<String, Any>()
    
    let commonParam = self.getCommonParam()
    for key in commonParam.keys {
        params[key] = commonParam[key]
    }
        ...
    if (rtCode == RtCode.AUTH_SUCCESS.rawValue){
        onSuccess(RtCode.AUTH_SUCCESS, rtMsg)
    } else {
        self.onCallbackFailed(rtCode: RtCode(rawValue: rtCode)!, onFailed: onFailed)
    }
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

Use `getAuthResultToken()` from `GuardianService` to call the API.   
The token will be given if API call is successfully done.

### Parameter
- none

### Example
```java
// Authentication result
public func getAuthResultToken(onSuccess: @escaping(RtCode, [String:Any])-> Void, onFailed: @escaping(RtCode, String)-> Void){
    
    var params = Dictionary<String,String>()
    params["deviceId"] = getUUid()
    params["clientKey"] = self.clientKey
    params["channelKey"] = self.channelKey
    
    self.callHttpMethod(params: params, api: apiUrl) { (data: JSON) in
        var resultData = [String:Any]()
        resultData["data"] = data["data"].string ?? ""
        onSuccess(RtCode.AUTH_SUCCESS, resultData)
    } errorCallBack: { (errorCode, errorMsg) in
        onFailed(RtCode.API_ERROR, errorMsg)
    }
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
Call the API by using `requestAuthCancel()` from `GuardianService`.   
Using this API enables cancellation of the invalid authentication/authentication in-process.

### Parameter
- none

### Example
```java
//Cancel authentication
public func requestAuthCancel(onSuccess: @escaping(RtCode, String)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
   
    var params = getCommonParam()
    params["deviceId"] = getUUid()
    ...
    self.callHttpMethod(params: params, api: apiUrl, method: .delete) { (data: JSON) in
        let rtCode = data["rtCode"].intValue
        let rtMsg = data["rtMsg"].string ?? ""
        
        if (rtCode == RtCode.AUTH_SUCCESS.rawValue) {
            onSuccess(RtCode.AUTH_SUCCESS, rtMsg)
        } else {
            self.onCallbackFailed(rtCode: RtCode(rawValue: rtCode)!, onFailed: onFailed)
        }
        
    } errorCallBack: { (errorCode, errorMsg) in
        onFailed(RtCode.API_ERROR, errorMsg)
    }
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