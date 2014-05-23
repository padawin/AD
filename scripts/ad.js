(function() {
	var arrow = document.createElement('canvas'),
		controlSize = 100,
		controlThird = controlSize / 3,
		controlTwoThird = controlThird * 2,
		controlHalf = controlSize / 2,
		controls = [
			[
				document.createElement('img'),
				[controlThird, controlThird],
				[controlTwoThird, controlThird],
				[controlHalf, controlTwoThird]
			],
			[
				document.createElement('img'),
				[controlTwoThird, controlThird],
				[controlTwoThird, controlTwoThird],
				[controlThird, controlHalf]
			],
			[
				document.createElement('img'),
				[controlThird, controlTwoThird],
				[controlTwoThird, controlTwoThird],
				[controlHalf, controlThird]
			],
			[
				document.createElement('img'),
				[controlThird, controlThird],
				[controlThird, controlTwoThird],
				[controlTwoThird, controlHalf]
			]
		],
		ctx,
		c;

	if (!arrow.getContext) {
		throw 'This browser does not support the use of canvas';
	}

	arrow.width = arrow.height = controlSize;
	ctx = arrow.getContext('2d');

	ctx.fillStyle = '#888';
	ctx.strokeRect(0, 0, controlSize, controlSize);
	for (c in controls) {
		ctx.clearRect(1, 1, controlSize - 2, controlSize - 2);
		ctx.beginPath();
		ctx.moveTo(controls[c][1][0], controls[c][1][1]);
		ctx.lineTo(controls[c][2][0], controls[c][2][1]);
		ctx.lineTo(controls[c][3][0], controls[c][3][1]);
		ctx.fill();
		controls[c][0].src = arrow.toDataURL("image/png").replace("image/png", "image/octet-stream");
	}

	var ad = function(parent) {
		if (parent.tagName != 'CANVAS') {
			throw 'The parent element must be a canvas tag';
		}

		this.parent = parent;
		this.ctx = this.parent.getContext('2d');
		_init.apply(this, [4, 4]);
	};

	var _init = function(gridWidth, nbColors) {
		var colors = _generateColors.apply(this, [nbColors]),
			grid = _generateGrid.apply(this, [gridWidth, nbColors]);

		_displayGrid.apply(this, [grid, colors]);
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

	/**
	 * Generate the grid from a width (the grid is a square) and a number of
	 * colors.
	 * The returned grid is a 2 dimensions array containing, for each cell, an
	 * integer corresponding to the cell's color index (0, nbColors - 1)
	 */
	var _generateGrid = function(width, nbColors) {
		var grid = [],
			x = 0,
			y;

		for (; x < width; x++) {
			grid[x] = [];
			for (y = 0; y < width; y++) {
				grid[x][y] = _randomInt(nbColors);
			}
		}

		return grid;
	};

	/**
	 * Display the grid in the canvas
	 */
	var _displayGrid = function(grid, colors) {
		var canvasWidth = this.ctx.canvas.clientWidth,
			canvasHeight = this.ctx.canvas.clientHeight,
			gridWidth = grid[0].length,
			x, y,
			color,
			_displayCell;

		this.cellSize = canvasWidth / (gridWidth + 2);

		_displayCell = function(grid, color, x, y) {
			color = colors[grid[x][y]];
			this.ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
			this.ctx.fillRect((x + 1) * this.cellSize, (y + 1) * this.cellSize, this.cellSize, this.cellSize);
		};

		for (x = 0; x < gridWidth; x++) {
			// control buttons
			this.ctx.drawImage(controls[0][0], (x + 1) * this.cellSize, 0, this.cellSize, this.cellSize);
			this.ctx.drawImage(controls[1][0], canvasWidth - this.cellSize, (x + 1) * this.cellSize, this.cellSize, this.cellSize);
			this.ctx.drawImage(controls[2][0], (x + 1) * this.cellSize, canvasHeight - this.cellSize, this.cellSize, this.cellSize);
			this.ctx.drawImage(controls[3][0], 0, (x + 1) * this.cellSize, this.cellSize, this.cellSize);

			for (y = 0; y < gridWidth; y++) {
				_displayCell.apply(this, [grid, color, x, y]);
			}
		}
	};

	window.Ad = ad;
})();
