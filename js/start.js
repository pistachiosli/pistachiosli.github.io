var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
var MOVEBG = false;//是否移动背景
var LEFT = 0;//最左边距离
// 页面初始化
function pageInit() {
	if (window.innerWidth < window.innerHeight) {
		pagewidth = window.innerHeight;
		pageheight = window.innerWidth;
	} else {
		pageheight = window.innerHeight;
		pagewidth = window.innerWidth;
	}
	canvas.width = pagewidth;
	canvas.height = pageheight;
	canvas.style.transformOrigin = '' + pageheight / 2 / pagewidth * 100 + '% 50%';
}
//屏幕尺寸发生变化
window.onresize = function() {
		pageInit();
		Game.init(1);
	}
	//加载需要的图片
ImageManger.addImg([{
	name: 'bg',
	src: 'img/bg.png'
}, {
	name: 'mario1',
	src: 'img/mario1.png'
}, {
	name: 'mario2',
	src: 'img/mario2.png'
}, {
	name: 'mario3',
	src: 'img/mario3.png'
}, {
	name: 'mario4',
	src: 'img/mario4.png'
}, {
	name: 'mariogg',
	src: 'img/mariogg.png'
}, {
	name: 'wall1',
	src: 'img/wall1.png'
}, {
	name: 'wall2',
	src: 'img/wall2.png'
}, {
	name: 'wall3',
	src: 'img/wall3.png'
}, {
	name: 'wall4',
	src: 'img/wall4.png'
}, {
	name: 'pipe1',
	src: 'img/shuiguan1.png'
}, {
	name: 'pipe2',
	src: 'img/shuiguan2.png'
}, {
	name: 'pipe3',
	src: 'img/shuiguan3.png'
}, {
	name: 'gold1',
	src: 'img/gold1.png'
}, {
	name: 'gold2',
	src: 'img/gold2.png'
}, {
	name: 'gold3',
	src: 'img/gold3.png'
}, {
	name: 'gold4',
	src: 'img/gold4.png'
}, {
	name: 'life',
	src: 'img/life.png'
}, {
	name: 'master11',
	src: 'img/master11.png'
}, {
	name: 'master12',
	src: 'img/master12.png'
}], function() {
	Game.init(1);
});
pageInit();

//添加按钮事件
var bt_left = document.querySelector('.to-left');
var bt_right = document.querySelector('.to-right');
var bt_up = document.querySelector('.to-top');
var bt_shoot = document.querySelector('.shot');
//移动端
if ('ontouchstart' in window) {
	bt_left.addEventListener('touchstart', function(e) {
		e.preventDefault();
		Mario.changeMove('left');
	});
	bt_left.addEventListener('touchend', function(e) {
		e.preventDefault();
		Mario.stop('left');
	});
	bt_right.addEventListener('touchstart', function(e) {
		e.preventDefault();
		Mario.changeMove('right');
	});
	bt_right.addEventListener('touchend', function(e) {
		e.preventDefault();
		Mario.stop('right');
	});
	bt_up.addEventListener('touchstart', function(e) {
		e.preventDefault();
		Mario.changeMove('up');
	});
	// bt_shoot.addEventListener('touchstart',function(){
	// 	Mario.shot();
	// });
	// }else{
	//pc端
	window.onkeydown = function(e) {
		if (e.key === 'a') {
			Mario.changeMove('left');
		} else if (e.key === 'd') {
			Mario.changeMove('right');
		} else if (e.key === 'w') {
			Mario.changeMove('up');
		} else if (e.key === 'j') {

		}
	}
	window.onkeyup = function(e) {
		if (e.key === 'a') {
			Mario.stop('left');
		} else if (e.key === 'd') {
			Mario.stop('right');
		} else if (e.key === 'j') {

		}
	}
}
var map = new Map(canvas.width, (1 - 32 / 228) * canvas.height); //获取地图