<template>
<v-content class="grey lighten-4">
<v-container grid-list-lg>
<v-layout row justify-center>
  <v-flex xs4 v-for="(items,index) in list">
  <v-card>
  <v-card-title primary-title>
    <div>
      <h3 class="headline mb-0">Root: {{items[0].name}}</h3>
      <v-btn small fab dark outline color="indigo">
        <v-icon dark @click="addItem(index)">add</v-icon>
      </v-btn>
    </div>
  </v-card-title>
  <v-list style="padding: 0px;">
  <draggable class="list-group" v-model="list[index]" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
  <transition-group type="transition" :name="'flip-list'">
    <v-list-tile v-for="element in items" :key="element.id" class="list-group-item">

      <v-list-tile-content>
        <v-list-tile-title v-text="element.name"></v-list-tile-title>
      </v-list-tile-content>

    </v-list-tile>
  </transition-group>
  </draggable>
  </v-list>
  </v-card>
  </v-flex>
  <div  class="list-group col-md-3">
    <pre>{{listString}}</pre>
  </div>
  <div class="">
    <v-btn color="success" @click="addCategory">카테고리 목록추가</v-btn>
    <v-btn color="error">Error</v-btn>
  </div>
</v-layout>
<category-dialog></category-dialog>
</v-container>
</v-content>
</template>

<script>
import draggable from 'vuedraggable'
import CategoryDialog from '@/components/admin/CategoryDialog'
import { mapState } from 'vuex'
import Constant from '@/Constant.js'
import _ from 'lodash'
export default {
  name: 'Category',
  components: {draggable,CategoryDialog},
  created: function(){
    this.$store.dispatch(Constant.GET_LOAD_CATEGORY);
  },
  computed: _.extend({
    dragOptions () {
      return  {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    listString(){
      return JSON.stringify(this.list, null, 2);
    },
    list2String(){
      return JSON.stringify(this.list2, null, 2);
    }
  },
  mapState(['categoryItems'])
  ),
  data () {
    return {
      list: [],
      editable:true,
      isDragging: false,
      delayedDragging:false
    }
  },
  methods:{
    orderList () {
      this.list = this.list.sort((one,two) =>{return one.order-two.order; })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    addCategory (val) {
      // icon 추가 예정
    },
    addItem (index) {
      let name = prompt("이름을 입력하세요");
      let length = this.list[index].length;
      let location = this.list[index][length-1].location;

      let payload = {
        icon:null, id: null,
        location:location+1, name:name, parent:this.list[index][0].id
      };
      console.log(payload);
      this.$store.dispatch(Constant.ADD_CATEGORY_ITEM, payload);
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    },
    categoryItems () {
      this.list = this.categoryItems.reduce((acc,val) => {
        let temp = [];
        temp.push({icon:val.icon, id:val.id, location:val.location, name:val.name, parent:val.parent});
        for (var i = 0; i < val.items.length; i++)
          temp.push(val.items[i])

        console.log(temp);
        acc.push(temp);
        return acc;
      }, [])
    }
  }
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  border-bottom: 1px solid rgb(183, 195, 178);
}

</style>
