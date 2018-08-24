var currentPath = null;		//当前的选择路径
var leftPerson = [];		//左边人员列表的数据
var rightPerson = [];		//右边人员列表的数据
var leftType = null;		//左边的人员列表类型：领导、员工
var rightType = null;		//右边的人员列表类型：领导、员工
var leftCurrent = null;		//左边当前的点击option
var rightCurrent = null;	//右边当前的点击option
var list = null;
var languageType = null;
var processLink = null;

//初始化公文页面
window.onload = function(){
	//获取url中的两个参数：文种类型、办理环节
	languageType = getParam("languageType");
	processLink = getParam("processLink");
	var pathSelect = $("#pathSelect");
	var opinionSelect = $("#opinionSelect");
	$.post("/DocumentController/listSelectPath",{
		"languageType":languageType,
		"processLink":processLink
	},function(data){
		if(data.status=="success"){
			list = data.list;
			pathSelect.append("<option param='0' value='" + list[0].name + "'>" + list[0].name + "</option>");
			pathSelect.append("<option param='1' value='" + list[1].name + "'>" + list[1].name + "</option>");
			opinionSelect.append("<option value='意见11'>意见1</option>");
			opinionSelect.append("<option value='意见22'>意见2</option>");
		}else{
			alert(data.info);
		}
		
	},"json")
}
//点击选择路径
function clickPathSelect(current){
	if(currentPath==null || currentPath!=$("option:selected",current).attr("param")){
		currentPath = $("option:selected",current).attr("param");
		leftPerson = null;
		rightPerson = null;
		leftType = null;
		rightType = null;
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
		actionSelect.append("<option selected='selected' value=''>--请选择常用动作--</option>");
		actionSelect.append("<option value='动作11'>动作1</option>");
		actionSelect.append("<option value='动作22'>动作2</option>");
		if(list[currentPath].number==0){
			$(".leftPersonnel").css("display","none");
			$(".rightPersonnel").css("display","none");
			$("#leftTitle").html('');
			$("#leftHandle").html('&nbsp;');
			$("#rightTitle").html("");
			$("#rightHandle").html('&nbsp;');
		}else{
			$.post("/DocumentController/listPersonnel",{},function(data){
		 		if(data.status == "success"){
		 			if(list[currentPath].number==1){
		 				//给左边的人员列表赋值
		 				$(".leftPersonnel").css("display","block");
		 				$("#leftTitle").html(list[currentPath].list[0].title);
		 				if(list[currentPath].list[0].timeStatus=="true"){
		 					$("#leftHandle").html('处理时间：<input id="leftDay" type="text" style="width:30px;">天<input id="leftTime" type="text" style="width:30px;">时');
		 				}else{
		 					$("#leftHandle").html('&nbsp;');
		 				}
		 				if(list[currentPath].list[0].personType=="领导"){
		 					leftPerson = data.leaderList;
		 				}else{
		 					leftPerson = data.personList;
		 				}
		 				leftType = list[currentPath].list[0].personType;
		 				setSelect(leftSelect,leftType,"left");
		 				
		 				$(".rightPersonnel").css("display","none");
		 				$("#rightTitle").html("");
		 				$("#rightHandle").html('&nbsp;');
		 			}else if(list[currentPath].number==2){
		 				//给左边的人员列表赋值
		 				$(".leftPersonnel").css("display","block");
		 				$("#leftTitle").html(list[currentPath].list[0].title);
		 				if(list[currentPath].list[0].timeStatus=="true"){
		 					$("#leftHandle").html('处理时间：<input id="leftDay" type="text" style="width:30px;">天<input id="leftTime" type="text" style="width:30px;">时');
		 				}else{
		 					$("#leftHandle").html('&nbsp;');
		 				}
		 				if(list[currentPath].list[0].personType=="领导"){
		 					leftPerson = data.leaderList;
		 				}else{
		 					leftPerson = data.personList;
		 				}
		 				leftType = list[currentPath].list[0].personType;
		 				setSelect(leftSelect,leftType,"left");
		 				
		 				//给右边的人员列表赋值
		 				$(".rightPersonnel").css("display","block");
		 				$("#rightTitle").html(list[currentPath].list[1].title);
		 				if(list[currentPath].list[1].timeStatus=="true"){
		 					$("#rightHandle").html('处理时间：<input id="rightDay" type="text" style="width:30px;">天<input id="rightTime" type="text" style="width:30px;">时');
		 				}else{
		 					$("#rightHandle").html('&nbsp;');
		 				}
		 				if(list[currentPath].list[1].personType=="领导"){
		 					rightPerson = data.leaderList;
		 				}else{
		 					rightPerson = data.personList;
		 				}
		 				rightType = list[currentPath].list[1].personType;
		 				setSelect(rightSelect,rightType,"right");
		 			}
		 		}else {
		 			alert(data.info);
		 		}
			},"json")
		}
	}
}

//给Select赋值
function setSelect(select,type,name){
	var array;
	if(name=="left"){
		array = leftPerson;
	}else{
		array = rightPerson;
	}
	if(type=="领导"){
		for(var i=0,l=array.length;i<l;i++){
			select.append("<option userName='" + array[i].name + "' proxy='" + array[i].proxy + "' proxyStatus='" + array[i].status + "'>" + array[i].name + "</option>");
		}
	}else if(type=="员工"){
		for(var i=0,l=array.length;i<l;i++){
			//如果该元素为对象，则表示该元素是一个部门
			if(array[i].name==null){
				select.append("<option value='\\" + Object.keys(array[i])[0] + "'>[+]" + Object.keys(array[i])[0] + "</option>");
			}else{
				select.append("<option userName='" + array[i].name + "' proxy='" + array[i].proxy + "' proxyStatus='" + array[i].status + "' value='\\" + array[i].name + "'>" + array[i].name + "</option>");
			}
		}
	}
}

//点击leftSelect和rightSelect,选择处理人员
function clickSelect(current,name){
	var arr;
	if(name=="left"){
		arr = leftPerson;
	}else if(name=="right"){
		arr = rightPerson;
	}
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
				if(arr[j].name==null && Object.keys(arr[j])[0] == val[i]){
					arr = arr[j][Object.keys(arr[j])[0]];
	                break;
				}
			}
		}
		//循环菜单内容并填充
		for(var x = 0;x < arr.length;x++){
			if(arr[x].name==null){
				option.after("<OPTION value='"+ option.val() +"\\" + Object.keys(arr[x])[0] + "'>" + space + "[+]" + Object.keys(arr[x])[0] + "</OPTION>" )
			}else{
				option.after("<OPTION userName='" + arr[x].name + "' proxy='" + arr[x].proxy + "' proxyStatus='" + arr[x].status + "' value='"+ option.val() +"\\" 
						+ arr[x].name + "'>" + space + arr[x].name + "</OPTION>" )
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
		var userName = option.attr("userName");
		var proxy = option.attr("proxy");
		var proxyStatus = option.attr("proxyStatus");
		var status = false;
		//遍历所有option 
	    $("#" + name + "List option").each(function(){ 
	    	if($(this).text() == text){
	    		status = true;
	    	}
	    });
		if(!status){
			$("#" + name + "List").append("<OPTION userName='" + userName + "' proxy='" + proxy + "' proxyStatus='" + proxyStatus + "'>" + text + "</OPTION>");
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
	var arr = null;
	var type = null;
	if(name=="left"){
		currentOption = leftCurrent;
		arr = leftPerson;
		type = leftType;
	}else if(name=="right"){
		currentOption = rightCurrent;
		arr = rightPerson;
		type = rightType;
	}
	if(type=="领导"){
		var status = false;
		var text = "";
		var userName = "";
		var proxy = "";
		var proxyStatus = "";
		 $("#" + name + "Select option").each(function(){ 
			 status = false;
			 text = "";
			 userName = $(this).attr("userName");
			 proxy = $(this).attr("proxy");
			 proxyStatus = $(this).attr("proxyStatus");
			 text = $(this).text();
			 $("#" + name + "List option").each(function(){ 
				if($(this).text() == text){
					status = true;
		    	}
		    });
		    if(!status){
		    	$("#" + name +"List").append("<OPTION userName='" + userName + "' proxy='" + proxy + "' proxyStatus='" + proxyStatus + "'>" + text + "</OPTION>");
		    }
	    });
	}else if(type=="员工"){
		if(currentOption!=null){
			//获取选中的option
			var option = $("option:selected",currentOption);
			//获取菜单
			var val = (option.val()).split('\\');
			//循环当前点击option的多级菜单
			for(var i = 1;i < val.length;i++){
				//循环人员名单数组
				for(var j=0;j < arr.length;j++){
					//如果当前元素与这一级菜单匹配，则将该元素赋值给arr并进入下一次循环
					if(arr[j].name==null && Object.keys(arr[j])[0] == val[i]){
						arr = arr[j][Object.keys(arr[j])[0]];
		                break;
					}
				}
			}
			var status = false;
			//循环菜单内容并填充
			for(var x = arr.length-1;x >= 0;x--){
				status = false;
				if(arr[x].name!=null){
					//遍历所有option 
				    $("#" + name + "List option").each(function(){ 
				    	if($(this).text() == arr[x].name){
				    		status = true;
				    	}
				    });
				    if(!status){
				    	$("#" + name +"List").append("<OPTION userName='" + arr[x].name + "' proxy='" + arr[x].proxy + "' proxyStatus='" + arr[x].status + "'>" + arr[x].name + "</OPTION>");
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

//点击提交
function submit(){
	alert(list[currentPath].number);
	var leftArray = [];
	var rightArray = [];
	//处理意见
	var opinions = $("#opinionText").val();
	//常用意见
	var useOpinions = $("#opinionSelect").val();
	//选择的选择路径
	var selectPath = $("#pathSelect").val();
	//选择的常用动作
	var selectAction = $("#actionSelect").val();
	//左标题
	var leftTitle = $("#leftTitle").html();
	//右标题
	var rightTitle = $("#rightTitle").html();
	var leftDay = $("#leftDay").val();
	var leftTime = $("#leftTime").val();
	var rightDay = $("#rightDay").val();
	var rightTime = $("#rightTime").val();
	if(leftTitle!=""){
		$("#leftList option").each(function(){
			var json = {
					"name":$(this).attr('userName'),
					"proxy":$(this).attr('proxy'),
					"status":$(this).attr('proxyStatus')
			}
			leftArray.push(json);
	    });
	}
	if(rightTitle!=""){
		$("#rightList option").each(function(){
			var json = {
					"name":$(this).attr('userName'),
					"proxy":$(this).attr('proxy'),
					"status":$(this).attr('proxyStatus')
			}
			rightArray.push(json);
	    });
	}
	$.post("/DocumentController/submit",{
		"languageType":languageType,
		"processLink":processLink,
		"opinions":opinions,
		"useOpinions":useOpinions,
		"selectPath":selectPath,
		"selectAction":selectAction,
		"leftTitle":leftTitle,
		"rightTitle":rightTitle,
		"leftArray":JSON.stringify(leftArray),
		"rightArray":JSON.stringify(rightArray),
		"leftDay":leftDay,
		"leftTime":leftTime,
		"rightDay":rightDay,
		"rightTime":rightTime,
		"number":list[currentPath].number
		},function(data){
		alert(data.info);
	},"json")
}

//点击代理
function proxy(){
	var leftArray = [];
	var rightArray = [];
	$("#rightProxyTitle").html("");
	$("#leftProxyTitle").html("");
	$("#leftProxyDiv").html("");
	$("#rightProxyDiv").html("");
	//左标题
	var leftTitle = $("#leftTitle").html();
	//右标题
	var rightTitle = $("#rightTitle").html();
	$("#leftList option").each(function(){
		var json = {
				"userName":$(this).attr('userName'),
				"proxy":$(this).attr('proxy'),
				"proxyStatus":$(this).attr('proxyStatus')
		}
		leftArray.push(json);
    });
	$("#rightList option").each(function(){
		var json = {
				"userName":$(this).attr('userName'),
				"proxy":$(this).attr('proxy'),
				"proxyStatus":$(this).attr('proxyStatus')
		}
		rightArray.push(json);
    });
	setTable("left",leftTitle,leftArray);
	setTable("right",rightTitle,rightArray);
	$(".shadow").css("display","block");
	$(".box").css("display","block");
}

//给代理的表格赋值
function setTable(name,title,proxyArray){
	if(title!=""){
		$("#" + name + "ProxyTitle").html(title);
		$("#" + name + "ProxyDiv").html('<table id=' + name + 'Table class="gridtable">'+
					'<tr>'+
						'<th>姓名</th>'+
						'<th>代理人姓名</th>'+
						'<th>是否使用代理</th>'+
					'</tr>'+
				'</table>');
		for(var i=0;i<proxyArray.length;i++){
			if(proxyArray[i].proxy!="null"){
				var content = '<tr>'+
				'<td>' + proxyArray[i].userName + '</td>'+
				'<td>' + proxyArray[i].proxy + '</td>'+
				'<td>';
				if(proxyArray[i].proxyStatus=='true'){
					content = content + '<select class="form-control">'+
						'<option value="true" selected>是</option>'+
		                '<option value="false">否</option>'+
		            '</select>';
				}else{
					content = content + '<select class="form-control">'+
						'<option value="true">是</option>'+
		                '<option value="false" selected>否</option>'+
		            '</select>';
				}
				content = content + '</td></tr>';
				$("#" + name + "Table").append(content);
			}
		}
	}
}

//确定代理
function submitProxy(){
	var trList = $('#leftTable').children('tbody').children('tr');
	for (var i=1;i<trList.length;i++) {
		var td = trList.eq(i).find("td");
		var userName = td.eq(0).text();
		var proxy = td.eq(1).text();
		var proxyStatus = td.eq(2).find("select").val();
		$("#leftList option").each(function(){
			if(userName==$(this).attr('userName')){
				$(this).attr('proxyStatus',proxyStatus);
				return false;
			}
	    });
	}
	
	trList = $('#rightTable').children('tbody').children('tr');
	for (var i=1;i<trList.length;i++) {
		var td = trList.eq(i).find("td");
		var userName = td.eq(0).text();
		var proxy = td.eq(1).text();
		var proxyStatus = td.eq(2).find("select").val();
		$("#rightList option").each(function(){
			if(userName==$(this).attr('userName')){
				$(this).attr('proxyStatus',proxyStatus);
				return false;
			}
	    });
	}
	$(".shadow").css("display","none");
	$(".box").css("display","none");
}

//获取url后的参数
function getParam(paramName) { 
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return decodeURI(r[2]); return null;
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