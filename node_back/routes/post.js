let query = require('../database/query');
// let timestamp = require('../database/timestamp');
// let mod_fun = require('./mod_functions');

module.exports = {
  add_category: async function(req, res) {
    // mysql pool 가져오기
    let pool = req.app.get('pool');
    let data = req.body.data;

    try {
      let con = await query.getConnection(pool);
      let result = await query.insertCategory(con, data);
      result.affectedRows > 0 ? res.send('정상적으로 추가 되었습니다.') : res.send('추가 되지 않았습니다.');
      await query.releaseCon(con); // pool 해제
    } catch (err) {
      console.error('add_category : ',err);
    }
  }

}
