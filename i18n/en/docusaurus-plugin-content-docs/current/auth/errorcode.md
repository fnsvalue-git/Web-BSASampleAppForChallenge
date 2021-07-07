---
sidebar_position: 3
---
# Error code

## Description
This description explains different possible errors during GCCS authentication and biometric authentication implementation.

<br/>

### User related error during authentication
|Error Code|Description|Solution|
|------|---|---|
|2000|Invalid Client Key|Please check the issued clienty key. <br/> During SDK initialization, it will verify if the client key has been used.|
|2008|Unregistered user|Please check if the user has been registered with GCCS. <br/> We can check if the user has been registered by using the `me` function from `GuardianSdk`. |
|5001|The authentication has expired|When the designated authentication time has expired, we need to send another request for authentication.|
|5005|Unauthorized user|We would like to recommend the unauthorized user contact the administrator.|
|5006|Temporary suspended user|We would like to recommend the temporary suspended user contact the administrator.|
|5007|Permanently suspanded user|We would like to recommend the permanently suspanded user contact the administrator.|
|5008|Withdrawn user|We would like to recommend the withdrawn user to recover his/her account via the account recovery feature within a certain period of time.|

---

<br/>

### Authentication related error
|Error Code|Description|Solution|
|------|---|---|
|2004|The channel doesn't exist|Please check the url that you have initialized. <br/>If error continues to occur, please contact the administrator.|
|2010|User whose authentication is in progress|As for the user whose authentication is in progress, please cancel the authentication request and then request for another authentication according to the situation.|
|5010|Authentication Failed|Please contact the administrator|
|5011|The authentication has been cancelled|Please request for a re-authentication|
|5015|Channel creation failed|This occurs when there is not enough parameter. <br/>If error continues to occur, please contact the administrator.|
|5017|Push notification delivery failed|Please check if therre is any problem with the registered FCM Server Key, or if the updated token is correct.|
|5022|Verification failed|This occurs when we fail to verificate the authentication node.<br/>If error continues to occur, please contact the administrator.|

---
<br/>

### Biometric authentication related error
|Error Code|Description|Solution|
|------|---|---|
|9001|Biometric authentication is not supported in this particular android version.|This occurs when the android version is 6.0 or lower.<br/> If biometric authenticaiton is not supported, we will use the device pattern or password authentication. |
|9002|Biometric authorization does not exist.|작성중|
|9003|Biometric authentication is not supported in this particular device.|The device does not support biometric recognition modules. <br/> If biometric authenticaiton is not supported, we will use the device pattern or password authentication.|
|9004|This device does not register biometric information.|This device does not register biometric information. <br/> If biometric authenticaiton is not supported, we will use the device pattern or password authentication.|
|9005|Biometric information registered with the app does not exist.|This device does not register biometric information in Android SDK. <br/> Please use the `registerBiometric()` function from  `GuardianSdk` to register the biometric authentication.|
|9006|The biometric information has been changed.|This occurs when the biometric information in the device has been changed. <br/> Please use the `resetBiometricChange()` function from `GuardianSdk` to reset the biometric information.|
|9007|The registered biometric information already exists|This occurs when the registered biometric information already exists|
|9008|Biometric information does not match.|This occur when the biometric information is not recognized during biometric authentication. Please use the correct biometric information.|
|9009|Biometric authentication error|Biometric authentication cannot be use due to other errors. Please contact the administrator.|

---

<br/>

### Other error
|Error Code|Description|Solution|
|------|---|---|
|10002|An error occurred in the SDK|An Exception occurs in the SDK. Please contact the administrator.|
|10003|An error occurred in the server|An Exception occurs in the API server. Please contact the administrator.|
|10004|Cannot connect with the server|The server cannot be connected. Please check the internet connection and also check the server address when initializing.|

















