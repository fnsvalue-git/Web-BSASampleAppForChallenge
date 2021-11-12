---
sidebar_position: 2
---
# FCM 등록

## Overview
GCCS에서 인증 알림 기능을 사용하기 위한 방법을 설명합니다.

<br/>

## 기능 설명
모바일이 아닌 웹 또는 Window 등 다른 플랫폼에서 GCCS 인증을 요청했을 때, Android SDK를 적용한 모바일 앱에서 인증 요청 푸시 알림을 전달 받기 위해서는 FCM 등록 및 토큰 업데이트 기능이 필요합니다.

## FCM SERVER KEY 확인
인증 알림을 받기 위해서는 Firebase Cloud Messaging(FCM)에서 발급 받은 서버 키(Server key)를 클라이언트 발급 요청 때 같이 보내줘야 합니다.   

FCM SERVER KEY 확인 방법은 다음과 같습니다.   
1. [Firebase Console](https://console.firebase.google.com/) 에서 프로젝트를 새로 생성하거나 기존의 프로젝트를 불러옵니다.  
2. [프로젝트 설정] > [클라우드 메시징] 메뉴에서 서버 키(Server key)를 확인합니다.

FCM SEVER KEY 확인 후에 클라이언트 발급 요청 시 함께 요청바랍니다.

## FCM 푸시 토큰 등록
인증 알림에 사용할 FCM 푸시 토큰을 등록합니다.  
Android 디바이스에서 생성한 FCM 토큰을 `GuardianSdk` 의 `registerPushToken()`를 호출하여 등록 및 업데이트합니다.
FCM 푸시 토큰이 유효기간 만료 등으로 변경되었을 때도 `registerPushToken()`를 호출하여 업데이트가 필요합니다.

### Parameter
|Key|Value|Description|
|------|---|---|
|token|String|FCM 푸시 토큰|

### Example
```java
// FCM 푸시 토큰 등록
FirebaseInstanceId.getInstance().getInstanceId()
    .addOnSuccessListener(new OnSuccessListener<InstanceIdResult>() {
        public void onSuccess(InstanceIdResult instanceIdResult) {
            String token = instanceIdResult.getToken();
            GuardianSdk.getInstance().registerPushToken(token, new GuardianResponseCallback<TokenResponse>() {
                @Override
                public void onSuccess(TokenResponse result) {
                    Log.i(TAG, "결과코드 : " + result.rtCode);
                }
                @Override
                public void onFailed(ErrorResult errorResult) {
                    Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
                }
            });
        }
});

public class FirebasePushService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        GuardianSdk.getInstance().registerPushToken(token, new GuardianResponseCallback<TokenResponse>() {
            @Override
            public void onSuccess(TokenResponse result) {
                Log.i(TAG, "결과코드 : " + result.rtCode);
            }

            @Override
            public void onFailed(ErrorResult errorResult) {
                Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
            }
        });

    }
}

```
### TokenResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

FCM 푸시 토큰 등록 API 호출 성공 시 `rtCode` 로 `0`이 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

FCM 푸시 토큰 등록 API 호출 실패 시 `errorCode` 가 수신됩니다.

## FCM 푸시 토큰 해제
등록된 FCM 푸시 토큰을 삭제합니다.
Android 디바이스에서 생성한 FCM 토큰을 `GuardianSdk`의 `deregisterPushToken()`를 호출하여 삭제합니다.
기기 토큰을 삭제하면 인증 요청 시 알림을 받을 수 없습니다.

### Parameter
- none

### Example
```java
// FCM 푸시 토큰 해제
GuardianSdk.getInstance().deregisterPushToken(new GuardianResponseCallback<TokenResponse>() {
    @Override
    public void onSuccess(TokenResponse result) {
        Log.i(TAG, "결과코드 : " + result.rtCode);
    }

    @Override
    public void onFailed(ErrorResult errorResult) {
        Log.e(TAG, "에러코드 : " + errorResult.getErrorCode());
    }
});
```

### TokenResponse
|Key|Value|Description|
|------|---|---|
|rtCode|0|결과코드|
|rtMsg|String|결과 메시지|

FCM 푸시 토큰 삭제 API 호출 성공 시 `rtCode` 로 `0`이 수신됩니다.

### ErrorResult
|Key|Value|Description|
|------|---|---|
|errorCode|Int|에러코드|
|errorMessage|String|에러메시지|

FCM 푸시 토큰 삭제 API 호출 실패 시 `errorCode` 가 수신됩니다.