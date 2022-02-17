---
sidebar_position: 2
---
# User status management

## Overview
This document describes how to check and retrieve the user status from the iOS SDK.

<br/>

## Check user status
To check the user status, `getMe()` from `GuardianAPI` can be used to call the API.   
User status may be one of the following types : registered user, not registered user, withdrawn user, temporarily suspended user...etc.

### Parameter
- none

### Example
```java
// User status check
public func getMe(onSuccess: @escaping(Int, String, String, String, Int)->Void,
                  onFailed: @escaping(Int, String)->Void) {
    let apiUrl = "/me"
    let params = Dictionary<String, Any>()

    apiCall(params: params, api: apiUrl) { response in
        print("getMe => \(response)")
        let rtCode = response["rtCode"].intValue
        let data = response["data"].dictionaryObject!
        let userKey = data["userKey"] as? String ?? ""
        let name = data["name"] as? String ?? ""
        let authType = data["authType"] as? Int ?? 3
        let rawRegDt = data["regDt"] as? String

    } errorCallBack: { errCode, errMsg in
        print("Error getMe => \(errCode) \(errMsg)")
        onFailed(errCode, errMsg)
    }
}
```
### MeResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|
|data|map|User ID<br/>. User name<br/>. Email<br/>. Phone number<br/>. Additional authentication type<br/>. Last updated date|

The `rtCode` will be `0` if the user is properly registered, and the information of that user will come as a `data`.   
However, if that specific user doesn't exist or a withdrawn user, the result code and message will appear as follows.

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