---
sidebar_label: OTP Authentication
sidebar_position: 4
---

# OTP Authentication
This document describes how to utilize the OTP Authentication in the BSA-JS

## Function Description
OTP Authentication can be used via mobile devices without an ID by following the steps below.   
First, click `OTP Authentication` from the main screen of `BSA` app and then get the OTP code. Proceed on authentication by entering the OTP code.

## OTP Authentication request

When the user enters the OTP code to authenticate, the API call will be made with `requestOtpCallback()`.   
Push notification will be sent to the app, and the result will be returned through `onSuccess` if successfully authenticated.


```
requestOtpCallback(otpInput, successCallback, errCallback, codeSuccessCallback, codeErrCallback)
```
 
### Parameter
|Name|Type|Description|
|---|---|---|
|otpInput|Element|`<input/>` element for user to enter the OTP code|

### Example
```html
<div>
  <Input />
</div>
```
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestOtpCallback(otpInput, (data) => {
  console.log('onSuccess');
  console.log('data : ', data);
}, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
}, () => {
  console.log('onCodeSuccess');
}, (errorCode, errorMsg) => {
  console.log('onCodeError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onSuccess
|Key|Type|Description|
|------|---|---|
|data|String|Token|

The token will be returned if authentication succeeds, and it can be utilized for the BSA authentication.


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
|2008|Unregistered user|Check BSA sign in status|
|3201|Not properly linked client|After signing up for BSA, go through Menu => My BSA => Trusted Website => Site Link and connect with the client website|
|3301|Unspecified client login type|Error with specifying the client, contact the person in charge to solve this matter|
|5001|Authentication timeout|Make request for authentication once again, because previous authentication is no longer valid|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within certain period of time by reactivation|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one|
|5011|User authentication canceled|Make request for re-authentication|
|5015|Failed to create channel|It can occur when the parameters are not enough <br/>If it happens constantly, please inquire the person in charge|
|5017|Failed to send push notification|Problems have occurred with the FCM(Firebase Cloud Messaging), etc. <br/>If it happens constantly, please inquire the person in charge|
|5022|Verification failure|Node verification failed<br/>If it happens constantly, please inquire the person in charge|

### onCodeSuccess
If the OTP code verification is successful, this function will be called.   
It can have null value or can be omitted.



### onCodeError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error message|

If the OTP code verification fails, the error code and error message will be returned.   
It can have null value or can be omitted.   
Possible error codes are as follows.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key|
|3005|OTP code verification failure|Make request for re-verification|
|3201|Not properly linked client|After signing up for BSA, go through Menu => My BSA => Trusted Website => Site Link and connect with the client website|

---

## Cancel OTP Authentication

Authentication in progress will be canceled if requested. Users can request for authentication again any time.   
If the cancel request is successful, `5011` errorCode will be returned. More in detail can be found in the [onError](#onerror)


```
onOtpCancel(otpInput, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|otpInput|Element|`<input/>` element for user to enter the OTP code|

### Example
```html
<div>
  <Input />
</div>
```
```javascript
const gccs = new Guardian("{Client Key}");
gccs.onOtpCancel(otpInput, (errorCode, rtMsg) => {
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

## Set OTP Authentication Timer

Add callback function to check valid OTP authentication time.   
The remaining time for authentication will be displayed and if expired, the user should request for authentication again
```
setOtpTimer(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setOtpTimer((time) => {
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

## Set OTP Authentication Status
Add callback function to check BSA authentication status.   
It is possible to see the authentication status during the whole process from authentication request to the final authentication.

```
setOtpMessage(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setOtpMessage((message) => {
    console.log('onMessage');
    console.log('AuthStatus : ' + message);
});
```

### onMessage
|Key|Value|Description|
|------|---|---|
|message|String|Authentication status|

Authentication status will be returned as the result of a callback function.