import Constant from '../constant';
import AxiosAPI from '../api/AxiosAPI.js';

export default {

  [Constant.TOGGLE_MARKDOWN_EDITOR] : (store) => {
    store.commit(Constant.TOGGLE_MARKDOWN_EDITOR);
  },

}
