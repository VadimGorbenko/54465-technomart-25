;(function initTopSlider() {
  var slider = document.querySelector('.slider');
  if (slider) {

    var nextBtn = slider.querySelector('.slider__control_next');
    var prevBtn = slider.querySelector('.slider__control_prev');
    var sliderNav = slider.querySelector('.slider__nav');
    var navBtns = sliderNav.querySelectorAll('.slider__nav-item-btn');
    navBtns = Array.prototype.slice.call(navBtns);

    nextBtn.addEventListener('click', changeSlideByArrow);
    prevBtn.addEventListener('click', changeSlideByArrow);

    function changeSlideByArrow() {
      var activeSlide = slider.querySelector('.slider__item.active');
      var nextActiveSlide = this === nextBtn ? activeSlide.nextElementSibling : activeSlide.previousElementSibling;
      if (nextActiveSlide !== null) {
        var nextSlideIdx = findThisIndex(slider, nextActiveSlide, '.slider__item');
        activeSlide.classList.remove('active');
        nextActiveSlide.classList.add('active');
        var activeBtn = sliderNav.querySelector('.slider__nav-item-btn.active');
        var nextActiveBtn = navBtns[nextSlideIdx];
        activeBtn.classList.remove('active');
        nextActiveBtn.classList.add('active');
      }
    }

    navBtns.forEach(function (btn) {
      btn.addEventListener('click', changeSlideByNav)
    });

    function changeSlideByNav() {
      var activeSlide = slider.querySelector('.slider__item.active');
      var activeBtn = sliderNav.querySelector('.slider__nav-item-btn.active');
      var thisNavBtnIndex = findThisIndex(slider, this, '.slider__nav-item-btn');
      var nextSlide = slider.querySelectorAll('.slider__item')[thisNavBtnIndex];
      activeSlide.classList.remove('active');
      activeBtn.classList.remove('active');
      nextSlide.classList.add('active');
      this.classList.add('active');
    }
  }
})();

;(function initTabbedSlider() {
  var tabs = document.querySelector('.tabs');
  if (tabs) {
    var labelsList = document.querySelector('.tabs__labels');
    var labels = labelsList.querySelectorAll('.tabs__labels-item');
    labels = Array.prototype.slice.call(labels);

    labels.forEach(function (label) {
      label.addEventListener('click', changeTab);
    })

    function changeTab() {
      var activeLabel = labelsList.querySelector('.tabs__labels-item.active');
      var activeTab = document.querySelector('.tabs__item.active');
      var thisTabLabelIdx = findThisIndex(labelsList, this, '.tabs__labels-item');
      var nextActiveTab = document.querySelectorAll('.tabs__item')[thisTabLabelIdx];
      activeLabel.classList.remove('active');
      activeTab.classList.remove('active');
      this.classList.add('active');
      nextActiveTab.classList.add('active');
    }
  }
})();

function findThisIndex(parent, element, elementsSelector) {
  var allELems = parent.querySelectorAll(elementsSelector);
  for (var i = 0; i < allELems.length; i++) {
    if (allELems[i] === element) return i;
  }
  return -1;
}

var moddalTriggers = document.querySelectorAll('.js-show-modal');
moddalTriggers = Array.prototype.slice.call(moddalTriggers);
moddalTriggers.forEach(function (element) {
  element.addEventListener('click', showModal)
});

var closeBtns = document.querySelectorAll('.js-popup_close');
closeBtns = Array.prototype.slice.call(closeBtns);
closeBtns.forEach(function (element) {
  element.addEventListener('click', closeModal)
});

function showModal(event) {
  event.preventDefault();
  var targetSelector = this.dataset.modalTarget;
  var target = document.querySelector('.' + targetSelector);
  target.classList.add('active');
  if (targetSelector === 'js-map-popup') {
    if (!target.querySelector('ymaps')) {
      var MAP_MIN_HEIGHT = 445;
      target.style.minHeight = MAP_MIN_HEIGHT + 'px';
      var map = document.createElement('script');
      map.type = 'text/javascript';
      map.charset = 'utf-8';
      map.async = true;
      map.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A66e4f10fc1b670a8297b3c6a5ec5f919ecb2caf8caf50183e601b8a7d77742f5&amp;width=100%&amp;height=' + MAP_MIN_HEIGHT + '&amp;lang=ru_RU&amp;scroll=true';
      map.onload = function removeStatic() {
        target.querySelector('.js-map-placeholder').remove();
      }
      target.appendChild(map);
    }
  };
}

function closeModal(event) {
  event.preventDefault();
  var popup = findParent(this, 'popup');
  popup.classList.remove('active');
}

function findParent(element, parentSelector) {
  var parentElement = element.parentElement;
  var body = document.querySelector('body');
  while (!parentElement.classList.contains(parentSelector)) {
    element = parentElement;
    parentElement = element.parentElement;
    if (parentElement === body) return body;
  }
  return parentElement;
}

document.querySelector('body').addEventListener('click', clicksHandler);

function clicksHandler(event) {
  if (event.target.classList) {

    // ЗАкрываем попап, если кликнули вне него.
    var isAnyPopupOpened = document.querySelectorAll('.popup.active').length > 0 ? true : false;
    if (isAnyPopupOpened && !event.target.classList.contains('js-show-modal')) {
      var isOutOfPopup = findParent(event.target, 'popup') === document.querySelector('body') ? true : false;
      if (isOutOfPopup) {
        var popups = document.querySelectorAll('.popup.active');
        popups = Array.prototype.slice.call(popups);
        popups.forEach(function (popup) {
          popup.classList.remove('active');
        })
      }
    }
    // открываем попап, если нажали на кнопку 'купить'
    if (event.target.classList.contains('product__actions-buy')) {
      event.preventDefault();
      document.querySelector('.js-add-product-popup').classList.add('active');
    }
  }
}
