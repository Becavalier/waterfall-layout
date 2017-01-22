;(function(){

	// Initial containers
	let waterfallCols  = [],
		waterfallCards = [],
		// Get new dataset from ajax calls, simulating here
		ajaxHandler = {
			status: true,
			handler: null
		}

	const cardWidth = 200;

	function init(importData = ["l", "lx", "lxx", "l", "lx", "lxx", "l", "lx", "lxx"]) {

		let cardScale = {
			width: cardWidth
		};

		// Get client window scale
		let windowWidth = document.documentElement.clientWidth;
		let colsNum = Math.floor(windowWidth / (cardScale.width + 20));

		// if(waterfallCols.length === colsNum) {
		// 	return;
		// }

		waterfallCols = [];

		let gapWidth = Math.floor((windowWidth - colsNum * cardScale.width - 100) / (colsNum - 1));

		for (let i = 0; i < colsNum; i ++) {
			waterfallCols[i] = {
				posx: (50 + i * (gapWidth + cardScale.width)),
				posy: 0
			};
		}

		// Clear
		document.getElementById("container").innerHTML = "";

		// Save initial card instances and painting cards
		waterfallCards = importData;

		reload(waterfallCards);
	}

	function reload(dataset) {

		for (let i = 0; i < dataset.length; i ++) {

			let col = chooseCol(waterfallCols);

			let div = document.createElement("div");
			div.className  = "card " + dataset[i];
			div.style.left = col.posx + "px";
			div.style.top  = col.posy + 10 + "px";

			document.getElementById("container").appendChild(div);

			col.posy = col.posy + 10 + parseInt(window.getComputedStyle(div).height.slice(0, -2));
		}

	}

	function chooseCol(waterfallCols) {

		let temp   = Number.MAX_VALUE;
		let result = null;

		for (let item of waterfallCols) {
			if(item.posy < temp) {
				temp = item.posy;
				result = item;
			}
		}

		return result;
	}

	window.addEventListener("scroll", function() {

		if(window.scrollY >= parseInt(window.getComputedStyle(document.documentElement).height.slice(0, -2)) / 2) {

			if(ajaxHandler.status) {	
				ajaxHandler.status = false;
				// Simulate an ajax call
				ajaxHandler.handler = setTimeout(function()  {
					let ajaxContent = [];
					for (let i = 0; i < 8; i ++) {
						ajaxContent[i] = ["s", "sx", "sxx", "m", "mx", "mxx", "l", "lx", "lxx"][Math.round(Math.random() * 8)];
					}

					// Save instances
					waterfallCards = waterfallCards.concat(ajaxContent);

					reload.call(this, ajaxContent);

					ajaxHandler.status = true;
				}, 1000);
			}

		}

	});

	window.addEventListener("resize", function() {
		init(waterfallCards);
	});

	init();

})();
