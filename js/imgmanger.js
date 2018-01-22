;(function(){
	var ImageManger = {
		imgarr:[],
		loadnum:0,
		//添加图片
		addImg:function(imgs,callback){
			var me = this;
			imgs.forEach(function(item){
				var img = new Image();
				img.name = item.name;
				img.src = item.src;
				img.onload = function(){
					me.loadnum++;
					me.loadImg();
				};
				me.imgarr.push(img);
			});
			if(callback){
				me.callback = callback;
			}
		},
		//获取图片
		getImg:function(name){
			var img;
			this.imgarr.forEach(function(item){
				if(item.name === name){
					img = item;
				}
			});
			return img;
		},
		//加载图片
		loadImg:function(){
			var me = this;
			console.log(me.loadnum,me.imgarr.length)
			if(me.loadnum === me.imgarr.length){
				me.callback();
			}
		}
	};
	window.ImageManger = ImageManger;
}())