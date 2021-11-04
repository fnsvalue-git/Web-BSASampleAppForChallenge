---
sidebar_label: Outline
sidebar_position: 1
---
# Guardian-JS

Introducing the Guardian-JS used for Guardian CCS Authentication.   
Guardian-JS is a JavaScript library built for easy authentication on the web.

## Load Guardian-JS 

Latest version of `Guardian-JS` is available.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/guardian.js"></script>
```

### Specify the version

If necessary, specify the version on the `Guardian-JS` URL as below.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/{VERSION}/guardian.js"></script>
```
 - Example
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/1.0.7/guardian.js"></script>
```

## Functions provided
Below are the methods provided by the Guardian-JS

|Name|Description|
|---|---|
|constructor|Constructor of the Guardian-JS|
|requestAuth|Handles the Guardian CCS Authentication request, and redirect to the setup URL after authenticated|
|requestAuthCallback|Handles the Guardian CCS Authentication request, and returns the result to the setup CallBack function after authenticated|
|onCancel|Cancel the Guardian CCS Authentication request |
|setAuthTimer| Provides remaining time for authentication |
|setAuthMessage| Provides authentication process message |
|requestQr|Handles the Guardian CCS QR Authentication request, and redirect to the setup URL after authenticated|
|requestQrCallback| Handles the Guardian CCS QR Authentication request, and returns the result to the setup CallBack function after authenticated|
|onQrCancel| Cancel the Guardian CCS QR Authentication request |
|setQrTimer| Provides remaining time for QR Authentication |
|setQrMessage| Provides QR authentication process message |
|requestOtp| GuardianCCS OTP 인증 요청을 진행하며, 인증 성공 후 URL 로 redirect 합니다. |
|requestOtpCallback| GuardianCCS OTP 인증 요청을 진행하며, 인증 성공 후 설정 CallBack 으로 결과를 리턴합니다. |
|onOtpCancel| GuardianCCS OTP 인증 요청을 취소합니다. |
|setOtpTimer| 남은 OTP 인증 시간을 제공합니다. |
|setOtpMessage| OTP 인증 메시지를 제공합니다. |
|requestTotpCallback| GuardianCCS TOTP 인증 요청을 진행하며, 인증 성공 후 설정 CallBack 으로 결과를 리턴합니다. |

## Function Description and Example

### Constructor
A constructor is an `essential element` for the Guardian-JS. 
The client key which is necessary to utilize the Guardian-JS, can be confirmed by inquiring the Guardian CCS management team or directly at the Guardian CCS Portal.


```
constructor(clientKey)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|clientKey|String|Client Key needed to utilize the Guardian CCS|

#### Example
```javascript
const gccs = new Guardian("{Client Key}");
```