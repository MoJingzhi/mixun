var info = {
	"info_len":"3",//所有图文消息的长度
	//content数组用的每一个元素就是要显示的一个图文消息
	"info_content":[
	{
		"publish_time_year":"2014",//下面三个是发表的时间
		"publish_time_month" : "12",
		"publish_time_day" : "4",
		"publish_time_hour" : "15",
		"publish_time_minute" : "30",
		"one_or_more" : "one",//是单图文还是多图文
		"summary":"这是摘要",//单图文才显示摘要，多图文不显示，因此不用数组存储
		"info":{
			"info_标题":["标题1"],//第一个是主标题，剩下的都是副标题
			"info_img_url":["../img/lamborghini.jpg"],//第一个是主要内容的图片，剩下的是副内容的图片
			"show":[true,true,true]//设置图片是否显示在正文当中，一般情况下，都是显示的
		},

	},
	{
		"publish_time_year":"2014",//下面三个是发表的时间
		"publish_time_month" : "12",
		"publish_time_day" : "4",
		"publish_time_hour" : "15",
		"publish_time_minute" : "30",
		"one_or_more" :"more",//是单图文还是多图文
		"summary":"这是摘要",//单图文才显示摘要，多图文不用显示，因此不用数组存储
		"info":{
			"info_title":["主标题","标题2","标题3"],//第一个是主标题，剩下的都是副标题
			"info_img_url":["../img/more.png","../img/small-lam.jpg","../img/small-lam.jpg"],//第一个是主要内容的图片，剩下的是副内容的图片
			"img_show":[true,true,true]//设置图片是否显示在正文当中，一般情况下，都是显示的
		},

	},
	{
		"publish_time_year":"2014",//下面三个是发表的时间
		"publish_time_month" : "12",
		"publish_time_day" : "4",
		"publish_time_hour" : "15",
		"publish_time_minute" : "30",
		"one_or_more" : "one",//是单图文还是多图文
		"summary":"这是摘要",//单图文才显示摘要，多图文不用显示，因此不用数组存储
		"info":{
			"info_title":["标题1"],//第一个是主标题，剩下的都是副标题
			"info_img_url":["../img/lamborghini.jpg"],//第一个是主要内容的图片，剩下的是副内容的图片
			"show":[true,true,true]//设置图片是否显示在正文当中，一般情况下，都是显示的
		},

	}
	]
};