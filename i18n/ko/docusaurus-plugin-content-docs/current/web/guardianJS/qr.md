---
sidebar_label: QR 인증
sidebar_position: 3
---

# QR 인증
이 문서는 Guardian-JS 에서 QR 인증을 사용하기 위한 방법을 안내합니다.   

## 기능 설명
아이디를 입력하지 않고 모바일을 이용한 QR 인증 구현 방법을 설명합니다.   
`guardian.js` 로 구현한 QR 코드 생성 후    
`Guardian-CCS` 앱에서 메인화면 => `QR 인증` 을 선택하여 QR 스캐너를 활성화 하여 QR 코드를 스캔합니다.

## QR 인증 요청
QR 인증을 요청합니다. `requestQrCallback()` 으로 API를 호출합니다.   
QR 인증을 요청하면 `Guardian-JS`로 설정한 `<canvas />` 태그에 QR 코드가 생성 되며, 앱을 통해 QR 코드를 스캔하여 인증 성공 시 `onSuccess` 통해 결과가 반환됩니다.

```
requestQrCallback(qrCanvas, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|qrCanvas|Element|GuardianCCS QR을 생성할 `<canvas/>` element|

### Example
```html
<div>
  <canvas />
</div>
```
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestQrCallback(qrCanvas, (data) => {
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
|3201|클라이언트 연동이 되어 있지 않은 경우|GCCS 가입 완료 후 메뉴 => 사이트 연동을 통해 연동을 진행해주시기 바립니다.|
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
|5023|QR ID 불일치|인증 시간이 만료 되었을 시 발생되며 재 인증 요청이 필요합니다|
|5024|QR URL CLIENT 불일치|타 앱으로 QR 스캔시 발생되며 Guardian-CCS 앱으로 QR 코드 스캔 확인합니다.|

---

## QR 인증 취소
QR 인증 취소를 요청합니다. 인증 취소를 한 경우 진행 중인 인증이 취소되며  
다시 재인증을 요청할 수 있습니다.  

인증 취소 요청 성공 시 [인증 요청의 onError](#onerror)에 `5011` errorCode가 반환됩니다.


```
onQrCancel(qrCanvas, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|qrCanvas|Element|GuardianCCS QR을 생성할 `<canvas/>` element|

### Example
```html
<div>
  <canvas />
</div>
```
```javascript
const gccs = new Guardian("{Client Key}");
gccs.onQrCancel(qrCanvas, (errorCode, errorMsg) => {
    console.log('onError');
    console.log('errorCode : ', errorCode);
    console.log('errorCode : ', errorMsg);
});
```

### onError
|Key|Type|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMsg|String|에러 메시지|

인증 취소 요청 실패 시 에러코드와 에러메시지가 반환됩니다.
반환 될 수 있는 에러코드는 다음과 같습니다.

|ErrorCode|Description|Solution|
|------|---|---|
|3100|가입 된 유저가 아닌 경우|요청한 유저키를 확인바랍니다.|
|5019|진행 중인 인증이 없는 경우|이미 취소 된 인증이거나 해당 유저로 진행 중인 인증이 없습니다.|

---

## QR 인증 타이머 등록
QR 인증 유효시간을 확인할 수 있는 Callback 을 등록합니다.   
인증에 남은 시간을 확인할 수 있으며 유효 시간이 끝난 후에는 재 인증을 요청해야 합니다.

```
setQrTimer(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setQrTimer((time) => {
  console.log('onTime');
  console.log('time : ' + time);
});
```
### onTime
|Key|Value|Description|
|------|---|---|
|time|Int|인증 유효 시간|

인증 유효 시간이 callback 으로 반환됩니다.

---

## QR 인증 상태 등록
QR 인증 상태 확인할 수 있는 Callback 을 등록합니다.   
인증 요청 부터 완료 까지에 인증 상태를 확인할 수 있습니다.

```
setQrMessage(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setQrMessage((message) => {
  console.log('onMessage');
  console.log('AuthStatus : ' + message);
});
```
### onMessage
|Key|Value|Description|
|------|---|---|
|message|String|인증 진행 상태|

인증 진행 상태가 callback 으로 반환됩니다.