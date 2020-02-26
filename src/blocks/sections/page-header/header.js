// Анимация body при клике на лого, paddingTop у body
const headerActions = ()=> {
	const header = document.querySelector('.header');
	const logo = header.querySelector('.header__logo');

	logo.addEventListener('click', (e)=> {
		e.preventDefault();

		const points = {
			to: 0,
			from: window.pageYOffset
		}

		if (points.from == 0) return false
			
		const animateOptions = {
			duration: 1000,
			timing: (timeFraction)=> {
				return timeFraction
			},
			draw: (progress)=> {
				let propressAnimate = (points.to - points.from) * progress + points.from;

				if (propressAnimate < 0) propressAnimate = 0;

				scrollTo(0, propressAnimate);
			}
		}

		helperFunctions.animate(animateOptions);
	});

	document.body.style.paddingTop = header.offsetHeight + 'px';
	window.addEventListener('resize', ()=> document.body.style.paddingTop = header.offsetHeight + 'px');
}