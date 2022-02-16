---
sidebar_position: 1
---

# Get Started

## Overview

Guardian SDK for iOS(이하 iOS SDK)는 iOS 애플리케이션에서 Guardian-CCS 인증을 사용하기 위해 제공됩니다.  
이 문서를 통해 iOS SDK 사용 방법을 안내합니다.

<br/>

## 애플리케이션 등록
```
iOS SDK를 사용하기 위해서는 애플리케이션 등록이 필요합니다.   
자세한 사항은 애플리케이션 등록 페이지를 참고바랍니다.
```

## 요구사항
```
iOS SDK가 정상적으로 작동하기 위해 다음과 같은 요구사항을 권고합니다.
 - Xcode 12.0 이상
 - iOS 13.0 이상
```

## 설치하기

### Cocoapods를 통해 설치하기 
[Cocoapods](https://guides.cocoapods.org/using/getting-started.html)을 활용하여 iOS SDK를 설치할 수 있으며 Cocoapods 버전은 1.1 이상이 필요합니다.
이미 Cocoapods을 설치한 상태라면 터미널에서 iOS SDK를 적용할 프로젝트의 디렉토리로 이동 후, 아래와 같이 진행합니다.

```
1. pod init - podfile을 생성합니다.
2. open podfile 
3. podfile내에서 라이브러리를 추가
    pod 'GuardianSDKiOS'
    pod 'Firebase/Analytics'
    pod 'Firebase/Messaging'
    pod 'TheAnimation'
    pod 'IQKeyboardManagerSwift'
4. 다시 터미널로 돌아와서 pod install 실행
```

* GuardianSDKiOS를 설치함으로써 아래의 라이브러리는 자동으로 설치됩니다. 
```
Alamofire, CryptoSwift, SwiftyJSON, StompClientLib, DeviceKit, SwiftOTP
```

### 초기화
iOS SDK를 사용하기 위해서는 해당 파일을 import해야 합니다. 또한 iOS SDK를 초기화하기 위해 AppDelegate.swift 파일에 아래와 같은 형식으로 추가합니다.

```swift
import Firebase
import FirebaseMessaging
import GuardianSDKiOS
import UserNotifications
import IQKeyboardManagerSwift

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        ...
        
        GuardianService.sharedInstance.initDomain(baseUrl: baseUrl,apiUrl: apiUrl)
        GuardianService.sharedInstance.initClientKey(clientKey: MasterClientKey)
    }

```

