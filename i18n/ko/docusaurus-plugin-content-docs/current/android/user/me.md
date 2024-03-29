---
sidebar_position: 2
---
# 회원 여부 및 상태 조회

## Overview
Android SDK의 회원 여부 및 상태 조회 방법을 안내합니다.

<br/>

## 회원 상태 조회
가입된 회원의 상태를 조회합니다. `GuardianSdk`의 `me()`로 API를 요청합니다.   
우선적으로 회원 여부를 확인할 수 있으며, 탈퇴 및 일시정지와 같은 회원 상태를 포함하여 종합적으로 조회합니다.

### Parameter
- none

### Example
```java
// 회원 상태 조회
GuardianSdk.getInstance().me(new GuardianResponseCallback<MeResponse>() {
    @Override
    public void onSuccess(MeResponse result) {
        ...
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
|data|map|사용자 아이디<br/>. 이름<br/>. 이메일<br/>. 핸드폰번호<br/>. 추가인증타입<br/>. 마지막 업데이트 일자|

정상으로 가입된 회원인 경우 `rtCode`로 `0`이 수신되며, `data` 값으로 회원 정보가 반환됩니다.   
이 밖에 회원 상태를 표현하는 결과코드는 다음과 같습니다.

### ResultCode
|Result Code|Description|Solution|
|------|---|---|
|2007 or 2008|가입되지 않은 회원이거나 기기가 변경 된 경우|가입이 되지 않은 경우 가입을 진행, 기기 변경의 경우 기기 재등록을 진행합니다.|
|5005|승인되지 않은 사용자|승인되지 않은 사용자로 관리자에게 문의바랍니다.|
|5006|일시 정지된 사용자|일시 정지된 사용자로 관리자에게 문의바랍니다.|
|5007|영구 정지된 사용자|영구 정지된 사용자로 관리자에게 문의바랍니다.|
|5008|탈퇴 사용자|탈퇴한 사용자로 일정 기간 내에 계정 복구 기능을 통해 복구가 가능합니다.|

### ErrorResult

|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

회원 상태 조회 API 호출 실패 시 `errorCode`가 수신됩니다.
