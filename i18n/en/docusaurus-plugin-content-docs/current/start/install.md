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

