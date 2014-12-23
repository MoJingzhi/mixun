
$(function(){
	//请求数据，添加内容
	addInfo();
	//select info
	selectInfo();
	//tool tip
	tooltip();
	//删除内容
    deleteInfo();

    //测试
    
});
//请求数据，添加内容
function addInfo(){
	var url = 'http://10.50.9.30:8080/MesClouds/message';
	$.get(url,function(data){
		var jsonData;
		if(typeof(data) != 'object'){
			jsonData = $.parseJSON(data);
		}
		else {
			jsonData = data;	
		}
		console.log(jsonData);
		handleData(jsonData);
	});
	// var $list = $("#content-list").children('.list');
	// for(var count=0;count<6;count++){
	// 	var idx = minHeight($("#content-list").children('.list'));
	// 	if((count%2)==0){
	// 		$list.eq(idx).append(addOne(count));
	// 	}
	// 	else{
	// 		$list.eq(idx).append(addMore(count));
	// 	}
	// }	
}

//处理获取到的数据
function handleData(jsonData){
	var len = jsonData.length;
	var $list = $("#content-list").children('.list');
	for(var i=0;i<len;i++){
		var idx = minHeight($list);//找出高度最低的列
		var multiple = jsonData[i].multi;
		if(multiple){
			//如果是多图文的话,插入多图文
			$list.eq(idx).append(addMoreInfo(jsonData[i]));

		}else{
			//如果是单图文的话，插入单图文
			$list.eq(idx).append(addOneInfo(jsonData[i]));
		}
	}
	return;
}
//找出高度最低的列表
function minHeight(list){
	var minH = parseInt(list.eq(0).css("height"));
	var	outIdx = 0;
	var len = list.size();
	var minH = parseInt(list.eq(0).css("height"));
	for(var i=1;i<len;i++){
		var thisH = parseInt(list.eq(i).css("height"));
		if(minH > thisH) {
			minH = thisH;
			outIdx = i;
		}
	}
	return outIdx;
}

//删除内容
function deleteInfo(){
	var $footer = $(".info-footer").find("a");
	var $contentList = $("#content-list");
	$footer.on("click",function(){});
	$contentList.on("click",delInfo);

	function delInfo(ev){
		$target = $(ev.target);
		if($target.hasClass('glyphicon-trash')){
			var $thisInfo = $target.parent().parent().parent().stop().hide(500);
		}
	}
}
//add new info
function selectInfo(){
	var $addInfo = $("#add-info");
	var $typeBox = $addInfo.find('.type-box')
	$addInfo.on("mouseover",hideCross);
	$addInfo.on("mouseout",showCross);
	$typeBox.on("mouseover",function(){});
	$typeBox.on("mouseout",function(){});
	function showCross(ev){
		if(ev.target.className != "one"){
			$(this).find('.one').removeClass('one-active');
		}
		if(ev.target.className != "more"){
			$(this).find('.more').removeClass('more-active');	
		}
		$(this).children('.add-icon').show();
		$(this).children('.select-type').hide();
		return false;
	}
	function hideCross(ev){
		if($(ev.target).hasClass("one") || $(ev.target).hasClass("one-img")){
			$(this).find('.one').addClass('one-active');
		}
		if($(ev.target).hasClass("more") || $(ev.target).hasClass("more-img")){
			$(this).find('.more').addClass('more-active');	
		}
		$(this).children('.add-icon').hide();
		$(this).children('.select-type').show();
		return false;
	}
}
//tool tip
function tooltip(){
	var $footer = $(".info-footer").find("a");
	var $contentList = $("#content-list");

	$footer.on("mouseover",function(){});
	$footer.on("mouseout",function(){});
	$contentList.on("mouseover",tooltipShow);
	$contentList.on("mouseout",tooltipHide);

	function tooltipShow(ev){
		$target = $(ev.target);
		if($target.hasClass('glyphicon')){
			var $paren = $target.parent(),
				classNa = $paren.attr("data-target");
			$target.addClass('active');
			$paren.siblings('.' + classNa).show();

		}
		return false;
	}
	function tooltipHide(ev){
		$target = $(ev.target);
		if(!($target.hasClass('glyphicon-pencil')) || !($target.hasClass('glyphicon-trash'))){
			var $paren = $target.parent();
			$paren.siblings('.tip').hide().end().find(".glyphicon").removeClass('active');
		}
		return false;
	}
}