---
sidebar_position: 2
---
# 시작하기

## Android

Guardian SDK for Android 는 Android Application 에
Guardian-CCS 인증을 사용하기 위해 제공됩니다.  
이 문서는 Android SDK 사용 방법을 안내 합니다.

## 설치하기 

### Gradle 설정하기
Android SDK를 적용할 프로젝트의 build.gradle(Project) 파일에 다음과 같이 Android SDK 레파지토리(Repository)를 설정합니다.

```gradle
maven { 
    url 'http://121.131.4.134:8081/repository/maven-releases/'
}
```

### 모듈 설정하기
build.gradle(Module) 파일에 필요한 모듈을 설정합니다.
```gradle
dependencies {
    implementation "com.fnsvalue:GuardianLibrary:1.0.32@aar"
}
```

#### 외부 라이브러리
Android SDK를 설치하면 SDK에 필요한 외부 라이브러리가 자동으로 설치됩니다.

- Gson, Retrofit, Okhttp
- Androidx Biometric

### 인터넷 사용 권한 설정하기
Android SDK 를 통해 API 와 통신을 위해 앱에 인터넷 사용 권한을 설정해야 합니다. 
AndroidManifest.xml에 다음과 같이 인터넷 사용 권한을 설정합니다.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.sample">

    <!-- 인터넷 사용 권한 설정-->
    <uses-permission android:name="android.permission.INTERNET" />
    
    ....
    
</manifest>
```

### JAVA 8 설정
Java 8 사용을 위한 설정이 필요합니다. 
다음 예제를 참고하여 build.gradle(Module) 파일에 자바 버전을 설정합니다.
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

### 초기화
Android SDK를 사용하기 위해서는 초기화를 해야 합니다. Application 을 사용할 경우  
다음과 같이 초기화할 수 있습니다.
```java
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        GuardianSdk.getInstance().init(this, "{Client Key}", "{API SERVER URL}");
        
    }
}
```

