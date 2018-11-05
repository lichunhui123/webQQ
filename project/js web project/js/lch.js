//获取属性值
function getStyle(obj, attr){ return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, 0)[attr]; }

//匀速运动
// 不能同时让多个值动
function startMove(obj, attr, target, endFn){	// endFn 回调函数
	
	var dir = 0;
	
	if(parseInt(getStyle(obj, attr)) < target){
		dir = 17;
	}
	else{
		dir = -17;
	}
	
	clearInterval(obj.timer);		// 清除 null 、未定义 都没问题

	obj.timer = setInterval(function(){
	
		var speed = parseInt(getStyle(obj, attr)) + dir;	// 步长
		
		if(speed > target && dir > 0){		// 往大了走用它来判断
			speed = target;
		}
		if(speed < target && dir < 0){		// 往小了走用它来判断
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if(speed === target){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn();
			}
		}
	
	}, 20);
	
}

//抖动的函数
function snake( obj, fn ){
	
	var pos = parseInt(getStyle(img, 'left')) || 0;		
	
	var n = 0;
	
	var arr = [];	
	
	for(var i=16; i>0; i-=2){
		arr.push(i, -i);
	}
	
	arr.push(0);

	clearInterval(obj.timer);	

	obj.timer = setInterval(function (){

		obj.style.left = pos + arr[n] + 'px'; 

		n++;
		
		if(n == arr.length){
			clearInterval(obj.timer);
			fn && fn();
		}

	}, 30);
	
}

//数组的去重

function removle(arr){
	
	for(var i=0; i<arr.length; i++){

		for(var j = i + 1; j<arr.length; j++){
			
			if( arr[j] == arr[i] ){
				
				arr.splice(j,1);
				
				j--;
				
			}
			
		}
		
	}	
	
	return arr;		
}

//DOM获取元素
function getPrev(obj){//获取上一个元素；

	if(!obj.previousSibling) return null;
	
	return obj.previousSibling.nodeType===1?obj.previousSibling:getPrev(obj.previousSibling);
	
}

function getNext(obj){//获取下一个元素；

	if(!obj.nextSibling) return null;
	
	return obj.nextSibling.nodeType===1?obj.nextSibling:getNext(obj.nextSibling);
	
}	

function getFirst(obj){//获取首个元素；

	if(!obj.firstChild) return null;
	
	return obj.firstChild.nodeType===1?obj.firstChild:getNext(obj.firstChild);
	
}

function getLast(obj){//获取最后一个元素；

	if(!obj.lastChild) return null;
	
	return obj.lastChild.nodeType===1?obj.lastChild:getPrev(obj.lastChild);
	
}

//元素在页面中的绝对位置
function posLeft(obj){
	
	var iLeft = 0;
	
	while(obj){
		
		iLeft += obj.offsetLeft;
		
		obj = obj.offsetParent;
		
	}
	
	return iLeft;
	
}


function posTop(obj){
	
	var iTop = 0;
	
	while(obj){
		
		iTop += obj.offsetTop;
		
		obj = obj.offsetParent;
		
	}
	
	return iTop;
	
}

//用className来选择元素
function getByClass(sClass,parent){
	
	var aEles = (parent||document).getElementsByTagName('*');
	
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
		
		for(var j=0; j<aClass.length; j++){
			
			if( aClass[j] === sClass ){
				arr.push( aEles[i] );	
				break; 
			}	
			
		}
		
	}
	
	return arr;
}


//给元素添加class
function addClass(obj,sClass){
	
	var aClass = obj.className.split(' ');
	
	if(!aClass[0]){
		obj.className = sClass;
		return;
	}

	for(var i=0; i<aClass.length; i++){
		if(aClass[i] === sClass)return;	
	}

	obj.className += ' ' + sClass;
	
}

//元素删除class
function removeClass(obj,sClass){
	
	var aClass = obj.className.split(' ');
	
	if(!aClass[0])return;
	
	for(var i=0; i<aClass.length; i++){
	
		if(aClass[i] === sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}	
		
	}
	
}

//判断是否Ie6
function isIe6(){
	
	var str = window.navigator.userAgent.toLowerCase();
	
	if(str.indexOf('msie 6')!=-1){
		return true;//是	Ie6
	}

	return false;//不是Ie6	
}


function view(){//可视区宽高
	return {
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight	
	};	
}	

function scrollH(){//内容高度
	return document.body.scrollHeight;	
}

function offsetH(){//文档高度
	return document.body.offsetHeight;	
}

function scrollX(){//滚动宽度
	return document.body.scrollLeft || document.documentElement.scrollLeft;	
}

function scrollY(){//滚动高度
	return document.body.scrollTop || document.documentElement.scrollTop;	
}

//事件绑定函数
function bind(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}

//拖拽
function drag(obj) {
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		
		//设置全局捕获
		if (obj.setCapture) {
			obj.setCapture();
		}
		
		document.onmousemove = function(ev) {
			var ev = ev || event;
				
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			if (L < 0) {
				L = 0;
			} else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}
			if (T < 0) {
				T = 0;
			} else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}
			
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
			
		}
		
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			
			//releaseCapture() : 释放全局捕获
			if (obj.releaseCapture) {
				obj.releaseCapture();
			}
		}
		
		return false;
		
	}
}

//碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop  + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop  + obj2.offsetHeight; 
	
	if(R1<L2 || L1>R2 || B1<T2 || T1>B2){
		return false;//没碰到
	}
	else{
		return true;//碰到
	}	
}

//设置cookie
function setCookie(key,value,times){
	
	var date = new Date();
	date.setDate( date.getDate() + times );
	
	return document.cookie = key + '=' + value + ';expires=' + date.toGMTString();
	
}

//获取cookie
function getCookie(key){
	
	var a = document.cookie.split('; ');

	for(var i=0;i<a.length;i++){
		var b = a[i].split('=');
		
		if( b[0] == key ){
			return b[1];
		}
		
	}
	
}

//删除cookie
function delCookie(key){
	setCookie(key,'',-1);
}

//缓冲运动函数（非匀速）
function bufferMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iCur = iSpeed = 0;
	obj.iTimer = setInterval(function() {
		
		var b = true;
		
		for (var attr in json) {
			
			if (attr == 'opacity') {
				iCur = Math.round(getStyle(obj, attr) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			
			iSpeed = (json[attr] - iCur) / 8;
		
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//只要有一个属性没有到目标点，b就会被设置为false
			if (iCur != json[attr]) {
				b = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			
		}
		
		if (b) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
		
		
	}, 30);
}

//弹性运动
function elasMove(obj,json,endFn){
	
	clearInterval(obj.timer);
	var iCur = 0;
	var iSpeed = {};
	for(var attr in json){
		iSpeed[attr] = 0;
	}
	
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		
		for(var attr in json){
		
			if(attr == 'opacity'){
				iCur = Math.round(getStyle(obj,attr)*100);
			}
			else{
				iCur = parseInt(getStyle(obj,attr));
			}
			
			//速度 += (目标点 - 变化值)/系数;
			//速度 *= 0.75;
			
			iSpeed[attr] += (json[attr] - iCur)/6;
			iSpeed[attr] *= 0.75;
			
			if( Math.abs(iSpeed[attr])>1 || Math.abs(json[attr] - iCur)>1 ){
				
				bBtn = false;
			}
			
			var value = iCur + iSpeed[attr];
			
			if(value < 0 && (attr == 'width'||attr == 'height')){
				value = 1;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity='+ value +')';
				obj.style.opacity = value/100; 
			}
			else{
				obj.style[attr] = value + 'px';
			}
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			for(var attr in json){
				iSpeed[attr] = 0;
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity='+ json[attr] +')';
					obj.style.opacity = json[attr]/100; 
				}
				else{
					obj.style[attr] = json[attr] + 'px';
				}
			}
			
			endFn && endFn.call(obj);
			
		}
		
	},30);
}

//用正则通过className获取元素
function getByClass2(parent, tagname, classname) {
		
	var aEls = parent.getElementsByTagName(tagname);
	
	var arr = [];
	
	//如果正则中的内容有需要通过变量替代的，不要用//，用new
	var re = new RegExp('(\\s|^)'+ classname +'(\\s|$)');
	
	for (var i=0; i<aEls.length; i++) {
		if (re.test(aEls[i].className)) {
			arr.push(aEls[i]);
		}
		
	}
	
	return arr;
	
}


//ajax
function ajax(opt) {
	var xhr = null;
		
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	var o = {
		method	:	opt.method || 'get',
		url		:	opt.url || '',
		data	:	opt.data || '',
		dataType:	opt.dataType || 'json',
		success	:	opt.success || function(){},
		fail	:	opt.fail || function(){},
	}
	
	if (o.method == 'get' && o.data) {
		o.url += '?' + o.data;
	}
	
	xhr.open(o.method, o.url, true);
	
	if (o.method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
		xhr.send(o.data);
	}
	
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState == 4) {
			
			if (xhr.status == 200) {
				
				var data = xhr.responseText;
				
				switch(o.dataType) {
					case 'json':
						data = JSON.parse(data);
						break;
					case 'xml':
						data = xhr.responseXML;
						break;
				}
				
				o.success && o.success(data);
				
			} else {
				o.fail && o.fail(xhr.status)
			}
			
		}
		
	}
}