---
sidebar_label: 개발 가이드
sidebar_position: 1
---
# Login-Component

이 문서는 login-component 에 를 사용하기 위한 방법을 안내합니다.

## 시작하기
최신 버전에 `Login-Component` 에 사용할 수 있습니다.

```html
<head>
  <meta name="guardian-ccs-client_key" content="{CLIENT_KEY}">
  <script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/guardian.js"></script>
</head>
<body>
<button class="guardian_btn"></button>
</body>
```

### 특정 버전 사용하기

특정 버전을 사용할 경우 `Login-Component` URL에 VERSION 을 기입합니다.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/{VERSION}/guardian.js"></script>
```

 - Example
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/1.0.5/guardian.js"></script>
```

## 지원 기능
Login-Component 에서 인증 결과 값(토큰) 을 받기 위한 방법을 안내합니다.   
인증에 성공 후 결과 값을 받기 위한 방법으로 `예약 함수 선언` 방식과 `callcack 등록` 방식이 있습니다.   
자세한 방법은 아래를 참조바랍니다.

<!-- 
### 예약 함수 추가

자세한 내용은 [예약 함수 추가](#예약 함수 추가)에서 확인 할 수 있습니다.

|Name|Description|
|---|---|
|onGuardianSuccess| GuardianCCS 인증 성공 시 CallBack 함수|

### Login-Component 에 callback 등록

자세한 내용은 [callback 등록](#callback 등록)에서 확인 할 수 있습니다.

|Name|Description|
|---|---|
|constructor| LoginComponent에 콜백 함수를 등록 하기 위한 생성자 |
|setSuccessCallback| GuardianCCS 인증 성공 시 CallBack을 호출 | -->

### 예약 함수 선언

인증 결과 받기 위한 script 에 `onGuardianSuccess` 함수를 추가합니다.   
인증에 성공하면 `onGuardianSuccess` 에 인증 결과 및 토큰을 받을 수 있습니다.
토큰은 GCCS 기능 활용 시 사용됩니다.
```
onGuardianSuccess(token)
```

#### Example
```javascript
function onGuardianSuccess(token) {
  console.log('token : ' + token);
}
```

#### onSuccess
|Name|Type|Description|
|---|---|---|
|token|String|token|

### callback 등록

#### constructor
LoginComponent 에 콜백 함수를 등록 하기 위한 생성자입니다.

```
constructor()
```

#### Example
```javascript
const gccs = new Guardian();
```

---

#### callback 설정
인증 결과 값을 받기 위한 콜백 함수를 등록합니다.   
인증 완료 후에는 토큰이 리턴되며 해당 토큰은 GCCS 기능에 활용됩니다.

```
setSuccessCallback(successCallback)
```

#### Example
```javascript
const gccs = new Guardian();
gccs.setSuccessCallback((token) => {
  console.log('token : ' + token);
});
```

#### onSuccess
|Name|Type|Description|
|---|---|---|
|token|String|token|