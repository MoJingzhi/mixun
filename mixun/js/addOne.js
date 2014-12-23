$(function(){
	//编辑图文消息
	editImgInfo();
	//点击保存数据的操作
	save();
	//从图库添加图片
	upLoadImgFromDeposi();
});
//编辑图文消息
function editImgInfo(){
	//编辑标题
	$("#editTitle").on("keyup",function(){
		var $val = $.trim($(this).val());
		//console.log($val);
		if($val != ""){
			$("#detail-info").find(".article-title").children("a").html($val);
		}
		else{
			$("#detail-info").find(".article-title").children("a").html("标题");
		}
	});

	//添加摘要
	$("#edit-area").find(".add-summary").children("a").on("click",function(){
		$(this).siblings('textarea').show();
	});

	//编辑摘要
	$("#edit-area").find(".add-summary").children("textarea").on("keyup",function(){
		$val = $.trim($(this).val());
		if($val != ""){
			$(".img-box").children('.show-summary').show().html($val);
		}
		else{
			$(".img-box").children('.show-summary').hide().html("");
		}
	});
}