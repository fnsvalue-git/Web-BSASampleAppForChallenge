---
sidebar_position: 3
---
# Error Code

## Overview
Below are the possible errors that can occur during GCCS authentication and biometric authentication.

<br/>

### User error

|Error Code|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key <br/> When initializing the Android SDK, it verifies whether the client key has been used|
|2008|Unregistered user|Check GCCS sign in status<br/> To check whether the user has been registered or not, use `me()` from `GuardianSdk`|
|5001|Authentication timeout|Make request for authentication once again because previous authentication is no longer valid|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within certain period of time by reactivation|

---

<br/>

### Authentication error
|Error Code|Description|Solution|
|------|---|---|
|2004|Channel does not exist|Check the url used for initialization. <br/>If it happens constantly, please inquire the person in charge|
|2010|User authentication in-progress|Depending on the circumstances, cancel previous authentication and request for new one|
|5010|Authentication failure|Contact the person in charge to solve this matter|
|5011|User authentication canceled|Make request for re-authentication|
|5015|Failed to create channel|It can occur when the parameters are not enough <br/>If it happens constantly, please inquire the person in charge|
|5017|Failed to send push notification|Problems with FCM(Firebase Cloud Messaging), etc. <br/> Also check whether updated token is a correct one|
|5022|Verification failure|Node verification failed<br/>If it happens constantly, please inquire the person in charge|

---
<br/>

### Biometric authentication error
|Error Code|Description|Solution|
|------|---|---|
|9001|Current Android version does not support biometric authentication|It can occur when the Android version is 6.0 or lower<br/>When the biometric authentication is unavailable, it will be switched to PIN or pattern authentication automatically|
|9003|Device does not support biometric authentication|Biometric module is not supported by the device <br/> When the biometric authentication is unavailable, it will be switched to PIN or pattern authentication automatically|
|9004|Biometric information not found from the device|There is no biometric information in this device<br/> When the biometric authentication is unavailable, it will be switched to PIN or pattern authentication automatically|
|9005|Guardian CCS does not have biometric information|Biometric information was not registered in the Android SDK<br/> Use `registerBiometric()` from  `GuardianSdk` to register the biometric information for authentication|
|9006|Biometric information has been changed|Biometric information stored in the device has been changed<br/> Use `resetBiometricChange()` from `GuardianSdk` to reset the biometric information for authentication|
|9007|Biometric information already registered|This occurs when the biometric information that user tries to register already exists |
|9008|Biometric information does not match|It can occur when biometric information can't be identified during authentication process. Using the right biometric information is recommended|
|9009|Biometric authentication error|It occurred due to unspecified reason. <br/> Contact the person in charge to solve this matter|

---

<br/>

### Other error
|Error Code|Description|Solution|
|------|---|---|
|10002|SDK error|An Exception has occurred in the SDK <br/> Contact the person in charge to solve this matter|
|10003|Server error|An Exception has occurred in the API server <br/> Contact the person in charge to solve this matter|
|10004|Server connection error|Impossible to connect the server <br/> Check internet connection and the server address used for initialization|













