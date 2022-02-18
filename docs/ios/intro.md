---
sidebar_position: 1
---

# Get Started
## Overview

Guardian SDK for iOS(hereafter 'iOS SDK') provides the development kit to implement Guardian-CCS authentication in the iOS app.
This document will describe how to make best use of the iOS SDK.

<br/>

## App Registration
```
In order to use the iOS SDK, the app must be registered beforehand.
We recommend you to check the app registration page in the next chapter for more details.
```

## Requirements
```
 To fully operate the iOS SDK, requirements below are necessary.
 - Xcode version 12.0 and above
 - iOS version 13.0 and above
```

## Installation

### Install with Cocoapods
iOS SDK can be installed with [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) and Cocoapods version must be 1.1 and above.
If Cocoapods is already installed, move to the directory of project that will use the iOS SDK, and proceed as following.

```
1. pod init - create the podfile
2. open podfile
3. add library below in the podfile
    pod 'GuardianSDKiOS'
    pod 'Firebase/Analytics'
    pod 'Firebase/Messaging'
    pod 'TheAnimation'
    pod 'IQKeyboardManagerSwift'
4. come back to the terminal and do 'pod install'
```

* Libraries below will be automatically installed with iOS SDK
```
Alamofire, CryptoSwift, SwiftyJSON, StompClientLib, DeviceKit, SwiftOTP
```

### Initialization
To use iOS SDK, there are things needed to be imported. Also, to initialize iOS SDK, add in the AppDelegate.swift file like below.
```java
import Firebase
import FirebaseMessaging
import GuardianSDKiOS
import UserNotifications
import IQKeyboardManagerSwift

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        ...
    }

```