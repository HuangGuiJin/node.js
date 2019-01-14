$(document).ready(function() {
	var signin = $("#signin");
    var input = $("#inputPassword");
	function fn() {
		let inputEmail = $("#inputEmail").val();
		let inputPassword = $("#inputPassword").val();
		// console.log(inputPassword);
		$.ajax({
			type: "post",
			url: "http://localhost:3000/users/login",
			data: {
				inputEmail,
				inputPassword
			},
			success(data) {
				console.log(data);
				if (data.status === "success") {
					alert('登录成功')
					localStorage.setItem("token",data.token);
					location.href = "http://localhost:3000/Find.html"
					
					inputEmail.val()="";
					
					inputPassword.val()="";
					inputEmail.focus();
					inputPassword.focus();
				} else {
					alert('登录失败');
				}


			}
		})

	}
    
	signin.click(() => {
		fn();

	});

   //按enter键进行跳转
	input.keydown(() => {
		if (event.keyCode == 13){
			fn();
			
			
		}
	})



});
