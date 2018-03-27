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
function endedHandler(me) {
	var inputs = me.parentNode.querySelectorAll('input');
	console.log(me.parentNode.querySelectorAll('input'))
	for(var i = 0;i<inputs.length;i++){
		inputs[i].removeAttribute('disabled')
	}
}
function addVideo(num, container, poster, video) {
	videos[num] = document.querySelector(container);
	videos[num].poster = poster;
	videos[num].src=video;
	if(!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))){
		videos[num].addEventListener('click',function(){
			if(this.paused){
				this.play();
			}else{
				this.pause();
			}
		})
	}
	videos[num].addEventListener('play',function(){
		var me = this;
		videos[num].timer = setInterval(function(){
			if(me.currentTime-me.last_time>1){
				me.currentTime = me.last_time;
			}
			me.last_time = me.currentTime;
		},500)
	});
	videos[num].addEventListener('pause',function(){
		var me = this;
		videos[num].timer = setInterval(function(){
			if(me.currentTime-me.last_time>1){
				me.currentTime = me.last_time;
			}
			me.last_time = me.currentTime;
		},500);
		clearInterval(this.timer);
	});
	videos[num].addEventListener('ended',function(){
		if(this.currentTime-this.last_time<1){
			endedHandler(this);
			clearInterval(this.timer);
		}
	});
}
var template = '';
var name = '电影名'
for(var i = 1;i<=32;i++){
	template+='<div class="video">'+
			'<p>'+i+'.'+name+'</p>'+
			'<video class="video'+i+'" controls="controls"></video>'+
			'<span>最佳作品<input type="checkbox" name="works" disabled="disabled" onclick="checkBox(this)"></span>'+
			'<span>最佳导演<input type="checkbox" name="director" disabled="disabled" onclick="checkBox(this)"></span>'+
			'<span>最佳编剧<input type="checkbox" name="screenwriter" disabled="disabled" onclick="checkBox(this)"></span>'+
		'</div>';
}
document.querySelector('.content').innerHTML+=template;
console.log(document.querySelector('.content'))
for(var i = 1;i<=32;i++){
	addVideo(i, '.video'+i, 'img/timg.jpg', 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4');
}

function checkBox(e) {
	switch (e.getAttribute('name')) {
		case 'works':
			console.log('这是第'+e.parentNode.parentNode.querySelector('video').className.substring(5)+'个视频');
			console.log('最佳作品');
			break;
		case 'director':
			console.log('这是第'+e.parentNode.parentNode.querySelector('video').className.substring(5)+'个视频');
			console.log('最佳导演');
			break;
		case 'screenwriter':
			console.log('这是第'+e.parentNode.parentNode.querySelector('video').className.substring(5)+'个视频');
			console.log('最佳导演');
			break;
		default:
			break;
	}
}