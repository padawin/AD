(function() {
	var ad = function(parent) {
		if (parent.tagName != 'CANVAS') {
			throw 'The parent element must be a canvas tag';
		}

		this.parent = parent;

		if (!this.parent.getContext) {
			throw 'This browser does not support the use of canvas';
		}

		this.ctx = this.parent.getContext('2d');
	};


	var _randomInt = function(maxExcluded) {
		return 0 | Math.random() * maxExcluded;
	};

	/**
	 * Generate an array of colors. A color is an array of 3 integer(0, 255).
	 * The first color is randomly generated, the last one is the opposite of
	 * the first one. The others are calculated with a lerp computation.
	 */
	var _generateColors = function(nb) {
		var colors = [],
			c = 1,
			last = nb - 1,
			percentColor,
			_generateRandomColor,
			_lerp;

		_generateRandomColor = function() {
			return [
				_randomInt(256),
				_randomInt(256),
				_randomInt(256)
			]
		};

		_lerp = function(val1, val2, ratio) {
			return 0 | (Math.min(val1, val2) + Math.abs(val1 - val2) * ratio);
		};

		colors[0] = _generateRandomColor();
		colors[last] = [
			(colors[0][0] + 128) % 256,
			(colors[0][1] + 128) % 256,
			(colors[0][2] + 128) % 256
		];

		for (; c < last; c++) {
			percentColor = c / last;
			colors[c] = [
				_lerp(colors[0][0], colors[last][0], percentColor),
				_lerp(colors[0][2], colors[last][1], percentColor),
				_lerp(colors[0][1], colors[last][2], percentColor)
			];
		}

		return colors;
	};

	window.Ad = ad;
})();
