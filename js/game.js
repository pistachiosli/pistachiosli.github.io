;(function(){
	//游戏类
	var Game = {
		wallsize:25,//墙的大小
		goldsize:16,//金币大小
		goldtime:0,//金币旋转的时间
		mapitems:map.items,//地图里面的每一个小块
		grade:0,//金币得分
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
			ctx.drawImage(me.bgimg,LEFT,0,me.bgimg.width*(canvas.height/me.bgimg.height),canvas.height);
			//画墙
			for(i = 0;i<me.mapitems.length;i++){
				//在视图范围内才画
				if(me.mapitems[i].x>-1*LEFT-100&&me.mapitems[i].x<canvas.width-LEFT){
					if(me.mapitems[i].name === 'wall'){
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.wall1,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.wall2,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.wall3,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.wallsize,me.wallsize);
						}
					}else if(me.mapitems[i].name === 'pipe'){
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.pipe1,LEFT+me.mapitems[i].x,me.mapitems[i].y-me.pipe1.height);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.pipe2,LEFT+me.mapitems[i].x,me.mapitems[i].y-me.pipe2.height);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.pipe3,LEFT+me.mapitems[i].x,me.mapitems[i].y-me.pipe3.height);
						}
					}else if(me.mapitems[i].name === 'gold'){
						me.mapitems[i].type = Math.floor(me.goldtime/15)%3+1;
						if(me.mapitems[i].type === 1){
							ctx.drawImage(me.gold1,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 2){
							ctx.drawImage(me.gold2,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.gold3,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}else if(me.mapitems[i].type === 3){
							ctx.drawImage(me.gold4,LEFT+me.mapitems[i].x,me.mapitems[i].y,me.goldsize,me.goldsize);
						}
					}else if(me.mapitems[i].name === 'master'){
						var mas = new Master();
						mas.x = me.mapitems[i].x;
						mas.y = me.mapitems[i].y;
						mas.cdistance = me.mapitems[i].cdistance;
						switch(me.mapitems[i].type){
							case 1:mas.src1 = ImageManger.getImg('master11');
									mas.src2 = ImageManger.getImg('master12');
									break;
						}
						me.masters.push(mas);
						me.mapitems.splice(i,1);
						i--;
					}
				}
			}
			for(i = 0;i<me.masters.length;i++){
				me.masters[i].move();
			}
			//画标题
			ctx.font='30px Georgia';
			var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
			gradient.addColorStop('0','magenta');
			gradient.addColorStop('0.5','blue');
			gradient.addColorStop('1.0','red');
			ctx.fillStyle=gradient;
			ctx.fillText('Supper Mario',180,30);
			//画马里奥生命值
			for(i = 0;i<Mario.life;i++){
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
			if(MOVEBG){
				LEFT = canvas.width/2-Mario.movex;
			}
			me.boomWall();
		},
		//判断马里奥是否发生碰撞
		boomWall:function(){
			var me = this;
			var leavewall = true;//检测每次碰撞后是否离开墙上面
			var i;
			for(i = 0;i<me.masters.length;i++){
				if(me.masters[i].x>Mario.movex-50&&me.masters[i].x<Mario.movex+50){
					var boom  = me.isBoom(me.masters[i],Mario);
					if(boom.state === 1){
						Mario.reset();
						//马里奥踩怪物
						if(me.masters[i].cpoint[boom.ci].y-Mario.cpoint[boom.cj].y>=me.masters[i].cdistance+Mario.cdistance){
							me.grade++;
						}else{
							Mario.gg();//哦豁
						}
						me.masters.splice(i,1);
						return;
					}
				}
			}
			for(i = 0;i<me.mapitems.length;i++){
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
							state:1,//碰撞进去
							ci:i,
							cj:j
						};
					}else if(a.cpoint[i].y-b.cpoint[j].y==a.cdistance+b.cdistance
							&&Math.abs(a.cpoint[i].x-b.cpoint[j].x)<a.cdistance+b.cdistance){
						return {
							state:2//刚好碰撞
						}
					}
				}
			}
			return {
				state:3,//没有碰撞
				ci:0,
				cj:0
			};
		},
		//判断怪物与其他发生碰撞
		masterBoomWall:function(){

		}
	};
	window.Game = Game;
}())