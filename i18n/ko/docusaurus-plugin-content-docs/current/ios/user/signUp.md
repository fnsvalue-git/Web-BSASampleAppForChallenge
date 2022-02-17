---
sidebar_position: 2
---
# 회원가입 및 연동

## Overview
iOS SDK의 회원 가입 및 연동 방법을 안내합니다.

<br/>

## 기능 설명
회원정보를 이용하여 GCCS에 가입 및 연동 기능을 제공합니다.

## 가입 정보 중복 체크
GCCS 가입을 진행하기 전 중복되는 사용자 정보가 존재하는지 확인합니다. `GuardianAPI` 의 `isDuplicatedEmailOrPhoneNumber()` 로 API를 요청합니다.
`verifyType`에 따라 기존에 가입된 회원정보가 있는지 이메일 또는 SMS 검증을 통해 확인이 가능합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType` 에 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|

### Example
```java
// 가입 정보 중복 체크
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
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

가입 정보 중복을 체크하는 API를 호출하여 중복되는 정보가 없을 경우에는 `rtCode`로 `0`이 수신되며,   
중복되는 정보가 있을 경우에는 `rtCode`로 `2019`가 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

가입 정보 중복을 체크하는 API 호출 실패 시 `errorCode` 가 수신됩니다.

---

## GCCS 가입
GCCS 가입을 진행하기 위해 `GuardianService` 의 `requestMemberRegister()` 로 API를 요청합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|유저 아이디|
|name|String|이름|
|phoneNum|String|핸드폰번호|
|email|String|이메일|

값은 `Dictionary<KeyType, ValueType>` 형태로 전달해야 합니다.

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
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

GCCS 가입 API 호출 성공 시 `rtCode`로 `0`이 수신되며, 회원가입이 완료됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

GCCS 가입 API 호출 실패 시 `errorCode` 가 수신됩니다.