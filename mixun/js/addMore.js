$(function(){
	//左侧显示部分，编辑或删除东西，鼠标放到上面进行性显示
	editOrDel();
	//鼠标放在添加消息上面时候的提示
	hoverImgInfo();
	//点击添加图文消息
	addImgInfo();
	//点击编辑图文消息
	clickEditImgInfo();
	//点击删除图文消息
	clickDelImgInfo();
	//编辑图文消息
	editImgInfo();

	//点击从图库选择图片
	upLoadImgFromDeposi();
	//test
	$("#save").click(function(){
		arrangeEditData();
		console.log(editAreaData);
	});
});

//左侧显示部分，编辑或删除东西，鼠标放到上面进行性显示
function editOrDel(){
	//为整个版面添加事件
	var detailInfo = $("#detail-info");

	detailInfo.on("mouseover",showCoverTop);
	detailInfo.on("mouseout",hideCoverTop);

	//显示灰色层，显示出提示
	function showCoverTop(ev){
		var $target = $(ev.target);
		if($target.hasClass('title')){
			$target.siblings('.top-cover').show();
		}
		else if($target.hasClass('cover-word')){
			$target.siblings(".top-cover").show();
		}
		else if($target.hasClass('icon')){
			$target.parent().show();
			$target.addClass('icon-active');
		}
		else if($target.hasClass('small-icon')){
			$target.parent().show();
			$target.addClass('icon-active');
		}
		else if($target.hasClass('small-item')){
			$target.children('.small-top-cover').show();
		}
		else if($target.hasClass('small-title')){
			$target.parent().siblings('.small-top-cover').show();
		}
		else if($target.hasClass('col-md-7')){
			$target.siblings('.small-top-cover').show();
		}
		else if($target.hasClass('small-top-cover')){
			$target.show();
		}
		return false;
	}
	//隐藏灰色层，隐藏出提示
	function hideCoverTop(ev){
		var $target = $(ev.target);
		if($target.hasClass('top-cover')){
			$target.hide();
		}
		else if($target.hasClass('icon')){
			$target.removeClass('icon-active');
		}
		else if($target.hasClass('small-icon')){
			$target.removeClass('icon-active');
		}
		else if($target.hasClass('small-item')){
			$target.children('.small-top-cover').hide();
		}
		else if($target.hasClass('small-top-cover')){
			$target.hide();
		}
		return false;
	}
}

//鼠标放在添加消息上面时候的提示
function hoverImgInfo(){
	var $addSmallItem = $("#detail-info").children('.add-small-item');
	$addSmallItem.on("mouseover",darkedColor);
	$addSmallItem.on("mouseout",lightedColor);

	function darkedColor(ev){
		$target = $(ev.target);
		if($target.hasClass('cross-icon')){
			$target.addClass('icon-active');
			$target.parent().addClass('item-active');
		}
		else{
			$target.addClass('item-active');
			$target.children().addClass('icon-active');
		}
		return false;
	}
	function lightedColor(ev){
		$target = $(ev.target);
		if($target.hasClass('cross-icon')){
			$target.addClass('icon-active');
			$target.parent().addClass('item-active');
		}
		else if($target.hasClass('add-small-item')){
			$target.removeClass('item-active');
			$target.children('.icon-active').removeClass('icon-active');
		}
		return false;
	}
}

//点击添加图文消息
function addImgInfo(){
	var addSmallItem = $("#detail-info").children('.add-small-item');
	addSmallItem.on("click",insertNewImgInfo);//insertNewInfo这个函数在insertInfoToMore.js文件
}	

//点击编辑图文消息的图标，注意，是那个编辑的图标，也就是那个铅笔的图标,而不是对内容进行编辑
function clickEditImgInfo(){
	var $detailBox = $("#detail-info");
	$detailBox.on("click",editInfo);

	function editInfo(ev){
		var $target = $(ev.target);
		if($target.hasClass('edit-icon')){
			var $parent = $target.parent().parent();
			var $parentId;
			//这是选择到了小的图文消息
			if($parent.hasClass('item')){
				//
			}
			//这是选择到了主图文消息
			else{
				//因为主图文消息比小图文消息多一层，因此要向上再上一层
				$parent = $parent.parent();
			}
			$parentId = $parent.attr("data-id");
			var $now = $("#detail-info").children(".now");//查找之前的item

			if($parentId != $now.attr("data-id")){//不是点击同一个元素

				if($("#detail-info").children().hasClass('last')) {
					var $last = $("#detail-info").children(".last");//查找之前再之前的item
					$last.removeClass('last');//之前再之前的设置为没有，这个可能是undefine
				}
				$now.removeClass('now').addClass('last');//之前的设置为last
				$parent.addClass('now');

				//1.保存之前的数据
				saveEditData();
				//2.把当前选中的图文消息的编辑区数据显示出来
				showEditData($parentId);
				//3.对相应的编辑区位置做出改变
				changeLocate($parentId);
			}
			return false;
		}
	}

	//1.保存之前的数据
	function saveEditData(){
		var $editArea = $("#edit-area");
		var titleVal = $editArea.find("#editTitle").val();
		var authorVal = $editArea.find("#editAuthor").val();
		var checkBoxVal = $editArea.find("#cover-img").attr("checked");
		var ueditorVal = $($("#ueditor_0")[0].contentWindow.document.body).html();
		var editData = {
			"tit" : titleVal,
			"author" : authorVal,
			"checkbox" : checkBoxVal,
			"ueditor" : ueditorVal
		}
		var _id = parseInt($("#detail-info").children(".last").attr("data-id"));
		setEditData(editData,_id);//该方法在editAreaData文件中
		return;
	};

	//2.把当前选中的图文消息的编辑区数据显示出来
	function showEditData($parentId){
		var _id = parseInt($parentId);
		var selectedData = getEditData(_id);//获取数据
		console.log();
		//设置数据
		var $editArea = $("#edit-area");
		$editArea.find("#editTitle").val(selectedData.tit);
		$editArea.find("#editAuthor").val(selectedData.author);
		$editArea.find("#cover-img").attr("checked",selectedData.checkbox);
		$($("#ueditor_0")[0].contentWindow.document.body).children().remove().end().html(selectedData.ueditor);
		console.log(selectedData.ueditor);
		return;
	}

	//3.对应的编辑区位置做出相应的改变
	function changeLocate($parentId){
		var $children = $("#detail-info").children(),
			index=0;
		$children.each(function(idx,element){
			if($(this).attr("data-id") == $parentId){
				index = idx;
				return false;
			}
		});
		var marginTop = index==0 ? 0 : (100 * index)+88;
		$("#edit-area").css("margin-top",marginTop);
	}
}

//点击删除图文消息
function clickDelImgInfo(){
	var $detailBox = $("#detail-info");
	$detailBox.on("click",delInfo);

	function delInfo(ev){
		var $target = $(ev.target);
		if($target.hasClass('del-icon')){
			var $smallItem = $target.parent().parent();
			//恢复位置上一个元素的数据-----start
			if($smallItem.hasClass('now')){
				$smallItem.removeClass('now').siblings('.last').removeClass('last').end().prev().addClass('now');
			}
			if($smallItem.hasClass('last')){
				$smallItem.siblings('.now').removeClass('now').addClass('last').end().removeClass('last').prev().addClass('now');
			}
			else{
				if($smallItem.siblings().hasClass('last')){
					$smallItem.siblings().removeClass('last');
				}
				$smallItem.siblings(".now").removeClass('now').addClass("last").end().prev().addClass('now');
				//$smallItem.siblings(".now").removeClass('now');
			}

			var prevId = parseInt($smallItem.prev().attr("data-id"));
			recoverEditData(prevId);
			changeLocate(prevId);
			//恢复位置上一个元素的数据-----end
			_id = parseInt($smallItem.attr("data-id"));
			$smallItem.remove();//删除预览对应部分
			delEditData(_id);//删除数据，这个方法在editAreaData文件里面
		}
	}
	//恢复编辑区的内容
	function recoverEditData(id){
		var selectedData = getEditData(id);
		var $editArea = $("#edit-area");
		$editArea.find("#editTitle").val(selectedData.tit);
		$editArea.find("#editAuthor").val(selectedData.author);
		$editArea.find("#cover-img").attr("checked",selectedData.checkbox);
		$($("#ueditor_0")[0].contentWindow.document.body).html(selectedData.ueditor);
		return;
	}
	//编辑区位置偏移
	function changeLocate($parentId){
		var $children = $("#detail-info").children(),
			index=0;
		$children.each(function(idx,element){
			if($(this).attr("data-id") == $parentId){
				index = idx;
				return false;
			}
		});
		var marginTop = index==0 ? 0 : (100 * index)+88;
		$("#edit-area").css("margin-top",marginTop);
	}
}

//编辑图文消息,注意，这里是直接在编辑区进行输入编辑
function editImgInfo(){
	//编辑标题
	$("#editTitle").on("keyup",function(){
		$now = $("#detail-info").children(".now");
		$nowTitle = $now.find(".edit-title");
		$val = $.trim($(this).val());
		if($val != ""){
			$nowTitle.html($(this).val());
		}
		else{
			$nowTitle.html("标题");
		}
	});
}
