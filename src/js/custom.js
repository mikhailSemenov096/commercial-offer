'use strict';
document.addEventListener('DOMContentLoaded', ()=> {
	const modal = new Modal({
		selectors: {
			overlay: '.overlay-modal',
			elemsHidden: '.body-hidden-elem'
		},
		duration: 300,
		methods: {
			bodyHiddenCallback: (scrollBarWidth, currentScroll)=> {
				progressAnimate(currentScroll);
			},

			bodyScrollCallback: (scrollBarWidth, currentScroll)=> {
				progressAnimate();
			}
		}
	});
	modal.init();

	// В callback вызывается метод, который высчитывает ширину графиков(сроки) и анимирует их
	const wow = new WOW({
		callback: (box)=> {
			if (box.id === 'graphics') {
				graphics.animate();
			}
	    }
	});

	// Инициализация класса с графиками
	const graphics = new Graphics({
		parent: '.time-constraints__graphics',
		line: '.time-constraints__graphic-wrap',
		dates: '.time-constraints__dates',
		column: '.time-constraints__col',
		dataDates: '.time-constraints__data',
		stagesCallback: (context)=> {
			// Инициализация WOW.js. 
			// Инициализируем тогда, когда получаем массив дат
			wow.init();
		}
	});
	graphics.getStages();

	const navbar = new Navbar({
		selectors: {
			parrent: '.navbar',
		},
		duration: 1000
	})

	const inputActions = new InputActions('.field-wrap__input');

	// Отправка формы с email
	const popupSubmitForm = ()=> {
		const popupForm = document.querySelector('#popup-email-form');
		const input = popupForm.querySelector('#popup-email-field');
		const btn = popupForm.querySelector('.popup__form-btn');
		const dataModalBtn = document.querySelectorAll('[data-modal="popup-email"]');

		const btnDisabledToggle = ()=> {
			input.addEventListener('input', (e)=> {
				if (e.target.value != '') {
					btn.removeAttribute('disabled');
				} else {
					btn.setAttribute('disabled', 'true');
				}
			});
		}

		btnDisabledToggle();

		const successFormActions = (e)=> {
			e.target.reset();
			input.closest('.field-wrap').classList.remove('field-wrap_active');
			btn.setAttribute('disabled', 'true');
			// Вызываем метод nextModal, чтобы в случае успеха закрыть окно с формой и открыть окно успеха
			modal.nextModal('#popup-email', '#popup-success');

			// for (let i = 0; i < dataModalBtn.length; i++) {
			// 	dataModalBtn[i].setAttribute('data-modal', 'popup-success');
			// }
		}

		const submitForm = (e)=> {
			e.preventDefault();

			if (inputActions.validateEmail(input.value, input) === false || input.value == '') {
				return false;
			}

			const formData = new FormData(e.target);

			fetch('mail.php', {
		        method: 'POST',
		        body: formData
	        })
		    .then(response => {
	    		successFormActions(e);
		    })
		    .catch(error => console.error(error))
		}

		popupForm.addEventListener('submit', submitForm);
	}
	
	popupSubmitForm();
	progressAnimate(); // Функция прогрессбара
	headerActions(); // Анимация body при клике на логотип, установка padding-top для body
	
});
