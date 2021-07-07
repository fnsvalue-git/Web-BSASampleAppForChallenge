---
sidebar_position: 1
---
# GCCS 인증

## Android
이 문서는 Guardian SDK for Android 에서 GCCS 인증 기능 구현 방법을 안내합니다.

<br/>

## 기능 설명
GCCS 인증 기능은 별도의 패스워드 없이 가입 된 GCCS 회원 검증을 위한 인증 기능을 제공하며, 
인증 요청부터 노드 검증 등 정상적으로 회원 검증 및 인증 완료 시 토큰을 제공합니다. 토큰은 인증 이력 조회 등 API 기능에 활용 시 사용됩니다.

## 인증 요청
GCCS 인증 요청을 합니다. `GuardianSdk` 의 `requestAuth()` 로 API를 요청합니다.   
GCCS 에 가입 된 기기만 요청이 가능합니다.
### Parameter
- none
### Example
```java
// 인증 요청
GuardianSdk.getInstance().requestAuth(new GuardianResponseCallback<AuthRequestResponse>() {
    @Override
    public void onSuccess(AuthRequestResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### AuthRequestResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
인증 요청 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

인증 요청 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 시작
인증 요청이 완료 된 후 인증 시작을 요청합니다. `GuardianSdk` 의 `startAuth()` 로 API를 호출합니다.   
인증 요청 상태를 확인할 수 있습니다.
### Parameter
- none
### Example
```java
// 인증 시작
GuardianSdk.getInstance().startAuth(new GuardianAuthResponseCallback<AuthStartResponse>() {
    @Override
    public void onSuccess(AuthStartResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
        Log.i(TAG, "추가 인증 타입 : " + result.data.authType);
    }

    @Override
    public void onProcess(AuthProcessResponse process) {
        Log.i(TAG, "인증상태 : " + process.status);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### AuthProcessResponse
|Key|Value|Description|
|------|---|---|
|status|String|인증 진행 상태|
인증 시작 호출 후 GCCS 인증 진행 상태 값을 확인할 수 있습니다.   
상태 값에 대한 설명은 다음과 같습니다.
- CreateChannel : 채널 생성
- SelectNodes : 노드 선정
- StartVerificationOfNodes : 노드 검증 시작
- CompleteVerificationOfNodes : 노드 검증 완료

### AuthStartResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|authType|Int|2차 인증 타입|

인증 시작 호출 성공 시 `rtCode` 로 `0`이 수신 되며,   
사용자가 설정한 추가 인증 타입 값을 확인 합니다.   
인증 타입 값에 따라 추가 인증 진행 여부를 확인합니다.
- 작성 중.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

인증 시작 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode)** 를 참조 바랍니다.

## 인증 완료
인증 완료를 호출합니다. `GuardianSdk` 의 `completeAuth()` 로 API를 호출합니다.   
추가 인증을 진행 후 인증 완료를 요청하며, 추가 인증이 없는 경우에도 요청이 필요합니다.
### Parameter
|Key|Value|Description|
|------|---|---|
|isAuth|Boolean|추가 인증이 없는 경우 또는 성공 한 경우 true, 추가 인증에 실패한 경우 false|
### Example
```java
// 인증 완료
GuardianSdk.getInstance().completeAuth(true, new GuardianResponseCallback<AuthCompleteResponse>() {
    @Override
    public void onSuccess(AuthCompleteResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthCompleteResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

인증 완료 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

인증 완료 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 결과
인증 결과를 호출합니다. `GuardianSdk` 의 `resultAuth()` 로 API를 호출합니다.
요청 성공 시 토큰을 받습니다.
### Parameter
- none
### Example
```java
// 인증 결과
GuardianSdk.getInstance().resultAuth(new GuardianResponseCallback<AuthResultResponse>() {
    @Override
    public void onSuccess(AuthResultResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
        Log.i(TAG, "토큰 : " + result.data);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthResultResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|data|String|토큰|

인증 결과 호출 성공 시 `rtCode` 로 `0`이 수신 되며, 토큰 값을 받을 수 있습니다.
토큰은 인증 이력 조회 등 API 호출 시 사용 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

인증 결과 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 취소
인증 취소를 호출합니다. `GuardianSdk` 의 `cancelAuth()` 로 API를 호출합니다.
잘못 된 인증 요청이나 진행 중일 때 취소를 위해 사용합니다.
### Parameter
- none
### Example
```java
// 인증 취소
GuardianSdk.getInstance().cancelAuth(new GuardianResponseCallback<AuthCancelResponse>() {
    @Override
    public void onSuccess(AuthCancelResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthCancelResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

인증 취소 호출 성공 시 `rtCode` 로 `0`이 수신 되며, 진행 중인 인증이 취소 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

인증 취소 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode)** 를 참조 바랍니다.

---

















