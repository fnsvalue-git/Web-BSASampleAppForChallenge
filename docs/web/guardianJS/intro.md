---
sidebar_position: 1
---
# GuardianJS

GuardianCCS를 사용하여 인증을 하기 위한 GuardianJS 에 대한 설명입니다.
GuardianJS 는 web에서 쉽게 인증 기능과 연동기능을 사용하기 위해 만들어진 script 기반 library 입니다.

## 1. GuardianJS 시작하기
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/guardian.js"></script>
```

### 1.1 특정 버전 사용하기

특정 버전을 사용할 경우 GuardianJS URL에 VERSION을 기입합니다.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/{VERSION}/guardian.js"></script>
```

- {VERSION} : LoginComponent 의 버전을 설정합니다.
  > 예) `src="https://developers.fnsvalue.co.kr/guardian-js/1.0.5/guardian.js`

## 2. 제공 기능
GuardianJS 에서 제공하는 method

|Name|Description|
|---|---|
|constructor| GuardianJS 사용하기 위한 생성자입니다.|
|requestAuth| GuardianCCS 인증 요청을 진행하며, 인증 성공 후 설정 URL 로 redirect 합니다. |
|requestAuthCallback| GuardianCCS 인증 요청을 진행하며, 인증 성공 후 설정 CallBack을 호출합니다. |
|onCancel| GuardianCCS 인증 요청을 취소합니다. |
|setAuthTimer| 남은 인증 시간을 제공합니다. |
|setAuthMessage| 인증 메시지를 제공합니다. |
|requestQr| GuardianCCS QR 인증 요청을 진행하며, 인증 성공 후 설정 URL 로 redirect 합니다. |
|requestQrCallback| GuardianCCS QR 인증 요청을 진행하며, 인증 성공 후 설정 CallBack을 호출합니다. |
|onQrCancel| GuardianCCS QR 인증 요청을 취소합니다. |
|setQrTimer| 남은 QR 인증 시간을 제공합니다. |
|setQrMessage| QR 인증 메시지를 제공합니다. |


## 3. 기능 설명 및 예시

## 3.1 constructor
GuardianJS 를 사용하기 위한 생성자이며, `필수 요소` 입니다.
GuardianJS 를 사용하기 위해 clientKey가 필요합니다.
GuardianJS 에서 사용하는 clientKey 는 GuardianCCS 관리자에게 문의 또는 GuardianCCS Portal에서 확인 할 수 있습니다.


```
constructor(clientKey)
```

#### Parameters : 
 - clientKey : GuardianCCS 를 사용하는 Client의 key

#### Code Example
```javascript
const gccs = new Guardian("1daec78593a643e6b53ce9803ded5916");
```

---

### 3.2 requestAuth
인증 요청을 합니다.
인증에 성공하였을 경우 설정한 링크로 이동합니다.
설정한 링크에서 사용자 정보를 확인 한 후 사이트 로그인 처리를 합니다.

```
requestAuth(userKey, successCallLink, errCallback)
```

#### Parameters : 
 - userKey : GuardianCCS 사용자 계정
 - successCallLink : 인증 성공 후 redirect 할 경로
 - errCallback : error 발생 시 실행할 콜백 함수 
   > `errCallback(rtCode, rtMsg);`  
   > - rtCode : 에러 코드  
   > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.requestAuth(userKey, "https://www.fnsvalue.co.kr", onError);
```

---

### 3.3 requestAuthCallback
인증 요청을 합니다.
인증에 성공하였을 경우 설정한 콜백 함수를 실행합니다.
설정한 콜백 함수에서 사용자 토큰을 확인한 후 사이트 로그인 처리를 합니다.

```
requestAuthCallback(userKey, successCallback, errCallback)
```

#### Parameters : 
 - userKey : GuardianCCS 사용자 계정
 - successCallback : 인증 성공 후 실행할 콜백 함수
   > `successCallback(token);`
   > - token : 사용자 토큰
 - errCallback : error 발생 시 실행할 콜백 함수
   > `errCallback(rtCode, rtMsg);`
   > - rtCode : 에러 코드
   > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.requestAuthCallback(userKey, onSuccess, onError);
```

---

### 3.4 onCancel
인증 취소 요청을 합니다.

```
onCancel(userKey, errCallback)
```

#### Parameters : 
 - userKey : GuardianCCS 사용자 계정
 - errCallback : error 발생 시 전달 받을 콜백 함수
   > `errCallback(rtCode, rtMsg);`
   > - rtCode : 에러 코드
   > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.onCancel(userKey, onError);
```

---

### 3.5 setAuthTimer
인증에 남은 시간을 제공합니다.
CallBack method를 등록하여 처리합니다.

```
setAuthTimer(onCallBack)
```

#### Parameters : 
 - onCallBack : event 발생시 실행하는 콜백 함수
   > `onCallBack(time);`
   > - time : 인증 시간

#### Code Example
```javascript
gccs.setAuthTimer(onTimer);
```

---

### 3.6 setAuthMessage
CallBack method에 인증 상태 메시지를 전달합니다.

```
setAuthMessage(onCallBack)
```

#### Parameters : 
 - onCallBack : 이벤트를 처리할 수 있는 콜백 함수
   > `onCallBack(message);`
   > - message : 인증 메시지

#### Code Example
```javascript
gccs.setAuthMessage(onMessage);
```

### 3.7 requestQr
QR 인증 요청을 한다.
QR 인증에 성공하였을 경우 설정한 링크로 이동합니다.
설정한 링크에서 사용자 정보를 확인 한 후 사이트 로그인 처리를 합니다.

```
requestQr(qrCanvas, successCallLink, errCallback)
```

#### Parameters :
- qrCanvas : GuardianCCS QR을 생성할 `<canvas/>` element
- successCallLink : 인증 성공 후 redirect 할 경로
- errCallback : error 발생 시 실행할 콜백 함수
  > `errCallback(rtCode, rtMsg);`
  > - rtCode : 에러 코드
  > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.requestQr(qrCanvas, "https://www.fnsvalue.co.kr", onError);
```

---

### 3.8 requestQrCallback
인증 요청을 합니다.
인증에 성공하였을 경우 설정한 콜백 함수를 실행합니다.
설정한 콜백 함수에서 사용자 토큰을 확인한 후 사이트 로그인 처리를 합니다.

```
requestQrCallback(qrCanvas, successCallback, errCallback)
```

#### Parameters :
- qrCanvas : GuardianCCS QR을 생성할 `<canvas/>` element
- successCallback : 인증 성공 후 실행할 콜백 함수
  > `successCallback(token);`
  > - token : 사용자 토큰
- errCallback : error 발생 시 실행할 콜백 함수
  > `errCallback(rtCode, rtMsg);`
  > - rtCode : 에러 코드
  > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.requestQrCallback(qrCanvas, onSuccess, onError);
```

---

### 3.9 onQrCancel
인증 취소 요청을 합니다.

```
onQrCancel(qrCanvas, errCallback)
```

#### Parameters :
- qrCanvas : GuardianCCS QR이 생성되어 있는 `<canvas/>` element
- errCallback : error 발생 시 전달 받을 콜백 함수
  > `errCallback(rtCode, rtMsg);`
  > - rtCode : 에러 코드
  > - rtMsg : 에러 메세지

#### Code Example
```javascript
gccs.onQrCancel(qrCanvas, onError);
```

---

### 3.10 setQrTimer
QR 인증에 남은 시간을 제공합니다.
CallBack method를 등록하여 처리합니다.

```
setQrTimer(onCallBack)
```

#### Parameters :
- onCallBack : event 발생시 실행하는 콜백 함수
  > `onCallBack(time);`
  > - time : 인증 시간

#### Code Example
```javascript
gccs.setQrTimer(onTimer);
```

---

### 3.11 setQrMessage
CallBack method에 QR 인증 상태 메시지를 전달합니다.

```
setQrMessage(onCallBack)
```

#### Parameters :
- onCallBack : 이벤트를 처리할 수 있는 콜백 함수
  > `onCallBack(message);`
  > - message : 인증 메시지

#### Code Example
```javascript
gccs.setQrMessage(onMessage);
```