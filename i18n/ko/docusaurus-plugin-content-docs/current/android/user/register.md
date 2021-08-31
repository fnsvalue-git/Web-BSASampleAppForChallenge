---
sidebar_position: 2
---
# 회원가입 및 연동

## Android
이 문서는 Guardian SDK for Android 에서 회원 가입 및 연동 방법을 안내합니다.

<br/>

## 기능 설명
회원 가입 및 연동은 회원정보를 이용하여 GCCS 에 가입 및 연동 기능을 제공합니다.

## 가입 정보 중복 체크
GCCS 가입 전 사용자 정보에 중복이 있는 확인합니다. `GuardianSdk` 의 `hasRegisterDuplicateValue()` 로 API를 요청합니다.
`verifyType` 에 따라 기존 가입된 회원정보가 있는지 확인합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|verifyType|String|- CMMDUP001 : 이메일<br/> - CMMDUP002 : SMS|
|verifyData|String|`verifyType` 따라<br/>- CMMDUP001 인 경우 이메일, <br/>- CMMDUP002 인 경우 핸드폰번호|

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
가입 정보 중복 체크 호출 성공 후 요청 정보가 중복이 되지 않은 경우 `rtCode` 로 `0`이 반환되며,   
중복이 된 경우 `rtCode` 로 `2019` 가 반환됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

가입 정보 중복 체크 호출 실패 시 `errorCode` 가 수신되며, 에러코드는 다음과 같습니다.

---

## GCCS 가입
GCCS 가입 요청을 합니다. `GuardianSdk` 의 `registerClientUser()` 로 API를 요청합니다.   
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
params.put("phoneNum", "작성중");
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
GCCS 가입 호출 성공 시 `rtCode` 로 `0`이 수신 되며, 회원가입 및 연동이 완료됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

GCCS 가입 호출 실패 시 `errorCode` 가 수신되며, 에러코드는 다음과 같습니다.

## 회원 비활성화
GCCS 회원 비활성화를 요청합니다. `GuardianSdk` 의 `unRegisterClientUser()` 로 API를 요청합니다.   
회원 비활성화가 되면 GCCS 인증을 사용할 수 없으며 회원 체크 및 조회 시에도 비활성화 디바이스로 조회됩니다.  
활성화 시에는 **[회원 재등록](http://localhost:3000/docs/user/reregister)** 를 사용하여 활성화 할 수 있습니다.
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
회원 비활성화 호출 성공 시 `rtCode` 로 `0`이 수신 되며, 가입 된 회원이 비활성화됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|0|에러코드|

GCCS 가입 호출 실패 시 `errorCode` 가 수신되며, 에러코드는 다음과 같습니다.

