var map;
function init(){
	//百度地图API功能
	map= new BMap.Map("baidumap");//创建map实例
	map.centerAndZoom(new BMap.Point(114.353622,30.56486), 15);//中心城市
	map.setCurrentCity("武汉");//设置地图显示的城市，必须设置
	map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
	var mapstyle={ style:"dark"}
	map.setMapStyle({style:'blue'});
	var point = new BMap.Point(114.339626,30.583379); // 创建点坐标
	var options = {
		renderOptions: {
			map: map
		},
		onSearchComplete: function(results) {
			alert('Search Completed');
			//可添加自定义回调函数
		}
	};
	var localSearch = new BMap.LocalSearch(map, options);
	map.addEventListener("load", function() {
		var circle = new BMap.Circle(point, 5000, {
			fillColor: "blue",
			strokeWeight: 1,
			fillOpacity: 0.3,
			strokeOpacity: 0.3
		});		
		map.addOverlay(circle);
		localSearch.searchNearby('菜市场', point, 5000, {
		});
	});
	map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
	map.enableScrollWheelZoom();
	map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件

	var drawingManager = new BMapLib.DrawingManager(map, {
		isOpen: false, //是否开启绘制模式
		enableDrawingTool: true, //是否显示工具栏
		drawingToolOptions: {
			anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
			offset: new BMap.Size(5, 5), //偏离值
			scale: 0.8, //工具栏缩放比例
			drawingModes: [
				BMAP_DRAWING_CIRCLE
			]
		}
	});
	var circle = null;
	drawingManager.addEventListener('circlecomplete', function(e, overlay) {
	//	circlecomplete
	    map.clearOverlays();
		circle = e;
		map.addOverlay(overlay);		
		var radius = parseInt(e.getRadius());
		var center = e.getCenter();
		drawingManager.close();
		localSearch.searchNearby('菜市场', center, radius, {
		});
	});
}
//步行规划函数
function WalkRouteQuery(){
	alert("即将开始查询步行路线");
	var a=document.getElementById("tex_a").value;
	alert("输入的起点是"+a);
	var b=document.getElementById("tex_b").value;
	alert("输入的起点是"+b);
	var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
	walking.search(a,b);
}
//驾车路线函数
function DrivingQuery(){
		alert("即将开始查询驾车路线");
	var a=document.getElementById("tex_a").value;
	alert("输入的起点是"+a);
	var b=document.getElementById("tex_b").value;
	alert("输入的起点是"+b);
	map.clearOverlays();
	var a=document.getElementById("tex_a").value;
	var b=document.getElementById("tex_b").value;	
	var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
	driving.search(a,b);
}
//公交路线函数
function BusQuery(){
	alert("即将开始查询公交路线");
	var a=document.getElementById("tex_a").value;
	alert("输入的起点是"+a);
	var b=document.getElementById("tex_b").value;
	alert("输入的起点是"+b);
	map.clearOverlays();
	var a=document.getElementById("tex_a").value;
	var b=document.getElementById("tex_b").value;	
		var transit = new BMap.TransitRoute(map, {
		renderOptions: {map: map, panel: "r-result"}
	});
	transit.search(a,b);
}
	function G(id) {
		return document.getElementById(id);
  }
	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_b"
		,"location" : map
	});
	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_a"
		,"location" : map
	});
		
	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});
	//创建单点标记函数
	function addMarker(point){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
	}
	//创建跳动标记函数
	function addMarkerBound(point){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳过的动画
	}
	//创建图片标记函数
	function addMarkerPic(point){
		var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
		var marker = new BMap.Marker(point,{icon:myIcon});//创建标记
		map.addOverlay(marker);
	}
	//添加骑士
	function addBayi(){
		//清除地图覆盖物
		map.clearOverlays();
		//创建添加的标记点
		var point = new BMap.Point(114.335377,30.579198)
		map.centerAndZoom(point,18);
		//调用标记点函数进行标记
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		var content ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>我的家</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b176.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/.WHtJA3YqTbUyopoWU8VjWE20.Ef3t.Uf4bd3Uvp7Fo!/c/dLAAAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>湖北大学琴园小区</p>" + 
	"</div>";
		addClickHandler(content,marker);
	}
	function addGuangdong(){
		//清除地图覆盖物
		map.clearOverlays();
		//创建添加的标记点
		var point = new BMap.Point(114.339626,30.583379)
		map.centerAndZoom(point,18);
		//调用标记点函数进行标记
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		
		var content ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>我的公司</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b366.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/rbljnwM7ERl7JDNuy0QqQaXbQAliRWq0E92js0JKbr8!/c/dG4BAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>湖北大学资源环境学院</p>" + 
	"</div>";
		addClickHandler(content,marker);
	}
		function addShanghai(){
		//清除地图覆盖物
		map.clearOverlays();
		//创建添加的标记点
		var point = new BMap.Point(114.336,30.5838)
		map.centerAndZoom(point,18);
		//调用标记点函数进行标记
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		var content ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>地铁站</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b222.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/FBg8q.KHTG4eRLYnmYVAuG3lq2LaNCC.VPr3OaAbPS4!/c/dN4AAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>轨道交通7号线：湖北大学站</p>" + 
	"</div>";
		addClickHandler(content,marker);
	}
		function addBeijing(){
		//清除地图覆盖物
		map.clearOverlays();
		//创建添加的标记点
		var point = new BMap.Point(114.33858,30.578913)
		map.centerAndZoom(point,18);
		//调用标记点函数进行标记
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
		var content ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>公交站</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b367.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/H8l2G.oT7sBRh5B.QsvlwOcqWdqqh0*f1y*fHO3QgSo!/c/dG8BAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>734路：团结大道沙湖公馆</p>" + 
	"</div>";
		addClickHandler(content,marker);
	}
	//显示全部
	function fullscreen(){
		//清除地图覆盖物
		map.clearOverlays();
		//定义信息点坐标集合；
		var data_info=[	[114.335377,30.579198,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>我的家</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b176.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/.WHtJA3YqTbUyopoWU8VjWE20.Ef3t.Uf4bd3Uvp7Fo!/c/dLAAAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>湖北大学琴园小区</p>" + 
	"</div>"],
						[114.339626,30.583379,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>我的公司</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b366.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/rbljnwM7ERl7JDNuy0QqQaXbQAliRWq0E92js0JKbr8!/c/dG4BAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>湖北大学资源环境学院</p>" + 
	"</div>"],
						[114.336,30.5838,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>地铁站</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b222.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/FBg8q.KHTG4eRLYnmYVAuG3lq2LaNCC.VPr3OaAbPS4!/c/dN4AAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>轨道交通7号线：湖北大学站</p>" + 
	"</div>"],
						[114.33858,30.578913,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>公交站</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo' src='http://b367.photo.store.qq.com/psb?/V11uvKuu0ZKKMD/H8l2G.oT7sBRh5B.QsvlwOcqWdqqh0*f1y*fHO3QgSo!/c/dG8BAAAAAAAA&bo=lgCWAJYAlgAFACM!' width='139' height='104' title='天安门'/>" + 
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>734路：团结大道沙湖公馆</p>" + 
	"</div>"],
						
						];
						//遍历每个点的经纬度
						//data_info[i][0],每一个坐标点的第一列，即经度
						//data_info[i][1]，每一个坐标点的第二列，即纬度
						for (var i=0;i<data_info.length;i++){
						var point = new BMap.Point(data_info[i][0],data_info[i][1]);
						//调用添加标注点函数，逐个添加标记点
						var content=data_info[i][2];
						//调用添加注记点函数，逐个添加标记点
						
						var marker=new BMap.Marker(point);
						map.addOverlay(marker);
						addClickHandler(content,marker);
						}
						//定义地图的中心点，在中国的中心，线附近
						var point = new BMap.Point(114.339626,30.583379);
						//显示中心与地图级别，为了能看到全国范围
						map.centerAndZoom(point,14);
	}
//注记点点击事件调用打开窗口信息
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}
	
//弹出窗口
function openInfo(content,e){
	
	var opts={
		width:450,    //信息窗宽度
		height:280,   //信息窗高度
		title:"信息窗",//信息窗标题
		enableMessage:true//设置允许信息窗发送短息
	}
	
	var p=e.target;
	var point= new BMap.Point(p.getPosition().lng,p.getPosition().lat);
	var infoWindow=new BMap.InfoWindow(content,opts);// 创建信息窗对象
	map.openInfoWindow(infoWindow,point);//开启信息窗
}

function localsearch(){
	var options = {
		renderOptions : {map:map,autoViewport:true},pageCapacity:99,
		onSearchComplete:function(results){
			//判断状态是否正确
			//BMAP_STATUS_SUCCESS=0为检索正确
			if (local.getStatus()==BMAP_STATUS_SUCCESS){
				var s = [];
				map.clearOverlays();
				for(var i = 0;i < results.getCurrentNumPois();i ++){
					s.push(results.getPoi(i).title+","+results.getPoi(i).address+","+results.getPoi(i).point.lng+","+results.getPoi(i).point.lat);
					var point = new BMap.Point(results.getPoi(i).point.lng,results.getPoi(i).point.lat);
					var marker=new BMap.Marker(point);
					map.addOverlay(marker);
				}
				document.getElementById("r-result").innerHTML = s.join("<br/>");
			}
		}
	};

	var local=new BMap.LocalSearch(map,options);
	var city= document.getElementById("cityName").value;
	if(city!=""){
		map.centerAndZoom(city,11);     //用城市名设置地图中心点
	}
	else{
		alert('请输入城市名！');
	}
	var txt_search = document.getElementById("text_search").value;
	if(txt_search!=""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称！');
	}
}
		
//地名检索并分页显示结果
function searchpage(){
	var local = new BMap.LocalSearch(map,{
		renderOptions:{map:map,panel:"r-result"}
	});
	var city = document.getElementById("cityName").value;
	if(city!=""){
		map.centerAndZoom(city,11);
	}
	else{
		alert('请输入城市名！');
	}
	var txt_search = document.getElementById("text_search").value;
	if(txt_search!=""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称！');
	}
}
