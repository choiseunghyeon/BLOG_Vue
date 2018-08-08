<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      v-model="drawer" fixed :clipped="false" app class="blue-grey darken-4" dark hide-overlay mobile-break-point="960">
      <v-list dense>
        <v-card tile flat class="blue-grey darken-4">
        <v-layout row wrap>
          <v-flex xs12 class="videoTitle">
            <div class="">
              <img style="border-radius: 50px; width:70px; height:70px;"
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
            </div>
            최승현
          </v-flex>
          <v-layout row wrap class="textCenter">
            <v-flex xs4 >
              <router-link class="button" to="/list">
                <span>HOME</span>
              </router-link>
            </v-flex>
            <v-flex xs4 >
              <router-link class="button" to="/article">
                <span>ABOUT</span>
              </router-link>
            </v-flex>
            <v-flex xs4>
              <a href="https://github.com/choiseunghyeon" target="_blank">
                <span>GITHUB</span>
              </a>
            </v-flex>
          </v-layout>

          </v-layout>
        </v-card>
        <v-divider class="ml-3 mr-3"></v-divider>

        <v-subheader class="mt-3 mb-2" style="font-size:1.4rem;">Category</v-subheader>
        <ul class="category">
          <li> Web
            <hr class="categoryBorder mr-5">
            <ul class="category">
              <li>Vue
              <hr class="categoryBorder mr-5">
              </li>
              <li>Node
                <hr class="categoryBorder mr-5">
                <ul class="category">
                  <li>express
                  <hr class="categoryBorder mr-5">
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>SECURITY
            <hr class="categoryBorder mr-5">
            <ul class="category">
              <li>WEB<hr class="categoryBorder mr-5"></li>
              <li>pwnable<hr class="categoryBorder mr-5"></li>
            </ul>
          </li>
        </ul>

        <!-- sm보다 작은 화면에서는 숨김  -->
        <v-layout row align-center class="ml-4 mr-4 hidden-sm-and-down" style="max-width: 650px">
          <v-text-field
            :append-icon-cb="searchArticle"
            placeholder="Search..."
            single-line
            append-icon="search"
            color="white"
            hide-details
            v-model="searchKeword">
          </v-text-field>
        </v-layout>
        <v-btn class="ml-3 mt-5" outline dark @click.stop="toggleMarkdownEditor">글작성
          <v-icon right>create</v-icon>
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <!-- md(960px > < 1264*)보다 큰 화면에서는 숨김 -->
    <v-toolbar class="teal lighten-2 hidden-md-and-up" fixed :clipped-left="false" app flat>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title md5 style="overflow: visible;">
        <span class="title">William</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center class="ml-5" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="searchArticle"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
          v-model="searchKeword"
        ></v-text-field>
      </v-layout>
    </v-toolbar>

    <v-content class="grey lighten-4">
      <v-container grid-list-lg>
        <v-layout justify-center align-center>
          <v-flex>

            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <markdown-editor v-if="markdownEditorFlag"></markdown-editor>
  </v-app>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import {mapState} from 'vuex'
import Constant from '@/Constant.js'
export default {
  name: 'Main',
  created: function(){
    this.$store.dispatch(Constant.GET_LOAD_CATEGORY);
    this.$router.push({path: '/list'})
  },
  components: {MarkdownEditor},
  computed: mapState(['markdownEditorFlag']),
  data: function(){
    return {drawer: true, searchKeword: ''};
  },
  methods: {
    toggleMarkdownEditor: function () {
      this.$store.dispatch(Constant.TOGGLE_MARKDOWN_EDITOR);
    },
    searchArticle: function () {
    }
  },
}
</script>
<style media="screen">
@media (min-width: 960px) {
  /*  1264보다 큰 화면에서는 Toolbar가 없기 때문에 v-content의 padding-top을 0으로 지정 */
  .v-content {
    padding-top: 0px !important;
  }
  .markdownArea{
    height: 400px !important;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.videoTitle{
  text-align: center;
  font-size:1.5rem;
  margin: 20px 2px 10px 2px;
  padding: 3px 5px 0px 5px;
}
.textCenter{
  text-align: center;
  font-size:1.2rem;
}
.category{
  list-style: none;
  padding-left:16px;
}
.category li{
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 1.2rem;
  letter-spacing: 1.3px;
}
.textCenter a{
  color: #5ea1e4;
  text-decoration: none;
}
.category > li {
  margin-bottom: 20px;
}
.categoryBorder{
    display: block;
    -webkit-box-flex: 1;
    flex: 1 1 0px;
    max-width: 100%;
    height: 0px;
    max-height: 0px;
    border: solide;
    margin-bottom: 10px;
}
</style>
