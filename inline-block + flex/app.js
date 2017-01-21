;(function(){

	let waterfallCols  = [],
		waterfallCards = [];

	function init(mockData = ["x", "sx", "sxx", "m", "mx", "mxx", "l", "lx", "lxx"]) {

		// Clear
		document.getElementById("container").innerHTML = "";

		// Save initial cards instance
		waterfallCards = mockData;
		waterfallCols  = [];

		let cardScale = {
			width: 280
		};

		// Get client window scale
		let windowWidth = document.documentElement.clientWidth;
		let colsNum = Math.floor(windowWidth / (cardScale.width + 20));

		if(waterfallCols.length === colsNum) {
			return;
		}

		// Create columns
		let docFragment = document.createDocumentFragment();
		for (let i = 0; i < colsNum; i ++) {
			let colEntity = document.createElement("div");

			// Col collection
			waterfallCols[i] = {
				ele: colEntity,
				height: 0
			}

			colEntity.className = "col";
			docFragment.appendChild(colEntity);
		}

		// Append to body
		document.getElementById("container").appendChild(docFragment);

		// Paint
		reload(mockData);
	}

	function reload(dataset) {

		for (let i = 0; i < dataset.length; i ++) {

			let div = document.createElement("div");
			div.className = "card " + dataset[i];

			let col = chooseBestCol(waterfallCols);

			col.ele.appendChild(div);

			update(col.ele, waterfallCols);
		}

	}

	function update(col, waterfallCols) {
		let height = 0;
		for (let card of col.children) {
			height = height + parseInt(window.getComputedStyle(card).height.slice(0, -2));
		}

		for (let item in waterfallCols) {
			if(waterfallCols[item].ele === col) {
				waterfallCols[item].height = height;
				break;
			}
		}
	}

	function chooseBestCol(waterfallCols) {
		let result = {
			height: Number.MAX_VALUE
		};
		for (let item in waterfallCols) {
			if(waterfallCols[item].height < result.height) {
				result = waterfallCols[item];
			}
		}

		return result;
	}

	init();

	window.addEventListener("scroll", function() {
		if(window.scrollY >= 2 * parseInt(window.getComputedStyle(document.documentElement).height.slice(0, -2)) / 3) {

			// Get new dataset from ajax call
			let random = ["s", "sx", "sxx", "m", "mx", "mxx", "l", "lx", "lxx"];
			let ajaxCon = [];
			for (let i = 0; i < 8; i ++) {
				ajaxCon[i] = random[Math.round(Math.random() * 8)];
			}

			// Save instances
			waterfallCards = waterfallCards.concat(ajaxCon);

			reload.call(this, ajaxCon);
		}
	});

	window.addEventListener("resize", function() {
		init(waterfallCards);
	});

})();

