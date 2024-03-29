---
sidebar_position: 4
---
# 에러 코드

## 설명
GCCS 회원 관리 구현 중 발생할 수 있는 에러를 설명합니다.

<br/>

### 회원 관리 관련 에러
|Error Code|Description|Solution|
|------|---|---|
|2000|클라이언트 키가 잘못된 경우|발급 받은 클라이언트 키를 확인합니다. <br/> SDK 초기화 시 클라이언트 키를 사용했는지 확인바랍니다.|
|2002|필수 파라미터가 존재하지 않는 경우|SDK 호출 시 파라미터를 확인바랍니다.|
|2008|가입되어 있지 않은 사용자인 경우|GCCS 가입 여부를 확인바랍니다. <br/> 가입 여부는 `GuardianSdk`의 `me()`로 확인할 수 있습니다. |
|3202|클라이언트 아이디가 중복된 경우|이미 사용 중인 외부 사이트(클라이언트) 사용자입니다. 다른 아이디를 사용하거나 재등록하여 사용할 수 있습니다.|
|5005|승인되지 않은 사용자|승인되지 않은 사용자로 관리자에게 문의바랍니다.|
|5006|일시 정지된 사용자|일시 정지된 사용자로 관리자에게 문의바랍니다.|
|5007|영구 정지된 사용자|영구 정지된 사용자로 관리자에게 문의바랍니다.|
|5008|탈퇴 사용자|탈퇴한 사용자로 일정 기간 내에 계정 복구 기능을 통해 복구가 가능합니다.|
---

<br/>

### 기타 에러
|Error Code|Description|Solution|
|------|---|---|
|10002|SDK에서 에러가 발생|SDK 내에서 Exception이 발생, 관리자에게 문의바랍니다.|
|10003|서버에서 에러가 발생|API 서버에서 Exception이 발생, 관리자에게 문의바랍니다.|
|10004|서버 접속 에러|서버와 연결이 되지 않습니다. <br/>인터넷 연결 확인 및 초기화 시 사용한 서버주소를 확인바랍니다.|

















