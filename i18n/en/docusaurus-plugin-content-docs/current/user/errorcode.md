---
sidebar_position: 4
---
# Error code

## Description
This is the description about possible error codes when implementing GCCS membership management system.

<br/>

### Membership management related error
|Error Code|Description|Solution|
|------|---|---|
|2000|Invalid Client Key|Please check the issued clienty key. <br/> During SDK initialization, it will verify if the client key has been used.|
|2002|Required parameter not found|When calling the SDK, please check the parameter requirement.|
|2008|Unregistered user|Please check if the user has been registered with GCCS. <br/> We can check if the user has been registered by using the `me` function from `GuardianSdk`. |
|3202|클라이언트 아이디가 중복 된 경우|이미 사용 중인 외부 사이트(클라이언트) 사용자 입니다. 다른 아이디를 사용하거나 재등록을 통하여 사용할 수 있습니다.|
|5005|Unauthorized user|We would like to recommend the unauthorized user contact the administrator.|
|5006|Temporary suspended user|We would like to recommend the temporary suspended user contact the administrator.|
|5007|Permanently suspanded user|We would like to recommend the permanently suspanded user contact the administrator.|
|5008|Withdrawn user|We would like to recommend the withdrawn user to recover his/her account via the account recovery feature within a certain period of time.|

---

<br/>

### Other error
|Error Code|Description|Solution|
|------|---|---|
|10002|SDK error|An Exception occurs in the SDK. Please contact the administrator.|
|10003|Server error|An Exception occurs in the API server. Please contact the administrator.|
|10004|Cannot connect with the server|The server cannot be connected. Please check the internet connection and also check the server address when initializing.|

















