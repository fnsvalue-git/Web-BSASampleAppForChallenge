---
sidebar_position: 2
---
# User registration and integration

## Overview
This document describes how to implement user registration and integration with the iOS SDK.

<br/>

## Feature Description
iOS SDK provides features to register and integrate user into GCCS system by using the basic information of user.

## User Information Uniqueness Check
Previous to GCCS registration, each user must have unique and original information and does not contain duplicate value.  
Check uniqueness by using `isDuplicatedEmailOrPhoneNumber()` to call the API from `GuardianAPI`.

Whether user information is unique or not can be identified upon the `verifyType`.

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : Email<br/> - CMMDUP002 : SMS|
|verifyData|String|Depends on the `verifyType`<br/>- If verifyType is CMMDUP001, verifyData is email <br/>- If verifyType is CMMDUP002, verifyData is phone number|

### Example
```java
// Checking user information uniqueness
GuardianAPI().isDuplicatedEmailOrPhoneNumber(verifyType: "CMMDUP001",verifyData: email) { data in 
    GuardianAPI().isDuplicatedEmailOrPhoneNumber(verifyType: "CMMDUP002",verifyData: fullNumber) { data in
            ...
        }
            onFailed: { errCode, errMsg in
        ...
        }
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call to check registered information uniqueness is successful and there is no duplicate value, the `rtCode` will be `0` and if not, the `rtCode` will be `2019`.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If API call fails, the user will receive an `errorCode`.

---

## GCCS Registration
Use `requestMemberRegister()` from `GuardianService` to call the API that can handle GCCS registration request.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|User ID/Key|
|name|String|Name|
|phoneNum|String|Phone number|
|email|String|Email|

The value must be in `Dictionary<KeyType, ValueType>` type.

### Example
```java
// GCCS 가입
public func requestMemberRegister(memberObject : Dictionary<String, Any>, onSuccess: @escaping(RtCode, String, Dictionary<String, String>)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
    ...
     if (rtCode == RtCode.AUTH_SUCCESS.rawValue){
                onSuccess(RtCode.AUTH_SUCCESS, rtMsg, data)
            } else {
                self.onCallbackFailed(rtCode: RtCode(rawValue: rtCode)!, onFailed: onFailed)
            }
        } errorCallBack: { (errorCode, errorMsg) in
            onFailed(RtCode.API_ERROR, errorMsg)
        }
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|Result code|
|rtMsg|String|Result message|

When the API call for biometric authentication is successful, the `rtCode` will be `0`   
The user registration and integration is complete then.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|Error code|

If API call fails, the user will receive an `errorCode`