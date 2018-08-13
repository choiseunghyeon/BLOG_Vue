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
      /* [{id:2, location:1, name:'Vue',
      items:[{
        id:2, location:1, name:'Vue'
      }]},{}]
      */
      let categoryItems = res.data.filter(val => val.parent == null);
      // in ascending order
      categoryItems.sort((a, b) => a.location - b.location)
      //rootCategory안에 childCategory 넣고 location기준 in ascending order
      for (var i = 0; i < categoryItems.length; i++) {
        categoryItems[i].items = res.data.filter(val => val.parent == categoryItems[i].id)
        categoryItems[i].items.sort((a,b) => a.location - b.location)
      }
      store.commit(Constant.GET_LOAD_CATEGORY, categoryItems);
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
}
