---
sidebar_label: GCCS Authentication
sidebar_position: 2
---

# GCCS Authentication

This document describes how to utilize GCCS Authentication in the Guardian-JS

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
When the authentication is requested, API calls are made with `requestAuthCallback`   
Along with the push notification sent to the app, the result will be returned through onSuccess if the authentication is successful.


```
requestAuthCallback(userKey, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|Guardian CCS User Account|

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

The token will be returned if the authentication succeeds, and it can be utilized for the GCCS authentication.


### onError
|Name|Type|Description|
|---|---|---|
|errorCode|Int|Error Code|
|errorMsg|String|Error Message|

If authentication fails, error code and error message will be returned.   
Possible error codes are as follows.


|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid Client Key|Check the client key|
|2008|Unregistered user|Check GCCS sign up status|
|3201|Not properly linked client|After signing up for GCCS, select Menu => My BSA => Trusted Website => Site Link and link the client website|
|3301|클라이언트 로그인 타입이 정해져 있지 않은 경우|클라이언트 설정 오류인 경우로 관리자에게 문의바랍니다.|
|5001|Authentication timeout|Make request for authentication once again because previous authentication is no longer valid|
|5005|Unauthorized user|Contact with the FNS management team to solve this matter|
|5006|Temporarily suspended user|Contact with the FNS management team to solve this matter|
|5007|Permanently suspended user|Contact with the FNS management team to solve this matter|
|5008|Withdrawn user|Accounts can be reactivated within certain period of time by reactivation|d
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication an request for new one|
|5011|User authentication canceled|Request for re-authentication|
|5015|Fail to create channel|Can occur when the parameters are not enough <br/>If it happens constantly, please inquire at the FNS management team|
|5017|Fail to send push notification|Problems occurred with FCM, etc. <br/>If it happens constantly, please inquire at the FNS management team|
|5022|Authentication failure|If node verification fails, this error can occur <br/>If it happens constantly, please inquire at the FNS management team|

---

## Cancel Authentication
Cancel Authentication request. Call API using `onCancel()`
Authentication in progress will be canceled if requested. Users can try to request authentication again.

인증 취소 요청 성공 시 [인증 요청의 onError](#onerror)에 `5011` errorCode가 반환됩니다.

```
onCancel(userKey, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|Guardian CCS user account|

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

If failed, error code and error message will be returned.  
Possible error codes are like below.

|ErrorCode|Description|Solution|
|------|---|---|
|3100|Unregistered user|Please check the user key requested|
|5019|No authentication in progress|Authentication has been already canceled, or not in progress now |

---

## Set Authentication Timer
Add callback function to check valid GCCS authentication time.   
The remaining time for authentication will be displayed and if expired, authentication should be requested again.
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

Valid authentication time will be returned as a result of callback function.

---

## Set Authentication Status
Add callback function to check GCCS authentication status.
Possible to check authentication status from the beginning till the end.

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
|message|String|Authentication progress status|

Authentication progress status will be returned as a result of callback function.