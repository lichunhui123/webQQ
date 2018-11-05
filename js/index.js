// JavaScript Document
window.onload=function(){
	
	//主导航条
	var Web_Menu=document.getElementById('web_main_menu');
	var Main_Menu=document.getElementById('web_menu');
	var aMenuLi=Main_Menu.getElementsByTagName('li');	
	var aMenuImg=Main_Menu.getElementsByTagName('img');	
	
	Web_Menu.onmouseover=function(){
		document.onmousemove=function(ev){
			var ev=ev||event;
			for(var i=0;i<aMenuImg.length;i++){
				var x = aMenuImg[i].offsetLeft + aMenuImg[i].offsetWidth/2 + Main_Menu.offsetLeft;
				var y = aMenuImg[i].offsetTop + aMenuImg[i].offsetHeight/2 + Main_Menu.offsetTop + Web_Menu.offsetTop;
				
				var a = x - ev.clientX;
				var b = y - ev.clientY;
				
				var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
				
				var scale = 0.8 - c/200;
				
				if(scale<0.5){
					scale = 0.5;
				}
				
				aMenuImg[i].style.width = scale * 70 + 'px';
				aMenuImg[i].style.height = scale * 70 + 'px';
				
			}	
		}	
	}
	
	//弹窗
	var Web_Dialog=document.getElementById('web_dialog');
	var oP=Web_Dialog.getElementsByTagName('p')[0];
	var aDialogA=Web_Dialog.getElementsByTagName('a');
	var oIframe=Web_Dialog.getElementsByTagName('iframe')[0];
	var Web_Task=document.getElementById('web_task');
	var TaskA=Web_Task.getElementsByTagName('a')[0];
	var TaskImg=Web_Task.getElementsByTagName('img')[0];
	var TaskH=Web_Task.getElementsByTagName('h3')[0];
	
	var iHttp1=[
		 'http://web.qq.com/module/appmarket/appmarket.html','http://www.weiyun.com/index.html',
		 'http://mail.qq.com/cgi-bin/login','http://www.qq.com/','https://mail.qq.com/cgi-bin/loginpage',
		 'http://dev.t.qq.com/'			
	];
	   
	var iHttp2=['http://www.3366.com/heji/','http://mgp.qq.com/webqqindex.html','http://qqbaby.qq.com/baby.html',
		'project/360Mobile phone guard/index.html','project/mhec(css middle project)/index.html','project/js web project/index.html',
		'project/jdmagnifying glass/index.html','project/Documentation.html'
		
	];
   
    drag(Web_Dialog);
   
    for(var i=0; i<aMenuLi.length; i++){ 
        aMenuLi[i].index=i;
   		aMenuLi[i].onclick=function(){
			openWin(this.title,iHttp1[this.index]);	
			TaskImg.src=aMenuImg[this.index].src;
			TaskH.innerHTML=this.title;
		}
    }
	
	aDialogA[2].onclick=function(){
		bufferMove(Web_Dialog,{opacity:0,height:0},function(){
			Web_Dialog.style.display='none';	
		});	
	}
	var iBtn=true;
	aDialogA[1].onclick=function(){
		clearInterval(Web_Dialog.timer);
		if(iBtn){ //放大
			addClass(aDialogA[1],'max');
			bufferMove(Web_Dialog,{left:0,top:0,width:view().w,height:view().h});
			iBtn=false;	
		}else{ //缩小
			removeClass(aDialogA[1],'max');
			var T=parseInt(Web_Dialog.offsetTop+(Web_Dialog.offsetHeight-400)/2);
			var L=parseInt(Web_Dialog.offsetLeft+(Web_Dialog.offsetWidth-800)/2);
			bufferMove(Web_Dialog,{width:800,height:400,left:L,top:T});
			iBtn=true;		
		}
			
	}
	var iT=0;
	var iH=0;
	//最小化
	aDialogA[0].onclick=function(){
		iT=Web_Dialog.offsetTop;
		iH=Web_Dialog.offsetHeight;
		Web_Task.style.display='block';
		bufferMove(Web_Task,{opacity:100,right:0});
		bufferMove(Web_Dialog,{opacity:0,height:0,top:Web_Dialog.offsetTop+Web_Dialog.offsetHeight});	
	}
	
	Web_Task.onclick=function(){
		bufferMove(Web_Task,{opacity:0,right:-112},function(){
			Web_Task.style.display='none';	
		});	
		bufferMove(Web_Dialog,{opacity:100,height:iH,top:iT});	
	}
	
	Web_Dialog.onmousewheel=onWheel;
	if(Web_Dialog.addEventListener){
		Web_Dialog.addEventListener('DOMMouseScroll',onWheel);	
	}
	
	function onWheel(ev){
		var ev=ev||event;
		ev.cancelBubble=true;	
	}
			   
	//弹窗封装
	function openWin(title,src){
		clearInterval(Web_Dialog.timer);
		if(Web_Theme.style.display=='block'){
			Web_Theme.style.display='none';		
		}
		Web_Dialog.style.display='block';
		Web_Dialog.style.width='800px';
		Web_Dialog.style.height='400px';
		bufferMove(Web_Dialog,{opacity:100});
		Web_Dialog.style.left=(view().w-Web_Dialog.offsetWidth)/2+'px';	
		Web_Dialog.style.top=(view().h-Web_Dialog.offsetHeight)/2+'px';
		oP.innerHTML=title;
		oIframe.src=src;	
	}
	
	//天气
	var Weather=document.getElementById('web_weather');
	var oDivChange=Weather.getElementsByTagName('div')[0];
	var WeaClose=getByClass('weather_close',Weather)[0];
	var WeaMenu=getByClass('weather_menu',Weather)[0];
	var aStrong=Weather.getElementsByTagName('strong');
	var oRegion=document.getElementById('region');
	var NowTime=document.getElementById('nowtime');
	var City1=document.getElementById('city1');
	var City2=document.getElementById('city2');
	var aInput=Weather.getElementsByTagName('input');
	
	drag(Weather);
	
	//显示系统时间
	function showTime(){
		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes();
		NowTime.innerHTML = '当前时间为'+ addZero( h ) +':'+ addZero( m );
		
	}
	showTime();
	setInterval(showTime,1000);
	function addZero( n ){
	
		if(n < 10){
			return '0' + n;	
		}
		
		return n;
		
	}
	
	
	Weather.onmouseover=function(){
		WeaClose.style.display='block';	
	}
	Weather.onmouseout=function(){
		WeaClose.style.display='none';	
	}
	
	WeaClose.onclick=function(){
		Weather.style.display="none";	
	}
	
	oRegion.onclick=function(){
		if(oDivChange.className=='weather'){
			oDivChange.className='weather_change';
			NowTime.style.display='none';
			WeaMenu.style.display='block';	
		}else{
			oDivChange.className='weather';
			NowTime.style.display='block';
			WeaMenu.style.display='none';		
		}
			
	}

	//跨域获取天气;
	var cityname='昌平';
	
	getWeather();
	
	function getWeather(){
		
		var url='http://mimg.127.net/weather/';//20131202/10/23/14.js
		url+=getFormDate()+'/';
		url+=getCityCode().substring(0,2)+'/'+getCityCode().substring(2,4)+'/'+getCityCode().substring(4)+'.js';
		
		var oScript=document.createElement('script');
		oScript.src=url;
		oScript.charset = 'gbk';
		document.body.appendChild(oScript);
		
		oScript.onload=function(){
			oRegion.innerHTML=city.name;
			var str='';
			var strm='';
		
			str+=city.tianqi[0]+city.wendu[0]+'℃~'+city.wendu[0]+'℃';
			strm+=city.tianqim[0]+city.wendum[0]+'℃~'+city.wendum[0]+'℃';
			aStrong[0].innerHTML='今天 : '+str;
			aStrong[1].innerHTML='明天 : '+strm;
			
		}
			
	}
	
	for(var attr in citymap){
		
		var oPtion=document.createElement('option');
		oPtion.value=attr;
		oPtion.innerHTML=attr;
		City1.appendChild(oPtion);
			
	}
	
	City1.onmousedown=City2.onmousedown=function(ev){
		var ev=ev||event;
		ev.cancelBubble=true;
	}
	
	City1.onchange=function(){
		var c=citymap[this.value];
		City2.innerHTML='';
		
		var oPtion=document.createElement('option');
		oPtion.value='';
		oPtion.innerHTML='==请选择城市==';
		City2.appendChild(oPtion);	
		
		for(var attr in c){
			var oPtion=document.createElement('option');
			oPtion.value=attr;
			oPtion.innerHTML=attr;
			City2.appendChild(oPtion);	
		}	
	}
	
	City2.onchange=function(){
		cityname=this.value;
			
	}
	
	aInput[0].onclick=function(){
		getWeather();
		oDivChange.className='weather';
		NowTime.style.display='block';
		WeaMenu.style.display='none';		
	}
	aInput[1].onclick=function(){
		oDivChange.className='weather';
		NowTime.style.display='block';
		WeaMenu.style.display='none';		
	}
	//alert(getCityCode());
	function getCityCode(){
		
		for(var attr in citymap){
			for(var c in citymap[attr]){
				if(c==cityname){
					return citymap[attr][c];	
				}	
			}	
		}
			
	}
	
	function getFormDate(){
		var oDate=new Date();
		var y=oDate.getFullYear();
		var m=oDate.getMonth()+1;
		m = m<10 ? '0'+m : ''+m;
		var d=oDate.getDate();
		d = d<10 ? '0'+d : ''+d;	
		return y+m+d;
	}
	
	//图片时钟 canvas
	
	var Web_Times=document.getElementById('web_time');
	var TimeClose=getByClass('time_close',Web_Times)[0];
	var oC=document.getElementById('c1');
	var oGC = oC.getContext('2d');
	
	Web_Times.onmouseover=function(){
		TimeClose.style.display='block';	
	}
	Web_Times.onmouseout=function(){
		TimeClose.style.display='none';	
	}
	TimeClose.onclick=function(){
		Web_Times.style.display='none';	
	}
	
	drag(Web_Times);
	draw();
	setInterval(draw,1000);
	
	function draw(){
		
		var x = 57;
		var y = 57;
		var r = 55;
		
		var date = new Date();
		var iH = date.getHours();
		var iM = date.getMinutes();
		var iS = date.getSeconds();
		
		//iH : 3 * 30
		var iHvalue = (iH*30 - 90 + iM/2)*Math.PI/180;
		var iMvalue = (iM*6 - 90)*Math.PI/180;
		var iSvalue = (iS*6 - 90)*Math.PI/180;
	
		oGC.clearRect(0,0,oC.width,oC.height);
		
		for(var i=0;i<60;i++){
			oGC.strokeStyle='black';
			oGC.beginPath();
			oGC.moveTo(x,y);
			oGC.arc(x,y,r,i*6*Math.PI/180,(i+1)*6*Math.PI/180);
			oGC.closePath();
			oGC.stroke();
			
		}
		
		oGC.fillStyle = 'white';
		oGC.beginPath();
		oGC.moveTo(x,y);
		oGC.arc(x,y,r*19/20,0,360*Math.PI/180);
		oGC.closePath();
		oGC.fill();
		
		
		oGC.lineWidth = 3;
		for(var i=0;i<12;i++){
			oGC.strokeStyle='black';
			oGC.beginPath();
			oGC.moveTo(x,y);
			oGC.arc(x,y,r,i*30*Math.PI/180,(i+1)*30*Math.PI/180);
			oGC.closePath();
			oGC.stroke();
			
		}
		
		oGC.fillStyle = 'white';
		oGC.beginPath();
		oGC.moveTo(x,y);
		oGC.arc(x,y,r*18/20,0,360*Math.PI/180);
		oGC.closePath();
		oGC.fill();
		
		oGC.strokeStyle='black';
		oGC.lineWidth = 5;
		oGC.beginPath();
		oGC.moveTo(x,y);
		oGC.arc(x,y,r*9/20,iHvalue,iHvalue);
		oGC.closePath();
		oGC.stroke();
		
		oGC.strokeStyle='gray';
		oGC.lineWidth = 3;
		oGC.beginPath();
		oGC.moveTo(x,y);
		oGC.arc(x,y,r*14/20,iMvalue,iMvalue);
		oGC.closePath();
		oGC.stroke();
		
		oGC.strokeStyle='red';
		oGC.lineWidth = 2;
		oGC.beginPath();
		oGC.moveTo(x,y);
		oGC.arc(x,y,r*18/20,iSvalue,iSvalue);
		oGC.closePath();
		oGC.stroke();
			
	}
	
	//主要内容（主界面）	
	var WebCon=document.getElementById('web_content');
	var aUl=WebCon.getElementsByTagName('ul');
	var FirstaLi=aUl[0].getElementsByTagName('li');
	var WebCon_timer=getByClass('timer',WebCon)[0];
	var WebCon_weather=getByClass('weather',WebCon)[0];
	var num1=140;
	var num2=117;
	var a=1;
	var aee=true;
	
	for(var i=0; i<FirstaLi.length; i++){
		FirstaLi[i].index=i;
		
   		FirstaLi[i].onclick=function(){
			
			if(aee){
				openWin(this.title,iHttp2[this.index]);	
				TaskImg.src=this.getElementsByTagName('img')[0].src;
				TaskH.innerHTML=this.title;
			}
		}	
	}
	
	WebCon_timer.onclick=function(){
		if(Web_Times.style.display=='none'){
			Web_Times.style.display='block';		
		}	
	}
	WebCon_weather.onclick=function(){
		if(Weather.style.display=='none'){
			Weather.style.display='block';		
		}	
	}
	
	for(var i=0; i<aUl.length; i++){
		show(aUl[i],a);	
	}
	
	function show(oParent,a){
		var arr=[];
		var aLi=oParent.getElementsByTagName('li');
		
		clientXT(a);
		function clientXT(a){
			if(a){
				var iCal=Math.floor(view().h/num1);	
				//alert(iCal);
				for(var i=0; i<aLi.length; i++){
					bufferMove(aLi[i],{left:num2*Math.floor(i/iCal),top:num2*(i%iCal)});
					arr.push([num2*Math.floor(i/iCal),num2*(i%iCal)]);
				}
			}	
		}
		
		var izIndex=3;
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;
			newDrag(aLi[i]);	
		}
		function newDrag(obj){
			obj.onmousedown=function(ev){
				clearInterval(this.timer);
				var ev=ev||event;
				aee=true;
				obj.style.zIndex=izIndex++;
				var disX = ev.clientX - this.offsetLeft;
				var disY= ev.clientY - this.offsetTop;
				var iX = ev.clientX;
				var iY = ev.clientY;
				//设置全局捕获
				if (obj.setCapture) {
					obj.setCapture();
				}
				document.onmousemove=function(ev){
					var ev=ev||event;
					if(Math.abs(ev.clientX-iX)>5||Math.abs(ev.clientY-iY)>5){
						aee=false;
					}
					var L=ev.clientX-disX;
					var T=ev.clientY-disY;
					if(L<0){
						L=0;	
					}	
					if(L>view().w-obj.offsetWidth){
						L=	view().w-obj.offsetWidth;
					}
					if(T<0){
						T=0;	
					}
					if(T>view().h-obj.offsetHeight){
						T=view().h-obj.offsetHeight;	
					}
					
					obj.style.left=L+'px';
					obj.style.top=T+'px';
					
				}	
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					if (obj.releaseCapture) {
						obj.releaseCapture();
					}
					var nl=nearLi(obj);	
					var temp='';
					if(nl){
						bufferMove(nl, {left:arr[obj.index][0],top:arr[obj.index][1]});	
						bufferMove(obj, {left:arr[nl.index][0],top:arr[nl.index][1]});	
						temp=obj.index;
						obj.index=nl.index;
						nl.index=temp;	
					}else{
						bufferMove(obj, {left:arr[obj.index][0],top:arr[obj.index][1]});		
					}
				}
				return false;
			}	
		}
		function jl(obj1,obj2){
			var a = obj1.offsetLeft - obj2.offsetLeft;
			var b = obj1.offsetTop - obj2.offsetTop;
			
			return Math.sqrt(a*a + b*b);
		}
		
		function nearLi(obj){
			var value=99999;
			var index=-1;
			for(var i=0; i<aLi.length; i++){
				if(pz(obj,aLi[i])&&obj!=aLi[i]){
					var c=jl(obj,aLi[i]);
					if(c<value){
						value=c;
						index=i;	
					}	
				}	
			}
			
			if(index!=-1){
				return aLi[index];	
			}else{
				return false;	
			}
				
		}
	}
	
	//顶部导航条
	var Web_Top=document.getElementById('web_top');
	
	var Web_Top_left=(view().w-Web_Top.offsetWidth)/2;
	var TopaLi=Web_Top.getElementsByTagName('li');
	var iWidth=aUl[0].offsetWidth;
	var iOld=0;
	for(var i=1; i<aUl.length; i++){
		aUl[i].style.left=-iWidth+'px';	
	}
	//alert(TopaLi.length);
	for(var i=0; i<TopaLi.length; i++){
		TopaLi[i].index=i;
		TopaLi[i].onclick=function(){
			for(var i=0; i<TopaLi.length; i++){
				TopaLi[i].className='';	
			}	
			this.className='active';
			if(this.index>iOld){
				aUl[this.index].style.left=-iWidth+'px';
				bufferMove(aUl[iOld], {left:iWidth,opacity:0});	
			}
			if(this.index<iOld){
				aUl[this.index].style.left=iWidth+'px';
				bufferMove(aUl[iOld], {left:-iWidth,opacity:0});		
			}
			bufferMove(aUl[this.index], {left:0,opacity:100});
			iOld=this.index;
		}	
	}
	Web_Top.style.left=Web_Top_left+'px';
	bufferMove(Web_Top, {top:17,opacity:100});
	drag(Web_Top);
	
	//鼠标滚屏
	document.onmousewheel=wheel;
	if(document.addEventListener){
		document.addEventListener('DOMMouseScroll',wheel);	
	}
	
	function wheel(ev){
		var ev=ev||event;
		var iBtn=true;
		if(ev.wheelDelta){
			iBtn=ev.wheelDelta > 0 ? true : false;	
		}else{
			iBtn=ev.detail < 0 ? true : false;  	
		}
		
		if(iBtn){//滚轮往上
			iOld++;
			if(iOld>=TopaLi.length){
				iOld=0;	
			}	
		}else{//滚轮往下
			iOld--;
			if(iOld<0){
				iOld=TopaLi.length-1;	
			}	
		}
		
		for(var i=0; i<TopaLi.length; i++){
			TopaLi[i].className='';
			if(i<iOld){
				bufferMove(aUl[i], {left:iWidth,opacity:0});	
			}else{
				bufferMove(aUl[i], {left:-iWidth,opacity:0});	
			}	
		}
		TopaLi[iOld].className='active';
		bufferMove(aUl[iOld], {left:0,opacity:100});
		
		if(ev.preventDefault){
			ev.preventDefault;	
		}
		return false;	
	}
	
	//换肤
	var ChangeTheme=getByClass('focus_4',Web_Menu)[0];
	var Web_Theme=document.getElementById('web_theme');
	var Web_ThemeClose=getByClass('close',Web_Theme)[0];
	var ThemeoUl=Web_Theme.getElementsByTagName('ul')[0];
	var ThemeaLi=ThemeoUl.getElementsByTagName('li');
	var ThemeaaP=ThemeoUl.getElementsByTagName('p');
	var ThemeaaImg=ThemeoUl.getElementsByTagName('img');
	var WebBg=document.getElementById('bg');
	var Web_Theme_Con=getByClass('web_theme_con',Web_Theme)[0];
	
	drag(Web_Theme);
	if(getCookie('bag')){
		WebBg.src=getCookie('bag');	
	}
	ChangeTheme.onclick=function(){
		Web_Theme.style.display='block';
		Web_Theme.style.height='400px';
		Web_Theme.style.left=(view().w-Web_Theme.offsetWidth)/2+'px';	
		Web_Theme.style.top=(view().h-Web_Theme.offsetHeight)/2+'px';
		bufferMove(Web_Theme,{opacity:100});	
	}
	
	Web_ThemeClose.onclick=function(){
		bufferMove(Web_Theme,{opacity:0,height:0},function(){
			Web_Theme.style.display='none';	
		});	
	}
	
	Web_Theme.onmousewheel=onWheel1;
	if(Web_Theme.addEventListener){
		Web_Theme.addEventListener('DOMMouseScroll',onWheel1);	
	}
	
	function onWheel1(ev){
		var ev=ev||event;
		ev.cancelBubble=true;	
	}
	Web_Theme_Con.onmousedown=function(ev){
		var ev=ev||event;
		ev.cancelBubble=true;	
	}
	
	for(var i=0; i<ThemeaLi.length; i++){
		ThemeaLi[i].index=i;
		ThemeaLi[i].onmouseover=function(){
			for(var i=0; i<ThemeaLi.length; i++){
				ThemeaaP[i].style.color='#000';	
				ThemeaLi[i].style.backgroundColor='';
				ThemeaLi[i].style.boxShadow='';	
			}
			ThemeaaP[this.index].style.color='#45649e';
			this.style.backgroundColor='#cbe7fc';
			this.style.boxShadow='1px 1px 5px #cbe7fc';	
		}
		ThemeaLi[i].onmouseout=function(){
			for(var i=0; i<ThemeaLi.length; i++){
				ThemeaaP[i].style.color='#000';	
				ThemeaLi[i].style.backgroundColor='';
				ThemeaLi[i].style.boxShadow='';	
			}	
		}
		ThemeaLi[i].onclick=function(){
			WebBg.src=ThemeaaImg[this.index].src;
			setCookie('bag',ThemeaaImg[this.index].src,5);	
		}
			
	}
	
	//右键菜单
	var WebMenu=document.getElementById('web_text_menu');
	var MenuoUl=getByClass('text_menu',WebMenu)[0];
	var MenuaUl=MenuoUl.getElementsByTagName('ul');
	var MenuaLi=MenuoUl.getElementsByTagName('li');
	var MenuTheme=getByClass('theme',WebMenu)[0];
	var MenuShowdesk=getByClass('showdesk',WebMenu)[0];
	
	document.oncontextmenu=function(ev){
		ev=ev||event;
		WebMenu.style.display='block';
		WebMenu.style.left=ev.clientX+'px';
		WebMenu.style.top=ev.clientY+'px';
		WebMenu.style.opacity=0;
		WebMenu.style.filter='alpha(opacity=0)';
		bufferMove(WebMenu,{opacity:100});
		return false;		
	}
	document.onclick=function(){
		bufferMove(WebMenu,{opacity:0},function(){
			WebMenu.style.display='none';	
		});	
	}
	
	for(var i=0; i<MenuaLi.length; i++){
		
		MenuaLi[i].onmouseover=function(){
			clearInterval(this.timer);
			var childoUl=this.getElementsByTagName('ul')[0];
			if(childoUl){
				childoUl.style.display='block';	
			}	
		}
			
		MenuaLi[i].onmouseout=function(){
			var childoUl=this.getElementsByTagName('ul')[0];
			this.timer=setTimeout(function(){
				
				if(childoUl){
					childoUl.style.display='none';	
				}
						
			},300);
			
		}	
	}
	//右键显示主题设置
	MenuTheme.onclick=function(){
		
		Web_Theme.style.display='block';
		Web_Theme.style.height='400px';
		Web_Theme.style.left=(view().w-Web_Theme.offsetWidth)/2+'px';	
		Web_Theme.style.top=(view().h-Web_Theme.offsetHeight)/2+'px';
		bufferMove(Web_Theme,{opacity:100});		
		
	}
	//右键显示桌面
	MenuShowdesk.onclick=function(){
		if(Web_Theme.style.display=='block'){
			bufferMove(Web_Theme,{opacity:0,height:0},function(){
				Web_Theme.style.display='none';	
			});	
		}
		if(Web_Dialog.style.display=='block'){
			iT=Web_Dialog.offsetTop;
			iH=Web_Dialog.offsetHeight;
			Web_Task.style.display='block';
			bufferMove(Web_Task,{opacity:100,right:0});
			bufferMove(Web_Dialog,{opacity:0,height:0,top:Web_Dialog.offsetTop+Web_Dialog.offsetHeight});		
		}	
	}
	//右键刷新
	MenuaLi[1].onclick=function(){
		for(var i=0; i<aUl.length; i++){
			upDate(aUl[i]);	
		}	
	}
	function upDate(oParent){
		var aLi=oParent.getElementsByTagName('li');
		for(var i=0; i<aLi.length; i++){
			aLi[i].style.opacity=0;
			aLi[i].style.filter='alpha(opacity=0)';	
			bufferMove(aLi[i],{opacity:100});
		}
	}
	
	//改变图标大小
	var Menubtn=document.getElementById('menubtn');
	var MenubtnaLi=Menubtn.getElementsByTagName('li');
	//大图标
	MenubtnaLi[1].onclick=function(){
		if(this.className=='active')return;
		num1=171;
		num2=147;
		for(var i=0; i<aUl.length; i++){
			var acdLi=aUl[i].getElementsByTagName('li');
			for(var j=0; j<acdLi.length; j++){
				acdLi[j].style.height='126px';
				acdLi[j].style.width='126px';
				acdLi[j].className='hover';		
			}
			show(aUl[i],a);	
		}
		for(var i=0; i<MenubtnaLi.length; i++){
			MenubtnaLi[i].className='';	
		}
		this.className='active';
			
	}
	//小图标
	MenubtnaLi[0].onclick=function(){
		if(this.className=='active')return;
		num1=140;
		num2=117;
		for(var i=0; i<aUl.length; i++){
			var acdLi=aUl[i].getElementsByTagName('li');
			for(var j=0; j<acdLi.length; j++){
				acdLi[j].style.height='89px';
				acdLi[j].style.width='89px';
				acdLi[j].className='';	
			}
			show(aUl[i],a);	
		}
		for(var i=0; i<MenubtnaLi.length; i++){
			MenubtnaLi[i].className='';	
		}
		this.className='active';
			
	}
	
	//页面大小发生改变
	window.onresize=function(){
		
		Web_Top.style.left=(view().w-Web_Top.offsetWidth)/2+'px';
		for(var i=0; i<aUl.length; i++){
			show(aUl[i],a);	
		}
		if(isIe6()){
			Web_Task.style.top=view().h-Web_Task.offsetHeight+'px';
			Web_Task.style.left=view().w-Web_Task.offsetWidth+'px';	
		}
		Web_Dialog.style.left=(view().w-Web_Dialog.offsetWidth)/2+'px';
		Web_Dialog.style.top=(view().h-Web_Dialog.offsetHeight)/2+'px';
		Web_Theme.style.left=(view().w-Web_Theme.offsetWidth)/2+'px';	
		Web_Theme.style.top=(view().h-Web_Theme.offsetHeight)/2+'px';
	}
}