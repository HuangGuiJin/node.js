$(() => {
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
				headers:{
					token:localStorage.getItem("token")
				},
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async ()=>{
        let data = await getUserList();
        console.log(data);
		if(data){
			let html = data.map((item,index)=>{
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>
					  <img style=" width:50px;height:50px "src="${item.img}" />
					</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
		}else{
			location.href="../login.html";
		}
        
    })()
	
	
	
});


$(document).ready(function(){
	//自动登录
	  $.ajax({
	    type: "POST",
	    url: "http://localhost:3000/setting/autologin",
		headers:{
			token:localStorage.getItem("token")
			},
	    success(data) {
	        // console.log(data)
			if(data.status==false){
				location.href = "../login.html";
			}else{
				console.log("时效执行中");
			}
	    }
	});
	
	
	
})