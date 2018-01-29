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
				y:200,
				cpoint:[{x:292.5,y:212.5}],
				cdistance:12.5
			},{
				type:1,
				x:375,
				y:200,
				cpoint:[{x:387.5,y:212.5}],
				cdistance:12.5
			},{
				type:2,
				x:400,
				y:200,
				cpoint:[{x:412.5,y:212.5}],
				cdistance:12.5
			},{
				name:'hhh',
				type:1,
				x:425,
				y:200,
				cpoint:[{x:437.5,y:212.5}],
				cdistance:12.5
			},{
				type:2,
				x:450,
				y:200,
				cpoint:[{x:462.5,y:212.5}],
				cdistance:12.5
			},{
				type:1,
				x:475,
				y:200,
				cpoint:[{x:487.5,y:212.5}],
				cdistance:12.5
			},{
				type:2,
				x:425,
				y:120,
				cpoint:[{x:437,y:132.5}],
				cdistance:12.5
			}
		];
		this.pipe = [//1:最短的水管,2:中等长度水管,3:最长的水管
			{
				type:1,
				x:500,
				y:bottom,
				cpoint:[],
				cdistance:0
			},{
				type:2,
				x:675,
				y:bottom,
				cpoint:[],
				cdistance:0
			},{
				type:3,
				x:800,
				y:bottom,
				cpoint:[],
				cdistance:0
			},{
				type:3,
				x:925,
				y:bottom,
				cpoint:[],
				cdistance:0
			}
		];
		this.master = [//1:普通怪,2:乌龟
			{

			}
		];
	};
	window.Map = Map;
}())