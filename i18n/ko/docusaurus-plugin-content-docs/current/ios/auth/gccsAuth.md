---
sidebar_position: 1
---
# GCCS 인증

## iOS
iOS SDK의 GCCS 인증 기능 구현 방법을 안내합니다.

<br/>

## 기능 설명
GCCS 회원 검증을 위한 인증 기능을 별도의 패스워드 없이 활용할 수 있습니다. 
인증 요청부터 노드 검증 등의 과정을 거쳐 정상적으로 회원임을 검증되면 토큰을 제공합니다. 해당 토큰은 인증 이력 조회 등 API 기능에 활용됩니다.

## 인증 요청
GCCS 인증 요청을 합니다. `GuardianService` 의 `requestAuthRequest()`로 API를 요청합니다.   
GCCS에 가입된 기기만 요청이 가능합니다.

### Parameter
- none

### Example
```swift
    // 인증 요청
    public func requestAuthRequest(onSuccess: @escaping(RtCode, String, Int, String, String, String)-> Void, onProcess: @escaping(String) -> Void,  onFailed: @escaping(RtCode, String)-> Void) {
        ...
         self.callHttpMethod(params: params, api: apiUrl, method: .post) { (data: JSON) in
            let rtCode = data["rtCode"].intValue
            let rtMsg = data["rtMsg"].string ?? ""
            if (rtCode == RtCode.AUTH_SUCCESS.rawValue){
                    guard let authData = data["data"] as? JSON else {
                        onFailed(RtCode.API_ERROR, rtMsg)
                        return
                    }
            } errorCallBack: { (errorCode, errorMsg) in
            print("onFailed(RtCode.API_ERROR, errorMsg)")
            onFailed(RtCode.API_ERROR, errorMsg)
            }
        } 
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
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.
---

## 인증 시작
인증 요청이 완료된 후 인증 시작을 요청합니다. `GuardianService`의 `requestAuthRequest`로 API를 호출합니다.   
인증 요청 상태를 확인할 수 있습니다.

### Parameter
- none

### Example
```swift
    public func requestAuthRequest(onSuccess: @escaping(RtCode, String, Int, String, String, String)-> Void, onProcess: @escaping(String) -> Void,  onFailed: @escaping(RtCode, String)-> Void) {
        ...
        StompSocketService.sharedInstance.connect(dataMap: socketDataMap, connectCallback: {(isConnect: Bool) -> Void in
            ...
                switch status! {
                case AuthStatus.COMPLETE_VERIFICATION_OF_NODES.rawValue:
                    self._authRequestSuccess(RtCode.AUTH_SUCCESS, status!, self.authType, self.connectIp, self.userKey, self.clientKey)
                    break
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

인증 시작 API 호출 실패 시 에러코드가 수신 됩니다.   
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

## 인증 완료
`GuardianSdk` 의 `requestAuthResult()`로 API를 호출합니다.   
추가 인증을 진행한 다음 인증 완료를 요청합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|isSecondaryCertification|Boolean|추가 인증에 성공 한 경우 true, 실패한 경우 false|

### Example
```swift
    // 인증 완료
    public func requestAuthResult(isSecondaryCertification : Bool, onSuccess: @escaping(RtCode, String)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
            var params = Dictionary<String, Any>()
            
            let commonParam = self.getCommonParam()
            for key in commonParam.keys {
                params[key] = commonParam[key]
            }
                ...
            if (rtCode == RtCode.AUTH_SUCCESS.rawValue){
                onSuccess(RtCode.AUTH_SUCCESS, rtMsg)
            } else {
                self.onCallbackFailed(rtCode: RtCode(rawValue: rtCode)!, onFailed: onFailed)
            }
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

인증 완료 API 호출 실패 시 에러코드가 수신 됩니다.  
에러 코드에 대한 정보는 **[에러 코드](https://developers.fnsvalue.co.kr/docs/auth/errorcode)** 를 참조 바랍니다.

---

## 인증 결과
`GuardianSdk` 의 `getAuthResultToken()`로 API를 호출합니다.   
요청 성공 시 토큰을 받습니다.

### Parameter
- none

### Example
```swift
  // 인증 결과
  public func getAuthResultToken(onSuccess: @escaping(RtCode, [String:Any])-> Void, onFailed: @escaping(RtCode, String)-> Void){
        var params = Dictionary<String,String>()
        params["deviceId"] = getUUid()
        params["clientKey"] = self.clientKey
        params["channelKey"] = self.channelKey
        
        self.callHttpMethod(params: params, api: apiUrl) { (data: JSON) in
            var resultData = [String:Any]()
            resultData["data"] = data["data"].string ?? ""
            onSuccess(RtCode.AUTH_SUCCESS, resultData)
        } errorCallBack: { (errorCode, errorMsg) in
            onFailed(RtCode.API_ERROR, errorMsg)
        }
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
```swift
    // 인증 취소
    public func requestAuthCancel(onSuccess: @escaping(RtCode, String)-> Void, onFailed: @escaping(RtCode, String)-> Void) {
       
        var params = getCommonParam()
        params["deviceId"] = getUUid()
        ...
        self.callHttpMethod(params: params, api: apiUrl, method: .delete) { (data: JSON) in
            let rtCode = data["rtCode"].intValue
            let rtMsg = data["rtMsg"].string ?? ""
            
            if (rtCode == RtCode.AUTH_SUCCESS.rawValue) {
                onSuccess(RtCode.AUTH_SUCCESS, rtMsg)
            } else {
                self.onCallbackFailed(rtCode: RtCode(rawValue: rtCode)!, onFailed: onFailed)
            }
            
        } errorCallBack: { (errorCode, errorMsg) in
            onFailed(RtCode.API_ERROR, errorMsg)
        }
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