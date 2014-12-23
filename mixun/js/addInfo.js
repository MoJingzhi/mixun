//添加单图文消息
function addOneInfo(messageData){
	//这是获取到的数据-----start
	var titleVal = messageData.messageList[0].title;
	var titleUrl = messageData.messageList[0].url;
	var imgUrl = messageData.messageList[0].imgUrl;
	var summaryVal = messageData.summary;
	//这是获取到的数据-----end

	//这是创建元素，并且添加到dom树当中-----start
	var $info = theInfo();
	var $content = infoContent().
					append(infoTitle(titleVal)).
					append(infoTime(2014,12,7,19,19)).
					append(infoImg(imgUrl)).
					append(summaryBox(summaryVal));
	var $footer = infoFooter().
					append(editIcon()).
					append(delIcon()).
					append(tipEdit()).
					append(tipDel());
	return $info.append($content).append($footer);
	//这是创建元素，并且添加到dom树当中-----end
}
//添加多图文消息
function addMoreInfo(messageData){
	//这数据是多图文消息中的主消息内容-----start
	var len = messageData.messageList.length-1;
	var mainTitle = messageData.messageList[0].title;
	var mainTitleUrl = messageData.messageList[0].url;
	var mainImgUrl = messageData.messageList[0].imgUrl;
	//这数据是多图文消息中的主消息内容-----end
	//创建容器
	var $moreInfo = theMoreInfo();
	var $content = infoContent().
					append(infoTime(2014,12,7,12,20)).
					append(infoImg(mainImgUrl).append(infoTitle(mainTitle,mainTitleUrl)));

	//循环添加小图文消息-----start
	for(var i=1;i<=len;i++){
		//这是一个小图文消息的内容-----start
		var smallTitle = messageData.messageList[i].title;
		var smallTitleUrl = messageData.messageList[i].url;
		var smallImgUrl = messageData.messageList[i].imgUrl;
		//这是一个小图文消息的内容-----end
		$content.append(smallItem(smallImgUrl,i,smallTitle,smallTitleUrl));
	}
	//循环添加小图文消息-----end

	//添加消息footer-----start
	var $footer = infoFooter().
					append(editIcon()).
					append(delIcon()).
					append(tipEdit()).
					append(tipDel());
	//添加消息footer-----end
	return $moreInfo.append($content).append($footer) ;
}

//这是公共部分
function theInfo(){
	return $("<div></div>").addClass('info');
}
function theMoreInfo(){
	return $("<div></div>").addClass('more-info');	
}
function infoTitle(title,url){
	var $h4 = $("<h4></h4>").addClass('info-title');
	var $a = $("<a></a>").html(title).attr("href",url);
	return $h4.append($a);
}
function infoContent(){
	return $("<div></div>").addClass('info-content');
}
function infoTime(y,m,d,h,min){
	var now = new Date(),
		nowY = now.getFullYear(),
		nowM = now.getMonth()+1,
		nowD = now.getDate();
	var $h5 = $("<h5></h5>").addClass('info-time');
	if(y<nowY){//不是同一年的了，显示年月日
		return $h5.html(y + "年" + m + "月" + d + "日");
	}
	else if((nowM==m) && (nowD==(d+1)) ){//昨天的
		return $h5.html("昨天");
	}
	else if(nowM==m && nowD==d){
		return $h5.html(h + ":" + min);
	}
	else{
		return $h5.html(m + "月" + d + "日");
	}
}
function infoImg(imgUrl){
	var $box = $("<div></div>").addClass('info-img-box');
	var $img = $("<img>").attr("src",imgUrl);
	return $box.append($img);
}
function summaryBox(summary){
	return $("<h5></h5>").html(summary);
}
function infoFooter(){
	return $("<div></div>").addClass('info-footer row');
}
function editIcon(){
	var $icon = $("<div></div>").addClass('col-md-6 icon-box').attr("data-target","edit");
	var $a = $("<a></a>").addClass('glyphicon glyphicon-pencil');
	return $icon.append($a);
}
function delIcon(){
	var $icon = $("<div></div>").addClass('col-md-6 icon-box left').attr("data-target","del");
	var $a = $("<a></a>").addClass('glyphicon glyphicon-trash');
	return $icon.append($a);
}
function tipDel(){
	var $del = $("<div></div>").addClass('tip del');
	var $p = $("<p></p>").html("删除");
	$span = $("<span></span>").addClass('triangle');
	return $del.append($p).append($span);
}
function tipEdit(){
	var $edit = $("<div></div>").addClass('tip edit');
	var $p = $("<p></p>").html("编辑");
	$span = $("<span></span>").addClass('triangle');
	return $edit.append($p).append($span);
}
//这部分是多图文特有的---------------------
function smallItem(smallImgUrl,flag,smallTitle,smallTitleUrl){
	var $div = $("<div></div>").addClass('small-item row'),
		$smallImgBox = $("<div></div>").addClass('small-img-box col-md-offset-1 col-md-4'),
		$img = $("<img>").attr("src",smallImgUrl),
		$title = infoTitle(smallTitle,smallTitleUrl).removeClass('info-title').addClass('col-md-7');
	if(flag == 1){ 
		$div.addClass('first-item')
	};
	$smallImgBox.append($img);
	return $div.append($title).append($smallImgBox);
}