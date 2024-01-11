---
sidebar_label: Outline
sidebar_position: 1
---
# BSA-JS

Introducing the BSA, a JavaScript library built for an easy authentication on the web.


## Load BSA-JS 

Latest version of `BSA-JS` is now available.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/guardian.js"></script>
```


### Specify the version

If necessary, specify the version on the `BSA-JS` URL as below.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/{VERSION}/guardian.js"></script>
```
 - Example
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/1.0.7/guardian.js"></script>
```

## Methods provided
Below are the methods provided by the BSA-JS

|Name| Description                                                                                                                 |
|---|-----------------------------------------------------------------------------------------------------------------------------|
|constructor| Constructor of the BSA-JS                                                                                                   |
|requestAuth| Handles the BSA authentication request, and redirect to the setup URL after authentication                                  |
|requestAuthCallback| Handles the BSA authentication request, and returns the result to the setup callback function after authentication      |
|onCancel| Cancels the BSA authentication request                                                                                      |
|setAuthTimer| Provides remaining time for authentication                                                                                  |
|setAuthMessage| Provides authentication process message                                                                                     |
|requestQr| Handles the BSA QR authentication request, and redirect to the setup URL after authentication                               |
|requestQrCallback| Handles the BSA QR authentication request, and returns the result to the setup callback function after authentication   |
|onQrCancel| Cancels the BSA QR authentication request                                                                               |
|setQrTimer| Provides remaining time for QR authentication                                                                               |
|setQrMessage| Provides QR authentication process message                                                                                  |
|requestOtp| Handles the BSA OTP authentication request, and redirect to the setup URL after authentication                          |
|requestOtpCallback| Handles the BSA OTP authentication request, and returns the result to the setup callback function after authentication  |
|onOtpCancel| Cancels the BSA OTP authentication request                                                                              |
|setOtpTimer| Provides remaining time for OTP authentication                                                                              |
|setOtpMessage| Provides OTP authentication process message                                                                                 |
|requestTotpCallback| Handles the BSA TOTP authentication request, and returns the result to the setup callback function after authentication |

## Function Description and Example

### Constructor
A constructor is an `essential element` for the BSA-JS. 
The client key which is necessary to utilize the BSA-JS, can be confirmed by inquiring the person in charge or directly at the BSA Portal.


```
constructor(clientKey)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|clientKey|String|Client key generated to utilize the BSA|

#### Example
```javascript
const gccs = new Guardian("{Client Key}");
```