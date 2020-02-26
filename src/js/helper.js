//Вспомогательные функции 
const helperFunctions = {
	isHidden: (elem)=> !elem.offsetWidth && !elem.offsetHeight,

	getCoordsElem: (elem)=> {
		const elemCoords = elem.getBoundingClientRect();

		return {
			top: elemCoords.top,
			left: elemCoords.left
		}
	},

	animate: (options)=> {
		let start = performance.now();

	  	requestAnimationFrame(function animate(time) {
	    	let timeFraction = (time - start) / options.duration;

	    	if (timeFraction > 1) timeFraction = 1;
	    	if (timeFraction < 0) timeFraction = 0;

	    	let progress = options.timing(timeFraction);

	    	options.draw(progress); // отрисовать её

	    	if (timeFraction < 1) {
	      		requestAnimationFrame(animate);
	    	}
	  	});
	}
}