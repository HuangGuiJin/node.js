var express = require('express');
var router = express.Router();
var {
	connect,
	find,
	insert,
	ObjectId,
	deleted,
	updata

} = require('../libs/mongo.js');

var token2=require("../libs/token.js");


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});






//路由
//这个用来检测是否响应成功
// 查询
router.post('/findUser',async (req, res, next) =>{
		// console.log(token2.checkToken(req.headers.token));
		if(token2.checkToken(req.headers.token)){
			next();
			status:"success";
		}else{
			status:"token失效"
		}
		
},async (req, res, next) => {
	let {
		age
	} = req.body
	//查询
	let data = await find(`liu`, age ? {
		age
	} : {})
	res.send(data);
});

//插入
router.post('/inserUser', async (req, res, next) => {
	//解构
	let {
		name,
		img,
		age,
		skill,
		// description
	} = req.body
	//插入
	// console.log(req.body);
	let data = await insert(`liu`,[{
			name,
			age,
			skill,
			img
			// description
		}]);
		// console.log(data);
	res.send(data);
});


//修改
router.post('/updataUser', async (req, res, next) => {
	let {
		name,
		age,
		skill,
		img
	} = req.body
	 // console.log(req.body);
	let data = await updata(`liu`,{
		  name
	},{
		  age,
		  skill,
		  img
		  
	})
	console.log(data);
	res.send(data);
});

//删除
router.post('/deleteUser', async (req, res, next) => {
  let {
		name
	}=req.body;
	console.log(name);
	let data = await deleted(`liu`,{
		name:name
	});
	res.send(data);
	
});

//自动登录
router.post('/autoLogin', async (req, res, next) => {
  // console.log(req.headers.token)
  
  let {token}=req.headers;
  // console.log(token);
  res.send({
    status: token2.checkToken(token)
  });
})


module.exports = router;
