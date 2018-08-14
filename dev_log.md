##VUE + VUETIFY + EXPRESS로 구성된 프로젝트


**개발 목적**

 - 블로그를 직접 제작, 운영하기 위함
 - 블로그를 만들고 운영하면서 겪게 되는 문제점들에 대한 해결
 - 내가 원하는 블로그로 만들고 자유롭게 커스터마이징 또한 원하는 기능을 이것저것 넣기

18.08.08
  - Nuxt로 작성하던 코드들 이전
  - Nuxt 환경 설정이 너무 어려우며 자료가 부족하여 vue + express에 SEO 관련해서는 prerender로 해결할 계획
  - 생산성 저하로 익숙한 Vue + Express로 옮김  
  - Back-end 환경 구성
  - Category 정보 server에서 요청하여 가져옴
  - router변경시 transition 적용(fade)

18.08.09
  - Category data structure 구성

18.08.13
  - Category.vue 구성
  - Category 추가 dialog 작성중
  - front-back category 추가 함수 구현

18.08.14
  - Category dialog 작성 완료
  - Category 자식노드 생성 루트노드 생성 및 삭제 완료
  - Category 수정 완료
  - Category Root Node 이동 불가능하게 변경

진행예정사항
  - alert 창을 통해서 시스템 흐름 알려주기(ex. 카테고리 삭제 및 생성 article 추가 로딩 등 전체적인 알람들)
  - 디자인 재정리
  - article 관련 글 서버로 전송
