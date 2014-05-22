(function(){
	var ad = function(parent){
		if (parent.tagName != 'CANVAS') {
			throw 'The parent element must be a canvas tag';
		}

		this.parent = parent;

		if (!this.parent.getContext) {
			throw 'This browser does not support the use of canvas';
		}

		this.ctx = this.parent.getContext('2d');
	};

	var generateColors = function(nb){
		// generate 1 random color
		// generate its opposite color
		// generate nb-2 color equaly dispatched between the boundaries
		// lerp?
	}

	window.Ad = ad;
})();
