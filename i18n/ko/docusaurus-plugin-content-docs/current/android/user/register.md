---
sidebar_position: 2
---
# 회원가입 및 연동

## Overview
Android SDK의 회원 가입 및 연동 방법을 안내합니다.

<br/>

## 기능 설명
회원정보를 이용하여 GCCS에 가입 및 연동 기능을 제공합니다.

## 가입 정보 중복 체크
GCCS 가입을 진행하기 전 중복되는 사용자 정보가 존재하는지 확인합니다. `GuardianSdk` 의 `hasRegisterDuplicateValue()` 로 API를 요청합니다.
`verifyType`에 따라 기존에 가입된 회원정보가 있는지 이메일 또는 SMS 검증을 통해 확인이 가능합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType` 에 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|

### Example
```java
// 가입 정보 중복 체크
GuardianSdk.getInstance().hasRegisterDuplicateValue("CMMDUP001", "fnstest@fnsvalue.co.kr", new GuardianResponseCallback<RegisterDuplicateValueResponse>() {
    @Override
    public void onSuccess(RegisterDuplicateValueResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
    }
});
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
GCCS 가입을 진행하기 위해 `GuardianSdk` 의 `registerClientUser()` 로 API를 요청합니다.   
사용자 정보와 연동할 외부 사이트 아이디 (accountId) 로 회원가입을 진행합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|userKey|String|유저 아이디|
|name|String|이름|
|phoneNum|String|핸드폰번호|
|email|String|이메일|
|accountId|String|연결 사이트 아이디

값은 `Map<String, Object>` 형태로 전달해야 합니다.

### Example
```java
// GCCS 가입
Map<String, Object> params = new HashMap<>();
params.put("userKey", "test123");
params.put("name", "jhkim");
params.put("email", "fnstest@fnsvalue.co.kr");
params.put("phoneNum", "010-1234-5678");
params.put("accountId", "jhkim");

GuardianSdk.getInstance().registerClientUser(params, new GuardianResponseCallback<RegisterClientUserResponse>() {
    @Override
    public void onSuccess(RegisterClientUserResponse result) {

    }

    @Override
    public void onFailed(ErrorResult errorResult) {

    }
});
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

GCCS 가입 API 호출 성공 시 `rtCode`로 `0`이 수신되며, 회원가입 및 연동이 완료됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

GCCS 가입 API 호출 실패 시 `errorCode` 가 수신됩니다.

## 회원 비활성화
GCCS 회원 비활성화를 원할 경우 `GuardianSdk`의 `unRegisterClientUser()`로 API를 요청합니다.   
회원 비활성화가 되면 GCCS 인증을 사용할 수 없으며, 회원 여부 및 상태 조회 시에도 비활성화 디바이스로 조회됩니다.  
다시 활성화가 필요한 경우 **[기기 재등록](https://developers.fnsvalue.co.kr/docs/android/user/reregister)** 을 통해 활성화할 수 있습니다.

### Parameter
- none

### Example
```java
// 회원 비활성화
GuardianSdk.getInstance().unRegisterClientUser(new GuardianResponseCallback<UnRegisterClientUserResponse>() {
    @Override
    public void onSuccess(UnRegisterClientUserResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
    }
});
```
### RegisterClientUserResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
회원 비활성화 API 호출 성공 시 `rtCode`로 `0`이 수신되며, 해당 회원이 비활성화됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

회원 비활성화 API 호출 실패 시 `errorCode` 가 수신됩니다.
