/**
 * 游戏类
 * @param {Object} container    gamemap
 */
function game2048(container){
	this.container = container;
	this.tiles = new Array(16);
	this.documentWidth = window.screen.availWidth;
	this.gridContainerWidth = 0.92*this.documentWidth;
	this.cellSideLength = 0.18*this.documentWidth;
	this.cellSpace = 0.04*this.documentWidth;
	this.score = 0;
	this.scoreDiv = document.getElementById('score');
	this.button = document.getElementById('button');
	this.button.addEventListener('click',function(event){
		game.reStart();
	});
	//console.log(this.scoreDiv);
	//console.log(this.documentWidth);
}


/**
 * 初始化地图
 */
game2048.prototype.inIt = function(){
	if(this.documentWidth<600){
		this.container.style.width = this.gridContainerWidth+'px';
		this.container.style.height = this.gridContainerWidth+'px';
		//console.log(this.container);
	}
	for(i = 0;i<this.tiles.length;i++){
		var node = document.createElement("div");
		node.setAttribute("val",0);
		this.setClass(node,0);
		if(this.documentWidth<600){
			node.style.width = this.cellSideLength+'px';
			node.style.height = this.cellSideLength+'px';
			node.style.lineHeight = this.cellSideLength+'px';
			node.style.marginLeft = this.cellSpace+'px';
			node.style.marginTop = this.cellSpace+'px';
			//console.log(node.style.width);
		}
		document.getElementById("gamemap").appendChild(node);
		this.tiles[i] = node;
	}
	this.ranDom();
	this.ranDom();
};

/**
 * 随机选出赋值的小块
 */
game2048.prototype.ranDom = function(){
	this.scoreDiv.innerText = this.score;
	var zoos = new Array();
	for(var i = 0;i<this.tiles.length;i++){
		if(this.tiles[i].getAttribute("val") == 0){
			zoos.push(this.tiles[i]);
		}
	}
	//选出的小块的下标
	var num = zoos[Math.floor(Math.random()*zoos.length)];
	this.setClass(num,Math.random()<0.8?2:4);
	//console.log(num);
};

game2048.prototype.setClass = function(node,val){
	node.className = "tile tile"+val;
	node.setAttribute("val",val);
	node.innerText = val>0?val:"";
};

	document.addEventListener('touchstart',function(event){
		event.preventDefault();
		this.startx = event.touches[0].pageX;
		this.starty = event.touches[0].pageY;
	});
	document.addEventListener('touchend',function(event){
		this.endx = event.changedTouches[0].pageX;
		this.endy = event.changedTouches[0].pageY;
		if(this.startx-this.endx>=0.5&&this.starty-this.endy>=0.5){
		if((this.startx-this.endx)>(this.starty-this.endy)){
			game.MoveLeft();
		}
		else{
			game.MoveTop();
		}
	}
	else if(this.startx-this.endx>=0.5&&this.starty-this.endy<-0.5){
		if((this.startx-this.endx)>(this.endy-this.starty)){
			game.MoveLeft();
		}
		else{
			game.MoveDown();
		}
	}
	else if(this.startx-this.endx<-0.5&&this.starty-this.endy>=0.5){
		if(this.endx-this.startx>this.starty-this.endy){
			game.MoveRight();
		}
		else{
			game.MoveTop();
		}
	}
	else if(this.startx-this.endx<-0.5&&this.starty-this.endy<-0.5){
		if(this.endx-this.startx>this.endy-this.starty){
			game.MoveRight();
		}
		else{
			game.MoveDown();
		}
	}
	});
	

game2048.prototype.moveBlock = function(code){
	var j,k;
	//w键
	if(code === 87){
		//console.log("w");
		this.MoveTop();
	}
	//a键
	if(code === 65){
		//console.log("a");
		this.MoveLeft();
	}
	//s键
	if(code === 83){
		//console.log("s");
		this.MoveDown();
	}
	//d键
	if(code === 68){
		//console.log("d");
		this.MoveRight();
	}
};

game2048.prototype.MoveTop = function(){
	for(var i = 0;i<this.tiles.length;i++){
			j = i;
			//console.log(j);
			while(j>=4){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k-4].getAttribute("val") == 0){
					//console.log(k);
					this.setClass(this.tiles[k-4],parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k-=4;
				}
				j--;
			}
		}
		for(var i = 0;i<this.tiles.length;i++){
			j = i;
			while(j>=4){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k-4].getAttribute("val") == this.tiles[k].getAttribute("val")){
					this.setClass(this.tiles[k-4],2*parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k-=4;
				}
				j--;
			}
		}
		this.ranDom();
}
game2048.prototype.MoveDown = function(){
	for(var i = this.tiles.length-1;i>=0;i--){
			j = i;
			//console.log(j);
			while(j<12){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k+4].getAttribute("val") == 0){
					//console.log(k);
					this.setClass(this.tiles[k+4],parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k+=4;
				}
				j++;
			}
		}
		for(var i = this.tiles.length-1;i>=0;i--){
			j = i;
			//console.log(j);
			while(j<12){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k+4].getAttribute("val") == this.tiles[k].getAttribute("val")){
					//console.log(k);
					this.setClass(this.tiles[k+4],2*parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k+=4;
				}
				j++;
			}
		}
		this.ranDom();
}
game2048.prototype.MoveLeft = function(){
	for(var i = 0;i<this.tiles.length;i++){
			j = i;
			//console.log(j);
			while(j%4!=0){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k-1].getAttribute("val") == this.tiles[k].getAttribute("val")){
					//console.log(k);
					this.setClass(this.tiles[k-1],2*parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k-=1;
				}
				j--;
			}
		}
		for(var i = 0;i<this.tiles.length;i++){
			j = i;
			//console.log(j);
			while(j%4!=0){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k-1].getAttribute("val") == 0){
					//console.log(k);
					this.setClass(this.tiles[k-1],parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k-=1;
				}
				j--;
			}
		}
		this.ranDom();
}
game2048.prototype.MoveRight = function(){
	for(var i = this.tiles.length-1;i>=0;i--){
			j = i;
			//console.log(j);
			while(j%4!=3){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k+1].getAttribute("val") == 0){
					//console.log(k);
					this.setClass(this.tiles[k+1],parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k+=1;
				}
				j++;
			}
		}
		for(var i = this.tiles.length-1;i>=0;i--){
			j = i;
			//console.log(j);
			while(j%4!=3){
				k = j;
				if(this.tiles[k].getAttribute("val") != 0&&this.tiles[k+1].getAttribute("val") == this.tiles[k].getAttribute("val")){
					//console.log(k);
					this.setClass(this.tiles[k+1],2*parseInt(this.tiles[k].getAttribute("val")));
					this.score+=parseInt(this.tiles[k].getAttribute("val"));
					this.setClass(this.tiles[k],0);
					k+=1;
				}
				j++;
			}
		}
		this.ranDom();
}

game2048.prototype.reStart = function(){
	var childList = document.getElementById('gamemap').childNodes;
	for(var i=0,len=childList.length;i<len;i++){
	    document.getElementById('gamemap').removeChild(childList[0]);
	}
	game.inIt();

}

var game;
window.onload = function(){
	var container = document.getElementById("gamemap");
	game = new game2048(container);
	game.inIt();
}


function getCommed(){
	var code = event.which||event.keyCode;
	event.preventDefault();
	//console.log(code);
	game.moveBlock(code);
}

