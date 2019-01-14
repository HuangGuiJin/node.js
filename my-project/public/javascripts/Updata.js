$(document).ready(function(){
    let updata=$("#updata");
	var img=null;
	updata.click(()=>{
		let name=$("#nameupdata").val();
		let age=$("#ageupdata").val();
		let skill=$("#skillupdata").val();
		// let description=$("#descriptionupdata").val();
	    // console.log(description);
		$.ajax({
			type:"post",
			url:"http://localhost:3000/setting/updataUser",
			data:{
				name,
				age,
				skill,
				img
				},
			
			success(data){	
			if((data.n)=="1"){
				alert("修改成功");
			}else{
				alert("修改失败");
			}
			
			}
		})
		
	});
	
	
	 var fileNode = document.getElementById("file");
	// console.log(fileNode);
	       fileNode.onchange = function () {
			   // files是一个对象,保存图片的信息
	           // console.log(fileNode.files);
	           var xmlhttp = new XMLHttpRequest();
	           // 设置回调，当请求的状态发生变化时，就会被调用  
	           xmlhttp.onreadystatechange = function () {
	               //上传成功，返回的文件名，设置到父节点的背景中  
	               if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                   console.log(xmlhttp.responseText);
	                   let data = JSON.parse(xmlhttp.responseText);
					   // console.log(data);
	                   document.getElementById("img").src = data.filename
					   img=data.filename;
	               }
	           }
	           //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
	           // 专门传文件的,图片音频
			   var data = new FormData();
			   // console.log(data);
	           // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
	           data.append("logo",fileNode.files[0]);
			   // console.log(data);
	           xmlhttp.open("post", "http://localhost:3000/uploading/uploads", true);
				//不要缓存  
				//xmlhttp.setRequestHeader("If-Modified-Since", "0");  
				//提交请求  
				// console.log(fileNode.files);
				xmlhttp.send(data);
				//清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
				fileNode.value = null;
	       }
	
	
	
})
