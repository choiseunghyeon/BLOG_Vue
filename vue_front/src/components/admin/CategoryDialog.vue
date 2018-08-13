<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="grey darken-3 white--text" >
        <v-card-title>
          <span class="headline">Category 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout wrap align-center>
              <v-flex xs12>
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 d-flex>
                <v-select
                :items="['Vue', 'Node', null]"
                label="Parent"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Location"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Icon"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'CategoryDialog',
  data: function(){
    return {dialog:true,}
  }
}
</script>
<style media="screen">
.v-menu__content{
   top: 20px !important;
   left: 0px !important;
 }
</style>
