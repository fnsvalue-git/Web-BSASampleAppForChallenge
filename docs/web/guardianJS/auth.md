---
sidebar_label: GCCS Authentication
sidebar_position: 2
---

# BSA Authentication

This document describes how to utilize BSA authentication in the BSA-JS

<!-- ### requestAuth
인증 요청을 합니다.
인증에 성공하였을 경우 설정한 링크로 이동합니다.
설정한 링크에서 사용자 정보를 확인 한 후 사이트 로그인 처리를 합니다.

```
requestAuth(userKey, successCallLink, errCallback)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|GuardianCCS 사용자 계정|
|redirect url|String|인증 성공 후 redirect 할 경로| 

#### Code Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestAuth('fnsvalue', 'https://www.fnsvalue.co.kr', 
(errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

--- -->

## Authentication Request
When the authentication is requested, the API call will be made with `requestAuthCallback()` .  
Push notification will be sent to the app, and the result will be returned through `onSuccess` if successfully authenticated.


```
requestAuthCallback(userKey, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|BSA user account|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestAuthCallback(userKey, (data) => {
  console.log('onSuccess');
  console.log('data : ', data);
}, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onSuccess
|Name|Type|Description|
|---|---|---|
|data|String|Token|

The token will be returned if authentication succeeds, and it can be utilized for the BSA authentication.


### onError
|Name|Type|Description|
|---|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error message|

If authentication fails, the error code and error message will be returned.   
Possible error codes are as follows.


|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key|
|2008|Unregistered user|Check BSA sign in status|
|3201|Not properly linked client|After signing up for BSA, go through Menu => My BSA => Trusted Website => Site Link and then connect with the client website|
|3301|Unspecified client login type|Error in specifying the client, contact the person in charge to solve this matter|
|5001|Authentication timeout|Make request for authentication once again because previous authentication is no longer valid|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within a certain period of time|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one|
|5011|User authentication canceled|Make request for re-authentication|
|5015|Failed to create channel|It can occur when the parameters are not enough <br/>If it happens constantly, please inquire the person in charge|
|5017|Failed to send push notification|Problems have occurred with the FCM(Firebase Cloud Messaging), etc. <br/>If it happens constantly, please inquire the person in charge|
|5022|Verification failure|Node verification failed<br/>If it happens constantly, please inquire the person in charge|

---

## Cancel Authentication
Authentication in progress will be canceled if requested. The API call will be made with `onCancel()` and users can request for authentication again any time.    
If the cancel request is successful, `5011` errorCode will be returned. More in detail can be found in the [onError](#onerror).

```
onCancel(userKey, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|BSA user account|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.onCancel(userKey, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error message|

If cancel request fails, the error code and error message will be returned.  
Possible error codes are like below.

|ErrorCode|Description|Solution|
|------|---|---|
|3100|Unregistered user|Check the user key requested|
|5019|No authentication in progress|Authentication has been already canceled, or not in progress now |

---

## Set Authentication Timer
Add callback function to check valid BSA authentication time.   
The remaining time for authentication will be displayed and if expired, the user should request for authentication once again
```
setAuthTimer(onCallBack)
```

### Parameter
 - none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setAuthTimer((time) => {
  console.log('onTime');
  console.log('time : ' + time);
});
```

### onTime
|Key|Type|Description|
|------|---|---|
|time|Int|Valid authentication time|

Valid authentication time will be returned as the result of a callback function.

---

## Set Authentication Status
Add callback function to check BSA authentication status.   
It is possible to see the authentication status during the whole process from authentication request to the final authentication.

```
setAuthMessage(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setAuthMessage((message) => {
  console.log('onMessage');
  console.log('AuthStatus : ' + message);
});
```

### onMessage
|Key|Type|Description|
|------|---|---|
|message|String|Authentication status|

Authentication status will be returned as the result of a callback function.