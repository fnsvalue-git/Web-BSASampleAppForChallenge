---
sidebar_position: 1
---
# Get Started

## Android
Guardian SDK for Android(hereafter 'Android SDK') provides the development kit to implement Guardian-CCS authentication in the Android app.   
This document will describe how to make best use of the Android SDK.

<br/>

## App Registration
```
In order to use the Android SDK, the app must be registered beforehand.
We recommend you to check the app registration page in the next chapter for more details.
```

## Installation

### Set Gradle
Declare the Android SDK repository in the `build.gradle`(Project) to implement the Android SDK.

```gradle
maven { 
    ...
}
```

### Add Modules
Add necessary modules in the `build.gradle`(Module).

```gradle
dependencies {
    ...
}
```

#### External library dependency
Upon the Android SDK installation, all the necessary libraries will be installed automatically.
- Gson, Retrofit, Okhttp
- AndroidX Biometric

### Internet Permission
Internet permissions must be set on the app for API and communication through our Android SDK.   
To communicate with the API through Android SDK, the app must have access to the internet.   
It can be setup at the `AndroidManifest.xml` as follows.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.sample">

    <!-- Internet Usage Permission Setting-->
    <uses-permission android:name="android.permission.INTERNET" />
    
    ....
    
</manifest>
```

### JAVA 8 Configuration
Specify the Java version in the `build.gradle`(Module) file to use the `Java 8` features.  
Refer to the following example:
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

### Runtime Permission
Android 6.0 Marshmallow (API 23), or higher version requires the runtime permission to use the resources of device.   
The following are required permissions of the Android SDK to be declared.
```java


if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
    }
}
```
Each of the permissions will be used for the following purposes.
- `READ_PHONE_STATE` for user authentication and to detect changes of the mobile device.
- `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` for sign in/re-registration by using location information.
- `CAMERA` for initializing a scanner to authenticate with the QR code.
---

### Initialization
For initial setup, the Android SDK must be initialized after the installation.   
It can be initialized as follows:
```java
public class GlobalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        GuardianSdk.getInstance().init(this, "{Client Key}", "{API SERVER URL}");
        
    }
}
```

