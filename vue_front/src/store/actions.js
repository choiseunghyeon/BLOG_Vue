import Constant from '../constant';
import AxiosAPI from '../api/AxiosAPI.js';

export default {

  [Constant.TOGGLE_MARKDOWN_EDITOR] : (store) => {
    store.commit(Constant.TOGGLE_MARKDOWN_EDITOR);
  },

  [Constant.GET_LOAD_CATEGORY] : async (store) => {
    try {
      const res = await AxiosAPI.getCategory()
      console.log('RESPONSE: ', res);
      store.commit(Constant.GET_LOAD_CATEGORY, res.data);
    } catch (e) {
      console.error(e);
    }
  }
}
