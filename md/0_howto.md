# react
## 1. react 환경세팅
- 윈도우 기준(23.01.12)

1. Node.js 설치
    - react 프로젝트를 생성하기 위해서는 node.js가 필요
    - [node.js란](https://perfectacle.github.io/2017/06/18/what-is-node-js/)
    - [node.js원리](https://studium-anywhere.tistory.com/6)
    - [node다운로드](https://nodejs.org/ko/download/)에서 환경에 맞게 다운로드 하면 된다.(window기준 .msi다운)
    - 설치 완료 후 cmd에서 버전 및 다운로드 완료 확인
       ``` bash
       $ node -v
       $ npm -v
       ```
2. NPM
   - node를 설치했다면 자동으로 npm 설치.
   - 노드 패키지 매니저로 자바스크립트 라이브러리를 관리 할 수 있다.
3. Yarn 설치
- npm의 단점(성능,속도)을 보완하기 위한 패키지 매니저.[yarn에 관한 설명](https://velog.io/@khy226/Yarn-%EC%9D%B4%EB%9E%80)
  - (npm은 모든 패키지들을 다 가지고 있어서 무겁다.)
- [yarn 다운로드](https://classic.yarnpkg.com/en/docs/install#windows-stable)
  - ![yarn다운로드](/start-react/yarn_install.PNG "yarn다운로드")
- 설치 완료 후 cmd에서 확인
  ``` bash
  $ yarn -v
  ```
4. 리액트 앱 생성하기
    - react-start(상위폴더명) > react-study(프로젝트명)
    ``` bash
    $ yarn create react-app 프로젝트명
    $ yarn create react-app react-study
    ```
5. 리액트 앱 실행하기
    ``` bash
    cd react-start\react-study
    ```
6. 리액트 시작하기
    ``` bash
    $ yarn start
    ```
    - 참고로 리액트 끝내기는 `ctrl` + `c`
7. localhost:3000 이라는 주소로 리액트 사이트가 자동으로 띄어진다.



## Reference
[1. React시작하기(1)-환경설정](https://goddaehee.tistory.com/293#tag1)
https://nykim.work/105