var bodyHeight = $(window).height(),
  bodyWidth = $("body").width(),
  headerHeight = $("header").height(),
  isMobile = document.documentElement.clientWidth <= 992 ? true : false;

$(document).ready(function () {
  $('.filter__item .accordion__title').on('click', function (e) {
    var $currentTarget = $(e.currentTarget),
      $accordion = $currentTarget.parent('.accordion'),
      $content = $currentTarget.next('.accordion__content');

    e.preventDefault();
    $content.slideToggle();
    $accordion.toggleClass('active');
    return false
  });

  bodyHeight = $(window).height();
  bodyWidth = $("body").width();
  headerHeight = $("header").height();

  $('body').on('click', '.js-move-data-href', function(){
    href = $(this).data('href');
    location.href = href;
  });

  // Фокус инпутов
  $("input, textarea").each(function () {
    var input = $(this),
      value = input.val(),
      label = input.prev(".label");

    if (label.length == 0) {
      label = input.parent().prev(".label");
    }

    if (value != "" && label.length > 0) {
      label.addClass("label--focused");
    }
  });

  $("body").delegate("input, textarea", "focus", function () {
    var input = $(this),
      label = input.prev(".label");

    if (label.length == 0) {
      label = input.parent().prev(".label");
    }

    label.addClass("label--focused");
  });

  $("body").delegate("input, textarea", "blur", function () {
    var input = $(this),
      value = input.val(),
      label = input.prev(".label");

    if (label.length == 0) {
      label = input.parent().prev(".label");
    }

    if (value == "") {
      label.removeClass("label--focused");
    } else {
      label.addClass("label--focused");
    }
  });

  // Маска телефона
  //$("[data-mask=phone]").mask("9 (999) 999-99-99");

  // Кастомные радиобаттоны
  $("body").delegate(".radiobutton", "click", function () {
    var radiobuttonGoal = $(this),
      radiobuttonGoalValue = radiobuttonGoal.data("value"),
      radiobuttonGoalName = radiobuttonGoal.data("name"),
      radiobuttonGoalIconDot = radiobuttonGoal.find(".radiobutton__icon-dot"),
      radiobuttonInput = $("[name='" + radiobuttonGoalName + "']"),
      radiobuttonIconDot = $("[data-name='" + radiobuttonGoalName + "']").find(".radiobutton__icon-dot");

    radiobuttonIconDot.removeClass("radiobutton__icon-dot--active");
    radiobuttonGoalIconDot.addClass("radiobutton__icon-dot--active");
    radiobuttonInput.val(radiobuttonGoalValue);
    radiobuttonInput.change();

    // Юридическое лицо
    if (radiobuttonGoalValue == 1) {
      $(".tab-content--individual").removeClass("tab-content--active");
      $(".tab-content--entity").addClass("tab-content--active");

      // Физическое лицо
    } else if (radiobuttonGoalValue == 2) {
      $(".tab-content--individual").addClass("tab-content--active");
      $(".tab-content--entity").removeClass("tab-content--active");

      // Вышивка имени
    } else if (radiobuttonGoalValue == "Имя Фамилия") {
      $(".tab-content--name").addClass("tab-content--active");
      $(".tab-content--logo").removeClass("tab-content--active");
      $(".tab-content--name-logo").removeClass("tab-content--active");

      // Вышивка логотипа
    } else if (radiobuttonGoalValue == "Логотип") {
      $(".tab-content--logo").addClass("tab-content--active");
      $(".tab-content--name").removeClass("tab-content--active");
      $(".tab-content--name-logo").removeClass("tab-content--active");

      // Вышивка имени и логотипа
    } else if (radiobuttonGoalValue == "Имя + Логотип") {
      $(".tab-content--name-logo").addClass("tab-content--active");
      $(".tab-content--name").removeClass("tab-content--active");
      $(".tab-content--logo").removeClass("tab-content--active");
    }
  });

  // Кастомные чекбоксы
  $("body").delegate(".checkbox", "click", function () {
    var checkbox = $(this),
      checkboxValue = checkbox.data("value"),
      checkboxName = checkbox.data("name"),
      checkboxInput = checkbox.prev("[name='" + checkboxName + "']"),
      checkboxHref = checkbox.attr("href"),
      checkboxIcon = checkbox.find(".checkbox__icon");

    checkboxIcon.toggleClass("checkbox__icon--active");

    if (checkboxIcon.hasClass("checkbox__icon--active")) {
      checkboxInput.val(checkboxValue);
    } else {
      checkboxInput.val("");
    }

    if (checkboxHref) {
      return false;
    }

    checkboxInput.change();
  });

  // Кастомные селекты
  $("body").delegate(".select-options__item:not(.select-options__item--disabled)", "click", function () {
    var selectOptionGoal = $(this),
      select = selectOptionGoal.parents(".select"),
      selectOption = select.find(".select-options .select-options__item"),
      selectValue = selectOptionGoal.data("value"),
      selectText = selectOptionGoal.text(),
      selectName = select.data("name"),
      selectInput = select.prev('[name="' + selectName + '"]'),
      selectValueBlock = select.find(".select__value"),
      selectValueBlockText = selectValueBlock.find(".select__value-text");

    select.removeClass("select--opened");
    selectOption.removeClass("select-options__item--active");
    selectOptionGoal.addClass("select-options__item--active");
    selectInput.val(selectValue).change();

    if (selectValueBlockText.length > 0) {
      selectValueBlockText.text(selectText);
    } else {
      selectValueBlock.text(selectText);
    }
  });

  $(".select").hover(function () {
    $(this).addClass("select--opened");
  }, function () {
    $(this).removeClass("select--opened");
  });

  // Кастомный выбор файла
  $("body").delegate(".file__input", "change", function () {
    var inputValue = $(this).val().split("\\").pop();

    $(".file__size").text("(" + inputValue + ")");
  });

  // Переключатель
  $("body").delegate(".switcher__dot-wrapper:not(.switcher__dot-wrapper--disabled)", "click", function () {
    var switcher = $(this),
      switcherDot = switcher.find(".switcher__dot"),
      switcherValue = switcher.next(".switcher__value");

    switcherDot.toggleClass("switcher__dot--active");

    if (switcherDot.hasClass("switcher__dot--active")) {
      switcherValue.text("Да");
    } else {
      switcherValue.text("Нет");
    }
  });

  // Политика конфиденциальности
  $("body").delegate(".checkbox--policy", "click", function () {
    var checkbox = $(this),
      checkboxIcon = checkbox.find(".checkbox__icon"),
      form = checkbox.parents("form"),
      button = form.find("[type=submit]");

    if (checkboxIcon.hasClass("checkbox__icon--active")) {
      button.removeAttr("disabled");
    } else {
      button.attr("disabled", "disabled");
    }
  });

  // Прелоадер
  if ($(".preloader").length > 0) {
    setTimeout(function () {
      $(".preloader").fadeOut();
    }, 2500);
  }

  // Высота интро
  if ($(".intro-visual").length > 0) {
    var wrapper = $(".intro-visual__wrapper"),
      wrapperHeight = bodyHeight - headerHeight - 50;

    wrapper.innerHeight(wrapperHeight);
  }

  // Высота карточки товара
  if ($(".product-block").length > 0) {
    var wrapper = $(".product-block__wrapper"),
      wrapperHeight = bodyHeight - headerHeight - 50;

    wrapper.css("min-height", wrapperHeight);
  }

  // Высота карточки текстиля
  if ($(".textile-item-block").length > 0) {
    var wrapper = $(".textile-item-block__wrapper"),
      wrapperHeight = bodyHeight - headerHeight - 50;

    wrapper.css("min-height", wrapperHeight);
  }

  // Высота карточки интернет-магазина
  if ($(".shop-item-block").length > 0) {
    var wrapper = $(".shop-item-block__wrapper"),
      wrapperHeight = bodyHeight - headerHeight - 50;

    wrapper.css("min-height", wrapperHeight);
  }

  // Высота карточки портфолио
  if ($(".portfolio-item-block").length > 0) {
    var wrapper = $(".portfolio-item-block__wrapper"),
      wrapperHeight = bodyHeight - headerHeight - 50,
      portfolioImage = $(".portfolio-item-block__image-wrapper .portfolio-item-block__image");

    wrapper.css("min-height", wrapperHeight);
    portfolioImage.css("min-height", wrapperHeight);
  }

  // Анкоры
  $("body").delegate(".anchor", "click", function () {
    var anchor = $(this),
      anchorHref = anchor.attr("href").replace("#", ""),
      blockGoal = $("[name='" + anchorHref + "']");

    scrollToObj(blockGoal);

    // Заполним вакансию
    if (anchor.data("vacancy") != "") {
      $("[name=form_hidden_47]").val(anchor.data("vacancy"));
    }

    return false;
  });

  // Кнопка вверх
  $(".up-button").click(function () {
    scrollToObj($(".header"));
  });

  // Переключение карточек
  $(".products--detail .products__item").click(function () {
    var productImageWrapperGoal = $(this).children(".products__item-image-wrapper"),
      productImageWrapper = $(".products--detail .products__item .products__item-image-wrapper");

    productImageWrapper.removeClass("products__item-image-wrapper--active");
    productImageWrapperGoal.addClass("products__item-image-wrapper--active");
  });

  if (window.location.hash) {
    var productCode = window.location.hash.replace("#", ""),
      productGoal = $("[data-product-code=" + productCode + "]");

    if (productGoal.length > 0) {
      setTimeout(function () {
        productGoal.click();
      }, 50);
    }
  }

  // Переключение тканей
  $("body").delegate(".fabrics--detail .fabrics__item", "click", function () {
    var fabricGoal = $(this),
      fabric = $(".fabrics--detail .fabrics__item"),
      fabricId = fabricGoal.data("fabric-id"),
      size = $(".textile-item-block__sizes .select-options__item"),
      sizeGoal = $(".textile-item-block__sizes [data-fabric-id=" + fabricId + "]"),
      sizeValue = sizeGoal.eq(0).text();

    fabric.removeClass("fabrics__item--active");
    fabricGoal.addClass("fabrics__item--active");
    size.addClass("d-none").removeClass("select-options__item--active");
    sizeGoal.removeClass("d-none");
    sizeGoal.eq(0).addClass("select-options__item--active");
    sizeGoal.eq(0).click();

    if (sizeGoal.length == 1) {
      $(".textile-item-block__size-value").text(sizeValue);
      $(".textile-item-block__size").removeClass("d-none");
      $(".textile-item-block__sizes").addClass("d-none");
    } else {
      $(".textile-item-block__size").addClass("d-none");
      $(".textile-item-block__sizes").removeClass("d-none");
    }
  });

  if ($(".textile-item-block__sizes .select-options__item:visible").length == 1) {
    $(".textile-item-block__size").removeClass("d-none");
    $(".textile-item-block__sizes").addClass("d-none");
  }

  if (window.location.hash) {
    var fabricCode = window.location.hash.replace("#", ""),
      fabricGoal = $("[data-fabric-code=" + fabricCode + "]");

    if (fabricGoal.length > 0) {
      setTimeout(function () {
        fabricGoal.click();
      }, 50);
    }
  }

  // Переключение размеров в текстиле
  $("body").delegate(".textile-item-block__sizes .select-options__item", "click", function () {
    var sizeGoal = $(this),
      productName = $(".textile-item-block__title").text(),
      fabricName = $(".fabrics .fabrics__item--active").data("fabric-name"),
      sizeName = sizeGoal.text(),
      offerId = sizeGoal.data("offer-id"),
      offerPrice = sizeGoal.data("offer-price"),
      offerArticle = productName + " " + fabricName + " " + sizeName,
      priceBlock = $(".textile-item-block__price"),
      addToCartButton = $(".button--add-to-cart"),
      addToFastOrderButton = $(".button--add-to-fast-order");

    priceBlock.html(offerPrice + ' <span class="fa fa-rouble"></span>');
    addToCartButton.attr("data-product-id", offerId);
    addToFastOrderButton.attr("data-product-article", offerArticle);
  });

  // Переключение размеров в интернет-магазине
  $("body").delegate(".shop-item-block__sizes .select-options__item, .shop-item-block__heights .select-options__item", "click", function () {
    var optionCurrent = $(this),
      size = "",
      height = "",
      offers = $(".shop-item-block__offers .select-options__item"),
      priceBlock = $(".shop-item-block__price"),
      addToCartButton = $(".button--add-to-cart"),
      embroideryButton = $(".switcher__dot-wrapper");

    if ($(".shop-item-block__sizes").length > 0) {
      size = $(".shop-item-block__sizes .select-options__item--active").text();
    }
    if ($(".shop-item-block__heights").length > 0) {
      height = $(".shop-item-block__heights .select-options__item--active").text();
    }

    // Выберем нужное торговое предложение
    offers.each(function () {
      var offerCurrent = $(this),
        offerSize = offerCurrent.data("size"),
        offerHeight = offerCurrent.data("height");

      if (
        offerSize == size &&
        offerHeight == height
      ) {
        var offerId = offerCurrent.data("offer-id"),
          offerPrice = offerCurrent.data("offer-price");

        offerCurrent.click();
        priceBlock.html(numberFormat(offerPrice, 0, "", " ") + ' <span class="fa fa-rouble"></span>');
        addToCartButton.attr("data-product-id", offerId);
        embroideryButton.attr("data-product-id", offerId);

        return false;
      }
    });

    // Сбросим вышивку
    $(".popup--shop-embroidery").detach(".success-block");
    if ($(".switcher__dot--active").length > 0) {
      $(".switcher__dot-wrapper").removeClass("switcher__dot-wrapper--disabled").click();
      $(".popup--shop-embroidery").removeClass("popup--visible");
      $(".shadow").fadeOut();
    }
  });

  // Изменение количества в корзине
  $("body").delegate(".quantity__button", "click", function () {
    var button = $(this),
      input = button.parent(".quantity").find("input"),
      quantity = +input.val();

    if (button.hasClass("quantity__button--plus")) {
      quantity++;
    } else if (button.hasClass("quantity__button--minus")) {
      quantity--;

      if (quantity == 0) {
        quantity = 1;
      }
    }

    input.val(quantity);
    input.change();
  });

  $("body").delegate("[name=quantity]", "keyup", function () {
    if (/\D/g.test(this.value)) {
      this.value = this.value.replace(/\D/g, "");
    }
  });

  $("body").delegate("[name=ORDER_PROP_7]", "keyup", function () {
    if (/\D/g.test(this.value)) {
      this.value = this.value.replace(/\D/g, "");
    }
  });

  // Вкладки
  $("body").delegate(".tabs .tabs__item", "click", function () {
    var tabGoal = $(this),
      tabs = tabGoal.parent(".tabs"),
      tabIndex = tabGoal.index(),
      tabParent = tabs.parent(),
      tab = tabs.find(".tabs__item"),
      tabContent = tabParent.find(".tab-content"),
      tabContentGoal = tabContent.eq(tabIndex);

    tab.removeClass("tabs__item--active");
    tabContent.removeClass("tab-content--active");

    tabGoal.addClass("tabs__item--active");
    tabContentGoal.addClass("tab-content--active");
  });

  // Спойлеры
  $("body").delegate(".spoiler", "click", function () {
    var spoiler = $(this),
      spoilerContent = spoiler.next(".spoiler-content"),
      spoilerClose = spoilerContent.find(".spoiler-close");

    if (spoilerContent.length == 0) {
      spoilerContent = spoiler.parent().next(".spoiler-content");
      spoilerClose = spoilerContent.find(".spoiler-close");
    }

    spoiler.toggleClass("spoiler--active");
    spoilerContent.slideToggle();

    if (spoilerClose.length > 0) {
      spoiler.toggle();
    }
  });

  $("body").delegate(".spoiler-close", "click", function () {
    var spoilerClose = $(this),
      spoilerContent = spoilerClose.parent(".spoiler-content"),
      spoiler = spoilerContent.prev(".spoiler");

    spoiler.click();
  });

  // Попапы
  $("body").delegate(".show-popup", "click", function () {
    debugger;
    var button = $(this),
      popupClass = button.data("popup"),
      popup = $(".popup--" + popupClass);

    popup.toggleClass("popup--visible");

    if (popup.hasClass("popup--visible")) {
      $(".shadow").fadeIn();
      $(".header__menu-show").addClass('open');
    } else {
      $(".shadow").fadeOut();
      $(".header__menu-show").removeClass('open');
    }

    if (popupClass == "fast-order") {
      var productArticle = button.data("product-article"),
        productName = button.data("product-name"),
        productText = button.data("product-text");

      $(".product-fast-order__article").text(productArticle);
      $(".product-fast-order__title").text(productName);
      $(".product-fast-order__text").text(productText);
      $("[name=form_hidden_23]").val(productArticle);

    } else if (popupClass == "shop-embroidery") {
      var productId = button.data("product-id"),
        productArticle = button.data("product-article");

      $("[name=form_hidden_121]").val(productId);
      $("[name=form_hidden_129]").val(productId);
      $("[name=form_hidden_133]").val(productId);
      $("[name=form_hidden_123]").val(productArticle);
      $("[name=form_hidden_130]").val(productArticle);
      $("[name=form_hidden_134]").val(productArticle);
    } else if (popupClass == "price-download") {
      var productArticle = button.data("product-article"),
        productName = button.data("product-name"),
        productText = button.data("product-text");
		productAll = button.data("product-all");
        productPositions = button.data("product-positions");
		if (productPositions == "") $("div.checkbox--download").hide();
      $(".product-fast-order__article").text(productArticle);
      $(".product-fast-order__title").text(productName);
      $(".product-fast-order__text").text(productText);
	  $(".product-fast-order__all").text(productAll);
      $("[name=form_hidden_147]").val(productArticle);
    }

    return false;
  });

  $('.drop-down-menu .drop-down-menu__h-uppercase').click(function () {
    if ($('.drop-down-menu').hasClass('open')) {
      $('.drop-down-menu').removeClass('open');
    } else {
      $('.drop-down-menu').addClass('open');
    }
  });

  $('.menu--responsive ul:nth-child(3) > .menu__item:nth-child(1), .menu--responsive ul:nth-child(3) > .menu__item:nth-child(3), .menu--responsive ul:nth-child(3) > .menu__item:nth-child(5)').click(function () {
    $(this).toggleClass('open');
  });

  /*$(".popup--menu-uniform .menu__col > ul > .menu__item--subitem").click(function() {
    //if($(this).children().is("ul")) {
    //	$(".popup--menu-uniform .menu__col > ul > .menu__item--subitem").children('a');
    //}
    if($(this).hasClass('open')) {
      $(".popup--menu-uniform .menu__col > ul > .menu__item--subitem").removeClass('open');
    } else {
      $(".popup--menu-uniform .menu__col > ul > .menu__item--subitem").removeClass('open');
      $(this).addClass('open');
    }
  });

  $(".popup--menu-uniform .menu__col > ul > .menu__item--subitem > a").click(function(e) {
    if($(this).parent().children().is("ul")) {
      e.preventDefault();
    }
  });*/

  $("body").delegate(".shadow, .popup__close, .menu-link-close, .button--close", "click", function () {
    $(".shadow").fadeOut();
    $(".popup").removeClass("popup--visible");
    $(".menu-link").removeClass("menu-link-close");
    $(".header__menu-show").removeClass('open');

    if (
      $(".switcher__dot-wrapper").length > 0 &&
      !$(".switcher__dot-wrapper").hasClass("switcher__dot-wrapper--disabled")
    ) {
      $(".switcher__dot").removeClass("switcher__dot--active");
      $(".switcher__value").text("Нет");
    }
  });

  $(window).scroll(function () {
    /*$(".popup--menu").removeClass("popup--visible");
    $(".shadow").fadeOut();
    $(".header__menu-show").removeClass('open');*/
  });

  // Выбор города
  var menuTimeout,
    popupMenuCitiesOffset = bodyWidth - $(".header__city").outerWidth() - $(".header__city").offset().left;

  $(".popup--menu-cities").css("right", popupMenuCitiesOffset);

  $(".header__city").hover(function () {
    menuTimeout = setTimeout(function () {
      $(".popup--menu-additional").removeClass("popup--visible");
      $(".popup--menu-cities").addClass("popup--visible");
    }, 150);
  }, function () {
    clearTimeout(menuTimeout);
  });

  $(".popup--menu-cities").hover(function () {
  }, function () {
    $(".popup--menu-cities").removeClass("popup--visible");
  });

  // Главное меню
  var popupMenuOffset = bodyWidth - $(".header__menu-show-more").outerWidth() - $(".header__menu-show-more").offset().left;

  $(".popup--menu-additional").css("right", popupMenuOffset);

  $(".header__menu-show-more").hover(function () {
    var popupMenuOffset = bodyWidth - $(".header__menu-show-more").outerWidth() - $(".header__menu-show-more").offset().left;
    $(".popup--menu-additional").css("right", popupMenuOffset);
    menuTimeout = setTimeout(function () {
      $(".popup--menu-cities").removeClass("popup--visible");
      $(".popup--menu-additional").addClass("popup--visible");
    }, 150);
  }, function () {
    clearTimeout(menuTimeout);
  });

  $(".popup--menu-additional").hover(function () {
  }, function () {
    $(".popup--menu-additional").removeClass("popup--visible");
  });

  $(".header__menu .menu__item").hover(function () {
    $(".popup--menu-additional").removeClass("popup--visible");
  }, function () {
  });

  // Меню униформы
  var popupMenuOffset = $(".header__menu .menu__item:first").offset().left;
  if (($(window).width() <= 1400) && ($(window).width() >= 1000)) {
    popupMenuOffset = popupMenuOffset - 300;
  }
  if (($(window).width() <= 1000) && ($(window).width() >= 768)) {
    popupMenuOffset = popupMenuOffset - 190;
  }
  $(".popup--menu-uniform").css("left", popupMenuOffset);

  $(".header__menu .menu__item:first").hover(function () {
    var popupMenuOffset = $(".header__menu .menu__item:first").offset().left;
    if (($(window).width() <= 1400) && ($(window).width() >= 1000)) {
      popupMenuOffset = popupMenuOffset - 300;
    }
    if (($(window).width() <= 1000) && ($(window).width() >= 768)) {
      popupMenuOffset = popupMenuOffset - 190;
    }
    $(".popup--menu-uniform").css("left", popupMenuOffset);

    menuTimeout = setTimeout(function () {
      $(".popup--menu-uniform").addClass("popup--visible");
    }, 150);
  }, function () {
    clearTimeout(menuTimeout);
  });

  $(".header__menu .menu__item:not(:first)").hover(function () {
    var menuItemChild = $(this).find("ul");

    $(".popup--menu-uniform").removeClass("popup--visible");

    if (menuItemChild.length > 0) {
      menuTimeout = setTimeout(function () {
        menuItemChild.slideDown();
      }, 150);
    }
  }, function () {
    clearTimeout(menuTimeout);

    $(this).find("ul").slideUp();
  });

  $(".popup--menu-uniform").hover(function () {
  }, function () {
    $(".popup--menu-uniform").removeClass("popup--visible");
  });

  // Меню интернет магазина
  var popupMenuOffset = $(".header__menu .js-shop-menu-popup").offset().left;
  if (($(window).width() <= 1400) && ($(window).width() >= 1000)) {
    popupMenuOffset = popupMenuOffset - 300;
  }
  if (($(window).width() <= 1000) && ($(window).width() >= 768)) {
    popupMenuOffset = popupMenuOffset - 190;
  }
  $(".popup--menu-shop").css("left", popupMenuOffset);
  $(".header__menu .js-shop-menu-popup").hover(function () {
    var popupMenuOffset = $(".header__menu .js-shop-menu-popup").offset().left;
    if (($(window).width() <= 1400) && ($(window).width() >= 1000)) {
      popupMenuOffset = popupMenuOffset - 300;
    }
    if (($(window).width() <= 1000) && ($(window).width() >= 768)) {
      popupMenuOffset = popupMenuOffset - 190;
    }
    $(".popup--menu-shop").css("left", popupMenuOffset);

    menuTimeout = setTimeout(function () {
      $(".popup--menu-shop").addClass("popup--visible");
    }, 150);
  }, function () {
    clearTimeout(menuTimeout);
  });

  $(".header__menu .menu__item:not(.js-shop-menu-popup)").hover(function () {
    var menuItemChildShop = $(this).find("ul");

    $(".popup--menu-shop").removeClass("popup--visible");

    if (menuItemChildShop.length > 0) {
      menuTimeout = setTimeout(function () {
        menuItemChildShop.slideDown();
      }, 150);
    }
  }, function () {
    clearTimeout(menuTimeout);

    $(this).find("ul").slideUp();
  });

  $(".popup--menu-shop").hover(function () {
  }, function () {
    $(".popup--menu-shop").removeClass("popup--visible");
  });

  // Увеличивалка
  $("body").delegate(".show-fancybox", "click", function () {
    $.fancybox({
      "loop": false,
      "href": this.href,
      "overlayOpacity": 0.4,
      "padding": 0,
      "speedIn": 600,
      "speedOut": 200,
      "type": "image",
      "wrapCSS": "fancybox-wrapper",
      "helpers": {
        "overlay": {
          "locked": false
        }
      }
    });

    return false;
  });

  $("body").delegate(".show-fancybox--iframe", "click", function () {
    $.fancybox({
      "autoScale": false,
      "href": this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
      "overlayOpacity": 0.4,
      "padding": 0,
      "speedIn": 600,
      "speedOut": 200,
      "titleShow": false,
      "type": "swf",
      "height": 600,
      "width": 800,
      "wrapCSS": "fancybox-wrapper",
      "swf": {
        "wmode": "transparent",
        "allowfullscreen": "true"
      },
      "helpers": {
        "overlay": {
          "locked": false
        }
      }
    });

    return false;
  });

  // Слайдеры
  var arSliders = {
      'slider--index2': {
        options: {
          wrapperClass: 'slider__wrapper--index',
          slideClass: 'slider__item--index',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          direction: 'vertical',
          slidesPerView: 1,
          speed: 700,
          simulateTouch: false,
          pagination: {
            el: '.pages__wrapper--index',
            type: 'bullets',
            bulletClass: 'pages__item',
            bulletActiveClass: 'pages__item--active',
            clickable: true,
          },
        },
        mobile: false,
        desktop: true,
      },
      'slider--singles': {
        options: {
          wrapperClass: 'slider__wrapper',
          slideClass: 'slider__item',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
          pagination: {
            el: '.pages__wrapper',
            type: 'fraction',
            currentClass: 'pages__item--current',
            totalClass: 'pages__item--total',
          },
          navigation: {
            nextEl: '.pages__arrow--next',
            prevEl: '.pages__arrow--prev',
          },

        },
        mobile: true,
        desktop: true,
      },
      'slider--thirds': {
        options: {
          wrapperClass: 'slider__wrapper',
          slideClass: 'slider__item',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 25,
          pagination: {
            el: '.pages__wrapper',
            type: 'fraction',
            currentClass: 'pages__item--current',
            totalClass: 'pages__item--total',
          },
          navigation: {
            nextEl: '.pages__arrow--next',
            prevEl: '.pages__arrow--prev',
          },
          breakpoints: {
            992: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            576: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          },
        },
        mobile: true,
        desktop: true,
      },
      'slider--quarters': {
        options: {
          wrapperClass: 'slider__wrapper',
          slideClass: 'slider__item',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 15,
          pagination: {
            el: '.pages__wrapper',
            type: 'fraction',
            currentClass: 'pages__item--current',
            totalClass: 'pages__item--total',
          },
          navigation: {
            nextEl: '.pages__arrow--next',
            prevEl: '.pages__arrow--prev',
          },
          breakpoints: {
            1400: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              pagination: {
                el: '.pages__wrapper',
                type: 'bullets',
              },
            },
          },
        },
        mobile: true,
        desktop: true,
      },
      'slider--wip': {
        options: {
          wrapperClass: 'slider__wrapper',
          slideClass: 'slider__item',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
          pagination: {},
          navigation: {
            nextEl: '.pages__arrow--next',
            prevEl: '.pages__arrow--prev',
          },
        },
        mobile: true,
        desktop: true,
      },
      'slider--auto': {
        options: {
          wrapperClass: 'slider__wrapper',
          slideClass: 'slider__item',
          slideActiveClass: 'slider__item--active',
          slideNextClass: 'slider__item--next',
          slidePrevClass: 'slider__item--prev',
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          spaceBetween: 15,
          pagination: {
            el: '.pages__wrapper',
            type: 'fraction',
            currentClass: 'pages__item--current',
            totalClass: 'pages__item--total',
          },
          navigation: {
            nextEl: '.pages__arrow--next',
            prevEl: '.pages__arrow--prev',
          },
        },
        mobile: true,
        desktop: true,
      },
    },
    obSliders = {};

  for (var key in arSliders) {
    var sliderGoalParams = arSliders[key],
      sliderGoal = $('.' + key);

    if (
      isMobile &&
      sliderGoalParams.mobile == false
    ) {
      continue;
    }

    if (
      !isMobile &&
      sliderGoalParams.desktop == false
    ) {
      continue;
    }

    if (sliderGoal.length > 0) {
      sliderGoal.each(function (i) {
        if (sliderGoalParams.options.pagination.type == "fraction") {
          sliderGoalParams.options.pagination.el = $(this).find(".pages__wrapper");
        }
        obSliders[key + i] = new Swiper(this, sliderGoalParams.options);
      });
    }
  }

  // Скролл на первом слайдере
  function onWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || window.navigator.userAgent.indexOf("Trident/") !== -1) {
      delta = -1 * delta;
    }

    if (obSliders['slider--index0'].animating === false) {
      if (delta > 0) {
        obSliders['slider--index0'].slideNext();
      } else {
        obSliders['slider--index0'].slidePrev();
      }
    }
  }

  // Превью
  $(".slider__thumbs-item").click(function () {
    var thumbsItemGoal = $(this),
      thumbsItemGoalIndex = thumbsItemGoal.index(),
      thumbsItem = $(".slider__thumbs-item"),
      sliderGoal = thumbsItemGoal.closest(".slider"),
      sliderGoalIndex = sliderGoal.index();

    $('video').each(function  () {
      $('.icon-play').show();
      $(this)[0].pause();
    })
    if ($(this).closest('.owl-item').length) {
      $(this).addClass('slider__thumbs-item--active').closest('.owl-item').siblings().find('.slider__thumbs-item--active').removeClass('slider__thumbs-item--active')
      obSliders['slider--singles' + 0].slideTo($(this).closest('.owl-item').index(), 500);

    }


    if (!$(this).closest('.owl-item').length) {
      //$('.slider--singles').slideTo(thumbsItemGoalIndex, 500);
	  obSliders['slider--singles' + 0].slideTo(thumbsItemGoalIndex, 500);

      thumbsItem.removeClass("slider__thumbs-item--active");
      thumbsItemGoal.addClass("slider__thumbs-item--active");
    }


  });

  // Навигация
  $(".pages--dotted .pages__item").click(function () {
    var pagesItemGoal = $(this),
      pagesItemGoalIndex = pagesItemGoal.index(),
      pagesItem = $(".pages--dotted .pages__item");

    obSliders['slider--wip0'].slideTo(pagesItemGoalIndex, 500);

    pagesItem.removeClass("pages__item--active");
    pagesItemGoal.addClass("pages__item--active");
  });

  $(".pages--dotted .pages__arrow").click(function () {
    var pagesArrow = $(this),
      pagesItemGoal = "",
      pagesItemActive = $(".pages--dotted .pages__item--active"),
      pagesItem = $(".pages--dotted .pages__item");

    if (pagesArrow.hasClass("pages__arrow--prev")) {
      pagesItemGoal = pagesItemActive.prev(".pages__item");
    } else if (pagesArrow.hasClass("pages__arrow--next")) {
      pagesItemGoal = pagesItemActive.next(".pages__item");
    }

    if (pagesItemGoal.length > 0) {
      pagesItem.removeClass("pages__item--active");
      pagesItemGoal.addClass("pages__item--active");
    }
  });

  if ($(".slider--index").length > 0) {
    if ('onwheel' in document) {
      document.getElementById('slider--index').addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      document.getElementById('slider--index').addEventListener("mousewheel", onWheel);
    } else {
      document.getElementById('slider--index').addEventListener("MozMousePixelScroll", onWheel);
    }

    // Прозрачный футер
    obSliders['slider--index0'].on('slideChange', function () {
      if (obSliders['slider--index0'].realIndex === 4) {
        $(".footer").addClass("footer--transparent");
        $(".footer-socials").addClass("footer-socials--hidden");
      } else {
        $(".footer").removeClass("footer--transparent");
        $(".footer-socials").removeClass("footer-socials--hidden");
      }
    });
  }

  $('.fancywork-item-block__wrapper .tabs .tabs__item:nth-child(1)').addClass('tabs__item--active');
  $('.fancywork-item-tabs-container .tab-content:nth-child(1)').addClass('tab-content--active');


  if ($('.slider__thumbs.owl-carousel').length) {
    var owl = $('.slider__thumbs.owl-carousel');
    owl.on('changed.owl.carousel', function(e) {
        $('video').each(function  () {
          $('.icon-play').show();
            $(this)[0].pause();
        })
      });


    owl.owlCarousel({
      loop: false,
      margin: 18,
      nav: true,
      items: 3,
      responsive : {
        480 : {
          items: 4,
        },
        1100 : {
          items: 5,
        },
        1201 : {
          items: 3,
        },
        1280 : {
          items: 4,
        },
        1500 : {
          items: 5,
        },

      }
    })
  }

  $('.tab-menu li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).closest('.tab-menu').next().find('.tab-item').removeClass('open').hide().eq($(this).index()).show().addClass('open')
  });

  $('.tab-item_title').on('click', function () {
    debugger;
    var indexEl = $(this).parent().index();
    $(this).closest('.tabs-content').prev().find('li').removeClass('active').eq(indexEl).show().addClass('active')
    $(this).closest('.tabs-content').find('.tab-item').eq(indexEl).show().toggleClass('open').siblings().removeClass('open').hide()

    $('body, html').scrollTop($(this).closest('.tabs-content').find('.tab-item').eq(indexEl).offset().top)
  });

  $('.opt-label').on('click', function () {
    $(this).toggleClass('open');
    $('.opt-list').slideToggle()
  })

  $('.tab-carousel').owlCarousel({
    items: 1
  })

  $('.icon-play').on('click', function  () {
      $(this).hide().siblings('video')[0].play()
  })

  if($('.action-carousel').length){

    $('.action-carousel').owlCarousel({
      items: 1
    })

    $('.action-carousel').on('translate.owl.carousel', function  () {
      $('.action-carousel + .pages__wrapper').find('.pages__item--current').text($('.action-carousel .owl-dots button.active').index() +1)

    })
  }
  if($('.catalog-top-carousel_in').length){

    $('.catalog-top-carousel_in').owlCarousel({
      items: 1
    })

    $('.catalog-top-carousel_in').on('translate.owl.carousel', function  () {
      $('.catalog-top-carousel .pages__wrapper').find('.pages__item--current').text($('.catalog-top-carousel .owl-dots button.active').index() +1)

    })
  }

  $('body').on('click', '.shop__item_drop_item p', function  () {
      $(this).toggleClass('open')
  })

  $('.shop__item .like').on('click', function  () {
      $(this).toggleClass('active')
  })

  function mobileCarousel () {
    if($('.shop-sections2').length){
      if($(window).width() < 768){
        $('.shop-sections2').not('.owl-carousel').addClass('owl-carousel')
          .owlCarousel({
            items:1
          })
      }
      else{
        $('.shop-sections2.owl-carousel').trigger('destroy.owl.carousel');
        $('.shop-sections2').removeClass('owl-carousel')
      }
    }

  }

  mobileCarousel();

  $(window).on('resize', function () {
    mobileCarousel();
  })

  $('body').on('click', '.pages__wrapper .swiper-pagination-bullet', function  () {
    obSliders['slider--quarters0'].slideTo($(this).index());
  });

  $('body').on('click', 'a.js-sma-opt-item-need', function(){
    var count = $(this).data('opt-count');
    changeDetailPageProductCount(count);

    $('.js-sma-all-count').val(count);
    $('.js-sma-all-count-alt').val(count);
  });

  $('body').on('click', '.js-sma-basket-need', function(){
    var count = $(this).data('count');
    $(this).closest('td').find('.cart__item-quantity-input').val(count).change();;
  });

  $('body').on('keyup', '.js-sma-all-count', function(){
    var count = $(this).val();
    changeDetailPageProductCount(count);

    $('.js-sma-all-count-alt').val(count);
  });
  $('body').on('change', '.js-sma-all-count', function(){
    var count = $(this).val();
    changeDetailPageProductCount(count);

    $('.js-sma-all-count-alt').val(count);
  });
  $('body').on('keyup', '.js-sma-all-count-alt', function(){
    var count = $(this).val();
    changeDetailPageProductCount(count);

    $('.js-sma-all-count').val(count);
  });
  $('body').on('change', '.js-sma-all-count-alt', function(){
    var count = $(this).val();
    changeDetailPageProductCount(count);

    $('.js-sma-all-count').val(count);
  });

  $('body').on('click', '.js-sma-opt-item', function(){
    var count = $(this).data('opt-count');
    changeDetailPageProductCount(count);

    $('.js-sma-all-count').val(count);
    $('.js-sma-all-count-alt').val(count);
  });

  if($('.js-load-more-catalog').length){
    if($(window).scrollTop() + $(window).height() >= $('.js-load-more-catalog').offset().top){
      $('.js-load-more-catalog').trigger('click')
    }
  }
});

function scrollToObj(objectGoal) {
  var objectGoalOffset = objectGoal.offset().top;

  $("html, body").animate({
    scrollTop: objectGoalOffset
  }, 500);
}

function numberFormat(number, decimals, decimalsSeparator, thousandsSeparator) {
  var i, j, kw, kd, km;

  // input sanitation & defaults
  if (isNaN(decimals = Math.abs(decimals))) {
    decimals = 2;
  }
  if (decimalsSeparator == undefined) {
    decimalsSeparator = ",";
  }
  if (thousandsSeparator == undefined) {
    thousandsSeparator = ".";
  }

  i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

  if ((j = i.length) > 3) {
    j = j % 3;
  } else {
    j = 0;
  }

  km = (j ? i.substr(0, j) + thousandsSeparator : "");
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator);
  kd = (decimals ? decimalsSeparator + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


  return km + kw + kd;
}

function changeDetailPageProductCount(count) {

  if (count <= 0) {
    $('.js-sma-all-count').val(1);
    $('.js-sma-all-count-alt').val(1);
  }
  else {
    var optItems = $('.js-sma-opt-item');
    var basePrice = $('.js-sma-base-price').data('price');
    var prevPrice = basePrice;
    var prevCount = 0;
    var data = {};
    var nextOptItemsSave = false;

    if (optItems.length > 0) {
      optItems.each(function(){
        var item = $(this);
        var optPrice = item.data('opt-price');
        var optCount = item.data('opt-count');
        var optPriceEconom = item.data('opt-price-econom');

        data = {
          "PRICE": optPrice,
          "COUNT": optCount,
          "ECONOM": new Intl.NumberFormat('ru-RU').format((prevPrice-optPrice)*(optCount-prevCount)),
        };

        if (count >= optCount) {
          data.PRICE = prevPrice;
          nextOptItemsSave = true;
        }
        else if (nextOptItemsSave == true) {
          data.PRICE = prevPrice;
          nextOptItemsSave = false;
          return false;
        }
        else if (count < optCount) {
          data.PRICE = basePrice;
          nextOptItemsSave = false;
          return false;
        }

        prevPrice = optPrice;
        prevCount = optCount;
      });
      if (nextOptItemsSave === true) {
        data.PRICE = prevPrice;
        $('.js-sma-opt-item-need').replaceWith('<div class="js-sma-opt-item-need"><span>Нужно больше 1000 шт?<br><a href="/partners/" target="_blank">Станьте нашим дилером</a></span></div>');
      }
      else {
        $('.js-sma-opt-item-need').replaceWith('<a href="javascript:void(0);" class="js-sma-opt-item-need" data-opt-count="' + data.COUNT + '"><span class="js-sma-need-more-wrapper">Добавьте <span class="js-sma-need-more">' + (data.COUNT-count) + '</span> шт. <br> и сэкономьте <br> <span class="js-sma-econom-price">' + data.ECONOM + '</span> руб.</span></a>');
      }
      // $('.js-sma-need-more').html(data.COUNT-count);
      $('.js-price-sum').html(new Intl.NumberFormat('ru-RU').format(data.PRICE*count));
      // $('.js-sma-econom-price').html(data.ECONOM);
    }
    else {
      $('.js-price-sum').html(new Intl.NumberFormat('ru-RU').format(basePrice*count));
    }
  }
}

var isScroll = true;
$(window).on('scroll', function () {
  if($('.js-load-more-catalog').length){
    if($(window).scrollTop() + $(window).height() >= $('.js-load-more-catalog').offset().top){
      if(isScroll){
        $('.js-load-more-catalog').trigger('click')
      }
    }
  }
})



