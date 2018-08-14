<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card class="grey darken-3 white--text" >
        <v-card-title>
          <span class="headline">Category 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout wrap align-center>
              <v-flex xs12>
                <v-text-field label="Name" v-model="form.name" required></v-text-field>
              </v-flex>
              <v-flex xs12 d-flex>
                <v-text-field label="Parent" v-model="form.parentName" disabled required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Icon" :disabled="form.parent !== null" v-model="form.icon" placeholder="bookmarks"
                  persistent-hint hint="parent가 null일 경우 Root를 나타내며 Icon을 선택할 수 있습니다."></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addCategory">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import Constant from '@/Constant.js'
export default {
  name: 'CategoryDialog',
  created: function(){
    this.parentItems = this.categoryItems;
  },
  data: function(){
    return {dialog:true,disable:true,}
  },
  props: ['form'],
  methods: {
    addCategory(){
      delete this.form.parentName;
      console.log(this.form);
      this.$store.dispatch(Constant.ADD_CATEGORY_ITEM, this.form);
      this.closeDialog(false);
    },
    closeDialog(flag = false){
      this.$emit('toggleDialog', flag);
    },
  }


}
</script>
<style>
.v-menu__content{
  top: 0px !important;
  left: 0px !important;
  background-color: #424242;
}
</style>
