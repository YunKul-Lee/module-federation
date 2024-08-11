<h1>Micro Frontend 예제</h1>
Module Federation 전략을 사용하여 마이크로 프론트앤드 구성

<h2>구성</h2>

  * host : 컨테이너 어플리케이션. 
    - 각 업무별 마이크로 어플리케이션 연동
    - Header, Menu, Footer 등 공통영역 처리
  * remote1 : 마이크로 서비스1
  * remote2 : 마이크로 서비스2

<h2>참고</h2>

  * 마이크로 프론트엔드 : https://micro-frontends.org/
  * vite-plugin-federation : https://github.com/originjs/vite-plugin-federation
  * 샘플 예제 : https://github.com/originjs/vite-plugin-federation/tree/main/packages/examples/vue3-advanced-demo
