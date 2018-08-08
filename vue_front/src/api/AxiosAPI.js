import axios from 'axios';
import CONF from '@/ConfigUrl.js';

export default {
  /*  SERVER */
  getCategory: function(){
    return axios.get(CONF.LOAD_CATEGORY);
  },
}
