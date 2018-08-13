module.exports = {

  getConnection: (pool) => {
    return new Promise((resolve, reject) => {

      pool.getConnection( (err, con) => {
        console.log('getConnection 실행됨');
        if(err){
          if(con) con.release();
          reject(err)
        } else {
          resolve(con);
        }

      })
    })
  },

  releaseCon: (con) => {
    con.release();
  },

  selectCategory: (con) => {
    return new Promise( (resolve, reject) => {
      let exec = con.query('SELECT * FROM category', ( err, result ) => {
        console.log(" 카테고리 SQL : ",exec.sql);

        if (err) {
          con.release();
          reject(err);
        }

        resolve(result);
      })
    })
  },
  insertCategory: (con, data) => {
    return new Promise( (resolve, reject) => {
      let exec = con.query("INSERT INTO category SET ? ", data, (err, result) => {
        console.log("카테고리 추가 SQL : ",exec.sql);

        if (err) {
          con.release();
          reject(err);
        }
        resolve(result);
      })
    })
  },
  
}
