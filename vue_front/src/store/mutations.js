import Constant from '../Constant.js';

export default {
  [Constant.TOGGLE_MARKDOWN_EDITOR] : (state) => {
    state.markdownEditorFlag = !state.markdownEditorFlag;
  },

  [Constant.GET_LOAD_CATEGORY] : (state, payload) => {
    state.category = payload;
  }
}
