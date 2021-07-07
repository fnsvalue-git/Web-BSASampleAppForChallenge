---
sidebar_position: 2
---
# 생체 인증

## Android
이 문서는 Guardian SDK for Android 에서 인증 인증 기능 구현 방법을 안내합니다.

<br/>

## 기능 설명
생체 인증은 GCCS 인증 후 추가 인증 수단으로 사용됩니다.  
사용자가 등록 한 Android 디바이스에 있는 생체 정보를 사용하며, 생체 정보가 등록 되지 않은 경우 사용자가 등록한 패턴 또는 비밀번호를 사용하여 생체 인증을 진행합니다.

```
디바이스가 Android 6.0 (Marshmallow) 이하 인 경우 생체 인증이 지원되지 않습니다. 
패턴 혹은 비밀번호로 기능이 제공됩니다.
```

```
해당 기능은 Android 에서 제공한 BiometricPrompt 사용하여 개발 되었습니다.
Guardian for Android SDK 를 사용 하는 앱이 이미 사용 중인 경우 앱에서 사용 중인
Biometric 을 사용할 수 있습니다.
```

## 생체 정보 등록
생체 정보를 등록합니다. `GuardianSdk` 의 `registerBiometric()` 로 API를 호출합니다.   
생체 인증을 사용하기 위해선 등록이 필요합니다.
### Parameter
- FragmentActivity : `AppCompatActivity` 를 사용하는 경우 `this` 를 넘겨주시면 됩니다.
### Example
```java
// 생체 정보 등록
GuardianSdk.getInstance().registerBiometric(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, result.rtCode); // 결과 코드
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

생체 정보 등록 호출 성공 시 `rtCode` 로 `0`이 수신 되며,   
생체 인증 정보가 등록 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

생체 정보 등록 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.

---

## 생체 인증
생체 인증을 호출합니다. `GuardianSdk` 의 `authenticateBiometric()` 로 API를 호출합니다.   
사용자 디비아스에 등록 된 지문 또는 얼굴 등록 정보로 인증을 사용합니다.  
사용자가 생체 정보를 사용하지 않는 경우 등록 된 패턴 또는 비밀번로를 사용하여 인증합니다.
### Parameter
- FragmentActivity : `AppCompatActivity` 를 사용하는 경우 `this` 를 넘겨주시면 됩니다.
### Example
```java
// 생체 인증
GuardianSdk.getInstance().authenticateBiometric(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

생체 인증 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

생체 인증 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.
- 작성 중
---

## 생체 정보 변경 확인
생체 인증에 정보 변경을 확인합니다. `GuardianSdk` 의 `hasNewBiometricEnrolled()` 로 API를 호출합니다.  
사용자가 디바이스에서 생체 정보를 변경하거나 추가로 등록한 경우 생체 정보 변경을 확인합니다.
### Parameter
- none
### Example
```java
// 생체 정보 변경 확인
GuardianSdk.getInstance().hasNewBiometricEnrolled(new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode); // 9000 or 9006
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|9000|결과코드|
|rtMsg|String|결과 메시지|

생체 정보 변경 확인 호출 성공 후 생체 정보가 변경 되지 않은 경우 `rtCode` 로 `9000`이 수신 됩니다.
생체 정보가 변경 된 경우 `rtCode` 로 `9006` 이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

생체 정보 변경 확인 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.

---

## 생체 정보 초기화
생체 정보를 초기화합니다. `GuardianSdk` 의 `resetBiometricChange()` 로 API를 호출합니다.  
생체 정보가 변경 된 경우 해당 메소드로 초기화를 진행하며, 초기화 시 생체 인증이 진행 된 후 생체 인증이 성공한 경우 초기화가 됩니다.
### Parameter
- FragmentActivity : `AppCompatActivity` 를 사용하는 경우 `this` 를 넘겨주시면 됩니다.
### Example
```java
// 생체 정보 초기화
GuardianSdk.getInstance().resetBiometricChange(this, new GuardianResponseCallback<AuthBiometricResponse>() {
    @Override
    public void onSuccess(AuthBiometricResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode); // 결과 코드
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

생체 정보 초기화 호출 성공 시 `rtCode` 로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

생체 정보 초기화 호출 실패 시 에러코드가 수신 됩니다. 에러 코드에 대한 정보는 **[에러 코드](http://localhost:3000/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.

---






















