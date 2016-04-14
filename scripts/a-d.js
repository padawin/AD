(function() {
	/**
	 * Main script for the game AD. Uses canvas to display the game board.
	 */

	// Creation of the 4 arrows to move the rows and columns.
	// attributes strings
	var cellSize = 'cellSize',
		gridWidth = 'gridWidth',
		grid = 'grid',
		sCanvas = 'canvas',
		click = 'click',
		img = 'img',
		moves = 'moves',
		pngMime = 'image/png',

		d = document, createElement = 'createElement',
		arrow = d[createElement](sCanvas),
		controlSize = 100,
		controlThird = controlSize / 3,
		controlTwoThird = controlThird * 2,
		controlHalf = controlSize / 2,
		controls = [
			[
				d[createElement](img),
				[controlThird, controlThird],
				[controlTwoThird, controlThird],
				[controlHalf, controlTwoThird]
			],
			[
				d[createElement](img),
				[controlTwoThird, controlThird],
				[controlTwoThird, controlTwoThird],
				[controlThird, controlHalf]
			],
			[
				d[createElement](img),
				[controlThird, controlTwoThird],
				[controlTwoThird, controlTwoThird],
				[controlHalf, controlThird]
			],
			[
				d[createElement](img),
				[controlThird, controlThird],
				[controlThird, controlTwoThird],
				[controlTwoThird, controlHalf]
			]
		],
		ctx,
		c,
		und = undefined,
		// attributes strings
		apply = "apply",
		getContext = "getContext",
		_256 = 256,
		_Math = Math,
		length = 'length',
		_controlButtons = '_controlButtons',

		// Methods
		ad,
		_init,
		_createInformationsTable,
		_getInformation,
		_updateInformation,
		_randomInt,
		_generateColors,
		_generateGrid,
		_displayGrid,
		_clickEvent,
		_onControl,
		_setEvents,
		_detectBlobs;

	if (!arrow[getContext]) {
		throw 'This browser does not support the use of canvas';
	}

	arrow.width = arrow.height = controlSize;
	ctx = arrow[getContext]('2d');

	ctx.fillStyle = '#888';
	ctx.strokeRect(0, 0, controlSize, controlSize);
	for (c = 0; c < 4; c++) {
		ctx.clearRect(1, 1, controlSize - 2, controlSize - 2);
		ctx.beginPath();
		ctx.moveTo(controls[c][1][0], controls[c][1][1]);
		ctx.lineTo(controls[c][2][0], controls[c][2][1]);
		ctx.lineTo(controls[c][3][0], controls[c][3][1]);
		ctx.fill();
		controls[c][0].src = arrow.toDataURL(pngMime).replace(pngMime, "image/octet-stream");
	}

	/**
	 * Game construct
	 */
	ad = function(parent, options) {
		var tmp, size, canvas;
		if (parent.tagName != 'DIV') {
			tmp = B.create('div');
			parent.parentNode.replaceChild(tmp, parent);
			parent = tmp;
		}

		this.parent = parent;
		options = options || {};
		size = options.size||300;
		canvas = B.create(sCanvas, {width: size, height: size}, this.parent);

		this.ctx = canvas[getContext]('2d');
		this[_controlButtons] = [],
		_init[apply](this, [options.nbCellsSide||4, options.nbColors||4]);
	};

	_createInformationsTable = function() {
		this.infos = {blobs: ['Blobs', 0], moves: [moves, 0], colors: ['Colors', this.colors.length]};

		Object.keys(this.infos).forEach(function(key) {
			this.infos[key][1] = B.create('span', {text: this.infos[key][1]}, B.create('div', {text: this.infos[key][0] + ': '}, this.parent));
		}.bind(this));
	};

	_getInformation = function(info) {
		return this.infos[info] ? 0|this.infos[info][1].innerHTML : false;
	};

	_updateInformation = function(info, value) {
		if (!this.infos[info]) return false;

		this.infos[info][1].innerHTML = value;
	};

	/**
	 * Method to init the game
	 * Private method
	 */
	_init = function(gridWidth, nbColors) {
		var that = this;
		_generateColors[apply](that, [nbColors]);
		_generateGrid[apply](that, [gridWidth, nbColors]);
		_displayGrid[apply](that, [true]);
		_createInformationsTable[apply](that);
		_detectBlobs[apply](that);
		_setEvents[apply](that);
	};

	/**
	 * Method to generate a random integer
	 *
	 * Private method
	 */
	_randomInt = function(maxExcluded) {
		return 0 | _Math.random() * maxExcluded;
	};

	/**
	 * Generate an array of colors. A color is an array of 3 integer(0, 255).
	 * The first color is randomly generated, the last one is the opposite of
	 * the first one. The others are calculated with a lerp computation.
	 */
	_generateColors = function(nb) {
		var colors = [],
			c,
			last = nb - 1,
			percentColor,
			_generateRandomColor,
			_lerp;

		_generateRandomColor = function() {
			return [
				_randomInt(_256),
				_randomInt(_256),
				_randomInt(_256)
			]
		};

		_lerp = function(val1, val2, ratio) {
			return 0 | (_Math.min(val1, val2) + _Math.abs(val1 - val2) * ratio);
		};

		colors[0] = _generateRandomColor();
		colors[last] = [];

		for (c = 0; c < 3; c++) {
			colors[last].push((colors[0][c] + 128) % _256);
		}

		for (c = 1; c < last; c++) {
			percentColor = c / last;
			colors[c] = [
				_lerp(colors[0][0], colors[last][0], percentColor),
				_lerp(colors[0][2], colors[last][1], percentColor),
				_lerp(colors[0][1], colors[last][2], percentColor)
			];
		}

		this.colors = colors;
		this.nbColors = colors[length];
	};

	/**
	 * Generate the grid from a width (the grid is a square) and a number of
	 * colors.
	 * The returned grid is a 2 dimensions array containing, for each cell, an
	 * integer corresponding to the cell's color index (0, nbColors - 1)
	 */
	_generateGrid = function(width, nbColors) {
		var x, y;

		this[grid] = [];
		this[gridWidth] = width;

		for (x = 0; x < width; x++) {
			this[grid][x] = [];
			for (y = 0; y < width; y++) {
				this[grid][x][y] = _randomInt(nbColors);
			}
		}
	};

	/**
	 * Display the grid in the canvas
	 */
	_displayGrid = function(init) {
		var canvasWidth = this.ctx.canvas.clientWidth,
			x, y,
			_displayCell,
			_displayControl;

		this[cellSize] = canvasWidth / (this[gridWidth] + 2);

		_displayCell = function(x, y) {
			var color = this.colors[this[grid][x][y]];
			this.ctx.fillStyle = 'rgb(' + color + ')';
			this.ctx.fillRect((x + 1) * this[cellSize], (y + 1) * this[cellSize], this[cellSize], this[cellSize]);
		};

		_displayControl = function(contX, contY, ctrls, c, tmp) {
			for (c = 0; c < ctrls[length]; c++) {
				this[_controlButtons].push([contX, contY]);
				this.ctx.drawImage(controls[ctrls[c]][0], contX, contY, this[cellSize], this[cellSize]);
				tmp = contX;
				contX = contY;
				contY = tmp;
			}
		};

		for (x = 0; x < this[gridWidth]; x++) {
			if (init) {
				// control buttons
				_displayControl[apply](this, [(x + 1) * this[cellSize], 0, [0, 3]]);
				_displayControl[apply](this, [canvasWidth - this[cellSize], (x + 1) * this[cellSize], [1, 2]]);
			}

			for (y = 0; y < this[gridWidth]; y++) {
				_displayCell[apply](this, [x, y]);
			}
		}
	};

	/**
	 * Method to check if the player clicked on a control.
	 */
	_onControl = function(x, y) {
		var b, nbButtons = this._controlButtons.length;

		for (b = 0; b < nbButtons; b++) {
			if (
				this._controlButtons[b][0] <= x
				&& x <= this._controlButtons[b][0] + this[cellSize]
				&& this._controlButtons[b][1] <= y
				&& y <= this._controlButtons[b][1] + this[cellSize]
			) {
				break;
			}
		}

		return b == nbButtons ? null : b;
	};

	_clickEvent = function(e){
		var rect = this.ctx.canvas.getBoundingClientRect(),
			button = _onControl[apply](this, [e.clientX - rect.left, e.clientY - rect.top]),
			_shiftDown, _shiftRight, _shiftLeft, _shiftUp,
			row, nbBlobs;
		if (button == null) return;

		/**
		 * Methods to move a row or column in the 4 directions
		 */
		_shiftDown = function(col) {
			var last = this[grid][col][this[grid][col].length - 1];
			this[grid][col].pop();
			this[grid][col].unshift(last);
		};
		_shiftRight = function(row) {
			var old1, old2 = -1, r, last = this[grid].length - 1;
			for (r in this[grid]) {
				old1 = this[grid][r][row];
				this[grid][r][row] = ~old2 ? old2 : this[grid][(r + last) % this[grid].length][row];
				old2 = old1;
			}
		};
		_shiftUp = function(col) {
			var first = this[grid][col][0];
			this[grid][col].shift();
			this[grid][col].push(first);
		};
		_shiftLeft = function(row) {
			var r, first = this[grid][0][row];
			for (r = 0; r < this[gridWidth]; r++) {
				this[grid][r][row] = this[grid][(0|r + 1) % this[grid].length][row];
			}
			this[grid][this[grid].length - 1][row] = first;
		};

		row = 0|button/4;
		switch (button % 4) {
			case 0:
				_shiftDown[apply](this, [row]);
				break;
			case 1:
				_shiftRight[apply](this, [row]);
				break;
			case 2:
				_shiftLeft[apply](this, [row]);
				break;
			case 3:
				_shiftUp[apply](this, [row]);
				break;
		};

		nbBlobs = _detectBlobs.apply(this);
		_updateInformation.apply(this, [moves, 0|_getInformation.apply(this, [moves]) + 1]);
		_displayGrid.apply(this, [false]);

		// Winning condition
		if (nbBlobs == this.nbColors) {
			B.off(this.parent, click, _clickEvent.bind(this));
		}
	};

	/**
	 * Method to set the click event on the game, to move the controls.
	 */
	_setEvents = function() {
		B.on(this.parent, click, _clickEvent.bind(this));
	};

	/**
	 * Method to detect the blobs (like in picture processing) in the board.
	 * Returns the number of blobs of the board.
	 */
	_detectBlobs = function() {
		var blobs, nbBlobs = 0,
			x, y,
			nbCells = this[gridWidth] * this[gridWidth],
			_setBlobsAndPropagate;

		blobs = new Array(nbCells);

		_setBlobsAndPropagate = function(x, y, id) {
			var current = this[grid][x][y],
				currentIndex = y * this[gridWidth] + x,
				north = currentIndex - this[gridWidth],
				south = currentIndex + this[gridWidth],
				east = currentIndex + 1,
				west = currentIndex - 1;
			blobs[currentIndex] = id;

			if (north > 0 && blobs[north] == und && this[grid][x][y-1] == current) {
				_setBlobsAndPropagate[apply](this, [x, y-1, id]);
			}
			if (east%this[gridWidth] > currentIndex%this[gridWidth] && blobs[east] == und && this[grid][x+1][y] == current) {
				_setBlobsAndPropagate[apply](this, [x+1, y, id]);
			}
			if (south < nbCells && blobs[south] == und && this[grid][x][y+1] == current) {
				_setBlobsAndPropagate[apply](this, [x, y+1, id]);
			}
			if (_Math.abs(west%this[gridWidth]) < currentIndex%this[gridWidth] && blobs[west] == und && this[grid][x-1][y] == current) {
				_setBlobsAndPropagate[apply](this, [x-1, y, id]);
			}
		};

		for (x = 0; x < this[gridWidth]; x++) {
			for (y = 0; y < this[gridWidth]; y++) {
				if (blobs[y * this[gridWidth] + x] != und) {
					continue;
				}

				_setBlobsAndPropagate[apply](this, [x, y, nbBlobs]);
				nbBlobs++;
			}
		}

		_updateInformation[apply](this, ['blobs', nbBlobs]);
		return nbBlobs;
	};

	window.Ad = ad;
})();
