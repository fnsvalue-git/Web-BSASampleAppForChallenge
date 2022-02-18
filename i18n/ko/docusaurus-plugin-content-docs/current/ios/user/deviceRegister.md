---
sidebar_position: 3
---
# 기기 재등록

## Overview
iOS SDK의 GCCS 기기 재등록 방법을 안내합니다.

<br/>

## 기능 설명
기존에 GCCS를 사용중이던 사용자의 모바일 기기가 변경된 경우 회원정보 검증 후 재등록하여   
기존과 동일하게 GCCS 인증을 사용할 수 있도록 기기 재등록 기능을 제공합니다.   
회원 여부를 먼저 확인한 뒤 이메일 또는 SMS로 OTP 코드를 발송하여 회원 검증 후 재등록을 진행합니다.

## 사용자 체크 및 OTP 발송
사용자 체크 및 OTP 발송을 요청 합니다. `GuardianSdk`의 `sendOTPInRegisterDevice()`로 API를 호출합니다.   
입력한 사용자 정보가 맞는 경우 이메일 또는 SMS로 OTP 코드가 전송됩니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|유저 아이디|
|name|String|이름|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType`에 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|
|clientKey|String|클라이언트 키|

값은 `Dictionary<KeyType, ValueType>` 형태로 전달해야 합니다.

### Example
```java
// 사용자 체크 및 OTP 발송
GuardianAPI.sharedInstance.sendOTPInRegisterDevice(userKey: userKey,
                                                    name: name,
                                                    verifyType: verifyType,
                                                    verifyData: verifyData) { rtCode, response in
    ...
    } onFailed: { error in
    ...
    }
```
### SendOTPInRegisterDevice
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|seq|Int|seq|

사용자 체크 및 OTP 발송 API 호출 성공 시 `rtCode` 로 `0`이 수신됩니다.  
`seq` 값은 `verifyOTPByEmail()`와 `verifyOTPBySms()`로 검증 시 사용됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

사용자 체크 및 OTP 발송 API 호출 실패 시 `errorCode`가 수신됩니다.

---

## OTP 검증
OTP 코드 검증을 요청합니다. `GuardianSdk` 의 `sendOTPInRegisterDevice()`로 OTP 코드 전송 API를 요청합니다.   
그 다음 `verifyOTPByEmail()`와 `verifyOTPBySms()`를 통해 사용자가 입력한 OTP를 검증합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|clientKey|String|클라이언트 키|
|email, phoneNum|String|`verifyType`에 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|
|authNum|String|이메일 또는 SMS로 수신된 OTP 코드 (6자리)|
|seq|String|`sendOTPInRegisterDevice()` 결과 값 seq|

값은 `Dictionary<KeyType, ValueType>` 형태로 전달해야 합니다.

### Example
```java
// OTP 검증
GuardianAPI().verifyOTPByEmail(email: params["email"] as! String,
                            authNum: otpNumber) { rtCode, result, data  in
    ...              
    } onFailed: { error, errorMsg in
    ...
    }
```
### VerifyOtpByEmail, VerifyOtpBySms
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|data|String|재등록 OTP 검증 토큰|

OTP 코드 검증 API 호출 성공 시 `rtCode`로 `0`이 수신 됩니다.  
`data`의 토큰 값은 `requestReMemberRegister()`로 기기 재등록 시 사용됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

OTP 코드 검증 API 호출 실패 시 `errorCode`가 수신됩니다.

---

## 기기 재등록
`GuardianSdk`의 `requestReMemberRegister()`로 기기 재등록 API를 요청합니다.   
`VerifyOtpByEmail()`와 `VerifyOtpBySms()`를 통해 검증된 토큰 값이 필요하며, 재등록 절차가 완료되면 기존과 동일하게 GCCS 인증을 사용할 수 있습니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|disposeToken|String|`VerifyOtpByEmail()`와 `VerifyOtpBySms()`에서 받은 결과 값 토큰|
|result|Bool|OTP 인증 성공 여부 값|

값은 `Dictionary<KeyType, ValueType>` 형태로 전달해야 합니다.

### Example
```java
// 기기 재등록
GuardianService.sharedInstance.requestReMemberRegister(memberObject: self.params) { rtCode, rtMsg, data in
    ...
    } onFailed: { error, errMsg in
    ...
    }
```
### ReRegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

기기 재등록 API 호출 성공 시 `rtCode`로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

기기 재등록 API 호출 실패 시 `errorCode`가 수신됩니다.

---
