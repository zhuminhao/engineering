//team选项卡
function tab(){
	var oTeam=document.getElementById("team");
	var oUls=oTeam.getElementsByTagName("ul");
	var oTeamHeader=document.getElementById("team_header");
	var oPs=oTeamHeader.getElementsByTagName("p");
	for(var i=0;i<oPs.length;i++){
		oPs[i].index=i;
		oPs[i].onclick=function ()
		{
			for(var i=0;i<oPs.length;i++)
			{
				oPs[i].className=''
				oUls[i].style.display='none';
			}
			this.className='active1';
			oUls[this.index].style.display='block';
		};
	}
}
tab();


//返回顶部
function back(){
	var oBtn=document.getElementById("back");
	var timer=null;
	var oTop=0;
	var off=true;
	window.onscroll=function(){
		oTop=document.documentElement.scrollTop || document.body.scrollTop;
		if(oTop>205){
			oBtn.style.display='block'
		}else{
			oBtn.style.display='none'
		};				
		if(!off){
			clearInterval(timer);	
		}
		off=false;				
	};
	oBtn.onclick=function(){
		timer=setInterval(function(){
			var backTop = Math.floor(oTop/4);
			if(backTop == 0){
				clearInterval(timer)
			}else{
				if(document.documentElement.scrollTop){
					document.documentElement.scrollTop-=backTop;
				}else{
					document.body.scrollTop-=backTop;	
				}
				off=true;
			}
		},30)		
	}
}
back();


//顶部下拉
function topdown(){
	var oDownBox=document.getElementById("down_box");
	var oShow=getClass(document, "show");
	var oI2=getClass(document,"i2");
	var oDown=getClass(document,"down");
	var iNum=0; 
	for(var i=0;i<oShow.length;i++){
		oShow[i].index=i;
		oShow[i].off=true;
		oShow[i].onclick=function(ev){
			var ev=ev||window.event;
			for(var i=0;i<oShow.length;i++){
				oDown[i].style.display='none';
				oI2[i].style.backgroundPositionY=0;
			}
			if(this.off){
				for(var i=0;i<oShow.length;i++){
					oShow[i].off=true;
				}
				this.off=false;
				oDown[this.index].style.display='block';	
				oI2[this.index].style.backgroundPositionY='-6'+'px';
			}else{
				this.off=true;
				oI2[this.index].style.backgroundPositionY=0;
				oDown[this.index].style.display='none';
			}
			ev.cancelBubble=true;
		};
		document.onclick=function(){
			for(var i=0;i<oShow.length;i++){
				oShow[i].off=true;
				oDown[i].style.display='none';
				oI2[i].style.backgroundPositionY=0;
			}
		}
	}

}		
topdown();


//左侧菜单
function menu(){
	var oMenuList=document.getElementById("menu_list");
	var oMenuTitle=document.getElementById("menu_title");
	oMenuTitle.onclick=function(){
		if(oMenuList.style.display=="block"){	
			startMove(oMenuList,'top',-460,function(){
				oMenuList.style.display="none";
			})
		}else{
			oMenuList.style.display="block";
			startMove(oMenuList,'top',40);
		}
	}
}
menu()


//banner
function banner(){
	var oBanner_pic=document.getElementById("banner-pic");
	var oBanner_pic_ul=oBanner_pic.getElementsByTagName('ul')[0];
	var oCircle=document.getElementById("circle");
	var oCirclelist=oCircle.children;
	oBanner_pic_ul.innerHTML+=oBanner_pic_ul.innerHTML;
	var oBanner_piclist=oBanner_pic_ul.children;
	var oLeft=oBanner_piclist[0].offsetWidth;
	oBanner_pic_ul.style.width=oLeft*oBanner_piclist.length+'px';
	var oW=document.documentElement.clientWidth || document.body.clientWidth;
	oBanner_pic.style.left=-(oBanner_pic.offsetWidth-oW)/2+'px';
	var timer=null;
	var iNum=0;
	var index=0;
	window.onresize=function(){
		var oW=document.documentElement.clientWidth || document.body.clientWidth;
		oBanner_pic.style.left=-(oBanner_pic.offsetWidth-oW)/2+'px';
	}
	timeDo();
	function timeDo(){
		clearInterval(timer);
		timer=setInterval(function(){
			iNum++;
			if(iNum==oBanner_piclist.length/2+1){
				oBanner_pic_ul.style.left=0;
				iNum=1;
			}
			for(var i=0;i<oCirclelist.length;i++){
				oCirclelist[i].className = "";
			}
			index=iNum%(oBanner_piclist.length/2);
			animate(oBanner_pic_ul,{
				"left":-iNum*oLeft
			});
			oCirclelist[index].className="active";
		},2000);
	}
	for(var j=0;j<oCirclelist.length;j++){
		oCirclelist[j].index=j;
		oCirclelist[j].onclick=function(){
			clearInterval(timer);
			index=this.index;
			for(var i=0;i<oCirclelist.length;i++){
				oCirclelist[i].className="";
			}
			if(iNum==oBanner_piclist.length/2){
				oBanner_pic_ul.style.left=0;
			}
			iNum=index;
			animate(oBanner_pic_ul,{
				"left":-iNum*oLeft
			});
			oCirclelist[index].className="active";
			timeDo();
		}
	}
}
banner()


//无缝滚动
function roll(){
	var oTeampic=document.getElementById('teampic');
	var oUl=oTeampic.getElementsByTagName('ul')[0];
	var aLis=oUl.getElementsByTagName('li');
	var timer=null;
	var i=3;
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=(aLis[0].offsetWidth*aLis.length)+'px'
	timer=setInterval(function(){
		if(oUl.offsetLeft==-(oUl.offsetWidth/2)){
			oUl.style.left=0;
		}else if(oUl.offsetLeft>0){
			oUl.style.left=-(oUl.offsetWidth/2)+'px';
		}
		oUl.style.left = oUl.offsetLeft+i+'px';	
	},30)
	oTeampic.onmouseover=function(){
		clearInterval(timer);	
	}
	oTeampic.onmouseout=function(){
		timer =setInterval(function(){
			if(oUl.offsetLeft==-(oUl.offsetWidth/2)){
				oUl.style.left=0;
			}else if(oUl.offsetLeft>0){
				oUl.style.left=-(oUl.offsetWidth/2)+'px';
			}
			oUl.style.left = oUl.offsetLeft+i+'px';	
		},30)
	}
}
roll();

