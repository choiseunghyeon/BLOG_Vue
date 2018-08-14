const query = require('../database/query');
// const mod_fun = require('./mod_functions');

module.exports = {

  delete_category :  async function(req, res){
    let pool = req.app.get('pool');
    let id = req.body.id;

    try {
      let con = await query.getConnection(pool);
      let result = await query.deleteCategory(con,id);
      await query.releaseCon(con); //pool 해제
      result.affectedRows == 1 ? res.send('삭제 되었습니다.') : res.send('실패 하였습니다.');
    } catch (err) {
      console.error('delete_category : ',err);
    }
  }

} // the end of module.exports's object
