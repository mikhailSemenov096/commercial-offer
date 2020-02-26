//Модальные окна
class Modal {
	constructor (options) {
		this.overlay = document.querySelector(options.selectors.overlay);
		this.popup = this.overlay.querySelectorAll(options.selectors.popup);
		this.bodyHiddenElems = document.querySelectorAll(options.selectors.elemsHidden);
		this.duration = options.duration;

		this.bodyHiddenCallback = options.methods.bodyHiddenCallback;
		this.bodyScrollCallback = options.methods.bodyScrollCallback;

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

	transitionNone(elem, nameClass, closeType) {
		elem.classList.add(nameClass);
		elem.classList.add('box-hidden');
		
		setTimeout(()=> {
			elem.classList.remove(nameClass);

			if (closeType === 'remove') {
				this.overlay.removeChild(elem);
			}

		}, this.duration);
	}

	show(modal) {
		this.bodyHidden();

		this.transitionBlock(this.overlay, 'smoothly-show')

		if (this.popup) {
			this.transitionBlock(modal, 'popup_enter-to');
		}
	}

	hide(modal) {
		this.transitionNone(this.overlay, 'smoothly-show');

		if (this.popup) {
			this.transitionNone(modal, 'popup_leave-to');
		}

		setTimeout(()=> this.bodyScroll(), this.duration);
	}

	showModalEvents() {
		document.addEventListener('click', (e)=> {
			if (!e.target.hasAttribute('data-modal')) return false;

			const btnAttr = e.target.getAttribute('data-modal');

			this.modalActive = document.querySelector(`#${btnAttr}`);
			this.show(this.modalActive);
		})
	}

	closeModalEvents() {
		const elems = {
			startElem: null,
			endElem: null
		}

		const startEvent = (e)=> elems.startElem = e.target;
		const endEvent = (e)=> elems.endElem = e.target;

		this.overlay.addEventListener('mousedown', startEvent);
		this.overlay.addEventListener('touchstart', startEvent);
		this.overlay.addEventListener('mouseup', endEvent);
		this.overlay.addEventListener('touchend', endEvent);

		this.overlay.addEventListener('click', ()=> {
			if (elems.endElem == elems.startElem && elems.endElem == this.overlay) {
				this.hide(this.modalActive);
			}
		});

		this.overlay.addEventListener('click', (e)=> {
			if (!e.target.classList.contains('popup__close')) return false;

			this.hide(this.modalActive);
		});

		document.addEventListener('keydown', (e)=> {
			if (e.keyCode == 27) this.hide(this.modalActive);
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