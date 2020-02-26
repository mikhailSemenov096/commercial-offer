//Модальные окна
class Modal {
	constructor (options) {
		this.overlay = options.selectors.overlay;
		this.bodyHiddenElems = document.querySelectorAll(options.selectors.elemsHidden);
		this.duration = options.duration;

		this.bodyHiddenCallback = options.methods.bodyHiddenCallback;
		this.bodyScrollCallback = options.methods.bodyScrollCallback;

		this.overlayActive = document.querySelector(this.overlay);
		this.modalActive = null;
		this.scrollBar = null;
		this.currentScroll = null;
	}

	transitionBlock(elem, nameClass) {
		elem.classList.add(nameClass);
		elem.clientWidth;
		elem.classList.remove('box-hidden');

		setTimeout(()=> {
			elem.classList.remove(nameClass);
		}, this.duration);
	}

	transitionNone(elem, nameClass) {
		elem.classList.add(nameClass);
		elem.classList.add('box-hidden');
		
		setTimeout(()=> {
			elem.classList.remove(nameClass);
		}, this.duration);
	}

	show(overlay, modal) {
		this.bodyHidden();

		this.transitionBlock(overlay, 'smoothly-show');
		
		if (modal) {
			this.transitionBlock(modal, 'popup_enter-to');
		}
	}

	hide(overlay, modal) {
		this.transitionNone(overlay, 'smoothly-show');

		if (modal) {
			this.transitionNone(modal, 'popup_leave-to');
		}

		setTimeout(()=> this.bodyScroll(), this.duration);
	}

	showModalEvents() {
		document.addEventListener('click', (e)=> {
			if (!e.target.hasAttribute('data-modal')) return false;

			e.target.blur();
			
			const btnAttr = e.target.getAttribute('data-modal');

			this.modalActive = document.querySelector(`#${btnAttr}`);
			this.overlayActive = this.modalActive.closest(this.overlay);

			this.show(this.overlayActive, this.modalActive);
		});
	}

	closeModalEvents() {
		const elems = {
			startElem: null,
			endElem: null
		}

		const startEvent = (e)=> elems.startElem = e.target;
		const endEvent = (e)=> elems.endElem = e.target;

		document.addEventListener('mousedown', startEvent);
		document.addEventListener('touchstart', startEvent);
		document.addEventListener('mouseup', endEvent);
		document.addEventListener('touchend', endEvent);

		document.addEventListener('click', (e)=> {
			if (e.target !== this.overlayActive) return false;
			
			if (elems.endElem == elems.startElem && elems.endElem == this.overlayActive) {
				this.hide(this.overlayActive, this.modalActive);
			}
		});

		document.body.addEventListener('click', (e)=> {
			if (!e.target.classList.contains('popup__close')) return false;

			this.hide(this.overlayActive, this.modalActive);
		});

		document.addEventListener('keydown', (e)=> {
			if (e.keyCode == 27) this.hide(this.overlayActive, this.modalActive);
		});
	}

	scrollBarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}

	bodyHidden() {
		this.scrollBar = this.scrollBarWidth();
		this.currentScroll = window.pageYOffset;

		document.body.classList.add('body_hidden');

		document.body.style.paddingRight = this.scrollBar + 'px';
		document.body.style.top = -this.currentScroll + 'px';

		for (let i = 0; i < this.bodyHiddenElems.length; i++) {
			this.bodyHiddenElems[i].style.width = `calc(100% - ${this.scrollBar}px)`;
		}

		this.bodyHiddenCallback(this.scrollBar, this.currentScroll);
	}

	bodyScroll() {

		document.body.style.paddingRight = '';
		document.body.classList.remove('body_hidden');
		document.body.style.top = '';
		window.scrollTo(0, this.currentScroll);

		for (let i = 0; i < this.bodyHiddenElems.length; i++) {
			this.bodyHiddenElems[i].style.width = '';
		}

		this.bodyScrollCallback(this.scrollBar, this.currentScroll);
	}

	nextModal(current, next, closeType) {
		const currentModal = document.querySelector(current);
		const nextModal = document.querySelector(next);

		this.modalActive = nextModal;

		this.transitionNone(currentModal, 'popup_leave-to', closeType);

		setTimeout(()=> {
			this.transitionBlock(nextModal, 'popup_enter-to');
		}, this.duration);
	}

	init() {
		this.showModalEvents();
		this.closeModalEvents();
	}
}