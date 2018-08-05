var param1 = null;
var param2 = null;
var array = [];
var leftCurrent = null;
var rightCurrent = null;
var type;

//初始化公文页面
window.onload = function(){
	//获取url中的跟公文相关的两个参数
	param1 = getParam("param1");
	param2 = getParam("param2");
	//获取"选择路径"和"常用意见"Select,便于后续赋值
	var pathSelect = $("#pathSelect");
	var opinionSelect = $("#opinionSelect");
	if(param1==1 && param2=="a"){
		pathSelect.append("<option value='送批示'>送批示</option>");
		pathSelect.append("<option value='分发文件'>分发文件</option>");
		opinionSelect.append("<option value='意见a1'>意见a1</option>");
		opinionSelect.append("<option value='意见a2'>意见a2</option>");
	}else{
		pathSelect.append("<option value='结束当前处理'>结束当前处理</option>");
		pathSelect.append("<option value='发给其他人'>发给其他人</option>");
		opinionSelect.append("<option value='意见b1'>意见b1</option>");
		opinionSelect.append("<option value='意见b2'>意见b2</option>");
	}
}

//点击选择路径
function clickPathSelect(current){
	var option = $("option:selected",current);
	var actionSelect = $("#actionSelect");
	var leftSelect = $("#leftSelect");
	var rightSelect = $("#rightSelect");
	var leftList = $("#leftList");
	var rightList = $("#rightList");
	actionSelect.empty();
	leftSelect.empty();
	rightSelect.empty();
	leftList.empty();
	rightList.empty();
	actionSelect.append("<option selected='selected'>--请选择常用动作--</option>");
	if(option.val()=="送批示"){
		type = 0;
		$(".leftPersonnel").css("display","block");
		$(".rightPersonnel").css("display","none");
		$("#leftTitle").html("批示");
		$("#leftHandle").html('&nbsp;');
		$("#rightTitle").html("");
		$("#rightHandle").html('&nbsp;');
		actionSelect.append("<option value='动作a1'>动作a1</option>");
		actionSelect.append("<option value='动作a2'>动作a2</option>");
		//获取人员的信息
		$.post("/DocumentController/listPersonnel",{
			"type":type
		},function(data){
	 		if(data.status == "success"){
	 			array = data.list;
	 			setSelect(leftSelect);
	 		}else {
	 			alert(data.info);
	 		}
		})
	}else{
		type = 1;
		$(".leftPersonnel").css("display","block");
		$(".rightPersonnel").css("display","block");
		$("#leftTitle").html("办理");
		$("#leftHandle").html('处理时间：<input id="leftDay" type="text" style="width:30px;">天<input id="leftTime" type="text" style="width:30px;">时');
		$("#rightTitle").html("阅文");
		$("#rightHandle").html('&nbsp;');
		actionSelect.append("<option value='动作b1'>动作b1</option>");
		actionSelect.append("<option value='动作b2'>动作b2</option>");
		//获取人员的信息
		$.post("/DocumentController/listPersonnel",{
			"type":type
		},function(data){
	 		if(data.status == "success"){
	 			array = data.list;
	 			setSelect(leftSelect);
	 			setSelect(rightSelect);
	 		}else {
	 			alert(data.info);
	 		}
		})
	}
}

//给Select赋值
function setSelect(select){
	if(type==0){
		for(var i=0,l=array.length;i<l;i++){
			select.append("<option value='\\" + array[i] + "'>" + array[i] + "</option>");
		}
	}else if(type==1){
		for(var i=0,l=array.length;i<l;i++){
			//如果该元素为对象，则表示该元素是一个部门
			if(isJson(array[i])){
				select.append("<option value='\\" + Object.keys(array[i])[0] + "'>[+]" + Object.keys(array[i])[0] + "</option>");
			}
			//如果该元素为字符串，则表示该元素一个员工
			else{
				select.append("<option value='\\" + array[i] + "'>" + array[i] + "</option>");
			}
		}
	}
}

//点击leftSelect和rightSelect,选择处理人员
function clickSelect(current,name){
	var arr = array;
	//获取选中的option
	var option = $("option:selected",current);
	//获取菜单
	var val = (option.val()).split('\\');
	//获取内容
	var text = option.text();
	var status = between(text);
	//status为+表示展开菜单
	if(status == "+"){
		if(name=="left"){
			leftCurrent = current;
		}else if(name=="right"){
			rightCurrent = current;
		}
		var space = "";
		//循环当前点击option的多级菜单
		for(var i = 1;i < val.length;i++){
			//每一级菜单都做一次缩进
			space = space + "　";
			//循环人员名单数组
			for(var j=0;j < arr.length;j++){
				//如果当前元素与这一级菜单匹配，则将该元素赋值给arr并进入下一次循环
				if(isJson(arr[j]) && Object.keys(arr[j])[0] == val[i]){
					arr = arr[j][Object.keys(arr[j])[0]];
	                break;
				}
			}
		}
		//循环菜单内容并填充
		for(var x = 0;x < arr.length;x++){
			if(isJson(arr[x])){
				option.after("<OPTION value='"+ option.val() +"\\" + Object.keys(arr[x])[0] + "'>" + space + "[+]" + Object.keys(arr[x])[0] + "</OPTION>" )
			}else{
				option.after("<OPTION value='"+ option.val() +"\\" 
						+ arr[x] + "'>" + space + arr[x] + "</OPTION>" )
			}
		}
		//将菜单前的[+]改为[-]
		option.text(text.replace('[+]', '[-]'));
	}
	//status为-表示收缩菜单
	else if(status == "-"){
		if(name=="left"){
			leftCurrent = current;
		}else if(name=="right"){
			rightCurrent = current;
		}
		//将菜单前的[-]改为[+]	
		option.text(text.replace('[-]', '[+]'));
		//获取当前select的js对象(jq用索引删除option有问题)
		var obj = document.getElementById(name+'Select');
		//获取点击菜单的索引
		var index = option.index();
		//获取点击菜单的value
		var value = option.val();
		while(true){
			//如果下一个菜单包涵点击菜单，且包涵的位置为0，则删除该菜单
			if(option.next().val()!=null && option.next().val().indexOf(value)==0){
				obj.options.remove(index+1);
			}else{
				break;
			}
		}
	}
	//status为空串表示点击的是具体人员
	else if(status == ""){
		if(name=="left"){
			leftCurrent = null;
		}else if(name=="right"){
			rightCurrent = null;
		}
		var text = option.text().trim("　");
		var status = false;
		//遍历所有option 
	    $("#" + name + "List option").each(function(){ 
	    	if($(this).text() == text){
	    		status = true;
	    	}
	    });
		if(!status){
			$("#" + name + "List").append("<OPTION>" + text + "</OPTION>");
		}
	}
}

//删除人员
function clickList(current){
	$("option:selected",current).remove();
}

//批量添加人员
function addList(name){
	var currentOption = null;
	if(name=="left"){
		currentOption = leftCurrent;
	}else if(name=="right"){
		currentOption = rightCurrent;
	}
	if(type==0){
		var status = false;
		var text = "";
		 $("#" + name + "Select option").each(function(){ 
			 status = false;
			 text = "";
			 var text = $(this).text();
			 $("#" + name + "List option").each(function(){ 
				if($(this).text() == text){
					status = true;
		    	}
		    });
		    if(!status){
		    	$("#" + name +"List").append("<OPTION>" + text + "</OPTION>");
		    }
	    });
	}else if(type==1){
		if(currentOption!=null){
			//获取选中的option
			var option = $("option:selected",currentOption);
			//获取菜单
			var val = (option.val()).split('\\');
			var arr = array;
			//循环当前点击option的多级菜单
			for(var i = 1;i < val.length;i++){
				//循环人员名单数组
				for(var j=0;j < arr.length;j++){
					//如果当前元素与这一级菜单匹配，则将该元素赋值给arr并进入下一次循环
					if(isJson(arr[j]) && Object.keys(arr[j])[0] == val[i]){
						arr = arr[j][Object.keys(arr[j])[0]];
		                break;
					}
				}
			}
			var status = false;
			//循环菜单内容并填充
			for(var x = arr.length-1;x >= 0;x--){
				status = false;
				if(!isJson(arr[x])){
					//遍历所有option 
				    $("#" + name + "List option").each(function(){ 
				    	if($(this).text() == arr[x]){
				    		status = true;
				    	}
				    });
				    if(!status){
				    	$("#" + name +"List").append("<OPTION>" + arr[x] + "</OPTION>");
				    }
				}
			}
		}
	}
}

//清空人员
function emptyList(name){
	$("#"+name+"List").empty();
}

function submit(){
	//处理意见
	var opinionText = $("#opinionText").val();
	//常用意见
	var opinionSelect = $("#opinionSelect").val();
	//选择的选择路径
	var pathSelect = $("#pathSelect").val();
	//选择的常用动作
	var actionSelect = $("#actionSelect").val();
	//左人员名单
	var leftArray = [];
	//右人员名单
	var rightArray = [];
	if(type==0){
		$("#leftList option").each(function(){
			leftArray.push($(this).text());
	    });
	}else if(type==1){
		$("#leftList option").each(function(){
			leftArray.push($(this).text());
	    });
		$("#rightList option").each(function(){
			rightArray.push($(this).text());
	    });
		
	}
	console.log(opinionText);
	console.log(opinionSelect);
	console.log(pathSelect);
	console.log(actionSelect);
	console.log(leftArray);
	console.log(rightArray);
}

//获取url后的参数
function getParam(paramName) { 
    paramValue = "", isFound = !1; 
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
    } 
    return paramValue == "" && (paramValue = null), paramValue 
}

//判断该参数是否为对象
function isJson(str) {
	if(typeof(str)=="object"){
		return true;
	}else{
		false;
	}
    
}

//截取字符[ ]中间的值
function between(text){
	try{
		return text.match(/\[(\S*)\]/)[1];
	}catch(err){
		return "";
	}
}