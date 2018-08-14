
/*
REST API 설계
POST 생성, GET 조회, DELETE 삭제, PUT 업데이트에 근거하여 각 기능을 구현

 */

module.exports = {
	server_port: 3000,
	route_info: [
	    //===== GET 조회 =====//
			{ url:'/', method:'main', type:'get'} // vue 파일 주기
	    ,{ url:'/load_category', method:'load_category', type:'get'}			// 모든 category 정보 주기
			// , { url:'/load_article', method:'load_article', type:'get'} // article 정보 주기
			//
			// // ===== POST 생성 ===== //
	    ,{ url:'/add_category', method:'add_category', type:'post'}				// category 추가
			// ,{ url:'/add_article', method:'add_article', type:'post'}				// article 등록
			// ,{ url:'/login_submit', method:'login_submit', type:'post'}				// 로그인

			//
			//
			// // ===== PUT 업데이트 ===== //
			,{ url:'/update_category', method:'update_category', type:'put'} // category 수정
			// ,{ url:'/update_article', method:'update_article', type:'put'} // article 수정
			// ,{ url:'/update_responsible', method:'update_responsible', type:'put'} // 책임 수사 관서 수정
			//
			//
			// // ===== DELETE 삭제 ===== //
	    ,{ url:'/delete_category', method:'delete_category', type:'delete'}			// category 삭제
			// ,{ url:'/delete_article', method:'delete_article', type:'delete'}			// article 삭제

	]
}
