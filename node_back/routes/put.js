let query = require('../database/query');
// let timestamp = require('../database/timestamp');
// let mod_fun = require('./mod_functions');

module.exports = {
  update_category: async function(req, res){
    console.log('update_category');

    let data = req.body.data;
    console.log(data);
    let pool = req.app.get('pool');

    try {
      let con = await query.getConnection(pool);
      for (var i = 0; i < data.length; i++) {
        let result = await query.updateCategory(con, data[i]);
        if(result.affectedRows !== 1)
          res.send('카테고리 수정이 실패하였습니다.')
      }
      res.send('카테고리가 수정 되었습니다.')
      await query.releaseCon(con); // pool 해제
      } catch (err) {
        console.error('update_myinfo : ',err);
      }
  }

}
