import axios from 'axios';
import CONF from '@/ConfigUrl.js';

export default {
  /*  SERVER */
  getCategory: function(){
    return axios.get(CONF.LOAD_CATEGORY);
  },
  addCategoryItem: function(payload){
    console.log("addCategoryItem payload: ", payload);
    return axios.post(CONF.ADD_CATEGORY_ITEM, {
      data: payload
    })
  },
}
