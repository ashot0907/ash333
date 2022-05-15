$(document).ready(function() {
	// Переключение карточек
	$("body").delegate(".products--detail .products__item", "click", function() {
		var product     = $(this),
			productCode = product.data("product-code"),
			data        = new Object;

		data["productCode"] = productCode;

		$(".loading").fadeIn();
		$.ajax({
			type:     "POST",
			dataType: "text",
			url:      "/ajax/ajax.php?action=getProductItem",
			data:     "data=" + JSON.stringify(data),
			success:  function(response) {
				if(response != "") {
					$(".product-block__text-wrapper").html(response);
					$(".loading").fadeOut();
				}
			}
		});
	});

	// Добавление в корзину
	$("body").delegate(".button--add-to-cart", "click", function() {
		var button            = $(this),
			data              = new Object,
			productId         = button.attr("data-product-id"),
			productQuantity   = 1,
			productEmbroidery = $(".product-block .switcher__value, .textile-item-block .switcher__value").text(),
			totalCont         = $(".menu__item-cart-total");

		if($("[name=quantity]").length > 0) {
			productQuantity = $("[name=quantity]").val();
		}

		data["productId"]         = productId;
		data["productQuantity"]   = productQuantity;
		data["productEmbroidery"] = productEmbroidery;

		$(".loading").fadeIn();
		$.ajax({
			type:     "POST",
			dataType: "json",
			url:      "/ajax/ajax.php?action=updateCart",
			data:     "data=" + JSON.stringify(data),
			success:  function(response) {
				$(".loading").addClass("loading--success");
				setTimeout(function() {
					$(".loading").fadeOut("fast", function() {
						$(".loading").removeClass("loading--success");
					});
				}, 500);

				totalCont.removeClass("menu__item-cart-total--hidden").text(response.cartTotal);
			}
		});

		return false;
	});

	// Изменение количества в корзине
	$("body").delegate(".cart__item-quantity-input", "change", function() {
		var button          = $(this),
			data            = new Object,
			input           = button.parent(".cart__item-quantity").find(".cart__item-quantity-input"),
			product         = button.parents(".cart__item"),
			productId       = product.data("product-id"),
			productCartId   = product.data("product-cart-id"),
			productQuantity = + input.val(),
			cartCont        = $(".cart-block__wrapper"),
			totalCont       = $(".menu__item-cart-total");

		data["productId"]       = productId;
		data["productCartId"]   = productCartId;
		data["productQuantity"] = productQuantity;

		$(".loading").fadeIn();
		$.ajax({
			type:     "POST",
			dataType: "json",
			url:      "/ajax/ajax.php?action=updateCart",
			data:     "data=" + JSON.stringify(data),
			success:  function(response) {
				$(".loading").addClass("loading--success");
				setTimeout(function() {
					$(".loading").fadeOut("fast", function() {
						$(".loading").removeClass("loading--success");
					});
				}, 600);

				totalCont.text(response.cartTotal);
				cartCont.html(response.html);

				if(response.cartTotal == "0") {
					totalCont.removeClass("menu__item-cart-total--hidden");
				} else {
					totalCont.addClass("menu__item-cart-total--hidden");
				}
			}
		});

		return false;
	});

	// Удаление из корзины
	$("body").delegate(".cart__item-remove-from-cart", "click", function() {
		var button         = $(this),
			data           = new Object,
			product        = button.parents(".cart__item"),
			productId      = product.data("product-id"),
			productCartId  = product.data("product-cart-id"),
			cartCont       = $(".cart-block__wrapper"),
			totalCont      = $(".menu__item-cart-total");

		data["productId"]       = productId;
		data["productCartId"]   = productCartId;
		data["productQuantity"] = 0;

		$(".loading").fadeIn();
		$.ajax({
			type:     "POST",
			dataType: "json",
			url:      "/ajax/ajax.php?action=updateCart",
			data:     "data=" + JSON.stringify(data),
			success:  function(response) {
				$(".loading").addClass("loading--success");
				setTimeout(function() {
					$(".loading").fadeOut("fast", function() {
						$(".loading").removeClass("loading--success");
					});
				}, 600);

				totalCont.text(response.cartTotal);
				cartCont.html(response.html);

				if(response.cartTotal == "0") {
					totalCont.removeClass("menu__item-cart-total--hidden");
				} else {
					totalCont.addClass("menu__item-cart-total--hidden");
				}
			}
		});

		return false;
	});

	// Удаление вышивки из корзины
	$("body").delegate(".cart__item-remove-embroidery-from-cart", "click", function() {
		var button        = $(this),
			data          = new Object,
			formId        = button.data("form-id"),
			product       = button.parents(".cart__item"),
			productId     = product.data("product-id"),
			productCartId = product.data("product-cart-id"),
			cartCont      = $(".cart-block__wrapper");

		data["formId"]        = formId;
		data["productId"]     = productId;
		data["productCartId"] = productCartId;

		$(".loading").fadeIn();
		$.ajax({
			type:     "POST",
			dataType: "text",
			url:      "/ajax/ajax.php?action=removeEmbroideryFromCart",
			data:     "data=" + JSON.stringify(data),
			success:  function(response) {
				$(".loading").addClass("loading--success");
				setTimeout(function() {
					$(".loading").fadeOut("fast", function() {
						$(".loading").removeClass("loading--success");
					});
				}, 600);

				cartCont.html(response);
			}
		});

		return false;
	});

	// Валидация форм
	$("body").delegate(".webform", "submit", function() {
		var form       = $(this),
			formAction = form.attr("action"),
			formName   = form.attr("name"),
			errors     = false,
			inputs     = form.find("input, textarea"),
			empty      = form.find("[name=empty]");

		inputs.removeClass("input--error");
		form.find(".error-block").detach();
		form.find(".success-block").detach();

		// Простая проверка на робота
		if(empty.length > 0 && empty.val() != "") {
			return false;
		}

		// Обойдем поля, проверим данные
		inputs.each(function() {
			var input    = $(this),
				value    = input.val(),
				required = input.data("required");

			if(
				required == "required" && 
				$.trim(value) == ""
			) {
				input.addClass("input--error");
				errors = true;
			}
		});

		if(errors == false) {
			$(".loading").fadeIn();
			setTimeout(function() {
				if(formName == "ADD_VACANCY_FEEDBACK") {
					form.find("input:first").before('<div class="success-block">Заявка успешно отправлена, мы свяжемся с вами после ее рассмотрения.</div>');
				} else if(
					formName == "SHOP_EMBROIDERY_NAME" ||
					formName == "SHOP_EMBROIDERY_LOGO" ||
					formName == "SHOP_EMBROIDERY_NAME_LOGO"
				) {
					form.find("input:first").before('<div class="success-block">Информация о вышивке сохранена.</div>');
				} else if(formName == "PRICE_DOWNLOAD") {
					var dlLink =''
					if ($(".checkbox--download").find(".checkbox__icon").hasClass("checkbox__icon--active")){
						dlLink = $("span.product-fast-order__all").text();
					} else {
						dlLink = $("span.product-fast-order__text:first").text();
					}
					console.log(dlLink);
					$("div.popup--price-download div.page-top__title").text("Спасибо, сейчас начнётся скачивание прайс-листа");
					
					form.find("input:first").before('<div class="success-block">Если автоматическое скачивание не началось, нажмите на <a target="blank" id="dir-link-price" title="Скачать прайс-лист" href="'+ dlLink +'"><span>ссылку</span></a>.</div>');
					//form.find("a#dir-link-price").click();
					
					$('#dir-link-price span').trigger('click');
					
				} else {
					form.find("input:first").before('<div class="success-block">Заявка успешно отправлена.</div>');
				}

				// Сохраним вышивку в карточке
				$(".switcher__dot-wrapper").addClass("switcher__dot-wrapper--disabled");

				if(formName == "SHOP_EMBROIDERY_NAME") {
					var embroideryValue = "Имя Фамилия",
						embroideryFont  = $("input[name='form_text_117']").val();

					$(".switcher__value").text(embroideryValue + " (" + embroideryFont + ")");

				} else if(formName == "SHOP_EMBROIDERY_LOGO") {
					var embroideryValue = "Логотип",
						embroiderySize  = $("input[name='form_text_127']").val();

					$(".switcher__value").text(embroideryValue + " (" + embroiderySize + ")");

				} else if(formName == "SHOP_EMBROIDERY_NAME_LOGO") {
					var embroideryValue = "Имя + Логотип",
						embroideryFont  = $("input[name='form_text_131']").val(),
						embroiderySize  = $("input[name='form_text_135']").val();

					$(".switcher__value").text(embroideryValue + " (" + embroideryFont + ", " + embroiderySize + ")");
				}

				$(".loading").fadeOut();
				form.find("input[type=text], textarea").val("").blur();
			}, 1000);
		} else {
			if(formName == "SHOP_EMBROIDERY_NAME") {
				form.find("input:first").before('<div class="error-block">Введите текст для вышивки.</div>');
			} else if(formName == "SHOP_EMBROIDERY_LOGO") {
				form.find("input:first").before('<div class="error-block">Загрузите логотип для вышивки.</div>');
			} else if(formName == "SHOP_EMBROIDERY_NAME_LOGO") {
				form.find("input:first").before('<div class="error-block">Введите текст для вышивки и загрузите логотип для вышивки.</div>');
			} else {
				form.find("input:first").before('<div class="error-block">Проверьте правильность заполнения выделенных полей.</div>');
			}
			return false;
		}
	});

	// Показать еще
	$('body').on('click', '.js-load-more-catalog', function (e) {
		e.preventDefault();
    isScroll = false;
    $(".loading").fadeIn();
		
		var button = $(this), href = button.attr('href'), buttonWrap = button.closest('.load-more');

		$.get(href, {is_ajax_pager: 'y'}, function (data) {
		  buttonWrap.remove();
		  $('.js-load-more-catalog-wrap').append(data);
      isScroll = true;
      $(".loading").fadeOut();
		});
	});
});