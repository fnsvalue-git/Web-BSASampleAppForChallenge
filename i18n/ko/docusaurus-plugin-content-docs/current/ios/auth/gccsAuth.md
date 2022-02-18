---
sidebar_position: 1
---
# GCCS 인증

## Overview
iOS SDK의 GCCS 인증 기능 구현 방법을 안내합니다.

<br/>

## 기능 설명
GCCS 회원 검증을 위한 인증 기능을 별도의 패스워드 없이 활용할 수 있습니다. 
인증 요청부터 노드 검증 등의 과정을 거쳐 정상적으로 회원임을 검증되면 토큰을 제공합니다. 해당 토큰은 인증 이력 조회 등 API 기능에 활용됩니다.

## 인증 요청
GCCS 인증 요청을 합니다. `GuardianSdk` 의 `requestAuthRequest()`로 API를 요청합니다.   
GCCS에 가입된 기기만 요청이 가능합니다.

### Parameter
- none

### Example
```java
// 인증 요청
GuardianService.sharedInstance.requestAuthRequest { rtCode, rtMsg, authType, connectIp, userKey, clientKey in
        ...  
    } onProcess: { status in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
```

### AuthRequestResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

인증 요청 API 호출 성공 시 `rtCode`로 `0`이 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

인증 요청 API 호출 실패 시 에러코드가 수신됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)**를 참조 바랍니다.

---

## 인증 시작
인증 요청이 완료된 후 인증 시작을 요청합니다. `GuardianSdk`의 `requestAuthRequest()`로 API를 호출합니다.   
인증 요청 상태를 함께 확인할 수 있습니다.

### Parameter
- none

### Example
```java
GuardianService.sharedInstance.requestAuthRequest { rtCode, rtMsg, authType, connectIp, userKey, clientKey in
        ...  
    } onProcess: { status in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
```

### AuthProcessResponse
|Key|Value|Description|
|------|---|---|
|status|String|인증 진행 상태|

인증 시작 API가 호출되면 그 후 GCCS 인증 진행 상태 값을 확인할 수 있습니다.   

상태 값에 대한 설명은 다음과 같습니다.

- CreateChannel : 채널 생성
- SelectNodes : 노드 선정
- StartVerificationOfNodes : 노드 검증 시작
- CompleteVerificationOfNodes : 노드 검증 완료

### AuthStartResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|authType|Int|2차 인증 타입|

인증 시작 API 호출 성공 시 `rtCode` 로 `0`이 수신되며, 사용자가 설정한 추가 인증 타입 값이 무엇인지를 확인합니다.   
인증 타입 값에 따라 어떤 방식으로 추가 인증을 할지가 달라지게 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

인증 시작 API 호출 실패 시 에러코드가 수신됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 완료
`GuardianSdk` 의 `requestAuthResult()`로 API를 호출합니다.   
추가 인증을 진행한 다음 인증 완료를 요청합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|isSecondaryCertification|Boolean|추가 인증에 성공 한 경우 true, 실패한 경우 false|

### Example
```java
// 인증 완료
GuardianService.sharedInstance.requestAuthResult(isSecondaryCertification: true) { rtCode, rtMsg in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
```

### AuthCompleteResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

인증 완료 API 호출 성공 시 `rtCode`로 `0`이 수신 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

인증 완료 API 호출 실패 시 에러코드가 수신됩니다.  
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 결과
`GuardianSdk` 의 `getAuthResultToken()`로 API를 호출합니다.   
요청 성공 시 토큰을 받습니다.

### Parameter
- none

### Example
```java
// 인증 결과
GuardianService.sharedInstance.getAuthResultToken { rtCode, result in
        ...
    } onFailed: { errCode, errMsg in
        ...
    }
```

### AuthResultResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|data|String|토큰|

인증 결과 API 호출 성공 시 `rtCode`로 `0`이 수신 되며, 토큰 값을 받을 수 있습니다.   
토큰은 인증 이력 조회 등 API 호출 시 사용 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

인증 결과 API 호출 실패 시 에러코드가 수신됩니다.    
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 취소
`GuardianSdk`의 `requestAuthCancel()`로 API를 호출합니다.   
잘못된 인증이 요청된 경우나 이미 인증이 진행중인 상황에서 취소하기 위해 사용합니다.

### Parameter
- none

### Example 
```java
// 인증 취소
GuardianService.sharedInstance.requestAuthCancel { rtCode, msg in
    ...
    } onFailed: { errCode, errMsg in
    ...
    }
```

### AuthCancelResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

인증 취소 API 호출 성공 시 `rtCode`로 `0`이 수신되며, 진행 중인 인증이 취소됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

인증 취소 API 호출 실패 시 에러코드가 수신됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---