let query = require('../database/query');
let timestamp = require('../database/timestamp');
// let mod_fun = require('./mod_functions');

module.exports = {
  main : function (req,res) {
    console.log('main');
    //res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.redirect('/public/index.html');

  },
  
  load_category: async function(req,res){
    console.log('load_category 호출됨');

    let pool = req.app.get('pool');
    try {
      let con = await query.getConnection(pool);
      let result = await query.selectCategory(con);
      res.json(result);
      await query.releaseCon(con);
    } catch (e) {
      console.error('load_category: ',e);
    }
  },


} // the end of module.exports
