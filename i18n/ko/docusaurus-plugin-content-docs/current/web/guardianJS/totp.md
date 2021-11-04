---
sidebar_label: TOTP 인증
sidebar_position: 5
---

# TOTP 인증
이 문서는 Guardian-JS 에서 TOTP 인증을 사용하기 위한 방법을 안내합니다.  
TOTP 인증은 사용자 디바이스의 데이터 통신 상태가 원활하지 않을 경우 사용하는 인증 방법입니다.

## 기능 설명
아이디와 totp code를 이용한 인증 방법을 설명합니다.  
`Guardian-CCS` 앱에서 메인화면 => `TOTP 인증` 을 선택하여 totp code를 생성 후  
아이디와 totp code를 입력하여 인증을 진행합니다.

## TOTP 인증 요청
TOTP 인증을 요청합니다.
사용자가 totp code를 입력하면 `requestOtpCallback()` 으로 API를 호출합니다.
API를 통해 인증 성공 시 onSuccess 통해 결과가 반환됩니다.

```
requestTotpCallback(userKey, otpCode, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|GuardianCCS 사용자 계정|
|otpCode|String|사용자가 입력한 TOTP CODE|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestTotpCallback(userKey, otpCode, (data) => {
  console.log('onSuccess');
  console.log('data : ', data);
}, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onSuccess
|Key|Type|Description|
|------|---|---|
|data|String|token|

인증이 성공 하면 `토큰`이 반환 되며, 토큰은 GCCS 기능 활용 시 사용 됩니다.

### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMsg|String|에러 메시지|

인증 실패 시 에러코드와 에러메시지가 반환됩니다.
반환 될 수 있는 에러코드는 다음과 같습니다.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|클라이언트 키가 잘못 된 경우|발급 받은 클라이언트 키를 확인합니다.|
|2008|가입 되어 있지 않은 사용자 인 경우|GCCS 가입 여부를 확인바랍니다.|
|3005|TOTP CODE 검증에 실패할 경우|TOTP CODE 재 검증 요청 바랍니다.|
|3201|클라이언트 연동이 되어 있지 않은 경우|GCCS 가입 완료 후 메뉴 => 사이트 연동을 통해 연동을 진행해주시기 바립니다.|
|3301|클라이언트 로그인 타입이 정해져 있지 않은 경우|클라이언트 설정 오류인 경우로 관리자에게 문의바랍니다.|
|5001|인증 시간이 만료 된 경우|인증 시간이 만료 된 경우로 인증 재 요청이 필요합니다.|
|5005|승인 되지 않은 사용자|승인 되지 않은 사용자로 관리자에게 문의바랍니다.|
|5006|일시 정지 된 사용자|일시 정지 된 사용자로 관리자에게 문의바랍니다.|
|5007|영구 정지 된 사용자|영구 정지 된 사용자로 관리자에게 문의바랍니다.|
|5008|탈퇴 사용자|탈퇴 된 사용자로 일정 기간 내에 계정 복구 기능을 통해 복구가 가능합니다.|
|2010|인증이 진행 중인 사용자 인 경우|인증이 진행 중인 사용자로 상황에 따라 인증취소 후 재 인증 요청 바랍니다. |
|5011|인증이 취소 된 경우|재 인증 요청 바랍니다.|
|5015|채널 생성 실패|파라미터가 부족한 경우 발생할 수 있습니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|
|5017|푸시 알림 전송 실패|FCM 등에 문제가 발생한 경우입니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|
|5022|검증이 실패 한 경우|노드 검증이 실패 한 경우 발생 할 수 있습니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|
|5026|일일 TOTP 인증 횟수를 초과한 사용자|TOTP 인증 외의 방법으로 재 인증 요청 바랍니다.|