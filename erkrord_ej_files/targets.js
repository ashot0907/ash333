$( document ).ready(function() {

	// Цели Яндекс-Метрика 07.08.2019:

	// 1. Звонок (Виджет справа)
	$('body').delegate('a[href="tel:+78462294831"]', 'click', function() {
		yaCounter41769514.reachGoal('clickCall');
		return true;
	});

	// 2. в "Дизайн-бюро": "Оставить заявку"
	$('body').delegate('.intro-visual__wrapper--design-project a[href="#form"]', 'click', function() {
		yaCounter41769514.reachGoal('clickDesignOrder');
		return true;
	});

	// 3. в "Дизайн-бюро": "Отправить"
	$('form[action="/design/project/#form"]').submit(function(){
		yaCounter41769514.reachGoal('sendDesignOrder');
		return true;
	});

	// 4. в карточке товара: "Быстрый заказ"
	$('body').delegate('div[data-popup="fast-order"]', 'click', function() {
		yaCounter41769514.reachGoal('clickFastOrder');
		return true;
	});

	// 5. в карточке товара: "Заказать"
	$('form[name="FAST_ORDER"]').submit(function(){
		yaCounter41769514.reachGoal('sendFastOrder');
		return true;
	});

	// 6. Добавление товара в корзину
	$('body').delegate('.button--add-to-cart', 'click', function() {
		yaCounter41769514.reachGoal('clickAddCart');
		return true;
	});

	// 7. "Отправка заявки" на странице корзины
	$('form[action="/order/"]').submit(function(){
		yaCounter41769514.reachGoal('sendCartOrder');
		return true;
	});

	// 8. Оставить заявку в блоке "Процесс работы" (Клик)
	$('body').delegate('div[data-popup="feedback"]', 'click', function() {
		yaCounter41769514.reachGoal('clickFeedbackOrder');
		return true;
	});

	// 9. Оставить заявку в блоке "Процесс работы" (Отправка)
	$('form[name="FEEDBACK"]').submit(function(){
		yaCounter41769514.reachGoal('sendFeedbackOrder');
		return true;
	});

	// 10. На странице "Текстиль": Оставить заявку на 50 карманов (Клик)
	$('body').delegate('div[data-popup="action"]', 'click', function() {
		yaCounter41769514.reachGoal('clickPocketOrder');
		return true;
	});

	// 11. На странице "Текстиль": Оставить заявку на 50 карманов (Отправка)
	$('form[action="/textile/#form"]').submit(function(){
		yaCounter41769514.reachGoal('sendPocketOrder');
		return true;
	});

	// 12. На странице Вышивки, составная цель: "Оставить заявку"
	$('body').delegate('.intro-visual__wrapper--embroidery a[href="#form"]', 'click', function() {
		yaCounter41769514.reachGoal('clickEmbroideryOrder');
		return true;
	});

	// 13. На странице Вышивки, составная цель: "Отправить форму"
	$('form[action="/embroidery/#form"]').submit(function(){
		yaCounter41769514.reachGoal('sendEmbroideryOrder');
		return true;
	});

	// 14. На странице Стайл-бук (в выпадашке "дизайн-бюро"): "Оставить заявку"
	$('body').delegate('.intro-visual__wrapper--style-book a[href="#form"]', 'click', function() {
		yaCounter41769514.reachGoal('clickStyleOrder');
		return true;
	});

	// 15. На странице Стайл-бук (в выпадашке "дизайн-бюро"): "Отправить форму"
	$('form[action="/design/style-book/#form"]').submit(function(){
		yaCounter41769514.reachGoal('sendStyleOrder');
		return true;
	});

	// 16. В контактах, составная цель: "Написать нам"
	$('body').delegate('.contacts-block__text-wrapper div[data-popup="feedback"]', 'click', function() {
		yaCounter41769514.reachGoal('clickContactsOrder');
		return true;
	});

	// 17. В контактах, составная цель: "Отправить форму"
	$('form[action="/contacts/#form"]').submit(function(){
		yaCounter41769514.reachGoal('sendContactsOrder');
		return true;
	});

	// 18. Подписка (в футере)
	$('form[name="SUBSCRIBE"]').submit(function(){
		yaCounter41769514.reachGoal('sendSubscribeOrder');
		return true;
	});

	// 19. Звонок (в шапке)
	$('body').delegate('a[href="tel:+78462294831"]', 'click', function() {
		yaCounter41769514.reachGoal('clickPhoneHeader');
		return true;
	});

});