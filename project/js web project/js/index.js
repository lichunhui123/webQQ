// JavaScript Document

window.onload=function(){
	var oPage1=document.getElementById('page1');
	
	var oUl1=document.getElementById('ul1');
	var aLi0=oUl1.getElementsByTagName('li');
	var oUl2=document.getElementById('ul2');
	var oDiv=document.getElementById('div2');
	var aLinav=oDiv.getElementsByTagName('li');
	var itimer=null;
	
	for(var i=0; i<aLi0.length; i++){
		aLinav[i].index=i;
		aLinav[i].onclick=function(){
			MoveTop(this.index*oPage1.offsetHeight);	
		}
		
		aLi0[i].onmouseover=function(){
			clearTimeout(itimer);
			elasMove(oDiv,{
				left  :  this.offsetLeft	
			});	
			elasMove(oUl2,{
				left  :  -this.offsetLeft	
			});	
		}
		aLi0[i].onmouseout=function(){
			itimer=setTimeout(function(){
				elasMove(oDiv,{
					left  :  0	
				});
				elasMove(oUl2,{
					left  :  0	
				})
			},100);
				
		}	
	}
	oDiv.onmouseover=function(){
		clearTimeout(itimer);	
	}
	oDiv.onmouseout=function(){
		itimer=setTimeout(function(){
			elasMove(oDiv,{
				left  :  0	
			});
			elasMove(oUl2,{
				left  :  0	
			})
		},100);
	}
	
	var oP1_a1_1=getByClass('p1_a1_1')[0];
	var oP1_a1_2=getByClass('p1_a1_2')[0];
	var oP1_a1_3=getByClass('p1_a1_3')[0];
	var oP1_a2=getByClass('p1_a2')[0];
	var oP1_a3=getByClass('p1_a3')[0];	
	var oP1_a5=getByClass('p1_a5')[0];
	
	oP1_a5.style.width=view().w+'px';
	bufferMove(oP1_a1_2, {top:650,opacity:100},function(){
		bufferMove(oP1_a1_1, {top:580,opacity:100},function(){
			bufferMove(oP1_a1_3, {top:650,opacity:100});	
		});	
	});
	
	bufferMove(oP1_a3, {opacity:100});
	
	var Lp1_3=oP1_a3.offsetLeft;
	var Lp1_2=oP1_a2.offsetLeft;
	var Lp1_5=10;
	var Lp1_11=oP1_a1_1.offsetLeft;
	var Lp1_12=oP1_a1_2.offsetLeft;
	var Lp1_13=oP1_a1_3.offsetLeft;
	var Tp1_2=oP1_a2.offsetTop;
	var Tp1_5=oP1_a5.offsetTop;
	document.onmousemove=function(ev){
		var iScal=ev.clientX/(view().w)*1.8;
		var iScalT=ev.clientY/(view().h)*1.5;
		var newLeft1=iScal*Lp1_3;
		var newLeft2=iScal*Lp1_2;
		var newLeft3=iScal*Lp1_5;
		var newLeft4=iScal*Lp1_11;
		var newLeft5=iScal*Lp1_12;
		var newLeft6=iScal*Lp1_13;
		var newTop1=iScalT*Tp1_2;
		var newTop2=iScalT*Tp1_5;
		if(newLeft1<435){//445
			newLeft1=435;	
		}
		if(newLeft1>460){
			newLeft1=460;	
		}
		if(newLeft2<490){
			newLeft2=490;	
		}
		if(newLeft2>515){
			newLeft2=515;	
		}
		if(newLeft3<-10){
			newLeft3=-10;	
		}
		if(newLeft3>15){
			newLeft3=15;	
		}
		if(newLeft4<380){//400
			newLeft4=380;	
		}
		if(newLeft4>415){
			newLeft4=415;	
		}
		if(newLeft5<900){//910
			newLeft5=900;	
		}
		if(newLeft5>925){
			newLeft5=925;	
		}
		if(newLeft6<170){//180
			newLeft6=170;	
		}
		if(newLeft6>195){
			newLeft6=195;	
		}
		if(newTop2<30){//50
			newTop2=30;	
		}
		if(newTop2>70){
			newTop2=70;	
		}
		if(newTop1<220){//240
			newTop1=220;	
		}
		if(newTop2>250){
			newTop2=250;	
		}
		oP1_a3.style.left=newLeft1+'px';
		oP1_a2.style.left=newLeft2+'px';
		oP1_a5.style.left=newLeft3+'px';
		oP1_a2.style.top=newTop1+'px';
		oP1_a5.style.top=newTop2+'px';
		oP1_a1_1.style.left=newLeft4+'px';
		oP1_a1_2.style.left=newLeft5+'px';
		oP1_a1_3.style.left=newLeft6+'px';
	}	
	
	var oPage2=document.getElementById('page2');
	var aLi=oPage2.getElementsByTagName('li');
	var oRand=getByClass('rand',oPage2)[0];
	var oRand1=getByClass('rand1',oPage2)[0];
	var oRand2=getByClass('rand2',oPage2)[0];
	//alert(aLi.length);
	var arr=[];
	var izIndex=1;
	for(var i=0; i<aLi.length; i++){
		arr.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});	
	}
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.position='absolute';
		aLi[i].style.left=arr[i].left+'px';
		aLi[i].style.top=arr[i].top+'px';
		aLi[i].style.margin=0;
		
	}
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		drag(aLi[i]);	
	}
	
	oRand.onmouseover=function(){
		bufferMove(oRand1,{top:-202});
		bufferMove(oRand2,{top:0});
	}
	oRand.onmouseout=function(){
		bufferMove(oRand1,{top:0});
		bufferMove(oRand2,{top:202});
	}
	oRand.onclick=function(){
		var ranArr=[];
		for(var i=0; i<aLi.length; i++){
			ranArr.push(i);	
		}
		ranArr.sort(function(li1,li2){
			return Math.random() - 0.5;
		});
		
		for(var i=0;i<aLi.length;i++){
			elasMove( aLi[i] , { left : arr[ ranArr[i] ].left , top : arr[ ranArr[i] ].top } );
			
			aLi[i].index = ranArr[i];
			
		}
	}
	
	var oPage3=document.getElementById('page3');
	var aLi2=oPage3.getElementsByTagName('li');
	var aImg=oPage3.getElementsByTagName('img');
	var oList=getByClass('list',oPage3)[0];
	var oList2=oList.getElementsByTagName('ul')[0];
	var oNav=getByClass('nav',oPage3)[0];
	var oNav2=oNav.getElementsByTagName('div')[0];
	
	for(var i=0; i<aLi2.length; i++){
		aLi2[i].onclick=function(){
			aImg[1].src=this.getElementsByTagName('img')[0].src;
		}	
	}
	
	//alert(aLi2[0].offsetWidth);
	oList2.style.width=(aLi2[0].offsetWidth+26)*aLi2.length+'px';
	oNav2.onmousedown=function(ev){
		var ev=ev||event;
		var disX=ev.clientX-this.offsetLeft;
	
		if (this.setCapture) {
			this.setCapture();
		}
		oPage3.onmousemove=function(ev){
			var ev=ev||event;
			var L=ev.clientX-disX;
			if(L<0){
				L=0;	
			}
			if(L>oNav.offsetWidth-oNav2.offsetWidth){
				L=oNav.offsetWidth-oNav2.offsetWidth;	
			}
			
			var iScal=L/(oNav.offsetWidth-oNav2.offsetWidth);
			oList2.style.left=iScal*(oList.offsetWidth-oList2.offsetWidth)+'px';
			oNav2.style.left=L+'px';	
		}
		oPage3.onmouseup=function(){
			oPage3.onmousemove=oPage3.onmouseup=null;	
		}
		return false;
			
	}
	
	var oPage4=document.getElementById('page4');
	var inter=getByClass('inter',oPage4)[0];
	var land=getByClass('land',oPage4)[0];
	var prop=getByClass('prop',oPage4)[0];
	var plane=getByClass('plane',oPage4)[0];
	
	var oTop=document.getElementById('top');
	var oA=oTop.getElementsByTagName('a')[0];
	oTop.style.left=view().w-oTop.offsetWidth-50+'px';
	oTop.style.top=view().h-oTop.offsetHeight-50+'px';
	var b=1;
	var timer=null;
	
	oA.onclick=function(){
		MoveTop(0);
	}
	
	var news=document.getElementById('news');
	var oUl=news.getElementsByTagName('ul')[0];
	var aLi3=news.getElementsByTagName('li');
	var aI=news.getElementsByTagName('i');
	var newsBtn=document.getElementById('newsBtn');
	var iNum=0;
	var iTimer=null;
	
	news.style.top=(view().h-news.offsetHeight)/2+'px';
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi3.length*aLi3[0].offsetWidth+'px';
	
	for(var i=0; i<aI.length; i++){
		aI[i].index=i;
		aI[i].onmouseover=function(){
			iNum=this.index;
			autoPlay()
		}	
	}
	
	function autoPlay(){
		for(var i=0; i<aI.length; i++){
			aI[i].className='';	
		}	
		aI[iNum%aI.length].className='active';
		bufferMove(oUl,{left:-(aLi3[0].offsetWidth)*iNum});	
	}
	
	iTimer=setInterval(function(){
		iNum++;
		if(iNum==aLi3.length/2+1){
			oUl.style.left=0;
			iNum=1;	
		}	
		autoPlay();
	},2000);
	
	news.onmouseover=function(){
		clearInterval(iTimer);	
	}
	news.onmouseout=function(){
		iTimer=setInterval(function(){
			iNum++;
			if(iNum==aLi3.length/2+1){
				oUl.style.left=0;
				iNum=1;	
			}	
			autoPlay();
		},2000);	
	}
	
	news.onclick=function(){
		//alert(getStyle(this,'left'));
		if(parseInt(getStyle(this,'left'))==0){
			bufferMove(news,{left:-370},function(){
				removeClass(newsBtn,'newsOpen');	
			});	
		}
		if(parseInt(getStyle(this,'left'))==-370){
			bufferMove(news,{left:0},function(){
				addClass(newsBtn,'newsOpen');	
			});		
		}
	}
	
	var cssWinner=document.getElementById('csswinner');
	var cssDis=document.getElementById('cssdes');
	
	window.onscroll=function(){
		if(scrollY()>=3*oPage4.offsetHeight){
			bufferMove(inter, {
				opacity : 100,
				top     :30	
			},function(){
				bufferMove(land, {
					opacity : 100,
					top     :80	
				});	
			});	
				
			bufferMove(prop, {
				opacity : 100,
				top     :20	
			},function(){
				bufferMove(plane, {
					opacity : 100,
					top     :100	
				});	
			});	
				
		}
		if(isIe6()){
			oTop.style.top=view().h+scrollY()-oTop.offsetHeight-50+'px';
			oTop.style.left=view().w+scrollX()-oTop.offsetWidth-50+'px';
			news.style.top=(view().h+scrollY()-news.offsetHeight)/2+'px';
			cssWinner.style.top=scrollY()+30+'px';
			cssDis.style.top=scrollY()+100+'px';	
		}
		
		if(scrollY()>=oPage1.offsetHeight){
			bufferMove(oTop, {opacity : 100});	
		}else{
			bufferMove(oTop, {opacity : 0});		
		}
		
		if(b==2){
			clearInterval(timer);	
		}
		b=2;	
		
	}
	
	
	window.onresize=function(){
		oTop.style.left=view().w-oTop.offsetWidth-50+'px';
		oTop.style.top=view().h-oTop.offsetHeight-50+'px';
		news.style.top=(view().h-news.offsetHeight)/2+'px';
			
		if(isIe6()){
			oTop.style.top=view().h+scrollY()-oTop.offsetHeight-50+'px';
			oTop.style.left=view().w+scrollX()-oTop.offsetWidth-50+'px';
			news.style.top=(view().h+scrollY()-news.offsetHeight)/2+'px';
			cssWinner.style.top=scrollY()+30+'px';
			cssDis.style.top=scrollY()+100+'px';			
		}	
	}
	
	function MoveTop(target){
		clearInterval(timer);
		var iSpeed=iCur=0;
		timer=setInterval(function(){
			iCur=document.documentElement.scrollTop||document.body.scrollTop;
			iSpeed=(target-iCur)/8;	
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur==target){
				clearInterval(timer);	
			}else{
				document.documentElement.scrollTop=document.body.scrollTop=iCur+iSpeed;	
			}
			
			b=1;
		},30);	
	}
	
	function drag(obj){
		obj.onmousedown=function(ev){
			var ev=ev||event;
			var disX=ev.clientX-this.offsetLeft;
			var disY=ev.clientY-this.offsetTop;	
			obj.style.zIndex=izIndex++;
			if (obj.setCapture) {
				obj.setCapture();
			}
			clearInterval(obj.timer);
			oPage2.onmousemove=function(ev){
				var ev=ev||event;
				obj.style.left=ev.clientX-disX+'px';
				obj.style.top=ev.clientY-disY+'px';
				
				for(var i=0; i<aLi.length; i++){
					aLi[i].className='';	
				}	
				var nl=nearLi(obj);
				
				if(nl){
					nl.className='move';
					//alert(nl);	
				}
				
			}
			oPage2.onmouseup=function(){
				oPage2.onmousemove=oPage2.onmouseup=null;
				if (obj.releaseCapture) {
					obj.releaseCapture();
				}
				var nl=nearLi(obj);
				var tmp='';
				if(nl){
					elasMove(nl, {left:arr[obj.index].left,top:arr[obj.index].top});
					elasMove(obj, {left:arr[nl.index].left,top:arr[nl.index].top});
					nl.className='';
					
					tmp=obj.index;
					obj.index=nl.index;
					nl.index=tmp;
						
				}else{
					elasMove(obj, {left:arr[obj.index].left,top:arr[obj.index].top});	
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