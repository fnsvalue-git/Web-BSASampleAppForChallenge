---
sidebar_position: 1
---

# 시작하기

## Overview

Guardian SDK for Android(이하 Android SDK)는 Android 애플리케이션에서 Guardian-CCS 인증을 사용하기 위해 제공됩니다.  
이 문서를 통해 Android SDK 사용 방법을 안내합니다.

<br/>

## 애플리케이션 등록
```
Android SDK를 사용하기 위해서는 애플리케이션 등록이 필요합니다.   
자세한 사항은 애플리케이션 등록 페이지를 참고바랍니다.
```

## 설치하기

### Gradle 설정하기
Android SDK를 적용할 프로젝트의 `build.gradle`(Project) 파일에 다음과 같이 Android SDK 레파지토리(Repository)를 설정합니다.

```gradle
maven { 
    ...
}
```

### 모듈 설정하기
`build.gradle`(Module) 파일에 필요한 모듈을 설정합니다.

```gradle
dependencies {
    ...
}
```

#### 외부 라이브러리
Android SDK를 설치하면, SDK에 필요한 외부 라이브러리가 자동으로 설치됩니다.

- Gson, Retrofit, Okhttp
- Androidx Biometric

### 인터넷 사용 권한 설정하기
Android SDK를 통해 API와 통신하기 위해 앱에 인터넷 사용 권한을 설정해야 합니다.   
`AndroidManifest.xml`에 다음과 같이 인터넷 사용 권한을 설정합니다.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.sample">

    <!-- 인터넷 사용 권한 설정-->
    <uses-permission android:name="android.permission.INTERNET" />
    
    ....
    
</manifest>
```

### JAVA 8 설정
`Java 8` 사용을 위한 설정이 필요합니다.   
다음 예제를 참고하여 `build.gradle`(Module) 파일에 자바 버전을 설정합니다.
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
Android 6.0 Marshmallow (API 23) 이상부터는 디바이스의 자원을 사용하려면 런타임 퍼미션(runtime permissions)이 필요합니다.   
Android SDK에서 요구하는 퍼미션은 다음과 같습니다.

```java
if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
    }
}
```

권한의 사용용도는 다음과 같습니다.
- `READ_PHONE_STATE` : 사용자 인증 시 및 모바일기기가 변경된 경우 사용.
- `ACCESS_FINE_LOCATION` or `ACCESS_COARSE_LOCATION` : 위치 정보를 통한 회원가입 및 기기 재등록 시 사용.
- `CAMERA` : QR 인증을 위한 스캐너 실행 시 사용.
---

### 초기화
Android SDK를 사용하기 위해서는 초기화가 필요합니다. Application 클래스를 상속받을 경우 다음과 같이 초기화할 수 있습니다.

```java
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        GuardianSdk.getInstance().init(this, "{Client Key}", "{API SERVER URL}");
        
    }
}
```

