---
sidebar_position: 2
---
# User status management

## Overview
This document describes how to check and retrieve the user status from the iOS SDK.

<br/>

## Check User Status
To check the user status, `getMe()` from `GuardianSdk` can be used to call the API.   
User status may be one of the following types :    
registered user, not registered user, withdrawn user, temporarily suspended user...etc.

### Parameter
- none

### Example
```java
// User status check
 GuardianAPI.sharedInstance.getMe { rtCode, name, userKey, date, authType in
        DispatchQueue.main.async {
            ...
        }
    } onFailed: { errCode, errMsg in
            ...
    }
```
### MeResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|map|User ID<br/>. User name<br/>. Email<br/>. Phone number<br/>. Additional authentication type<br/>. Last updated date|

The `rtCode` will be `0` if the user is properly registered, and the information of that user will come as a `data`.   
However, if that specific user doesn't exist or is a withdrawn user, the result code and message will appear as follows.

### ResultCode
|Result Code|Description|Solution|
|------|---|---|
|2007 or 2008|Unregistered user or different mobile device |- In case of unregistered user, check sign in status and register if necessary <br/> - If the mobile device has been changed, register new device|
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within a certain period of time|

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|Error code|
|errorMessage|String|Error message|

If API call fails, the user will receive an `errorCode`