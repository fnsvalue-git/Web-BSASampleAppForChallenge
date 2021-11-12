---
sidebar_label: Outline
sidebar_position: 1
---
# Guardian-JS

Introducing the Guardian-JS, a JavaScript library built for an easy authentication on the web.


## Load Guardian-JS 

Latest version of `Guardian-JS` is now available.

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

## Methods provided
Below are the methods provided by the Guardian-JS

|Name|Description|
|---|---|
|constructor|Constructor of the Guardian-JS|
|requestAuth|Handles the Guardian CCS authentication request, and redirect to the setup URL after authentication|
|requestAuthCallback|Handles the Guardian CCS authentication request, and returns the result to the setup callback function after authentication|
|onCancel|Cancels the Guardian CCS authentication request|
|setAuthTimer| Provides remaining time for authentication|
|setAuthMessage| Provides authentication process message|
|requestQr|Handles the Guardian CCS QR authentication request, and redirect to the setup URL after authentication|
|requestQrCallback| Handles the Guardian CCS QR authentication request, and returns the result to the setup callback function after authentication|
|onQrCancel| Cancels the Guardian CCS QR authentication request|
|setQrTimer| Provides remaining time for QR authentication|
|setQrMessage| Provides QR authentication process message|
|requestOtp| Handles the Guardian CCS OTP authentication request, and redirect to the setup URL after authentication|
|requestOtpCallback| Handles the Guardian CCS OTP authentication request, and returns the result to the setup callback function after authentication|
|onOtpCancel| Cancels the Guardian CCS OTP authentication request|
|setOtpTimer| Provides remaining time for OTP authentication|
|setOtpMessage| Provides OTP authentication process message|
|requestTotpCallback| Handles the Guardian CCS TOTP authentication request, and returns the result to the setup callback function after authentication|

## Function Description and Example

### Constructor
A constructor is an `essential element` for the Guardian-JS. 
The client key which is necessary to utilize the Guardian-JS, can be confirmed by inquiring the person in charge or directly at the Guardian CCS Portal.


```
constructor(clientKey)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|clientKey|String|Client key generated to utilize the Guardian CCS|

#### Example
```javascript
const gccs = new Guardian("{Client Key}");
```