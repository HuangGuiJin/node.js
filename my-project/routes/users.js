var express = require('express');
var router = express.Router();
var {
	find
} = require("../libs/mongo.js");

var token=require("../libs/token.js");
// console.log(token);
// 登录
router.post('/login', async (req, res, next) => {
	//解构
	let {
		inputEmail,
		inputPassword
	} = req.body
	// res.send(req.body);

	//利用find的方法查询
	let data = await find(`liu`,{//获取整段数据
		name: inputEmail
	});

	
	// console.log(data)
// 	let data1=(data[0]).password;
// 	console.log(data1);

// 	let pas=JSON.stringify(inputPassword);
      // console.log(pas);
  if ((data[0]).password === inputPassword) {
	  res.send({
		  status:"success",
		  token:token.createToken({
			  inputEmail,
			  inputPassword
		  },60)
	  });
	  
  } else {
    res.send({
		status:"fail"
	});
  }

});






module.exports = router;
