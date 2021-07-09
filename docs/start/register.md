---
sidebar_position: 1
---
# Application Registration

## Overview
In order to use Guardian SDK, we need the application registration requests and client key issuance.   
Please contact the FNS manager about this matter.

## Issue Request
The minimum information for issuing requests is as follows.
- Company's name
- Android 
  - Pakage Name
    
- ios
  - Bundle ID
  
<pre>
In case of non-mobile platforms (Web, Window...) authentication

Firebase Cloud Messaging (FCM) registration request is required.
</pre>

## Client Key Issurance
The following is an example of a client , which has been issued properly, after completing the request.
``` json
{
    "clientKey" : "ea3aca8g59354cff908tu7fae6849d06"
}
```


