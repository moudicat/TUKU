$(function(){


	function getName(){
		var myFile = $("#file").val();
		var length = myFile.length;
		var x = myFile.lastIndexOf("\\");
		x++; 
		var fileName = myFile.substring(x,length).replace(/\s+/g,"_"); 
		console.log(fileName);
		return fileName;
	}

	var upForm=$("#tkUpload");
	upForm.submit(function(){
		console.log(upForm);

		var qnForm=$("<form />");
		qnForm.attr({
			method : upForm.attr("method"),
			action : upForm.attr("action"),
			enctype : upForm.attr("enctype"),
		});
		fname=$("input[name='x:folder']").val()+((new Date()).valueOf())+getName();
		var friname=($("input[name='x:friname']").val() ? $("input[name='x:folder']").val()+$("input[name='x:friname']").val() : fname).replace(/\s+/g,"_");
		$("input[name='x:friname']").val(friname);
		var chd=upForm.children();
		for (var i=0;i<chd.length;i++){
			qnForm.append($(chd[i]).removeAttr("id"));
		}
		$.get("/a/genPP?fname="+fname,function(token){
			qnForm.append($("<input>").attr({
				name : "token",
				value : token,
			}));
			qnForm.append($("<input>").attr({
				name : "key",
				value : fname,
			}));
			console.log(qnForm);
//			qnForm.submit();
			qnForm.ajaxSubmit({
				target:"#msg",
				dataType:"json",
				clearForm:false,
				resetForm:false,
                success:function(res){
					$("#msg").html(res.url);
                    alert("wow");
                }
            });
            
			
		});
		
		return false;
	})



});

function doUpload(name,file){

    var upForm=new FormData();
    upForm.append("file",file);



    upForm.enctype="multipart/form-data";
    $.get("/a/genPP?fname="+name,function(token) {
        upForm.append("token",token);
        upForm.append("key",name);
        upForm.append("x:friname",name);

        //var oReq = new XMLHttpRequest();
		$.ajax({
			url: "http://upload.qiniu.com",
			type: "POST",
			data: upForm,
			processData: false,
			contentType: false
		});
        //oReq.open("POST", "http://upload.qiniu.com");
        //oReq.send(upForm);
    });
}
