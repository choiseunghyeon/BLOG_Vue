<template>
<v-app id="inspire" dark>
<v-content>
<v-container grid-list-lg>
<v-layout row wrap justify-center>
<v-flex xs12 md8>
  <v-layout row wrap justify-center>
    <v-flex xs6 md6 v-for="(items,index) in list">
    <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Root: {{items[0].name}}
          <v-btn small dark color="indigo">추가
            <v-icon dark @click="addItem(index)">add</v-icon>
          </v-btn>
        </h3>
      </div>
    </v-card-title>
    <v-list style="padding: 0px;">
    <draggable class="list-group" v-model="list[index]" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
    <transition-group type="transition" :name="'flip-list'">
      <v-list-tile v-for="element in items" :key="element.id" class="list-group-item">

        <v-list-tile-content>
          <v-list-tile-title v-text="element.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="pink" @click.stop="removeItem(element,index)">clear</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </transition-group>
    </draggable>
    </v-list>
    </v-card>
    </v-flex>
  </v-layout>
</v-flex>
<v-flex xs12 md4>
  <v-btn color="success" @click="addCategory">카테고리 목록추가</v-btn>
  <v-btn color="error" @click="routerMain">Main</v-btn>
  <v-btn color="success" @click="editable = !editable">수정하기</v-btn>
  <v-btn color="success" @click="updateCategory">수정완료</v-btn>
  <!-- <v-btn color="success" @click="orderList">오더링</v-btn> -->
</v-flex>
  <!-- <div  class="list-group col-md-3">
    <pre>{{listString}}</pre>
  </div> -->
  <category-dialog v-if="dialog == true" :form="form" @toggleDialog="toggleDialog"></category-dialog>
</v-layout>
</v-container>
</v-content>
</v-app>
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
  },
  mapState(['categoryItems'])
  ),
  data () {
    return {
      list: [],
      editable: false,
      isDragging: false,
      delayedDragging:false,
      dialog:false,
      form: {},
    }
  },
  methods:{
    // orderList () {
    //   this.list = this.list2;
    // },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      // root는 움직이지 못하도록 
      const relatedElementRoot = relatedElement.parent === null;
      const draggedElementRoot = draggedElement.parent === null;
      return (!relatedElement || !relatedElementRoot) && !draggedElementRoot
    },
    addCategory () {
      // 총갯수 + 1을 하여 ROOT location에서 맨 마지막에 위치하도록 함
      let location = this.list.length+1;
      this.form = {
        icon:null, location:location, name:'',
        parent:null, parentName: ''
      };
      this.toggleDialog(true);
    },
    addItem (index) {
      let location = this.list[index].length;
      this.form = {
        icon:null, location:location, name:'',
        parent:this.list[index][0].id, parentName: this.list[index][0].name
      };
      this.toggleDialog(true);
    },
    toggleDialog(flag){
      this.dialog = flag
    },
    updateCategory(){
      let payload = this.list.reduce((acc, val, index) => {
        let parentId = null;
        for (var i = 0; i < val.length; i++) {
          if(i === 0){
            parentId = val[i].id;
            val[i].parent = null;
            val[i].location = index+1; // list의 각 배열의 순서가 Root Node location과 같음
          } else {
            val[i].parent = parentId;
            val[i].location = i; // 0번째는 Root 노드
          }
          acc.push(val[i])
        }
        return acc
      }, []);
      console.log("PayLoad: ");
      console.log(payload);
      this.$store.dispatch(Constant.UPDATE_CATEGORY, payload);
    },
    removeItem(obj, index){
      if(obj.parent === null)
        if(this.list[index].length > 1){
          alert("자식이 있는 루트는 삭제할 수 없습니다.")
          return
        }

      if(window.confirm("삭제를 희망합니까?"))
        this.$store.dispatch(Constant.DELETE_CATEGORY,obj.id);
    },
    routerMain(){
      this.$router.push({path: '/list'});
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
    },
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
