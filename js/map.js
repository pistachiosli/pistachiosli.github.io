(function(){
	/**
	 * 地图初始化
	 * @param {[type]} width  地图总宽
	 * @param {[type]} bottom 地面的高度
	 */
	var Map = function(width,bottom){
		this.wall = [//1:普通墙,2:问号墙,3:隐形墙
			{
				type:2,
				x:280,
				y:200
			},{
				type:1,
				x:375,
				y:200
			},{
				type:2,
				x:400,
				y:200
			},{
				type:1,
				x:425,
				y:200
			},{
				type:2,
				x:450,
				y:200
			},{
				type:1,
				x:475,
				y:200
			},{
				type:2,
				x:425,
				y:120
			},{
				type:3,
				x:1050,
				y:120
			},{

			}
		];
		this.pipe = [//1:最短的水管,2:中等长度水管,3:最长的水管
			{
				type:1,
				x:500,
				y:bottom-50
			},{
				type:2,
				x:675,
				y:bottom-90
			},{
				type:3,
				x:800,
				y:bottom-130
			},{
				type:3,
				x:925,
				y:bottom-130
			}
		];
		this.master = [//1:普通怪,2:乌龟
			{

			}
		];
	};
	window.Map = Map;
}())