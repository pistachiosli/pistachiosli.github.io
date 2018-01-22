(function(){
	var canvas = document.querySelector('.canvas');
	var ctx = canvas.getContext('2d');
	// 页面初始化
	function pageInit(){
		if(window.innerWidth<window.innerHeight){
			pagewidth = window.innerHeight;
			pageheight = window.innerWidth;
		}else{
			pageheight = window.innerHeight;
			pagewidth = window.innerWidth;
		}
		canvas.width = pagewidth*2;
		canvas.height = pageheight;
		canvas.style.transformOrigin = ''+pageheight/4/pagewidth*100+'% 50%';
	}
	window.onresize = function(){
		pageInit();
		Game.init(1);
	}
	//加载需要的图片
	ImageManger.addImg([
		{
			name:'bg',
			src:'../img/bg.png'
		},{
			name:'mario1',
			src:'../img/mario1.png'
		},{
			name:'mario2',
			src:'../img/mario2.png'
		}
	],function(){
		Game.init(1);
	});
	pageInit();
	//加载需要的图片
	ImageManger.addImg([
		{
			name:'bg',
			src:'../img/bg.png'
		},{
			name:'mario1',
			src:'../img/mario1.png'
		},{
			name:'mario2',
			src:'../img/mario2.png'
		},{
			name:'clickleft',
			src:'../img/clickleft.png'
		},{
			name:'clickright',
			src:'../img/clickright.png'
		}
	],function(){
		Game.init(1);
	});
	//马里奥类
	var Mario = {
		runstate:1,//0:站立,1-16:行走
		x:0,
		y:0,
		maxy:canvas.height-32/770*canvas.width-62,
		width:32,
		height:62,
		init:function(){
			this.y = this.maxy;
			this.mario1 = ImageManger.getImg('mario1');
			this.mario2 = ImageManger.getImg('mario2');
		},
		draw:function(){
			var me = this;
			if(me.runstate > 0&&me.runstate<=8){
				ctx.drawImage(me.mario1,me.x,me.y,me.width,me.height);
				me.runstate ++;
			}
			if(me.runstate>8&&me.runstate<=16){
				ctx.drawImage(me.mario2,me.x,me.y,me.width,me.height);
				me.runstate++;
				if(me.runstate>16){
					me.runstate = 1;
				}
			}
		}
	};
	//游戏类
	var Game = {
		left:0,
		init:function(i){
			var me = this;
			Mario.init();
			this.bgimg = ImageManger.getImg('bg');
			me.update();
		},
		update:function(){
			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.cancelAnimationFrame(window.animation);
			window.animation = requestAnimationFrame(Game.update);
			Game.draw();
		},
		draw:function(){
			var me = this;
			//清除画布
			ctx.clearRect(0,0,canvas.height,canvas.height);
			//画背景图
			ctx.drawImage(me.bgimg,me.left,canvas.height-me.bgimg.height*(canvas.width/me.bgimg.width),canvas.width,
				me.bgimg.height*(canvas.width/me.bgimg.width));
			Mario.draw();
		}
	};
}())