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

### Runtime permission
Android 6.0 Marshmallow (API 23) and later require runtime permissions to use resources on the device.   
The required permissions by Guardian SDK for Android are as follows.
```java
if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
    }
}
```
The permissions are used for the following purposes.
- `READ_PHONE_STATE` is being used when user authentication or mobile device is changed.
- `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` are being used to register membership or re-register devices through location information.
- `CAMERA` is being used to run the scanner for QR authentication.
---

### Initialization
To use our Android SDK, you need to make an initialization. When using Application, you can initialize as follows:
```java
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        GuardianSdk.getInstance().init(this, "{Client Key}", "{API SERVER URL}");
        
    }
}
```

