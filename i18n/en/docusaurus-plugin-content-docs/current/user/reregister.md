---
sidebar_position: 3
---
# 기기 재등록

## Android
이 문서는 Guardian SDK for Android 에서 GCCS 기기 재등록 방법을 안내합니다.

<br/>

## 기능 설명
기기 재등록은 기존에 GCCS 를 사용 중인 사용자에 기기가 변경 된 경우 회원정보 검증 및 재등록하여   
기존과 동일한 GCCS 인증을 사용하도록 기능을 제공합니다.   
회원정보 체크 및 이메일 또는 핸드폰 번호로 OTP 발송하여 회원 검증 후 재등록을 진행합니다.

## 사용자 체크 및 OTP 발송
사용자 체크 및 OTP 발송을 요청 합니다. `GuardianSdk` 의 `verityUserToOtp()` 로 API를 요청합니다.   
입력한 사용자 정보가 맞는 경우 이메일 또는 SMS 로 OTP 코드가 전송 됩니다.
### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|유저 아이디|
|name|String|이름|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType` 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|
값은 `Map<String, Object>` 형태로 전달해야 합니다.

### Example
```java
// 사용자 체크 및 OTP 발송
Map<String, Object> params = new HashMap<>();
params.put("userKey", "fnstest");
params.put("name", "test");
params.put("verifyType", "CMMDUP001");
params.put("verifyData", "fnstest@fnsvalue.co.kr");

GuardianSdk.getInstance().verityUserToOtp(params, new GuardianResponseCallback<VerityUserToOtpResponse>() {
    @Override
    public void onSuccess(VerityUserToOtpResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
        Log.i(TAG, "seq : " + result.data.seq);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### VerityUserToOtpResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|seq|Int|seq|
사용자 체크 및 OTP 발송 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.  
`seq` 값은 `verityOtp()` 로 검증 시 사용됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

---

## OTP 검증
OTP 코드 검증을 요청 합니다. `GuardianSdk` 의 `verityOtp()` 로 API를 요청합니다.   
`verityUserToOtp()` 사용하여 발송한 OTP 를 검증합니다.
### Parameter
|Key|Value|Description|
|------|---|---|
|authNum|String|이메일 또는 SMS 로 수신 된 OTP 코드 (6자리)|
|name|String|`verityUserToOtp()` 결과 값 seq|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType` 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|
값은 `Map<String, Object>` 형태로 전달해야 합니다.

### Example
```java
// OTP 검증
Map<String, Object> params = new HashMap<>();
params.put("authNum", "567232");
params.put("seq", 3);
params.put("verifyType", "CMMDUP001");
params.put("verifyData", "fnstest@fnsvalue.co.kr");

GuardianSdk.getInstance().verityOtp(params, new GuardianResponseCallback<VerityOtpResponse>() {
    @Override
    public void onSuccess(VerityOtpResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
        Log.i(TAG, "data token : " + result.data);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### VerityOtpResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|data|String|재등록 OTP 검증 토큰|
사용자 체크 및 OTP 발송 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.  
`data` 에 토큰 값은  `reRegisterClientUser()` 로 기기 재등록 시 사용됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|
---

## 기기 재등록
기기 재등록을 요청 합니다. `GuardianSdk` 의 `reRegisterClientUser()` 로 API를 요청합니다.   
`verityOtp()` 검증 한 토큰 값이 필요하며, 재 등록 완료 시 기존과 동일하게 GCCS 인증을 사용할 수 있습니다.
### Parameter
|Key|Value|Description|
|------|---|---|
|disposeToken|String|`verityOtp()` 에서 결과 값 토큰|
|otpType|String|`verityUserToOtp()` 호출 시 검증 타입<br/>- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
값은 `Map<String, Object>` 형태로 전달해야 합니다.

### Example
```java
// OTP 검증
Map<String, Object> params = new HashMap<>();
params.put("disposeToken", "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyS2V5Ijoid2Fyc2hpcCIsImNsaWVudFNlcSI6MiwiY2xpZW50S2V5IjoidGVzdF9jbGllbnQiLCJ1c2VyVHlwZSI6IkNNTU1DTDAwMSIsImV4cCI6MzQ4Njk1MjgwOH0.jgsqNOJUoGm2BkphMyXqpS9PGud96HIPlade_SJ8GInVKSKbnE303KTLm-AUkA5g");
params.put("otpType", "CMMDUP001");

GuardianSdk.getInstance().reRegisterClientUser(params, new GuardianResponseCallback<ReRegisterClientUserResponse>() {
    @Override
    public void onSuccess(ReRegisterClientUserResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
}

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### ReRegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
사용자 체크 및 OTP 발송 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|
---



