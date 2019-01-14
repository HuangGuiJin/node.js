$(document).ready(function(){
    let del=$("#delete");
	del.click(()=>{
		let name=$("#namedelete").val();

		$.ajax({
			type:"post",
			url:"http://localhost:3000/setting/deleteUser",
			data:{
				name
				},
			success(data){
			// console.log(data)
			if((data.n)=="1"){
				alert("删除成功")
			}else{
				alert("删除失败")
			}

			}
		})
		
	})
})
