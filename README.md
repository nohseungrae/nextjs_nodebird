# 새로 시작하는 Nextjs + Graphql + Nestjs + Typescript + Typeorm(postgres or mysql)

### 특징

기본적으로 웹팩이 들어가 있다.
CSS 파일도 import 가능

### 화이팅

- 코드 스플리팅
- 프론트(리액트 특성상)에서 브라우저에 뿌려 줄 때 js 파일에 하나에 모든 정보를 담아 보내줌
- js파일을 쪼개서 필요한 부분의 js 만 받아오기
- !! 브라우저 - 프론트 간의 요청이 많아진다 (ex : post.js 줘, about.js 줘 등등) !!

### React Tip

- useCallback 은 함수를 캐싱하는 것!
- useMemo 는 값을 캐싱하는 것!
- 리렌더링

* 함수형 컴포넌트에서 리렌더링 될 경우 그 함수 안의 부분이 **!!다시 실행이 되는 것은 맞지만!!** useCallback, useMemo 는 바뀌지 않는다면 같은 것으로 인식하여 바뀐게 없다고 쳐준다.
* 리턴 부분에서 **!!바뀌는 부분만!!** 다시 그려준다.
* 리렌더링이 된다고 다시 그리진 않지만 함수자체가 다시 실행되는 부분을 생각하면 어느정도 시간을 잡아 먹기에 조절은 해주자!!

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
