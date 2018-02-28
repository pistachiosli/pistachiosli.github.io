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
		canvas.width = pagewidth;
		canvas.height = pageheight;
		canvas.style.transformOrigin = ''+pageheight/2/pagewidth*100+'% 50%';
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
		},{
			name:'wall3',
			src:'img/wall3.png'
		},{
			name:'pipe1',
			src:'img/shuiguan1.png'
		},{
			name:'pipe2',
			src:'img/shuiguan2.png'
		},{
			name:'pipe3',
			src:'img/shuiguan3.png'
		},{
			name:'gold1',
			src:'img/gold1.png'
		},{
			name:'gold2',
			src:'img/gold2.png'
		},{
			name:'gold3',
			src:'img/gold3.png'
		},{
			name:'gold4',
			src:'img/gold4.png'
		},{
			name:'life',
			src:'img/life.png'
		},{
			name:'master11',
			src:'img/master11.png'
		},{
			name:'master12',
			src:'img/master12.png'
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
		name:'mario',
		cpoint:[],//中点
		cdistance:9,//安全距离
		runstate:0,//0:站立,11-26:向右走,31-46:向左走
		x:0,//相对于画布的x
		movex:0,//相对于屏幕的x
		y:0,//相对于屏幕的y
		maxy:canvas.height*(1-32/228)-36,//地面高度
		width:18,
		height:36,
		speedx:0,
		speedy:0,
		ay:0,
		jumpstate:0,//1:一级跳,2:二级跳
		movestate:[false,false,false],//左,右,上移动状态
		onwall:false,//是否在墙上
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
				if(me.movex<canvas.width/2){//没到中间
					me.x = me.movex;
				}else{//到中间
					Game.movebg = true;
				}
			}else if(me.movestate[0]){//向左跑
				if(Game.movebg){//到过中间
					if(me.movex<canvas.width/2){
						me.movex = canvas.width/2;
					}
				}else{//没到过中间
					if(me.movex>0){
						me.x = me.movex;
					}else{
						me.movex = 0;
					}
				}
			}
			if(!me.onwall){//在墙上就没有加速度
				me.speedy += me.ay;
				me.y -= me.speedy;
			}else if(me.speedy>0){
				me.speedy += me.ay;
				me.y -= me.speedy;
			}
			if(me.y>me.maxy){//无法下降
				me.y = me.maxy;
				me.a = 0;
				me.jumpstate = 0;
			}
			me.cpoint = [{
				x:me.movex+9,
				y:me.y+9
			},{
				x:me.movex+9,
				y:me.y+27
			}];
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
					me.speedy = 5;//初速度
					me.ay = -0.2;//离心加速度
				}
				me.onwall = false;
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
		reset:function(){
			var me = this;
			me.movex -= me.speedx;
			if(me.y!==me.maxy){
				me.y += me.speedy;
			}
			me.speedx = 0;
			me.speedy = 0;
			me.jumpstate = 0;
			me.cpoint = [{
				x:me.movex+9,
				y:me.y+9
			},{
				x:me.movex+9,
				y:me.y+27
			}];
		}
	};
	//游戏类
	var Game = {
		left:0,//屏幕最左边和背景图最左边的差值
		movebg:false,//是否需要移动背景图
		wallsize:25,//墙的大小
		goldsize:16,//金币大小
		goldtime:0,//金币旋转的时间
		mapitems:map.items,//地图里面的每一个小块
		grade:0,//金币得分
		life:3,//生命
		masters:[],
		init:function(i){
			var me = this;
			Mario.init();
			this.bgimg = ImageManger.getImg('bg');
			this.wall1 = ImageManger.getImg('wall1');
			this.wall2 = ImageManger.getImg('wall2');
			this.wall3 = ImageManger.getImg('wall3');
			this.pipe1 = ImageManger.getImg('pipe1');
			this.pipe2 = ImageManger.getImg('pipe2');
			this.pipe3 = ImageManger.getImg('pipe3');
			this.gold1 = ImageManger.getImg('gold1');
			this.gold2 = ImageManger.getImg('gold2');
			this.gold3 = ImageManger.getImg('gold3');
			this.gold4 = ImageManger.getImg('gold4');
			this.lifeimg = ImageManger.getImg('life');
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
			me.goldtime++;
			//清除画布
			ctx.clearRect(0,0,canvas.height,canvas.height);
			//画背景图
			ctx.drawImage(me.bgimg,me.left,0,me.bgimg.width*(canvas.height/me.bgimg.height),canvas.height);
			//画墙
			for(i = 0;i<me.mapitems.length;i++){
				//在视图范围内才画
				if(me.mapitems[i].x>-1*me.left-100&&me.mapitems[i].x<canvas.width-me.left){
					if(me.mapitems[i].name === 'wall'){
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.wall1,me.left+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.wall2,me.left+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.wall3,me.left+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}
					}else if(me.mapitems[i].name === 'pipe'){
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.pipe1,me.left+me.mapitems[i].x,me.mapitems[i].y-me.pipe1.height);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.pipe2,me.left+me.mapitems[i].x,me.mapitems[i].y-me.pipe2.height);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.pipe3,me.left+me.mapitems[i].x,me.mapitems[i].y-me.pipe3.height);
						}
					}else if(me.mapitems[i].name === 'gold'){
						me.mapitems[i].type = Math.floor(me.goldtime/15)%3+1;
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.gold1,me.left+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.gold2,me.left+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.gold3,me.left+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.gold4,me.left+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}
					}else if(me.mapitems[i].name === 'master'){
						var mas = Master;
						mas.x = me.mapitems[i].x;
						mas.y = me.mapitems[i].y;
						switch(me.mapitems[i].type){
							case 1:mas.src1 = ImageManger.getImg('master11');
									mas.src2 = ImageManger.getImg('master12');
									break;
						}
						me.masters.push(mas);
						me.mapitems.splice(i,1);
						i--;
						console.log(me.masters)
					}
				}
			}
			// for(i = 0;i<me.masters.length;i++){
			// 	me.masters[i].move();
			// }
			//画标题
			ctx.font='30px Georgia';
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop('0','magenta');
			gradient.addColorStop('0.5','blue');
			gradient.addColorStop('1.0','red');
			ctx.fillStyle=gradient;
			ctx.fillText('Supper Mario',180,30);
			//画马里奥生命值
			for(i = 0;i<me.life;i++){
				ctx.drawImage(me.lifeimg,20+i*20,30,20,20);
			}
			//画得分
			ctx.drawImage(me.gold1,20,60,20,15);
			ctx.font = '16px Georigia';
			ctx.fillStyle = '#f6f02c';
			ctx.fillText('x',45,72);
			ctx.font = '16px Georigia';
			ctx.fillStyle = '#f6f02c';
			ctx.fillText(me.grade,60,73);
			me.move();
			Mario.draw();
		},
		//背景移动
		move:function(){
			var me = this;
			//马里奥右跑到屏幕中间后背景向左滑动
			if(me.movebg){
				me.left = canvas.width/2-Mario.movex;
			}
			me.boomWall();
		},
		//判断是否发生碰撞
		boomWall:function(){
			var me = this;
			var leavewall = true;//检测每次碰撞后是否离开墙上面
			for(var i = 0;i<me.mapitems.length;i++){
				if(me.mapitems[i].x>Mario.movex-50&&me.mapitems[i].x<Mario.movex+50){
					var boom  = me.isBoom(me.mapitems[i],Mario);
					if(boom.state === 1){
						if(me.mapitems[i].name === 'gold'){
							me.mapitems.splice(i,1);
							me.grade++;
							break;
						}
						Mario.reset();
						//马里奥在左边
						if(me.mapitems[i].cpoint[boom.ci].x-Mario.cpoint[boom.cj].x>=me.mapitems[i].cdistance+Mario.cdistance){
							Mario.movex = me.mapitems[i].cpoint[boom.ci].x-me.mapitems[i].cdistance-Mario.width;
						//马里奥在右边
						}else if(Mario.cpoint[boom.cj].x-me.mapitems[i].cpoint[boom.ci].x>=me.mapitems[i].cdistance+Mario.cdistance){
							Mario.movex = me.mapitems[i].cpoint[boom.ci].x+me.mapitems[i].cdistance;
						//马里奥在上边
						}else if(me.mapitems[i].cpoint[boom.ci].y-Mario.cpoint[boom.cj].y>=me.mapitems[i].cdistance+Mario.cdistance){
							Mario.y = me.mapitems[i].cpoint[boom.ci].y-me.mapitems[i].cdistance-Mario.height;
							leavewall = false;
						//马里奥在下边
						}else if(Mario.cpoint[boom.cj].y-me.mapitems[i].cpoint[boom.ci].y>=me.mapitems[i].cdistance+Mario.cdistance){
							Mario.y = me.mapitems[i].cpoint[boom.ci].y+me.mapitems[i].cdistance;
							if(me.mapitems[i].name === 'wall'&&me.mapitems[i].type === 2){//金币墙
								me.mapitems[i].type = 3;
							}
							if(me.mapitems[i-1]){
								if(me.mapitems[i-1].name === 'gold'&&me.mapitems[i-1].cdistance === 0){//弹出金币
									me.mapitems[i-1].y = me.mapitems[i-1].y-18;//变y
									me.mapitems[i-1].cdistance = 5;//加安全距离
									me.mapitems[i-1].cpoint = [{x:me.mapitems[i-1].x+8,y:me.mapitems[i-1].y+8}];//加中心点
								}
							}
						}
						break;
					}
					if(boom.state === 2){
						leavewall = false;
					}
				}
			}
			if(leavewall){
				Mario.onwall = false;
			}else{
				Mario.onwall = true;
				Mario.jumpstate = 0;
				if(Mario.movestate[0]){//在墙上就恢复他的速度
					Mario.speedx = -2;
				}else if(Mario.movestate[1]){
					Mario.speedx = 2;
				}
			}
		},
		//碰撞检测,给图片设置1个或者两个中心点,然后以中心点的距离来判断
		isBoom:function(a,b){
			for(var i = 0;i<a.cpoint.length;i++){
				for(var j = 0;j<b.cpoint.length;j++){
					if(Math.abs(a.cpoint[i].x-b.cpoint[j].x)<a.cdistance+b.cdistance
					&&Math.abs(a.cpoint[i].y-b.cpoint[j].y)<a.cdistance+b.cdistance){
						return {
							state:1,
							ci:i,
							cj:j
						};
					}else if(a.cpoint[i].y-b.cpoint[j].y==a.cdistance+b.cdistance
							&&Math.abs(a.cpoint[i].x-b.cpoint[j].x)<a.cdistance+b.cdistance){
						return {
							state:2
						}
					}
				}
			}
			return {
				state:3,
				ci:0,
				cj:0
			};
		}
	};
	var Master = function(x,y,type,speedx){
		var me = this;
		me.x = x;  //初始x
		me.y = y;  //初始y
		me.speedx = 1;  //x轴速度
		me.runstate = 0;
	};
	Master.prototype.move = function(){
		var me = this;
		me.runstate++;
		me.x+=me.speedx;
		if(me.runstate<16){
			ctx.drawImage(me.src1,me.x,me.y,20,20);
		}else{
			ctx.drawImage(me.src2,me.x,me.y,20,20);
			if(me.runstate === 32){
				me.runstate = 0;
			}
		}
	}
	window.Mario = Mario;
}())