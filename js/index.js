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
	//屏幕尺寸发生变化
	window.onresize = function(){
		pageInit();
		Game.init(1);
	}
	//加载需要的图片
	ImageManger.addImg([
		{
			name:'bg',
			src:'/mario/img/bg.png'
		},{
			name:'mario1',
			src:'/mario/img/mario1.png'
		},{
			name:'mario2',
			src:'/mario/img/mario2.png'
		},{
			name:'mario3',
			src:'/mario/img/mario3.png'
		},{
			name:'mario4',
			src:'/mario/img/mario4.png'
		}
	],function(){
		Game.init(1);
	});
	pageInit();

	//添加按钮事件
	var bt_left = document.querySelector('.to-left');
	var bt_right = document.querySelector('.to-right');
	var bt_up = document.querySelector('.to-top');
	var bt_shoot = document.querySelector('.shot');
	//移动端
	if('ontouchstart' in window){
		bt_left.addEventListener('touchstart',function(e){
			e.preventDefault();
			Mario.changeMove('left');
		});
		bt_left.addEventListener('touchend',function(e){
			e.preventDefault();
			Mario.stop('left');
		});
		bt_right.addEventListener('touchstart',function(e){
			e.preventDefault();
			Mario.changeMove('right');
		});
		bt_right.addEventListener('touchend',function(e){
			e.preventDefault();
			Mario.stop('right');
		});
		bt_up.addEventListener('touchstart',function(e){
			e.preventDefault();
			Mario.changeMove('up');
		});
		// bt_shoot.addEventListener('touchstart',function(){
		// 	Mario.shot();
		// });
	// }else{
		//pc端
		window.onkeydown = function(e){
			if(e.key === 'a'){
				Mario.changeMove('left');
			}else if(e.key === 'd'){
				Mario.changeMove('right');
			}else if(e.key === 'w'){
				Mario.changeMove('up');
			}else if(e.key === 'j'){
				
			}
		}
		window.onkeyup = function(e){
			if(e.key === 'a'){
				Mario.stop('left');
			}else if(e.key === 'd'){
				Mario.stop('right');
			}else if(e.key === 'j'){
				
			}
		}
	}
	//马里奥类
	var Mario = {
		runstate:0,//0:站立,11-26:向右走,31-46:向左走
		x:0,//相对于画布的x
		movex:0,//相对于屏幕的x
		y:0,//相对于屏幕的y
		maxy:canvas.height-32/770*canvas.width-62,
		width:32,
		height:62,
		speedx:0,
		speedy:0,
		ay:0,
		jumpstate:0,//1:一级跳,2:二级跳
		move:[false,false,false],
		init:function(){
			this.y = this.maxy;
			this.mario1 = ImageManger.getImg('mario1');
			this.mario2 = ImageManger.getImg('mario2');
			this.mario3 = ImageManger.getImg('mario3');
			this.mario4 = ImageManger.getImg('mario4');
		},
		draw:function(){
			var me = this;
			me.move();
			//静止状态
			if(me.runstate<=10){
				ctx.drawImage(me.mario1,me.x,me.y,me.width,me.height);
			}else if(me.runstate >= 11&&me.runstate<=18){//跑步状态
				ctx.drawImage(me.mario2,me.x,me.y,me.width,me.height);
				me.runstate ++;
			}else if(me.runstate>=19&&me.runstate<=26){//跑步状态2
				ctx.drawImage(me.mario1,me.x,me.y,me.width,me.height);
				me.runstate++;
				if(me.runstate === 27){
					me.runstate = 11;
				}
			}else if(me.runstate >= 31&&me.runstate<=38){
				ctx.drawImage(me.mario4,me.x,me.y,me.width,me.height);
				me.runstate ++;
			}else if(me.runstate>=39&&me.runstate<=46){
				ctx.drawImage(me.mario3,me.x,me.y,me.width,me.height);
				me.runstate++;
				if(me.runstate === 47){
					me.runstate = 31;
				}
			}
		},
		// 马里奥移动
		move:function(){
			var me = this;
			me.movex += me.speedx;
			if(Game.movebg){
				if(me.movex<canvas.width/4){
					me.movex = canvas.width/4;
				}
			}
			if(me.move[1]){//判断马里奥有没有移动到屏幕中间
				if(me.movex<canvas.width/4){
					me.x = me.movex;
				}else{
					Game.movebg = true;
				}
			}
			me.speedy += me.ay;
			me.y -= me.speedy;
			if(me.y>me.maxy){
				me.y = me.maxy;
				me.a = 0;
				me.jumpstate = 0;
			}
		},
		//马里奥状态改变
		changeMove:function(where){
			var me = this;
			if(where === 'left'){
				if(!me.move[0]&&!me.move[1]){//onkeydown一直触发的bug
					me.runstate = 31;
					me.move[0] = true;
					me.speedx = -2;
				}
			}else if(where === 'right'){
				if(!me.move[0]&&!me.move[1]){
					me.runstate = 11;
					me.move[1] = true;
					me.speedx = 2;
				}
			}else{
				me.move[2] = true;
				me.jumpstate++;
				if(me.jumpstate <= 2){
					me.speedy = 5;
					me.ay = -0.2;
				}
			}
		},
		//松开按键
		stop:function(where){
			var me = this;
			if(where === 'left'){
				me.move[0] = false;
			}else if(where === 'right'){
				me.move[1] = false;
			}
			if(!me.move[0]&&!me.move[1]){
				me.runstate = 0;
				me.speedx = 0;
			}
		}
	};
	//游戏类
	var Game = {
		left:0,
		movebg:false,
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
			me.move();
			//清除画布
			ctx.clearRect(0,0,canvas.height,canvas.height);
			//画背景图
			ctx.drawImage(me.bgimg,me.left,0,me.bgimg.width*(canvas.height/me.bgimg.height),canvas.height);
			Mario.draw();
		},
		//背景移动
		move:function(){
			var me = this;
			//马里奥右跑到屏幕中间后背景向左滑动
			if(me.movebg){
				me.left = canvas.width/4-Mario.movex;
			}
		}
	};
	window.Mario = Mario;
}())