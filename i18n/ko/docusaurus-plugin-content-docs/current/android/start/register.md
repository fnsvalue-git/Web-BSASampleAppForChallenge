---
sidebar_position: 1
---
# 애플리케이션 등록

## Overview
Guardian SDK 를 사용하려면 애플리케이션 등록 요청 및 클라이언트 키 발급이 필요합니다.   
이와 관련 된 사항은 FNS 관리자에게 문의 바랍니다.

## 발급 요청
발급 요청을 위한 최소 정보는 다음과 같습니다.
- 회사 이름
- Android 
  - 패키지명
    
- ios
  - 번들 ID
  
<pre>
모바일 아닌 타 플랫폼 (Web, Window ...) 에서 인증을 할 경우

Firebase Cloud Messaging(FCM) 등록 요청 필요합니다.
</pre>

## 클라이언트 키 발급
요청 완료 후 정상적으로 발급 된 클라이언트 예시는 다음과 같습니다.
``` json
{
    "clientKey" : "ea3aca8g59354cff908tu7fae6849d06"
}
```


