---
sidebar_label: LoginComponent
sidebar_position: 1
---
# LoginComponent

GuardianCCS를 사용하여 인증을 하기 위한 LoginComponent 에 대한 설명입니다.
LoginComponent 는 web에서 쉽게 인증 기능과 연동기능을 사용하기 위해 만들어진 script 기반 component library 입니다.


## 1. LoginComponent 시작하기
```html
<head>
  <meta name="guardian-ccs-client_key" content="{CLIENT_KEY}">
  <script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/guardian.js"></script>
</head>
<body>
<button class="guardian_btn"></button>
</body>
```

- {CLIENT_KEY} : GuardianCCS 를 사용하는 Client의 key를 설정합니다.
  > LoginComponent 에서 사용하는 clientKey 는 GuardianCCS 관리자에게 문의 또는 GuardianCCS Portal에서 확인 할 수 있습니다.

### 1.1 특정 버전 사용하기

특정 버전을 사용할 경우 LoginComponent URL에 VERSION을 기입합니다.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/{VERSION}/guardian.js"></script>
``` 

- {VERSION} : LoginComponent 의 버전을 설정합니다.
  > 예) `src="https://developers.fnsvalue.co.kr/login-component/1.0.0/guardian.js`

## 2. 제공 기능

### 2.1 LoginComponent 에서 기본으로 제공하는 method

자세한 내용은 [3. 기본 기능 설명 및 예시](#3-기본-기능-설명-및-예시)에서 확인 할 수 있습니다.

|Name|Description|
|---|---|
|onGuardianSuccess| GuardianCCS 인증 성공 시 CallBack하는 method입니다. |

### 2.2 LoginComponent 에서 콜백 등록 용도로 제공하는 method

자세한 내용은 [4. 콜백 등록 기능 설명 및 예시](#4-콜백-등록-기능-설명-및-예시)에서 확인 할 수 있습니다.

|Name|Description|
|---|---|
|constructor| LoginComponent에 콜백 함수를 등록 하기 위한 생성자입니다. |
|setSuccessCallback| GuardianCCS 인증 성공 시 CallBack을 호출합니다. |


## 3. 기본 기능 설명 및 예시

### 3.1 onGuardianSuccess
인증에 성공하였을 경우 해당 콜백 함수를 호출합니다.
해당 함수에서 사용자 토큰을 확인한 후 사이트 로그인 처리를 합니다.
```
onGuardianSuccess(token)
```

#### Code Example
```javascript
function onGuardianSuccess(token) {
  // ... code ...
}
```

#### Parameters :
- token : 사용자 토큰


## 4. 콜백 등록 기능 설명 및 예시

### 4.1 constructor
LoginComponent 에 콜백 함수를 등록 하기 위한 생성자입니다.

```
constructor()
```

#### Code Example
```javascript
const gccs = new Guardian();
```

---

### 4.2 setSuccessCallback
인증에 성공하였을 경우 설정한 콜백 함수를 실행합니다.
설정한 콜백 함수에서 사용자 토큰을 확인한 후 사이트 로그인 처리를 합니다.

```
setSuccessCallback(successCallback)
```

#### Parameters :
- successCallback : 인증 성공 후 실행할 콜백 함수
  > `successCallback(token);`
  > - token : 사용자 토큰

#### Code Example
```javascript
gccs.setSuccessCallback(onSuccess);
```