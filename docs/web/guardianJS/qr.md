---
sidebar_label: QR Authentication
sidebar_position: 3
---

# QR Authentication
This document describes how to utilize QR authentication in the Guardian-JS

## Function Description
QR Authentication can be used via mobile devices without an ID by following the steps below.   
First, create a QR code implemented by `guardian.js` and then click `QR Authentication` on the main screen of `Guardian-CCS` app to activate the QR Scanner. 


## QR Authentication Request
When authentication is requested, API calls are made with `requestQrCallback()`.   
Upon the request of QR authentication, a QR code will be created on the `<canvas/> tag` that has been set up with `Guardian-JS`. The result will be returned with `onSuccess` if successfully authenticated.

```
requestQrCallback(qrCanvas, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|qrCanvas|Element|`<canvas/>` element to create Guardian CCS QR code|

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
|data|String|Token|

The token will be returned if authentication succeeds, and it can be utilized for the GCCS authentication.

### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error message|

If authentication fails, the error code and error message will be returned.   
Possible error codes are as follows.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key|
|2008|Unregistered user|Check GCCS sign in status|
|3201|Not properly linked client|After signing up for GCCS, go through Menu => My BSA => Trusted Website => Site Link and connect with the client website|
|5001|Authentication timeout|Make request for authentication once again, because previous authentication is no longer valid|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within certain period of time by reactivation|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one|
|5011|User authentication canceled|Make request for re-authentication|
|5015|Failed to create channel|It can occur when the parameters are not enough  <br/>If it happens constantly, please inquire the person in charge|
|5017|Failed to send push notification|Problems have occurred with the FCM(Firebase Cloud Messaging), etc. <br/>If it happens constantly, please inquire the person in charge|
|5022|Verification failure|Node verification failed<br/>If it happens constantly, please inquire the person in charge|
|5023|Invalid QR ID|It can occur when the authentication has expired. In this case, re-authentication should be requested |
|5024|Invalid QR URL CLIENT|It can occur when the QR code was scanned through another app other than Guardian CCS. It must be scanned by Guardian-CCS app only |

---

## Cancel QR Authentication
Authentication in progress will be canceled if requested. Users can request for authentication again any time.   
If the cancel request is successful, `5011` errorCode will be returned. More in detail can be found in the [onError](#onerror)


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

If cancel request fails, the error code and error message will be returned.  
Possible error codes are like below.

|ErrorCode|Description|Solution|
|------|---|---|
|3100|Unregistered user|Check the user key requested|
|5019|No authentication in progress|Authentication has been already canceled, or not in progress now|

---

## Set QR Authentication Timer
Add callback function to check valid GCCS QR Authentication time.   
The remaining time for authentication will be displayed and if expired, the user should request for authentication again.

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

Valid authentication time will be returned as the result of a callback function.

---

## Set QR Authentication Status
Add callback function to check GCCS authentication status.   
It is possible to see the authentication status during the whole process from authentication request to the final authentication.

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
|message|String|Authentication status|

Authentication status will be returned as the result of a callback function.