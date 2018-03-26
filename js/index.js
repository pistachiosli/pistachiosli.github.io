window.onresize = function() {
	if(window.innerWidth>600){
		document.querySelector('html').style.fontSize = '20px';
	}else{
		document.querySelector('html').style.fontSize = '16px';
	}
}
if(window.innerWidth>600){
	document.querySelector('html').style.fontSize = '20px';
}
var videos = new Array(50);
//播放完成
function endedHandler() {
	alert('可以投票了')
}
function addVideo(num, container, poster, video) {
	videos[num] = document.querySelector(container);
	videos[num].poster = poster;
	videos[num].src=video;
	if ('ontouchstart' in window) {
		var me = videos[num];
		videos[num].addEventListener('touchstart',function(){
			if(me.paused){
				me.play();
				me.last_time = 0;
				videos[num].timer = setInterval(function(){
					if(me.currentTime-me.last_time>1){
						me.currentTime = me.last_time;
					}
					me.last_time = me.currentTime;
				},500)
			}else{
				me.pause();
			}
		});
	}else{
		console.log('22222222222')
		videos[num].addEventListener('click',function(){
			var me = this;
			if(me.paused){
				me.play();
				me.last_time = 0;
				videos[num].timer = setInterval(function(){
					if(me.currentTime-me.last_time>1){
						me.currentTime = me.last_time;
					}
					me.last_time = me.currentTime;
				},500)
			}else{
				me.pause();
			}
		});
	}
	videos[num].addEventListener('ended',function(){
		endedHandler();
	});
}
addVideo(1, '.video1', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(2, '.video2', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(3, '.video3', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(4, '.video4', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(5, '.video5', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(6, '.video6', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(7, '.video7', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(8, '.video8', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(9, '.video9', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(10, '.video10', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(11, '.video11', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(12, '.video12', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(13, '.video13', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(14, '.video14', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(15, '.video15', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(16, '.video16', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(17, '.video17', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(18, '.video18', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(19, '.video19', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(20, '.video20', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(21, '.video21', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(22, '.video22', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(23, '.video23', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(24, '.video24', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(25, '.video25', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(26, '.video26', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(27, '.video27', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
addVideo(28, '.video28', 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');

function checkBox(e) {
	switch (e.getAttribute('name')) {
		case 'work':
			console.log('最佳作品');
			break;
		case 'director':
			console.log('最佳导演');
			break;
		case 'screenwriter':
			console.log('最佳导演');
			break;
		default:
			break;
	}
}