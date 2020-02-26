// Плавная анимация к секциям при клике на соответствующий пункт меню
class Navbar {
	constructor(settings) {
		this.navbar = document.querySelector(settings.selectors.parrent);
		this.navLinks = this.navbar.querySelectorAll('.navbar__link');
		this.duration = settings.duration;

		this.header = document.querySelector('.header');
		this.resolveAnimate = true;

	    this.init();
	}

	bodyAnimate(target, scrollTop) {
		const points = {
			from: scrollTop,
			to: (target < 0) ? 0 : target
		}

		const animateOptions = {
			duration: this.duration,
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
	}

	initAnimation(e) {
		e.preventDefault();

		if (e.target.classList.contains('navbar__link') == false) return false
		if (this.resolveAnimate == false) return false;

		const target = e.target.getAttribute('href');
		const section = document.querySelector(target);
		const controlPoint = Math.round(helperFunctions.getCoordsElem(section).top + window.pageYOffset - this.header.offsetHeight);

		if (controlPoint == window.pageYOffset) return false;

		this.bodyAnimate(controlPoint, window.pageYOffset);

		this.resolveAnimate = false;
		setTimeout(()=> this.resolveAnimate = true, this.duration)
	}

	init() {
		this.navbar.addEventListener('click', (e)=> {
			this.initAnimation(e);
		});
	}
}