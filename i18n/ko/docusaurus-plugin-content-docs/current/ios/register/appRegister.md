---
sidebar_position: 1
---
# 애플리케이션 등록

## Overview
iOS SDK를 사용하기 위해서는 애플리케이션 등록 요청 및 클라이언트 키 발급이 필요합니다.   
이와 관련하여 자세한 사항은 FNSVALUE 개발팀에게 문의 바랍니다.

<br/>

## 발급 요청
발급 요청을 위해 필요한 최소한의 정보는 다음과 같습니다.

- 회사명
- iOS
  - Bundle ID
  ****
<pre>
모바일이 아닌 타 플랫폼 (Web, Window ...)에서 인증을 할 경우
Firebase Cloud Messaging(FCM) 등록 요청이 필요합니다.
</pre>

## 클라이언트 키 발급
요청 완료 후 정상적으로 발급 된 클라이언트 키는 다음의 예시와 같습니다.
``` json
{
    "clientKey" : "ea3aca8g59354cff908tu7fae6849d06"
}
```