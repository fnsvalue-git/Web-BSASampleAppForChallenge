---
sidebar_position: 4
---
# Error Code

## Overview
Below are the possible errors that can occur when implementing GCCS user management.

<br/>

### User management error
|Error Code|Description|Solution|
|------|---|---|
|2000|Invalid client key|Check the client key <br/> When initializing the Android SDK, it verifies whether the client key has been used|
|2002|Required parameter not found|Make sure that required parameters are all provided when calling the Android SDK|
|2008|Unregistered user|Check GCCS sign in status <br/> To check whether the user has been registered or not, use `getMe()` from `GuardianSdk`|
|3202|Client ID not unique|It can occur when the ID is already occupied by other external site(client) user. Using another ID or re-registration is recommended |
|5005|Unauthorized user|Contact the person in charge to solve this matter|
|5006|Temporarily suspended user|Contact the person in charge to solve this matter|
|5007|Permanently suspended user|Contact the person in charge to solve this matter|
|5008|Withdrawn user|User accounts can be reactivated within certain period of time by reactivation|
---

<br/>

### Other error
|Error Code|Description|Solution|
|------|---|---|
|10002|SDK error|An Exception has occurred in the SDK <br/> Contact the person in charge to solve this matter|
|10003|Server error|An Exception has occurred in the API server <br/> Contact the person in charge to solve this matter|
|10004|Server connection error|Impossible to connect the server <br/> Check internet connection and the server address used for initialization|