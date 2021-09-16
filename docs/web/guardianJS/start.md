---
sidebar_label: 시작하기
sidebar_position: 1
---
# Guardian-JS

GuardianCCS를 사용하여 인증을 하기 위한 GuardianJS 에 대한 설명입니다.   
GuardianJS 는 web에서 쉽게 인증 기능을 구현하기 위해 만들어진 script 기반 library 입니다.

## Guardian-JS 시작하기

최신 버전에 `Guardian-JS` 에 사용할 수 있습니다.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/guardian.js"></script>
```

### 특정 버전 사용하기

특정 버전을 사용할 경우 `Guardian-JS` URL 에 VERSION 을 기입합니다.

```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/{VERSION}/guardian.js"></script>
```
 - Example
```html
<script type="text/javascript" src="https://developers.fnsvalue.co.kr/guardian-js/1.0.5/guardian.js"></script>
```

## 지원기능
Guardian-JS 에서 제공하는 method

|Name|Description|
|---|---|
|constructor| Guardian-JS 생성자입니다.|
|requestAuth| GuardianCCS 인증 요청을 진행하며, 인증 성공 후 설정 URL 로 redirect 합니다. |
|requestAuthCallback| GuardianCCS 인증 요청을 진행하며, 인증 성공 후 설정 CallBack 으로 결과를 리턴합니다. |
|onCancel| GuardianCCS 인증 요청을 취소합니다. |
|setAuthTimer| 남은 인증 시간을 제공합니다. |
|setAuthMessage| 인증 진행 메시지를 제공합니다. |
|requestQr| GuardianCCS QR 인증 요청을 진행하며, 인증 성공 후 설정 URL 로 redirect 합니다. |
|requestQrCallback| GuardianCCS QR 인증 요청을 진행하며, 인증 성공 후 설정 CallBack 으로 결과를 리턴합니다. |
|onQrCancel| GuardianCCS QR 인증 요청을 취소합니다. |
|setQrTimer| 남은 QR 인증 시간을 제공합니다. |
|setQrMessage| QR 인증 메시지를 제공합니다. |

## 기능 설명 및 예시

### constructor
Guardian-JS 를 사용하기 위한 생성자이며, `필수 요소` 입니다.
Guardian-JS 를 사용하기 위해 clientKey가 필요합니다.   
Guardian-JS 에서 사용하는 clientKey 는 GuardianCCS 관리자에게 문의 또는 GuardianCCS Portal 에서 확인 할 수 있습니다.


```
constructor(clientKey)
```

#### Parameter
|Name|Type|Description|
|---|---|---|
|clientKey|String|GuardianCCS 를 사용하는 Client Key|

#### Code Example
```javascript
const gccs = new Guardian("{Client Key}");
```