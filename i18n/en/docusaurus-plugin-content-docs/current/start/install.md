---
sidebar_position: 2
---
# Start

## Android

Guardian SDK for Android provides a development kits to implement Guardian-CCS authentication in Android Application.
This document illustrate how to use Android SDK.

## Installation 

### Gradle Setting
Please set up the Android SDK repository in `build.gradle` (Project) in order to implement the Android SDK.

```gradle
maven { 
    url 'http://121.131.4.134:8081/repository/maven-releases/'
}
```

### Module Setting
Please set up neccessary module in `build.gradle`(Module).
```gradle
dependencies {
    implementation "com.fnsvalue:GuardianLibrary:1.0.32@aar"
}
```

#### External Library
When you install our Android SDK, other neccessary libraries will also be installed automatically.

- Gson, Retrofit, Okhttp
- Androidx Biometric

### Internet Usage Permission Setting
Internet permissions must be set on the app for API and communication through our Android SDK.
We can set the internet permission inside `AndroidManifest.xml` as follows.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.sample">

    <!-- Internet Usage Permission Setting-->
    <uses-permission android:name="android.permission.INTERNET" />
    
    ....
    
</manifest>
```

### JAVA 8 Setting
It is neccessary to configure some settings so that we will be able to use `Java 8`.
Please set the Java version in the build.gradle (Module) file, using the following example:
```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    ....
}
```
---

### 런타임 퍼미션
Android 6.0 Marshmallow (API 23) 이상부터는 디바이스에 자원을 사용하기 위해 런타임 퍼미션(runtime permissions) 이 필요합니다.   
Guardian SDK for Android 에서 요구하는 퍼미션은 다음과 같습니다.
```java
if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
    }
}
```
권한의 사용용도는 다음과 같습니다.
- READ_PHONE_STATE : 사용자 인증과 모바일기기가 변경 되었을 경우 사용.
- ACCESS_FINE_LOCATION and ACCESS_COARSE_LOCATION : 위치 정보를 통한 회원가입 및 기기 재등록 시 사용.
- CAMERA : QR 인증을 위한 스캐너 실행 시 사용.
---

### Initialization
To use our Android SDK, you need to make an initialization. .Android SDK를 사용하기 위해서는 초기화를 해야 합니다. When using Application, you can initialize as follows:
```java
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        GuardianSdk.getInstance().init(this, "{Client Key}", "{API SERVER URL}");
        
    }
}
```

