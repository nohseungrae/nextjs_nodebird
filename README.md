# 새로 시작하는 Nextjs + Graphql + Nestjs + Typescript + Typeorm(postgres or mysql)

### 특징

기본적으로 웹팩이 들어가 있다.
CSS 파일도 import 가능

### 화이팅

- 코드 스플리팅
- 프론트(리액트 특성상)에서 브라우저에 뿌려 줄 때 js 파일에 하나에 모든 정보를 담아 보내줌
- js파일을 쪼개서 필요한 부분의 js 만 받아오기
- !! 브라우저 - 프론트 간의 요청이 많아진다 (ex : post.js 줘, about.js 줘 등등) !!
- 셀프 DDos공격은 주의하자 제발 >> throttle 로 1초에 몇번 이상의 요청이 오면 무시한다 이런 함수 설정!!

### React Tip

- 함수는 () 말고 ``(template literal ; 함수를 호출하는 두번째 방법 () 와 같은 방식으로 작동하는 건 아니다.) 이렇게도 호출 가능하다
- useCallback 은 함수를 캐싱하는 것!
- useMemo 는 값을 캐싱하는 것!
- 리렌더링

* 함수형 컴포넌트에서 리렌더링 될 경우 그 함수 안의 부분이 **!!다시 실행이 되는 것은 맞지만!!** useCallback, useMemo 는 바뀌지 않는다면 같은 것으로 인식하여 바뀐게 없다고 쳐준다.
* 리턴 부분에서 **!!바뀌는 부분만!!** 다시 그려준다.
* 리렌더링이 된다고 다시 그리진 않지만 함수자체가 다시 실행되는 부분을 생각하면 어느정도 시간을 잡아 먹기에 조절은 해주자!!

- 컴포넌트는 화면 그려주는 거에 집중! 데이터 가져오는 부분은 패스해주자
- 반복되는 데이터를 가지고 키값을 부여해야할 경우 인덱스는 바뀌지 않는 정적인 데이터에만 사용하자

### Redux Tip

- 액션 하나하나가 리덕스에 기록이 되기 때문에 버그 잡을 때 매우 편하다.
- 타임머신같은 효과로 데이터 변화를 앞 뒤로 조절하면서 테스트하기 편하다
- 리덕스는 항상 새로운 객체를 리턴을 해주어서 전의 값과 새로 리턴된 값을 비교할 수 있다.(참조하면 이전 값이 새로운 값으로 대체되기 때문에 비교불가)
- ...state 를 쓰는 경우는 메모리를 아끼기 위해!! ...을 쓰면 참조관계를 유지할 수 있다.
- 배포모드일 때는 히스토리 보는 기능이 작동하지 않으므로 메모리를 계속 버려주면서 관리를 해줘 메모리 문제가 일어나지 않음.(개발모드일 경우엔 X)

```
    const prev = {a : 'b'};
    const nest = {c : prev};

    const next = {...prev};
    //메모리 아낄 수 있음!!
    prev.a === next.a --> true
    prev === next --> false
```

- throttling --> 마지막 함수가 호출 된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- debouncing --> 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것

# 시작

## 1 기본설정

- npm init
- npm i next (후 package.json scripts 세팅)
- touch tsconfig.json
- npm i typescript @types/react @types/node
- npm run dev

## 2 Eslint 코드 룰 !!!!!!!!!!!!!!!

- npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D
- 후 .eslintrc 파일 생성 후 설정값 세팅

## 3 사용할 CSS 프레임워크

- Antd + styled-components

## 4 \_app , layout

- app : 모든 것에 공통으로 들어가는 것들
- layout : 일부 공통되는 애들 분리할 경우 사용하자

## 5 next-redux-wrapper

- 넥스트에서 필요한 redux 라이브러리

## 6 redux-saga

- 여러가지 redux로 할 수 없는 기능(비동기 같은) 들을 할 수 있도록 돕는 기능
- !!generator 함수에 대해 알아야한다.
- 중간중간에 중단할 수 있음!! (yield로)
- postsaga 에서 usersaga 호출 가능!
- 사가는 테스트할 때 편하다

```
    const gen = function* () {
        console.log(1);
        yield // ex) gen.next() 실행 시 여기까지하고 멈춘다. {value : undefined, done : false}
        console.log(2);
        yield // ex) gen.next() 한번 더 실행 시 여기까지 하고 또 멈춘다. {value : undefined, done : false}
        console.log(3);
        yield 4;// ex) gen.next() 한번 더 실행 시 끝나면서 {value : 4, done : true}.
    }

    const g = function* () {
        while(true) {
            yield '무한';
        }
    }
    // 무한반복 되지 않고 멈춘다!!

    const l = logIn({ type: "LOG_IN_REQUEST", data: { id: "nolec@naver.com" } });
    l.next(); // 여기까지만 실행된다.
    l.next(); // 여기까지만 실행된다.
```

- dispatch 실행 시 reducer 와 saga 쪽이 거의 동시에 실행된다.

## 7 무한 스크롤 구현

- throttle, takelatest 로는 요청이 계속 가므로 loading으로 추가적으로 막아줌
- 유저가 무한하게 post를 본다면 모바일 같은 경우 메모리가 터질 수도 있으므로 그 경우에는 react-virtualized(virtualizedList라는 기술) 를 사용하면 좋다.
- 수천개의 게시글 중에 화면에 보이는 것들만 그려주고 나머지는 메모리에 가지고 있는다.

# BackEnd

## 1 express

- get -> 가져오다.
- post -> 생성하다. 애매하면 post 쓰자
- put -> 전체수정
- delete -> 제거
- patch -> 부분수정 ex)사용자의 닉네임만 변경하겠다!
- options -> 찔러보기 - 요청 보낼 수 있어 \* "Access-Control-Allow-Origin" 있나 체크하는!!
- head -> header만 가져오기
- 300 : 리다이렉트
- 400 : 클라이언트 에러
- 500 : 서버 에러
- 브라우저에서 서버로 요청을 보냈을 때 발생하는 문제 (CORS \* 다른 도메인일 경우) - 서버에서 서버로 보낼 때에는 안 생김
- 그렇기에 브라우저(3000) -> 프론트서버(3000) -> 백엔드서버(3001) 이렇게 보내는 proxy 방식을 사용하자

## 2 sequelize

- npx sequelize db:create : 설정된 디비 생성
- npm i sequelize sequelize-cli mysql2
- npx sequelize init
- 자바스크립트로 sql을 조작할 수 있게끔 하는 라이브러리

### Many To Many RelationShip

```
hashTag - post 가 다 대 다 관계일 시
중간에 매핑 테이블 같은 형태의 테이블이 생기면서
1. 노드 태그         1. 게시글1 - 노드, 리액트
2. 리액트 태그        2. 게시글2 - 노드, 익스프레스
3. 익스프레스 태그      3. 게시글3 - 리액트, 익스프레스

!중간테이블!
postHashTag
노드 - 게시글1
리액트 - 게시글1
노드 - 게시글2
익스프레스 - 게시글2
리액트 - 게시글3
익스프레스 - 게시글3
```

## 3 passport passport-local

- 로그인 했을 경우 network - response Headers - set-Cookie : connect.sid=~~~~~ => 내 정보들
- 쿠키랑 아이디 비밀번호를 비교해서 유저가 맞는지 체크한다.
- deserializeUser 로그인을 성공하고 나서 그 다음 요청부터 매번 실행된다.(id + cookie와 함께)
- 아이디로부터 사용자 정보를 복구해낸다.

## 4 dotenv

- 서버가 털려도 중요한 비밀번호나 여러 정보들을 따로 .env 파일 안에서 관리하여 보호하는 용도
