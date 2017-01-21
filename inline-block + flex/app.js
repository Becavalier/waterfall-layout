;(function(){

	// Initial containers
	let waterfallCols  = [],
		waterfallCards = [];

	function init(importData = ["l", "lx", "lxx", "l", "lx", "lxx", "l", "lx", "lxx"]) {

		// Clear
		document.getElementById("container").innerHTML = "";

		// Save initial card instances
		waterfallCards = importData;
		waterfallCols  = [];

		let cardScale = {
			width: 200
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

			// Append col containers
			let colEntity = document.createElement("div");
			colEntity.className = "col";
			docFragment.appendChild(colEntity);

			// Col collection
			waterfallCols[i] = {
				ele: colEntity,
				height: 0
			}

		}

		// Append to body
		document.getElementById("container").appendChild(docFragment);

		// Paint cards
		reload(importData);
	}

	function reload(dataset) {

		for (let i = 0; i < dataset.length; i ++) {
			// Create card element
			let div = document.createElement("div");
			div.className = "card " + dataset[i];

			// Choose a shortest col to append to
			let col = chooseCol(waterfallCols);

			// Append card to this col
			col.ele.appendChild(div);

			// Update col status (height)
			update(div, col.ele, waterfallCols);
		}

	}

	function update(ele, col, waterfallCols) {

		for (let item in waterfallCols) {

			if(waterfallCols[item].ele === col) {
				waterfallCols[item].height = waterfallCols[item].height + parseInt(window.getComputedStyle(ele).height.slice(0, -2));
				break;
			}

		}

	}

	function chooseCol(waterfallCols) {

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

	window.addEventListener("scroll", function() {

		if(window.scrollY >= parseInt(window.getComputedStyle(document.documentElement).height.slice(0, -2)) / 2) {

			// Get new dataset from ajax calls
			let ajaxContent = [];
			for (let i = 0; i < 8; i ++) {
				ajaxContent[i] = ["s", "sx", "sxx", "m", "mx", "mxx", "l", "lx", "lxx"][Math.round(Math.random() * 8)];
			}

			// Save instances
			waterfallCards = waterfallCards.concat(ajaxContent);

			reload.call(this, ajaxContent);
		}

	});

	window.addEventListener("resize", function() {
		init(waterfallCards);
	});

	init();

})();

