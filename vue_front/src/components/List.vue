<template lang="html">
<v-layout row wrap>
<v-flex xs12>
<v-jumbotron height="80px" color="primary">
<v-container fill-height>
  <v-layout align-center>
    <v-flex text-xs-center>
      <h3 class="categoryName">Category: 블로그</h3>
    </v-flex>
  </v-layout>
</v-container>
</v-jumbotron>
</v-flex>
<v-flex xs12 md4 xl3 v-for="data in lists" :key="data">
  <v-card >
   <v-card-media
     src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
     height="120px"
   ></v-card-media>

   <v-card-title primary-title>
     <div class="mb-3">
       <h3 class="headline mb-1">BLOG-NUXT 블로그 제작기</h3>
       <div><v-icon>date_range</v-icon>2018년 08월 06일</div>
     </div>
     <div class="cardContent">
       Lorem ipsum dolor sit amet, consectetur adipisicing elid minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conseqrure dolor in reprehe cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat laborum...
     </div>
   </v-card-title>

   <v-card-actions>
     <v-btn flat color="orange">READ MORE</v-btn>
   </v-card-actions>
 </v-card>
</v-flex>
</v-layout>
</template>

<script>
export default {
  name: 'List',
  data: function () {
    return { lists: [1, 2, 3, 4, 5] }
  }
}
</script>

<style lang="css">
.categoryName{
  font-size: 2.5rem;
  color: white;
}
</style>
