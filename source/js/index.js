import {ModalMenu} from './modules/modal-menu';
import {LoginMenu} from './modules/login-menu';
import {SliderReview} from './modules/slider-review';
import {SliderDescription} from './modules/slider-description';
import {News} from './modules/news';
import {PageMove} from './modules/page-move';
import {isWidthChange320, isWidthChange768, isWidthChange1200} from './modules/media-query-list';

const mediaQueryList320 = window.matchMedia('(min-width: 320px) and (max-width: 767px)');
const mediaQueryList768 = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
const mediaQueryList1200 = window.matchMedia('(min-width: 1200px)');

// Полифилл для closest
(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches ||
    ELEMENT.mozMatchesSelector ||
    ELEMENT.msMatchesSelector ||
    ELEMENT.oMatchesSelector ||
    ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    let element = this;

    while (element) {
      if (element.matches(selector)) {
        return element;

      } else {
        element = element.parentElement;
      }
    }

    return null;
  };
}(Element.prototype));

const modalMenu = new ModalMenu({
  elem: document.querySelector('.nav-main')
});

modalMenu.init();

const loginMenu = new LoginMenu({
  elem: document.querySelector('.login-menu'),
  login: document.querySelector('.nav-main__login')
});

loginMenu.init();


if (document.querySelector('.slider-reviews')) {
  const sliderReview = new SliderReview({
    elem: document.querySelector('.slider-reviews')
  });

  sliderReview.init();
}

if (document.querySelector('.slider-description')) {
  const sliderDescription = new SliderDescription({
    elem: document.querySelector('.slider-description')
  });

  sliderDescription.init();
}

let news = null;

if (document.querySelector('.news')) {
  news = new News({
    elem: document.querySelector('.news')
  });

  news.init();
}

const pageMove = new PageMove({
  elem: document.querySelector('.page-top')
});

pageMove.init();

mediaQueryList320.addListener(isWidthChange320);
isWidthChange320(mediaQueryList320);

mediaQueryList768.addListener(isWidthChange768);
isWidthChange768(mediaQueryList768);

mediaQueryList1200.addListener(isWidthChange1200);
isWidthChange1200(mediaQueryList1200);
