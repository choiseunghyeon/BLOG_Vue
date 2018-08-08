<template lang="html">
<v-bottom-sheet v-model="sheet" persistent full-width hide-overlay>
<v-layout row wrap align-center class="markdownEditor">
  <v-flex text-xs-center xs12 md6>
    <v-text-field label="Title..."></v-text-field>
  </v-flex>
  <v-flex xs12 md6 justify-end style="display: flex;">
    <v-btn class="ml-3 mr-3" small outline color="red" @click.stop="toggleMarkdownEditor">Cancel
      <v-icon color="red" right>clear</v-icon>
    </v-btn>
    <v-btn class="ml-3 mr-3 hidden-xs-only" small outline @click.stop="sheetExpand">Expand
      <v-icon right>fullscreen</v-icon>
    </v-btn>
    <v-btn class="ml-3 mr-3" small outline color="primary" @click.stop="">Post
      <v-icon color="primary" right>add</v-icon>
    </v-btn>

  </v-flex>
  <v-flex xs12>
    <v-layout row wrap>
      <v-flex xs12 id="markdownIconBox">
        <v-icon class="ml-2">code</v-icon> <v-icon class="ml-2">mail</v-icon>
        <v-icon class="ml-2">mail</v-icon> <v-icon class="ml-2">mail</v-icon>
      </v-flex>
      <v-flex xs12 md6>
        <textarea v-model="input" :class="{markdownArea: true, markdownTextArea:true, twiceHeight:screenFlag}"></textarea>
      </v-flex>
      <v-flex xs12 md6>
        <div v-html="compiledMarkdown" :class="{markdownArea:true, twiceHeight:screenFlag}"></div>
      </v-flex>

    </v-layout>
  </v-flex>

</v-layout>
</v-bottom-sheet>
</template>

<script>
import Marked, { Renderer } from 'marked'
import highlightjs from 'highlight.js'
import Constant from '@/Constant.js'
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
    return {sheet: true, input: '# hello', screenFlag: false}
  },
  computed: {
    compiledMarkdown: function () {
      return Marked(this.input, { sanitize: true })
    }
  },
  methods: {
    sheetExpand: function () {
      this.screenFlag = !this.screenFlag
    },
    toggleMarkdownEditor: function () {
      this.$store.dispatch(Constant.TOGGLE_MARKDOWN_EDITOR);
    }
  }
}
</script>

<style lang="css">
#markdownIconBox{
  border: 1px solid #bbb;
  max-height: 50px;
  opacity: .8;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.markdownEditor{
  background-color: white !important;
  padding: 20px;
  box-shadow: 5px 5px 8px 5px black;
}
.markdownArea{
  display: inline-block;
   width: 100%;
   height: 150px;
   vertical-align: top;
   box-sizing: border-box;
   padding: 20px;
   border: 1px solid #ddd;
   overflow-y: scroll;
}
/* 글쓰는 공간을 두배로 늘려줌 */
.twiceHeight{
  height: 800px !important;
  animation-name: expand;
  animation-duration: .8s;
}
.markdownTextArea{
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 1.2rem;
  font-family: 'Monaco', courier, monospace;
}
@keyframes expand {
  from {
    height: 400px;
  }
  to {
    height: 800px;
  }
}
</style>
