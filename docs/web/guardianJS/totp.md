---
sidebar_label: TOTP Authentication
sidebar_position: 5
---

# TOTP Authentication
This document describes how to utilize the TOTP authentication in the BSA-JS.   
TOTP authentication can be used when the mobile device cannot access the internet.

## Function Description
TOTP authentication can be used via mobile devices with the ID and TOTP code by following the steps below.   
First, click `TOTP Authentication` from the main screen of `BSA` app and then get the TOTP code. Proceed on authentication by entering the ID and TOTP code.

## TOTP Authentication Request
When the user enters the TOTP code to authenticate, the API call will be made with `requestTotpCallback()`.
The result will be returned through `onSuccess` if successfully authenticated.

```
requestTotpCallback(userKey, totpCode, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|BSA user account|
|totpCode|String|TOTP code that user entered|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestTotpCallback(userKey, totpCode, (data) => {
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

The token will be returned if authentication succeeds, and it can be utilized for the BSA authentication.


### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMsg|String|Error Message|

If authentication fails, the error code and error message will be returned.   
Possible error codes are as follows.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key|
|2008|Unregistered user|Check BSA sign in status|
|3005|TOTP code verification failure|Make request for re-verification|
|3201|Not properly linked client|After signing up for BSA, go through Menu => My BSA => Trusted Website => Site Link and connect with the client website|
|3301|Unspecified client login type|Error with specifying the client, contact the person in charge to solve this matter|
|5001|Authentication timeout|Make request for authentication once again because previous authentication is no longer valid|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within certain period of time by reactivation|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one|
|5011|User authentication canceled|Make request for re-authentication|
|5015|Failed to create channel|It can occur when the parameters are not enough <br/>If it happens constantly, please inquire the person in charge|
|5017|Failed to send push notification|Problems have occurred with the FCM(Firebase Cloud Messaging), etc. <br/>If it happens constantly, please inquire the person in charge|
|5022|Verification failure|Node verification failed <br/>If it happens constantly, please inquire the person in charge|
|5026|Exceeded daily limit for TOTP authentication attempt|Make request for authentication with another method|