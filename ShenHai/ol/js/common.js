/**
 * 公共JS文件
 */

/*
 * 正则表达式
 */
// 用户名
var usernameRegexp = /^[a-zA-z]\w{5,15}$/;
// 密码
var passwordRegexp = /^\S{6,16}$/;
// 联系电话
var phoneRegexp = /^1[3|4|5|7|8][0-9]{9}$/;
// 电子邮箱
var emailRegexp = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;

/**
 * 正则匹配数据
 * @param type 数据类型
 * @param value 数据值
 * @returns
 */
function regexpMatch(type, value) {
	if("username" == type) {
		return usernameRegexp.test(value);
	}else if("password" == type) {
		return passwordRegexp.test(value);
	}else if("phone" == type) {
		return phoneRegexp.test(value);
	}else if("email" == type) {
		return emailRegexp.test(value);
	}
}

/**
 * 显示提示语
 * @param dom 节点对象
 * @param message 提示信息
 */
function showTitle(dom, message) {
	var classes = $(dom.parent().find("span:last")).attr("class");
	if(classes == undefined || classes != "ts") {
		dom.parent().append('<span class="ts">' + message + '</span>');
	}else {
		$(dom.parent().find("span:last")).remove();
		dom.parent().append('<span class="ts">' + message + '</span>');
	}
}

/**
 * 移除提示语
 * @param dom 节点对象
 */
function removeTitle(dom) {
	dom.parent().find("span:last").remove();
	
	var classes = $($(".btn").parent().find("span:last")).attr("class");
	if(classes == "ts") {
		removeTitle($(".btn"));
	}
}

/**
 * 提交返回错误结果提示
 * @param property 错误属性
 * @param message 提示内容
 * @returns
 */
function showCommitResult(property, message) {
	showTitle($("#" + property), message);
}

/**
 * Alert弹窗
 * @param dom 节点对象
 * @returns
 */
function alert(dom, alertType, content, callback) {
	// 设置标题
	var title = "";
	if(alertType) {
		// 正确提示
		title = "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> 提示</h4></div>";
	}else {
		// 错误提示
		title = "<div class='widget-header'><h4 class='smaller'><i class='icon-warning-sign red'></i> 提示</h4></div>";
	}
	// 设置提示内容
	dom.html(content);
	// 展示弹窗
	dom.removeClass('hide').dialog({
		modal: true,
		title: title,
		buttons: [ 
			{
				text: "确定",
				"class" : "btn btn-primary btn-xs",
				click: function() {
					if(typeof(eval(callback)) == "function") {
						dom.dialog("close");
						// 执行回调函数
						(callback());
					}else {
						dom.dialog("close"); 
					}
				} 
			}
		]
	});
	dom.prev().find("span[class='ui-button-text']").remove();
}

/**
 * Confirm弹窗
 * @param titleText 标题内容
 * @param content 提示内容
 * @param confirmType confirm弹窗类型
 * @param callback 回调函数
 * @param param 参数
 * @returns
 */
function confirm(titleText, content, confirmType, callback, param) {
	// 设置标题
	var title = "";
	if(confirmType) {
		// 删除confirm
		title = "<div class='widget-header'><h4 class='smaller'><i class='icon-warning-sign red'></i> " + titleText + "</h4></div>";
	}else {
		// 提示confirm
		title = "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> " + titleText + "</h4></div>";
	}
	// 设置提示内容
	$("#confirm").html(content);
	// 展示弹窗
	$("#confirm").removeClass('hide').dialog({
		resizable: false,
		modal: true,
		title: title,
		buttons: [
			{
				html: "<i class='icon-trash bigger-110'></i>&nbsp; 确定",
				"class" : "btn btn-danger btn-xs",
				click: function() {
					// 关闭弹窗
					$("#confirm").dialog("close");
					// 调用回调函数
					callback(param);
				}
			}, 
			{
				html: "<i class='icon-remove bigger-110'></i>&nbsp; 取消",
				"class" : "btn btn-xs",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
	$("#confirm").prev().find("span[class='ui-button-text']").remove();
}


/**
 * 树形结构调用的公共方法
 */
//加载下拉菜单树信息
function viewSelectTree(treeNodes, domId, methodName) {
	if (treeNodes) {
		zTreeNodes = treeNodes;
		var setting = {
			view: {
				showIcon: false,//隐藏图标
				txtSelectedEnable: false,//设置 zTree 是否允许可以选择 zTree DOM 内的文本
				selectedMulti: false,//设置是否允许同时选中多个节点。
				dblClickExpand: false,//双击节点时，是否自动展开父节点的标识	
				autoCancelSelected: false,//点击节点时，按下 Ctrl 或 Cmd 键是否允许取消选择操作。
				showLine: true//设置 zTree 是否显示节点之间的连线。
			},
			data: {
				simpleData: { 
					enable: true 
				} 
			},
	        callback: {
	        	onClick: methodName
	        }
		};
		// 初始化树
		$.fn.zTree.init($("#" + domId), setting, zTreeNodes);
		// 获得树对象
		zTree = $.fn.zTree.getZTreeObj(domId);
		// 树形全部展开
		zTree.expandAll(true);
	}
}

/**
 * 如果值 不等于空 则去掉空格
 * @param value
 * @returns
 */
function valueTrim(value){
	if(value != undefined){
		return value.trim();
	}else{
		return '';
	}
}


//加载查询条件
function initSelectCondition(jsppage,elementId){
	// 请求数据
	$.ajax({
		url: "/backstage/common/findConditionName",
		dataType: "json",
		data: {
			"jsppage": jsppage
		},
		success: function(data) {
			if(data) {
				if(data.status == "success") {
					//组装option
					var conditionNameList = data.conditionNameList
					//字符串
					var optionElement = "<option value=''>请选择</option>";
					//循环遍历 组装
					for(var i = 0; i < conditionNameList.length; i++){
						optionElement += "<option value="+i+" data_name="+conditionNameList[i]+">"+conditionNameList[i]+"</option>"
					}
					//添加子元素
					$("#"+elementId).html(optionElement);
					
					//为该元素添加个改变事件
					$("#"+elementId).change(function(){
						//获取当前选择 的 条件名
						var name = $(this).find("option:selected").attr("data_name");
						
						//判断 当前选择的 是不是请选择
						if(name == undefined){
							//插入位置的元素 清空一下
							$("#copy").remove();	
							$(".copy").remove();	
						}else{
							//发送Ajax请求 获取该条件内容及类型
							//请求数据
							$.ajax({
								url: "/backstage/common/findCondition",
								dataType: "json",
								data: {
									"name": name,
									"jsppage": jsppage
								},
								success: function(data) {
									if(data) {
										if(data.status == "success") {
											//获取到当前条件
											var selectCondition = data.selectCondition
											
											//校验空
											if(selectCondition != null){
												//获取 属性类型 (select,text,date)
												var propertytype = selectCondition.propertytype
												//判断类型
												if(propertytype == 'select'){
													//下拉
													var element = $("<div style='float: left; width: 215px;' id='copy'>" + 
																		"<div class='col-sm-9' style='width: 95%;'>" +
																			"<select class='form-control' id='"+selectCondition.property+"' style='width: 100%; height: 32px;'>" +
																				selectCondition.propertycontent +
																			"</select>" +
																		"</div>" +
																	"</div>")
													//插入位置的元素 清空一下
													$("#copy").remove();	
													$(".copy").remove();	
													
													//插入该元素
													element.insertAfter($("#"+elementId).parent().parent());							
														
												}else if(propertytype == 'text'){
													var element = $("<div style='float: left; width: 215px;' id='copy'>" + 
																		"<div class='col-sm-9' style='width: 95%;'>" +
																			"<input type='text' id='"+selectCondition.property+"' placeholder='"+name+"' class='col-xs-10 col-sm-5' style='width: 100%; height: 32px;'>" +
																		"</div>" +
																	"</div>")
													//插入位置的元素 清空一下
													$("#copy").remove();
													$(".copy").remove();	
													
													//插入该元素
													element.insertAfter($("#"+elementId).parent().parent());
													
												}else{
													//日期
													//由于页面写死 那么判断 id 是否是日期的id
													if(selectCondition.property == 'id-date-picker-1'){
														//插入位置的元素 清空一下
														$("#copy").remove();
														$(".copy").remove();	
														
														//先等 那么先添加个 该ID 的 日期控件
														var element = $("<div style='float: left; width: 215px;' id='copy' class='copy'>" + 
																			"<div class='col-sm-9' style='width: 70%;'>" +
																				"<div class='row' style='width: 250px'>" +
																					"<div class='col-xs-8 col-sm-11'>" +
																						"<div class='input-group'>" +
//																							"<input class='form-control date-picker' id='id-date-picker-1' type='text' data-date-format='yyyy/mm/dd' />" +
																							"<input class='form-control Wdate' id='id-date-picker-1' type='text' style='height:30px;' onClick=\"WdatePicker({dateFmt: 'yyyy/MM/dd'})\"/>"+
																							/*"<span class='input-group-addon'>" +
																								"<i class='icon-calendar bigger-110'></i>" +
																							"</span>" +	*/
																						"</div>" +
																					"</div>" +	
																				"</div>" +		
																			"</div>" +
																		"</div>")
																		
														// 日期选择器 初始化
														/*element.find('.Wdate').datepicker({autoclose:true}).next().on(ace.click_event, function(){
															$(this).prev().focus();
														});*/
														//插入该元素
														element.insertAfter($("#"+elementId).parent().parent());
														
														var newElement = $("<div style='float: left; width: 300px;' id='copy' class='copy'>" + 
																				"<label class='col-sm-3 control-label no-padding-right' for='form-field-1' style=' line-height: 26px;'> --至--： </label>" + 
																				"<div class='col-sm-9' style='width: 70%;padding-left:0;'>" +
																					"<div class='row' style='width: 250px'>" +
																						"<div class='col-xs-8 col-sm-11'>" +
																							"<div class='input-group'>" +
//																								"<input class='form-control date-picker' id='id-date-picker-2' type='text' data-date-format='yyyy/mm/dd' />" +
																								"<input class='form-control Wdate' id='id-date-picker-2' type='text' style='height:30px;' onClick=\"WdatePicker({dateFmt: 'yyyy/MM/dd'})\"/>"+
																								/*"<span class='input-group-addon'>" +
																									"<i class='icon-calendar bigger-110'></i>" +
																								"</span>" +	*/
																							"</div>" +
																						"</div>" +	
																					"</div>" +		
																				"</div>" +
																			"</div>")
														// 日期选择器 初始化
														/*newElement.find('.Wdate').datepicker({autoclose:true}).next().on(ace.click_event, function(){
															$(this).prev().focus();
														});*/	
														//插入该元素
														newElement.insertAfter(element);
													}else{
														
														//插入位置的元素 清空一下
														$("#copy").remove();
														$(".copy").remove();	
														
														//先等 那么先添加个 该ID 的 日期控件
														var element = $("<div style='float: left; width: 215px;' id='copy' class='copy'>" + 
																			"<div class='col-sm-9' style='width: 70%;'>" +
																				"<div class='row' style='width: 250px'>" +
																					"<div class='col-xs-8 col-sm-11'>" +
																						"<div class='input-group'>" +
//																							"<input class='form-control date-picker' id='id-date-picker-3' type='text' data-date-format='yyyy/mm/dd' />" +
																							"<input class='form-control Wdate' id='id-date-picker-3' type='text' style='height:30px;' onClick=\"WdatePicker({dateFmt: 'yyyy/MM/dd'})\"/>"+
																						"</div>" +
																					"</div>" +	
																				"</div>" +		
																			"</div>" +
																		"</div>")
														// 日期选择器 初始化
														/*element.find('.date-picker').datepicker({autoclose:true}).next().on(ace.click_event, function(){
															$(this).prev().focus();
														});*/
														//插入该元素
														element.insertAfter($("#"+elementId).parent().parent());
														
														var newElement = $("<div style='float: left; width: 300px;' id='copy' class='copy'>" + 
																				"<label class='col-sm-3 control-label no-padding-right' for='form-field-1' style=' line-height: 26px;'> --至--： </label>" + 
																				"<div class='col-sm-9' style='width: 70%;'>" +
																					"<div class='row' style='width: 250px'>" +
																						"<div class='col-xs-8 col-sm-11'>" +
																							"<div class='input-group'>" +
//																								"<input class='form-control date-picker' id='id-date-picker-4' type='text' data-date-format='yyyy/mm/dd' />" +
																								"<input class='form-control Wdate' id='id-date-picker-4' type='text' style='height:30px;' onClick=\"WdatePicker({dateFmt: 'yyyy/MM/dd'})\"/>"+
																							"</div>" +
																						"</div>" +	
																					"</div>" +		
																				"</div>" +
																			"</div>")
																			
														// 日期选择器 初始化
														/*newElement.find('.date-picker').datepicker({autoclose:true}).next().on(ace.click_event, function(){
															$(this).prev().focus();
														});	*/
														//插入该元素
														newElement.insertAfter(element);
													}
													
												}
												
											}
											
										}else {
											if(data.text) {
												alert($("#alert"), false, '<p>'+data.text+'</p>');
											}else {
												alert($("#alert"), false, '<p>系统异常, 请刷新后重试</p>');
											}
										}
									}else {
										if(data.text) {
											alert($("#alert"), false, '<p>'+data.text+'</p>');
										}else {
											alert($("#alert"), false, '<p>系统异常, 请刷新后重试</p>');
										}
									}
								}
							});
						}
					})
				}else {
					if(data.text) {
						alert($("#alert"), false, '<p>'+data.text+'</p>');
					}else {
						alert($("#alert"), false, '<p>系统异常, 请刷新后重试</p>');
					}
				}
			}else {
				if(data.text) {
					alert($("#alert"), false, '<p>'+data.text+'</p>');
				}else {
					alert($("#alert"), false, '<p>系统异常, 请刷新后重试</p>');
				}
			}
		}
	});
}

//取消选中所有节点
function deselect(domId) {
	// 获得树对象
	zTree = $.fn.zTree.getZTreeObj(domId);
	//获取所有选中的节点集合
	var nodes = zTree.getSelectedNodes();
	//如果存在选中的节点，取消选中
	if (nodes.length>0) { 
		zTree.cancelSelectedNode(nodes[0]);
	}
}


//获取模块下所有选中节点的功能菜单ID
function getAllCheckedIds(checkNodes) {
  var ids = "";
  if(checkNodes != null && checkNodes.length > 0) {
      for(var i = 0; i < checkNodes.length; i ++) {
          ids += "," + checkNodes[i].id;  
      }
  }
  return ids;
}

//获取模块下 所有选中节点的name
function getAllCheckedNames(checkNodes) {
  var names = "";
  if(checkNodes != null && checkNodes.length > 0) {
      for(var i = 0; i < checkNodes.length; i ++) {
          names += "," + checkNodes[i].name;  
      }
  }
  return names;
}

function getCorrectPageCode(){
	$(".ui-pg-input").keydown(function(event){
	    // 获得适用于所有游览器的Event
	    var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e.keyCode == 13){
			//获取 当前用户输入 的 页面 页码
			var currentPageCode = $(this).val();
			//获取 总的页码
			var totalPageCode = $("#sp_1_grid-pager").text();
			totalPageCode = totalPageCode.replace(',','')
			if(parseInt(currentPageCode) > parseInt(totalPageCode)){
				if(e && e.stopPropagation) {
					e.stopPropagation();    
					e.preventDefault();    
				} else {
					window.event.cancelBubble = true; 
					window.event.returnValue = false;     
				}
			}
		}
	});
}

