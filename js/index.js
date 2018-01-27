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
			src:'img/bg.png'
		},{
			name:'mario1',
			src:'img/mario1.png'
		},{
			name:'mario2',
			src:'img/mario2.png'
		},{
			name:'mario3',
			src:'img/mario3.png'
		},{
			name:'mario4',
			src:'img/mario4.png'
		},{
			name:'wall1',
			src:'img/wall1.png'
		},{
			name:'wall2',
			src:'img/wall2.png'
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
	var map = new Map(canvas.width,(1-32/228)*canvas.height);//获取地图
	//马里奥类
	var Mario = {
		runstate:0,//0:站立,11-26:向右走,31-46:向左走
		x:0,//相对于画布的x
		movex:0,//相对于屏幕的x
		y:0,//相对于屏幕的y
		maxy:canvas.height*(1-32/228)-36,
		width:18,
		height:36,
		speedx:0,
		speedy:0,
		ay:0,
		jumpstate:0,//1:一级跳,2:二级跳
		movestate:[false,false,false],//左,右,上移动状态
		boompoint:[],//马里奥4个点,为了检测碰撞
		boomstate:false,//是否产生了碰撞
		init:function(){
			this.y = this.maxy;
			this.mario1 = ImageManger.getImg('mario1');
			this.mario2 = ImageManger.getImg('mario2');
			this.mario3 = ImageManger.getImg('mario3');
			this.mario4 = ImageManger.getImg('mario4');
		},
		//绘制马里奥
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
			if(me.movestate[1]){//向右跑
				if(me.movex<canvas.width/4){//没到中间
					me.x = me.movex;
				}else{//到中间
					Game.movebg = true;
				}
			}else if(me.movestate[0]){//向左跑
				if(Game.movebg){//到过中间
					if(me.movex<canvas.width/4){
						me.movex = canvas.width/4;
					}
				}else{//没到过中间
					if(me.movex>0){
						me.x = me.movex;
					}else{
						me.movex = 0;
					}
				}
			}
			me.speedy += me.ay;
			me.y -= me.speedy;
			if(me.y>me.maxy){//无法下降
				me.y = me.maxy;
				me.a = 0;
				me.jumpstate = 0;
			}
			me.boompoint[0] = {//左上角点
				x:me.movex,
				y:me.y
			};
			me.boompoint[1] = {//右上角点
				x:me.movex+me.width,
				y:me.y
			};
			me.boompoint[2] = {//左下角点
				x:me.movex,
				y:me.y+me.height
			};
			me.boompoint[3] = {//右下角点
				x:me.movex+me.width,
				y:me.y+me.height
			};
		},
		//马里奥状态改变
		changeMove:function(where){
			var me = this;
			if(where === 'left'){
				if(!me.movestate[0]&&!me.movestate[1]){//onkeydown一直触发的bug
					me.runstate = 31;
					me.movestate[0] = true;
					me.speedx = -2;
				}
			}else if(where === 'right'){
				if(!me.movestate[0]&&!me.movestate[1]){
					me.runstate = 11;
					me.movestate[1] = true;
					me.speedx = 2;
				}
			}else{
				me.movestate[2] = true;
				me.jumpstate++;
				if(me.jumpstate <= 2){
					me.speedy = 5.5;//初速度
					me.ay = -0.21;//离心加速度
				}
			}
		},
		//松开按键
		stop:function(where){
			var me = this;
			if(where === 'left'){
				me.movestate[0] = false;
			}else if(where === 'right'){
				me.movestate[1] = false;
			}
			if(!me.movestate[0]&&!me.movestate[1]){
				me.runstate = 0;
				me.speedx = 0;
			}
		},
		//马里奥与墙碰撞之后的重置函数
		reset:function(state){
			var me = this;
			if(state === 'return'){
				me.movex -= me.speedx;
				me.y += me.speedy;
				me.speedx = 0;
				me.speedy = 0;
				me.movestate = [false,false,false];
			}else{
				console.log('111')
				me.y += me.speedy;
				me.speedy = 0;
				me.jumpstate = 0;
				me.ay = 0;
			}
		}
	};
	//游戏类
	var Game = {
		left:0,
		movebg:false,
		wallsize:25,
		wall:map.wall,
		pipe:map.pipe,
		init:function(i){
			var me = this;
			Mario.init();
			this.bgimg = ImageManger.getImg('bg');
			this.wall1 = ImageManger.getImg('wall1');
			this.wall2 = ImageManger.getImg('wall2');
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
			var i;
			me.move();
			//清除画布
			ctx.clearRect(0,0,canvas.height,canvas.height);
			//画背景图
			ctx.drawImage(me.bgimg,me.left,0,me.bgimg.width*(canvas.height/me.bgimg.height),canvas.height);
			//画墙
			for(i = 0;i<me.wall.length;i++){
				if(me.wall[i].type === 1){
					ctx.drawImage(me.wall1,me.left+me.wall[i].x,me.wall[i].y,me.wallsize,me.wallsize);
				}else if(me.wall[i].type === 2){
					ctx.drawImage(me.wall2,me.left+me.wall[i].x,me.wall[i].y,me.wallsize,me.wallsize);
				}
			}
			//画水管
			
			Mario.draw();
		},
		//背景移动
		move:function(){
			var me = this;
			//马里奥右跑到屏幕中间后背景向左滑动
			if(me.movebg){
				me.left = canvas.width/4-Mario.movex;
			}
			me.boom();
		},
		//碰撞检测
		boom:function(){
			var me = this;
			for(var i = 0;i<me.wall.length;i++){
				if(Mario.boomstate){//之前在墙上
					var changeboomstate = true;
					if(Mario.boompoint[3].x>me.wall[i].x&&Mario.boompoint[3].x<me.wall[i].x+me.wallsize
					&&Mario.boompoint[3].y+10>me.wall[i].y&&Mario.boompoint[3].y+10<me.wall[i].y+me.wallsize){
						changeboomstate = false;//现在在墙上
						break;
					}
				}else{
					for(var j = 0;j<Mario.boompoint.length;j++){
						if(Mario.boompoint[j].x>me.wall[i].x&&Mario.boompoint[j].x<me.wall[i].x+me.wallsize
						&&Mario.boompoint[j].y>me.wall[i].y&&Mario.boompoint[j].y<me.wall[i].y+me.wallsize){
							if(Mario.boompoint[0].y + Mario.speedy<me.wall[i].y&&
								Mario.boompoint[1].y + Mario.speedy<me.wall[i].y&&
								Mario.boompoint[2].y + Mario.speedy<me.wall[i].y&&
								Mario.boompoint[3].y + Mario.speedy<me.wall[i].y){
								Mario.boomstate = true;
								Mario.reset('onwall');
							}else{
								Mario.reset('return');
							}
							break;
						}
					}
				}
			}
			if(changeboomstate){//现在没在墙上
				Mario.boomstate = false;
				Mario.ay = -0.21;
			}
		}
	};
	window.Mario = Mario;
}())