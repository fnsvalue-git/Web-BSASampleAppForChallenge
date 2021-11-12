---
sidebar_label: GCCS 인증
sidebar_position: 2
---

# GCCS 인증
이 문서는 Guardian-JS 에서 GCCS 인증을 사용하기 위한 방법을 안내합니다.

<!-- ### requestAuth
인증 요청을 합니다.
인증에 성공하였을 경우 설정한 링크로 이동합니다.
설정한 링크에서 사용자 정보를 확인 한 후 사이트 로그인 처리를 합니다.

```
requestAuth(userKey, successCallLink, errCallback)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|GuardianCCS 사용자 계정|
|redirect url|String|인증 성공 후 redirect 할 경로| 

#### Code Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestAuth('fnsvalue', 'https://www.fnsvalue.co.kr', 
(errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

--- -->

## 인증 요청
인증 요청을 합니다.
`requestAuthCallback()` 으로 API를 호출합니다.
인증을 요청하면 앱으로 푸시 알림이 전달 되며, 앱을 통해 인증 성공 시 onSuccess 통해 결과가 반환됩니다.

```
requestAuthCallback(userKey, successCallback, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|GuardianCCS 사용자 계정|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.requestAuthCallback(userKey, (data) => {
  console.log('onSuccess');
  console.log('data : ', data);
}, (errorCode, errorMsg) => {
  console.log('onError');
  console.log('errorCode : ', errorCode);
  console.log('errorCode : ', errorMsg);
});
```

### onSuccess
|Name|Type|Description|
|---|---|---|
|data|String|token|

인증이 성공하면 토큰이 반환되며, 토큰은 GCCS 기능 활용 시 사용됩니다.

### onError
|Name|Type|Description|
|---|---|---|
|errorCode|Int|에러코드|
|errorMsg|String|에러 메시지|


인증 실패 시 에러코드와 에러메시지가 반환됩니다. 
반환 될 수 있는 에러코드는 다음과 같습니다.

|ErrorCode|Description|Solution|
|------|---|---|
|2000|클라이언트 키가 잘못 된 경우|발급 받은 클라이언트 키를 확인합니다.|
|2008|가입 되어 있지 않은 사용자 인 경우|GCCS 가입 여부를 확인바랍니다.|
|3201|클라이언트 연동이 되어 있지 않은 경우|GCCS 가입 완료 후 메뉴 => 사이트 연동을 통해 연동을 진행해주시기 바립니다.|
|3301|클라이언트 로그인 타입이 정해져 있지 않은 경우|클라이언트 설정 오류인 경우로 관리자에게 문의바랍니다.|
|5001|인증 시간이 만료 된 경우|인증 시간이 만료 된 경우로 인증 재 요청이 필요합니다.|
|5005|승인 되지 않은 사용자|승인 되지 않은 사용자로 관리자에게 문의바랍니다.|
|5006|일시 정지된 사용자|일시 정지된 사용자로 관리자에게 문의바랍니다.|
|5007|영구 정지된 사용자|영구 정지된 사용자로 관리자에게 문의바랍니다.|
|5008|탈퇴 사용자|탈퇴된 사용자로 일정 기간 내에 계정 복구 기능을 통해 복구가 가능합니다.|
|2010|인증이 진행 중인 사용자인 경우|인증이 진행 중인 사용자로 상황에 따라 인증취소 후 재 인증 요청 바랍니다. |
|5011|인증이 취소 된 경우|재 인증 요청 바랍니다.|
|5015|채널 생성 실패|파라미터가 부족한 경우 발생할 수 있습니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|
|5017|푸시 알림 전송 실패|FCM 등에 문제가 발생한 경우입니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|
|5022|검증이 실패 한 경우|노드 검증이 실패 한 경우 발생 할 수 있습니다. <br/>지속적으로 발생하는 경우 문의바랍니다.|

---

## 인증 취소
인증 취소를 요청합니다. `onCancel()` 으로 API를 호출합니다.   
인증 취소를 한 경우 진행 중인 인증이 취소되며 다시 재인증을 요청할 수 있습니다.

인증 취소 요청 성공 시 [인증 요청의 onError](#onerror)에 `5011` errorCode가 반환됩니다.

```
onCancel(userKey, errCallback)
```

### Parameter
|Name|Type|Description|
|---|---|---|
|userKey|String|GuardianCCS 사용자 계정|

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.onCancel(userKey, (errorCode, errorMsg) => {
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

## 인증 타이머 등록
GCCS 인증 유효시간을 확인할 수 있는 Callback 을 등록합니다.
인증에 남은 시간을 확인할 수 있으며 유효 시간이 끝난 후에는 재 인증을 요청해야 합니다.

```
setAuthTimer(onCallBack)
```

### Parameter
 - none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setAuthTimer((time) => {
  console.log('onTime');
  console.log('time : ' + time);
});
```

### onTime
|Key|Type|Description|
|------|---|---|
|time|Int|인증 유효 시간|

인증 유효 시간이 callback 으로 반환됩니다.

---

## 인증 상태 등록
GCCS 인증 상태를 확인할 수 있는 Callback 을 등록합니다.
인증 요청 부터 완료 까지에 인증 상태를 확인할 수 있습니다.

```
setAuthMessage(onCallBack)
```

### Parameter
- none

### Example
```javascript
const gccs = new Guardian("{Client Key}");
gccs.setAuthMessage((message) => {
  console.log('onMessage');
  console.log('AuthStatus : ' + message);
});
```

### onMessage
|Key|Type|Description|
|------|---|---|
|message|String|인증 진행 상태|

인증 진행 상태가 callback 으로 반환됩니다.