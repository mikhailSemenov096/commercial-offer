// Состояния и валидация полей
class InputActions {
	constructor(selector) {
		this.inputs = document.querySelectorAll(selector);

		this.init();
	}

	focusActions(input, fieldWrap) {
		input.addEventListener('focus', ()=> {
			fieldWrap.classList.add('field-wrap_active');
		});
	}

	blurActions(input, fieldWrap) {
		const removeActiveClass = (e)=> {
			if (input.value == '') {
				fieldWrap.classList.remove('field-wrap_active')
			}
		}

		input.addEventListener('blur', removeActiveClass) 
	}

	inputActions(input, fieldWrap) {
		const removeError = (e)=> {
			if (e.target.closest('.field-wrap').classList.contains('field-wrap_error')) {
				e.target.closest('.field-wrap').classList.remove('field-wrap_error');
			}
		}

		input.addEventListener('input', (e)=> {
			removeError(e);
		});
	}

	errorValidate(input, text, type) {
		const fieldWrap = input.closest('.field-wrap');
		const errorText = fieldWrap.querySelector('.field-wrap__text-error');

		if (type) {
			fieldWrap.classList.add('field-wrap_error');
			errorText.textContent = text;
		} else {
			fieldWrap.classList.remove('field-wrap_error');
			errorText.textContent = '';
		}
		
	}

	validateEmail(email, input) {
		const emailReg = /^([0-9a-zа-я.-_]+)@([0-9a-zа-я.-]+)\.([a-zа-я]{2,})$/iu;
		const emailTest = emailReg.test(email);

		if (emailTest === false) {
			this.errorValidate(input, 'Неверный формат email', true);
		}

		return emailTest;
	}

	iterationInputs() {
		for (let i = 0; i < this.inputs.length; i++) {
			const input = this.inputs[i];
			const fieldWrap = input.closest('.field-wrap');

			this.focusActions(input, fieldWrap);
			this.blurActions(input, fieldWrap);
			this.inputActions(input, fieldWrap);
		}
	}

	init() {
		this.iterationInputs();
	}
}