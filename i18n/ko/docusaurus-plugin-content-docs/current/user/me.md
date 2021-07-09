---
sidebar_position: 2
---
# 회원 여부 및 상태 조회

## Android
이 문서는 Guardian SDK for Android 에서 회원 여부 및 상태 조회 방법을 안내합니다.

<br/>

## 회원 상태 조회
사용자에 상태를 조회합니다. `GuardianSdk` 의 `me()` 로 API를 요청합니다.   
등록 된 회원 여부, 탈퇴, 일시정지 등 상태 등 사용자 상태를 조회합니다.
### Parameter
- none

### Example
```java
// 회원 상태 조회
GuardianSdk.getInstance().me(new GuardianResponseCallback<MeResponse>() {
    @Override
    public void onSuccess(MeResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
        Log.i(TAG, "회원 아이디 : " + result.data.userKey);
        Log.i(TAG, "회원 이름 : " + result.data.name);
        Log.i(TAG, "회원 이메일 : " + result.data.email);
        Log.i(TAG, "회원 핸드폰 번호 : " + result.data.phoneNum);
        Log.i(TAG, "회원 추가 인증 타입 : " + result.data.authType);
        Log.i(TAG, "회원 마지막 업데이트 일자 : " + result.data.uptDt);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
        Log.e(TAG, "에러코드 : " + errorResult.getErrorMessage());
    }
});
```
### MeResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|data|map|. 사용자 아이디<br/>. 이름<br/>. 이메일<br/>. 핸드폰번호<br/>. 추가인증타입<br/>. 마지막 업데이트 일자|

정상으로 가입 된 회읜 인 경우 `rtCode` 로 `0`이 반환되며, `data` 에 회원 정보가 반환됩니다.   
회원이 없거나 탈퇴 등에 결과코드는 다음과 같습니다.

### ResultCode
|Result Code|Description|Solution|
|------|---|---|
|2007 or 2008|가입되지 않은 회원이거나 기기가 변경 된 경우|가입이 되지 않은 경우 가입을 진행, 기기 변경 된 재등록을 진행합니다.|
|5005|승인 되지 않은 사용자|승인 되지 않은 사용자로 관리자에게 문의바랍니다.|
|5006|일시 정지 된 사용자|일시 정지 된 사용자로 관리자에게 문의바랍니다.|
|5007|영구 정지 된 사용자|영구 정지 된 사용자로 관리자에게 문의바랍니다.|
|5008|탈퇴 사용자|탈퇴 된 사용자로 일정 기간 내에 계정 복구 기능을 통해 복구가 가능합니다.|

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|ErrorMessage|String|에러메시지|

회원 상태 조회 호출 실패 시 `errorCode` 가 수신되며, 에러코드는 다음과 같습니다
