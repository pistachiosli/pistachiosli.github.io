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
		window.cancelAnimationFrame(window.animation);
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
		}
	],function(){
		Game.init(1);
	});
	var Game = {
		runstate:1,//马里奥的状态
		mapfoot:0,//地面高度
		init:function(i){
			var me = this;
			me.getImgs();
			me.mapfoot = canvas.height-32/770*canvas.width-me.mario1.height;
			me.update();
		},
		getImgs:function(){
			this.bgimg = ImageManger.getImg('bg');
			this.mario1 = ImageManger.getImg('mario1');
			this.mario2 = ImageManger.getImg('mario2');
		},
		update:function(){
			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.animation = requestAnimationFrame(Game.update);
			Game.draw();
		},
		draw:function(){
			var me = this;
			ctx.clearRect(0,0,canvas.height,canvas.height);
			ctx.drawImage(me.bgimg,0,canvas.height-me.bgimg.height*(canvas.width/me.bgimg.width),canvas.width,
				me.bgimg.height*(canvas.width/me.bgimg.width));
			if(me.runstate > 0&&me.runstate<=8){
				ctx.drawImage(me.mario1,0,me.mapfoot)
				me.runstate ++;
			}
			if(me.runstate>8&&me.runstate<=16){
				ctx.drawImage(me.mario2,0,me.mapfoot)
				me.runstate++;
				if(me.runstate>16){
					me.runstate = 1;
				}
			}
		}
	}
}())