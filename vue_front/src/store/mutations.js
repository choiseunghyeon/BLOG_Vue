import Constant from '../Constant.js';

export default {
  [Constant.TOGGLE_MARKDOWN_EDITOR] : (state) => {
    state.markdownEditorFlag = !state.markdownEditorFlag;
  },

}
