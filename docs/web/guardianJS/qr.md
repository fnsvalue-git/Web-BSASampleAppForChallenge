---
sidebar_label: QR Authentication
sidebar_position: 3
---

# QR Authentication
This document describes how to utilize the GCCS Authentication in the Guardian-JS

## Function Description
QR Authentication can be used via mobile devices without an ID.   
First, create a QR code which can be implemented by `guardian.js` then choose `QR Authentication` on the main screen of `Guardian-CCS` application to activate a QR Scanner to scan the QR code. 


## QR Authentication Request
When the authentication is requested, API calls are made with `requestQrCallback`
Upon the request of QR Authentication, QR code will be created on `<canvas/> tag` which the user has set up, and the result will be returned through onSuccess if the QR Authentication is successful.

```
requestQrCallback(qrCanvas, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|qrCanvas|Element|`<canvas/>` element to create GuardianCCS QR code|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestQrCallback(qrCanvas, (data) => {
  console.log('onSuccess');
  console.log('data : ', data);
}, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onSuccess
|Key|Type|Description|
|------|---|---|
|data|String|token|

The token will be returned if the authentication succeeds, and it can be utilized for the GCCS authentication.

### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error message|

If authentication fails, error code and error message will be returned.   
Possible error codes are as follows.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key|
|2008|Unregistered user|Check GCCS sign up status|
|3201|Not properly linked client|After signing up for GCCS, select Menu => My BSA => Trusted Website => Site Link and link the client website|
|5001|Authentication timeout|Make request for authentication once again because previous authentication is no longer valid|
|5005|Unauthorized user|Contact with the FNS management team to solve this matter|
|5006|Temporarily suspended user|Contact with the FNS management team to solve this matter|
|5007|Permanently suspended user|Contact with the FNS management team to solve this matter|
|5008|Withdrawn user|Accounts can be reactivated within certain period of time by reactivation|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one |
|5011|User authentication canceled|Make request for re-authentication|
|5015|Fail to create channel|Can occur when the parameters are not enough <br/>If it happens constantly, please inquire at the FNS management team|
|5017|Fail to send push notification|Problems occurred with FCM, etc. <br/>If it happens constantly, please inquire at the FNS management team|
|5022|Authentication failure|If node verification fails, this error can occur <br/>If it happens constantly, please inquire at the FNS management team|
|5023|Invalid QR ID|Can occur when authentication has expired. In this case, re-authentication should be requested|
|5024|Invalid QR URL CLIENT|Can occur when scanned through another application. It must be scanned through Guardian-CCS application |

---

## Cancel QR Authentication
Cancel QR Authentication request.   
Authentication in progress will be canceled if requested. Users can try to request authentication again.

인증 취소 요청 성공 시 [인증 요청의 onError](#onerror)에 `5011` errorCode가 반환됩니다.

```
onQrCancel(qrCanvas, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|qrCanvas|Element|`<canvas/>` element to create Guardian CCS QR code|

### Example
```html
<div>
  <canvas />
</div>
```
```javascript
const gccs = new Guardian("{Client Key}");
gccs.onQrCancel(qrCanvas, (errorCode, errorMsg) => {
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
|5019|No authentication in progress|Authentication has been already canceled, or not in progress now|

---

## Set QR Authentication Timer
Add Callback function to check valid GCCS QR Authentication time.   
The remaining time for authentication will be displayed and if expired, authentication should be requested again.

```
setQrTimer(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setQrTimer((time) => {
  console.log('onTime');
  console.log('time : ' + time);
});
```
### onTime
|Key|Value|Description|
|------|---|---|
|time|Int|Valid authentication time|

Valid authentication time will be returned as a result of callback function.

---

## Set QR Authentication Status
Add callback function to check GCCS authentication status.
Possible to check authentication status from the beginning till the end.

```
setQrMessage(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setQrMessage((message) => {
  console.log('onMessage');
  console.log('AuthStatus : ' + message);
});
```
### onMessage
|Key|Value|Description|
|------|---|---|
|message|String|Authentication progress status|

Authentication progress status will be returned as a result of callback function.