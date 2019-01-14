let token=require("./token.js");
//加密
let crypto= token.createToken({
	password:"123",
	name:"ning"
	
},15);
// console.log(crypto);
console.log(token.decodeToken(crypto).payload.data);
console.log(token.checkToken(crypto));//返回布尔值



