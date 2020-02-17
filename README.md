## clone App


## 설치 전 확인 및 해야 할 사항

```
Node.js // node --version 설치 확인. 
react-native-cli --version // cli 설치 확인.

android studio 설치 및 API 28 버전 설치 확인
Android SDK Build-Tools
Android SDK Platform-Tools, Android SDK Tools 설치 확인
```

### 설치 및 실행

- git

```sh
$ git clone https://github.com/juntaekHong/cloneApp.git
```

- npm install

```
$ npm install
```

- react-native linking

```
$ react-native link // react-native version 0.6 이상이므로 link 필요없음
```

- app run

```
$ react-native run-android
$ react-native run-ios
```

### 실행 오류 시, 확인 사항(Mac)

```
Mac 사용 시 추가 설정 사항

* Android 
Project< android Folder 안에 local.properties vi 명령어로 생성 후,
sdk.dir = /Users/USERNAME/Library/Android/sdk 추가해주면 됨. // USERNAME 에는 해당 컴퓨터 계정명

나머지는 윈도우와 실행방법 동일.

* IOS
Project< ios Folder 안에 pod --version 으로 pod 설치 확인

설치 안되어 있을 때
1. ios folder 안에 pod install
2. pod update
3. Project Top Folder에서 react-native run-ios 실행.
```

### 모듈 설치 시, 유의사항

```
기존 module 업데이트 Push 금지.
새로 추가한 modlue만 push할 것. push 전 local repo 최신화 후, 충돌 제거해서 push
```

### 실행 첫 화면(작업 중)
<img width="346" alt="스크린샷 2020-02-18 오전 3 55 24" src="https://user-images.githubusercontent.com/50249009/74680027-d8447a00-5202-11ea-9da5-e644e31cf8e4.png">
