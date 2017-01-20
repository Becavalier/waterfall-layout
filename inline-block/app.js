;(function(){

	let waterfallCols = {};

	function init() {
		let cols = document.getElementsByClassName("col");

		for (let col of cols) {
			let innerTemp = {};
			for (let card of col.children) {
				innerTemp.height = innerTemp.height == undefined ? 0 : innerTemp.height + parseInt(window.getComputedStyle(card).height.slice(0, -2));
				innerTemp.ele = col;
			}

			Array.prototype.push.call(waterfallCols, innerTemp);	
		}
	}

	function reload(args) {
		
	}

	function isEmptyObj(obj) {
		let amount = 0;
		for (let e in obj) {
			amount ++;
		}
		return amount === 0 ? true : false;
	}

	function buildCard(dataObj) {
		
	}

	init();
	console.log(waterfallCols);
	window.addEventListener("scroll", function() {
		if(window.scrollY >= parseInt(window.getComputedStyle(document.documentElement).height.slice(0, -2)) / 2) {
			// Something like an ajax request
			// ... 
			reload.apply(this, [{
				msg: "This is a description from an ajax request",
				type: "m"
			}]);
		}
	});

})();

