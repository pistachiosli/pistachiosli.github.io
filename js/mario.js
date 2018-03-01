;
(function() {
	//马里奥类
	var Mario = {
		name: 'mario',
		cpoint: [], //中点
		cdistance: 9, //安全距离
		runstate: 0, //0:站立,11-26:向右走,31-46:向左走
		x: 0, //相对于画布的x
		movex: 0, //相对于屏幕的x
		y: 0, //相对于屏幕的y
		maxy: canvas.height * (1 - 32 / 228) - 36, //地面高度
		width: 18,
		height: 36,
		speedx: 0,
		speedy: 0,
		ay: 0,
		jumpstate: 0, //1:一级跳,2:二级跳
		movestate: [false, false, false], //左,右,上移动状态
		onwall: false, //是否在墙上
		life: 3, //生命
		init: function() {
			this.y = this.maxy;
			this.mario1 = ImageManger.getImg('mario1');
			this.mario2 = ImageManger.getImg('mario2');
			this.mario3 = ImageManger.getImg('mario3');
			this.mario4 = ImageManger.getImg('mario4');
			this.mariogg = ImageManger.getImg('mariogg');
		},
		//绘制马里奥
		draw: function() {
			var me = this;
			me.move();
			//静止状态
			if (me.runstate <= 10) {
				ctx.drawImage(me.mario1, me.x, me.y, me.width, me.height);
			} else if (me.runstate >= 11 && me.runstate <= 18) { //跑步状态
				ctx.drawImage(me.mario2, me.x, me.y, me.width, me.height);
				me.runstate++;
			} else if (me.runstate >= 19 && me.runstate <= 26) { //跑步状态2
				ctx.drawImage(me.mario1, me.x, me.y, me.width, me.height);
				me.runstate++;
				if (me.runstate === 27) {
					me.runstate = 11;
				}
			} else if (me.runstate >= 31 && me.runstate <= 38) {
				ctx.drawImage(me.mario4, me.x, me.y, me.width, me.height);
				me.runstate++;
			} else if (me.runstate >= 39 && me.runstate <= 46) {
				ctx.drawImage(me.mario3, me.x, me.y, me.width, me.height);
				me.runstate++;
				if (me.runstate === 47) {
					me.runstate = 31;
				}
			} else if (me.runstate >= 100 && me.runstate <= 199) {
				ctx.drawImage(me.mariogg, me.x, me.y + (me.runstate - 120), me.width, me.height);
				me.runstate++;
				if (me.runstate === 200) {
					me.runstate = 0;
				}
			}
		},
		// 马里奥移动
		move: function() {
			var me = this;
			me.movex += me.speedx;
			if (me.movestate[1]) { //向右跑
				if (me.movex < canvas.width / 2) { //没到中间
					me.x = me.movex;
				} else { //到中间
					MOVEBG = true;
				}
			} else if (me.movestate[0]) { //向左跑
				if (MOVEBG) { //到过中间
					if (me.movex < canvas.width / 2) {
						me.movex = canvas.width / 2;
					}
				} else { //没到过中间
					if (me.movex > 0) {
						me.x = me.movex;
					} else {
						me.movex = 0;
					}
				}
			}
			if (!me.onwall) { //在墙上就没有加速度
				me.speedy += me.ay;
				me.y -= me.speedy;
			} else if (me.speedy > 0) {
				me.speedy += me.ay;
				me.y -= me.speedy;
			}
			if (me.y > me.maxy) { //无法下降
				me.y = me.maxy;
				me.a = 0;
				me.jumpstate = 0;
			}
			me.cpoint = [{
				x: me.movex + 9,
				y: me.y + 9
			}, {
				x: me.movex + 9,
				y: me.y + 27
			}];
		},
		//马里奥状态改变
		changeMove: function(where) {
			var me = this;
			if (where === 'left') {
				if (!me.movestate[0] && !me.movestate[1]) { //onkeydown一直触发的bug
					me.runstate = 31;
					me.movestate[0] = true;
					me.speedx = -2;
				}
			} else if (where === 'right') {
				if (!me.movestate[0] && !me.movestate[1]) {
					me.runstate = 11;
					me.movestate[1] = true;
					me.speedx = 2;
				}
			} else {
				me.movestate[2] = true;
				me.jumpstate++;
				if (me.jumpstate <= 2) {
					me.speedy = 5; //初速度
					me.ay = -0.2; //离心加速度
				}
				me.onwall = false;
			}
		},
		//松开按键
		stop: function(where) {
			var me = this;
			if (me.runstate < 100) {
				if (where === 'left') {
					me.movestate[0] = false;
				} else if (where === 'right') {
					me.movestate[1] = false;
				}
				if (!me.movestate[0] && !me.movestate[1]) {
					me.runstate = 0;
					me.speedx = 0;
				}
			}
		},
		//马里奥与墙碰撞之后的重置函数
		reset: function() {
			var me = this;
			me.movex -= me.speedx;
			if (me.y !== me.maxy) {
				me.y += me.speedy;
			}
			me.speedx = 0;
			me.speedy = 0;
			me.jumpstate = 0;
			me.cpoint = [{
				x: me.movex + 9,
				y: me.y + 9
			}, {
				x: me.movex + 9,
				y: me.y + 27
			}];
		},
		gg: function() {
			var me = this;
			me.life--;
			me.runstate = 100;
			me.speedx = 0;
			if (me.life < 1) {
				alert('game over!');
			}
		}
	};
	window.Mario = Mario;
}())