;(function() {
	var Master = function() {
		var me = this;
		me.speedx = 0.2; //x轴速度
		me.runstate = 0;
	};
	Master.prototype.move = function() {
		var me = this;
		me.runstate++;
		me.x += me.speedx;
		me.cpoint = [{
			x:me.x+me.cdistance,
			y:me.y
		}]
		if (me.runstate < 16) {
			ctx.drawImage(me.src1, me.x+LEFT, me.y, 20, 20);
		} else {
			ctx.drawImage(me.src2, me.x+LEFT, me.y, 20, 20);
			if (me.runstate === 32) {
				me.runstate = 0;
			}
		}
	}
	window.Master = Master;
}())