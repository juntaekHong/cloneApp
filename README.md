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
3. open ./ios/cloneApp.xcodeproj > Xcode > Build Phases > Copy Pod Resources > OutPut Files 들 빼기(-) // 안하면 IOS 실행 오류남.
4. Project Top Folder에서 react-native run-ios 실행.
```

### 모듈 설치 시, 유의사항

```
기존 module 업데이트 Push 금지.
새로 추가한 modlue만 push할 것. push 전 local repo 최신화 후, 충돌 제거해서 push
```

### 실행 화면들
<img width="382" alt="스크린샷 2020-03-14 오전 7 33 36" src="https://user-images.githubusercontent.com/50249009/76664039-5dcf0600-65c6-11ea-9a0e-488fd60fcc58.png">

<img width="386" alt="스크린샷 2020-03-14 오전 7 31 31" src="https://user-images.githubusercontent.com/50249009/76664052-64f61400-65c6-11ea-9690-94c3aade7bd0.png">

<img width="382" alt="스크린샷 2020-03-14 오전 7 32 11" src="https://user-images.githubusercontent.com/50249009/76664067-6cb5b880-65c6-11ea-997b-44f2d276ea49.png">

<img width="382" alt="스크린샷 2020-03-14 오전 7 33 43" src="https://user-images.githubusercontent.com/50249009/76664076-72130300-65c6-11ea-8d1b-6d2d80da9671.png">

<img width="386" alt="스크린샷 2020-03-14 오전 7 31 16" src="https://user-images.githubusercontent.com/50249009/76664084-77704d80-65c6-11ea-9311-9862a0c28c42.png">
