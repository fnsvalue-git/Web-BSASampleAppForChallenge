---
sidebar_position: 2
---
# 생체 인증

## iOS
iOS SDK의 인증 기능 구현 방법을 안내합니다.

<br/>

## 기능 설명
GCCS 인증 후 추가 인증 수단으로 생체 인증을 활용합니다.  
사용자가 iOS 디바이스에 등록한 생체 정보를 사용하며, 생체 정보가 없는 경우 사용자가 등록한 패턴 또는 비밀번호를 사용하여 생체 인증을 진행합니다.

```
디바이스의 iOS 버전이 iOS 13.0 이상일 경우 원활한 사용이 가능합니다. 
해당 기능은 iOS에서 제공한 LAContext 클래스를 활용하여 개발 되었습니다.
```

## 생체 정보 등록
생체 인증을 사용하기 위해서는 우선적으로 생체 정보 등록이 필요합니다.
생체 정보를 등록하기 위해 `BiometricService`의 ` registerBiometric()`로 API를 호출합니다.   

### Parameter
- none

### Example
```swift
// 생체 정보 등록
   public func registerBiometric(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
        let initCode = initBiometric()
        if(initCode != .AUTH_SUCCESS) {
            onFailed(initCode, getLocalizationMessage(rtCode : initCode))
        } else {
            try {
                ...
                onSuccess(RtCode.AUTH_SUCCESS, "", self.getBiometricTypeList())
                }catch {
                onFailed(RtCode.BIOMETRIC_ERROR, "")
            }
        }
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|biometricType|Array|인증타입|

생체 정보 등록 API 호출 성공 시 `rtCode` 로 `0`이 수신 되며, 생체 인증 정보가 등록 됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

생체 정보 등록 API 호출 실패 시 에러코드가 수신 됩니다.   
에러 코드에 대한 정보는 **[에러 코드](http://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 생체 인증
생체 인증을 위해 `iOS Sdk` 의 `authenticate()`로 API를 호출합니다.   
사용자 디바이스에 등록된 지문 또는 얼굴 정보로 인증합니다.  
만약 생체 정보를 사용하지 않는 경우 등록된 패턴 또는 비밀번호를 사용하여 인증합니다.

### Parameter
- msg : `String`형태의 `msg`를 파라미터로 넘겨줍니다.

### Example
```swift
    // 생체 인증
    public func authenticate(msg: String, onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, onFailed: @escaping(RtCode, String?)-> Void) {
        let context = LAContext()
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: nil){
            if let domainState = context.evaluatedPolicyDomainState {
            ...
                if success {
                    DispatchQueue.main.async {
                        onSuccess(RtCode.AUTH_SUCCESS, "", self.getBiometricTypeList())
                    }
                } else {
                    DispatchQueue.main.async {
                        onFailed(RtCode.BIOMETRIC_AUTH_FAILED, message)
                    }
                }
            }
        }
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|
|biometricType|Array|인증타입|

생체 인증 API 호출 성공 시 `rtCode`로 `0`이 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

생체 인증 API 호출 실패 시 에러코드가 수신됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.

---

## 생체 정보 변경 확인
생체 인증 정보의 변경 유무를 확인합니다. `BiometricService`의 `hasNewBiometricEnrolled()`로 API를 호출합니다.  
사용자가 디바이스에 등록한 생체 정보를 변경하거나 추가로 등록한 경우, 생체 정보 변경을 확인합니다.

### Parameter
- none

### Example
```swift
    // 생체 정보 변경 확인
    public func hasNewBiometricEnrolled(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
        let context = LAContext()
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: nil){
            if let domainState = context.evaluatedPolicyDomainState {
                ...
                if(strData != cData) {
                    onSuccess(RtCode.BIOMETRIC_CHANGE_ENROLLED, self.getLocalizationMessage(rtCode : RtCode.BIOMETRIC_CHANGE_ENROLLED), self.getBiometricTypeList())
                } else {
                    onSuccess(RtCode.BIOMETRIC_NORMAL, self.getLocalizationMessage(rtCode : RtCode.BIOMETRIC_NORMAL), self.getBiometricTypeList())
                }
            }
        }
    }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|9000|결과코드|
|rtMsg|String|결과 메시지|
|biometricType|Array|인증타입|

생체 정보 변경 확인 API 호출이 성공적으로 된 다음, 만약 해당 생체 정보가 변경 되지 않은 경우 `rtCode` 로 `9000`이 수신됩니다.
생체 정보가 변경된 경우에는 `rtCode` 로 `9006`이 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

생체 정보 변경 확인 API 호출 실패 시 에러코드가 수신됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode#생체-인증-관련-에러)** 를 참조 바랍니다.

---

## 생체 정보 초기화
`BiometricService`의 `initBiometric()`로 API를 호출하여 만약 생체 정보가 변경된 경우 `resetBiometric()`로 초기화를 진행합니다.    
기존의 생체 정보로 먼저 생체 인증이 성공한 경우에만 생체 정보 초기화가 가능합니다.

### Parameter
- none

### Example
```swift
    // 생체 정보 초기화
    public func resetBiometric(onSuccess: @escaping(RtCode, String, Array<[String:String]>)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
        let context = LAContext()
        DispatchQueue.main.async {
            if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: nil) {
                if let domainState = context.evaluatedPolicyDomainState {
                    ...
                        onSuccess(RtCode.AUTH_SUCCESS, "", self.getBiometricTypeList())
                    }
                }
            }
        }
```

### AuthBiometricResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

생체 정보 초기화 API 호출 성공 시 `rtCode` 로 `0`이 수신됩니다.