import Constant from '../constant';
import AxiosAPI from '../api/AxiosAPI.js';
import ForAction from '../api/ForAction.js';

export default {

  [Constant.TOGGLE_MARKDOWN_EDITOR] : (store) => {
    store.commit(Constant.TOGGLE_MARKDOWN_EDITOR);
  },

  [Constant.GET_LOAD_CATEGORY] : async (store) => {
    try {
      const res = await AxiosAPI.getCategory()
      console.log('RESPONSE: ', res);
      /* [{id:2, location:1, name:'Vue',
      items:[{
        id:2, location:1, name:'Vue'
      }]},{}]
      */
      let category = ForAction.categoryStructure(res.data);
      store.commit(Constant.GET_LOAD_CATEGORY, category);
    } catch (e) {
      console.error(e);
    }
  },
  [Constant.ADD_CATEGORY_ITEM] : (store, payload) => {
    AxiosAPI.addCategoryItem(payload)
    .then((res) => {
      store.dispatch(Constant.GET_LOAD_CATEGORY);
    })
    .catch((ex) => {
      console.log("ERROR!!!!", ex);
    })
  },
  [Constant.DELETE_CATEGORY] : (store, payload) => {
    AxiosAPI.deleteCategory(payload)
    .then((res) => {
      store.dispatch(Constant.GET_LOAD_CATEGORY);
    })
    .catch((ex) => {
      console.log("ERROR!!!!", ex);
    })
  },
  [Constant.UPDATE_CATEGORY] : (store, payload) => {
    AxiosAPI.updateCategory(payload)
    .then((res) => {
      store.dispatch(Constant.GET_LOAD_CATEGORY);
    })
    .catch((ex) => {
      console.log("ERROR!!!!", ex);
    })
  }
}
