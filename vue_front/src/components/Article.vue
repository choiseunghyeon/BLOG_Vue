<template lang="html">
<v-container id="article_container">
  <v-layout row wrap>
    <!--  Category -->
    <v-flex xs12>
      WEB -> VUE
    </v-flex>
    <!--  Title -->
    <v-flex xs12>
      Title
    </v-flex>
    <!--  etc info -->
    <v-flex xs12>
      <div><v-icon>date_range</v-icon>2018년 08월 06일 <v-icon class="ml-2"> visibility</v-icon>1232</div>
    </v-flex>
    <!--  Content -->
    <v-flex xs12>
      <div v-html="compiledMarkdown">

      </div>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>
import Marked, { Renderer } from 'marked'
import highlightjs from 'highlight.js'
export default {
  created: function () {
    const renderer = new Renderer()
    renderer.code = (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlightjs.getLanguage(language))
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code
      // Render the highlighted code with `hljs` class
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
    }
    // Set the renderer to marked.
    Marked.setOptions({ renderer })
  },
  data: function () {
    return {sheet: true, input: '## NUXT + VUETIFY + EXPRESS로 구성된 프로젝트\n\n  - Nuxt+Vuetify template에 express를 가져다 넣는게 프로젝트 구성에 편함 (https://github.com/vuetifyjs/nuxt)\n  - nuxt+express(https://github.com/nuxt-community/express-template)를 참조\n\n**개발 목적**\n\n  - 블로그를 직접 제작, 운영하기 위함\n  - 블로그를 만들고 운영하면서 겪게 되는 문제점들에 대한 해결\n  - 내가 원하는 블로그로 만들고 자유롭게 커스터마이징 또한 원하는 기능을 이것저것 넣기\n\n**NUXT 사용 이유**\n\n  - 기존 Vue로 만들게 되면 SEO에 문제가 생김. 구글의 검색엔진 같은 경우 비동기 데이터 처리를 기다려 주지 않음 즉 어느정도 정적페이지를 크롤링함\n\n18.08.02\n  - 개발환경 설정(nuxt+vuetify+express로 구성)\n  - 디자인 구성\n\n18.08.03\n  - 디자인 구현 및 적용\n  - Hamburger Menu 구현(static page)\n\n18.08.06\n  - mobile에서 보여지는 layout과 pc화면에서 보여지는 layout을 고려하여 디자인 구현 및 적용\n  - List.vue 구현 및 적용(static page)\n  - MarkdownEditor.vue 디자인 및 기능 구현\n\n18.08.07\n  - MarkdownEditor.vue (코드 하이라이트 기능 추가) && 디자인 변경 및 개선\n  - vuex 추가 및 MarkdownEditor.vue on/off 기능 추가\n  - 불필요한 css 삭제\n', screenFlag: false}
  },
  computed: {
    compiledMarkdown: function () {
      return Marked(this.input, { sanitize: true })
    }
  }
}
</script>

<style lang="css">
#article_container{
  font-size: 1.15rem;
}
p{
  margin-top:20px;
  margin-bottom: 8px;
}
</style>
