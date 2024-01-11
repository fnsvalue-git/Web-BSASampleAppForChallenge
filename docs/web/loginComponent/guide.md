---
sidebar_label: Guide for development
sidebar_position: 1
---
# Login-Component
This document describes how to utilize the Login-Component.

## Get Started
The latest version of `Login-Component` is now available.

```html
<head>
  <meta name="guardian-ccs-client_key" content="{CLIENT_KEY}">
  <script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/guardian.js"></script>
</head>
<body>
<button class="guardian_btn"></button>
</body>
```

### Specify the version

If necessary, specify the version on the `Login-Component` URL as below.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/{VERSION}/guardian.js"></script>
```

 - Example
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/login-component/1.0.2/guardian.js"></script>
```

## Functions provided
It is a description of how to get the authentication result(token) from the Login-Component.   
`Reserved function declaration` and `Callback function setup` are two ways to get the result after the authentication is successfully done. Please refer to the following for more detailed information. 

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

###  Specific Function Declaration
To get the authentication result, add `onGuardianSuccess` function on the script.   
If successful, authentication result and the token will be given through `onGuardianSuccess` so that the token can be used for BSA functions.
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
|token|String|Token|

### Callback Function Declaration

#### Constructor
A constructor to add the callback function in the Login-Component.

```
constructor()
```

#### Example
```javascript
const gccs = new Guardian();
```

---

#### Callback Function Setup
Set callback function to get the authentication result.   
After the authentication is complete, the token will be returned and used for BSA functions.


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
|token|String|Token|