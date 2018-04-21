let body = document.querySelector('body');
let navMain = document.querySelector('.nav-main');
let currentItem = document.querySelectorAll('.nav-main__link:not([href])');

navMain.classList.remove('no-js');
navMain.classList.remove('nav-main--active');

// ПОЛИФИЛЛ ДЛЯ CLOSEST
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

// ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО МЕНЮ
class ModalMenu {
  constructor(options) {
    this.elem = options.elem;
    this.item = this.elem.querySelectorAll('.nav-main__item');
    this.button = this.elem.querySelector('.nav-main__open-menu');
  }

  openMenu() {
    this.items = document.querySelector('.nav-main__items');

    this.elem.classList.remove('nav-main--hidden');
    this.elem.classList.add('nav-main--active');
    this.elem.classList.add('animation-play');

    document.addEventListener('keydown', (evt) => {
      this.onEscPressKeydown(evt);
    });
  }

  closeMenu() {
    this.elem.classList.add('nav-main--hidden');
    this.elem.classList.remove('nav-main--active');
    this.elem.classList.add('animation-play');

    document.removeEventListener('keydown', (evt) => {
      this.onEscPressKeydown(evt);
    });
  }

  onEscPressKeydown(evt) {
    if (evt.keyCode === 27) {
      this.closeMenu();
    }
  }

  onButtonClick() {
    if (this.elem.classList.contains('nav-main--active')) {
      this.closeMenu();

    } else {
      this.openMenu();
    }
  }

  init() {
    document.addEventListener('click', (evt) => {
      if (this.elem.classList.contains('nav-main--active') && (!evt.target.closest('.nav-main') || evt.target.className === 'header-main__wrapper')) {
        this.closeMenu();
      }
    });

    this.button.addEventListener('click', (evt) => {
      this.onButtonClick(evt);
    });

    [].forEach.call(currentItem, (it) => {
      it.parentElement.classList.add('nav-main__item--active');
    });
  }
}

const modalMenu = new ModalMenu({
  elem: document.querySelector('.nav-main')
});

modalMenu.init();

// СЛАЙДЕР REVIEW
class SliderReview {
  constructor(options) {
    this.elem = options.elem;
    this.dots = this.elem.querySelectorAll('.buttons__input');
    this.btnPrev = this.elem.querySelector('.slider-reviews__button-arrow--prev');
    this.btnNext = this.elem.querySelector('.slider-reviews__button-arrow--next');
    this.slides = this.elem.querySelectorAll('.slider-reviews__slide');
    this.slidesLength = this.slides.length - 1;
    this.last = 0;
    this.current = 0;
    this.timerId = null;
    this.timerDelay = 6000;
  }

  get prev() {
    let prev = this.current - 1;

    if (prev < 0) {
      prev = this.slidesLength;
    }

    return prev;
  }

  get next() {
    let next = this.current + 1;

    if (next > this.slidesLength) {
      next = 0;
    }

    return next;
  }

  hideSlide(num) {
    this.slides[num].classList.remove('slider-reviews__slide--active');
  }

  showSlide(num) {
    this.slides[num].classList.add('slider-reviews__slide--active');
  }

  setSlide(num) {
    if (num === this.current) {
      return;
    }

    this.last = this.current;
    this.current = num;
  }

  changeSlide(num) {
    this.setSlide(num);
    this.hideSlide(this.last);
    this.showSlide(num);
    this.changeDots(num);
    this.timer();
  }

  changeDots(num) {
    this.dots[this.last].checked = false;
    this.dots[num].checked = true;
  }

  timer() {
    clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      this.changeSlide(this.next);
    }, this.timerDelay);
  }

  init() {
    [].forEach.call(this.dots, (it, i) => {
      it.addEventListener('click', () => this.changeSlide(i));
    });

    this.btnPrev.addEventListener('click', () => this.changeSlide(this.prev));
    this.btnNext.addEventListener('click', () => this.changeSlide(this.next));

    this.timer();
  }
}

if (document.querySelector('.slider-reviews')) {
  const sliderReview = new SliderReview({
    elem: document.querySelector('.slider-reviews')
  });

  sliderReview.init();
}

// СЛАЙДЕР DESCRIPTION
class SliderDescription extends SliderReview {
  constructor(options) {
    super(options);
    this.slides = this.elem.querySelectorAll('.slider-description__slide');
    this.slidesLength = this.slides.length - 1;
  }

  hideSlide(num) {
    this.slides[num].classList.remove('slider-description__slide--active');
  }

  showSlide(num) {
    this.slides[num].classList.add('slider-description__slide--active');
  }

  init() {
    [].forEach.call(this.dots, (it, i) => {
      it.addEventListener('click', () => this.changeSlide(i));
    });

    this.timer();
  }
}

if (document.querySelector('.slider-description')) {
  const sliderDescription = new SliderDescription({
    elem: document.querySelector('.slider-description')
  });

  sliderDescription.init();
}

// ВЫПАДАЮЩИЙ СПИСОК NEWS
class News {
  constructor(options) {
    this.elem = options.elem;
    this.wrap = this.elem.querySelector('.news__wrap');
    this.wrapItems = this.wrap.querySelector('.news__wrap-items');
    this.wrapHeight = this.wrapItems.clientHeight;
    this.button = this.elem.querySelector('.news__button');
  }

  hideNews() {
    this.elem.classList.remove('news--active');
    this.wrap.style.height = `${0}px`;
    this.button.textContent = 'показать все';
  }

  showNews() {
    this.elem.classList.add('news--active');
    this.wrap.style.height = `${this.wrapHeight + 10}px`;
    this.button.textContent = 'скрыть';
  }

  init() {
    [].forEach.call(this.wrapItems.querySelectorAll('.news__container'), (it) => {
      it.classList.add('news__container--hidden');
    });

    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();

      this.wrapHeight = this.wrapItems.clientHeight;

      if (this.elem.classList.contains('news--active')) {
        this.hideNews();

      } else {
        this.showNews();
      }
    });
  }
}
let news = null;

if (document.querySelector('.news')) {
  news = new News({
    elem: document.querySelector('.news')
  });

  news.init();
}

// ОТКРЫТИЕ/ЗАКРЫТИЕ LoginMenu
class LoginMenu {
  constructor(options) {
    this.elem = options.elem;
    this.btnLogin = options.login;
    this.btnCancel = this.elem.querySelector('.login-menu__cancel');
  }

  showLoginMenu() {
    this.elem.classList.remove('login-menu--hidden');
    this.elem.classList.add('login-menu--active');
    body.classList.add('active-modal-menu');
  }

  closeLoginMenu() {
    this.elem.classList.add('login-menu--hidden');
    this.elem.classList.remove('login-menu--active');
    body.classList.remove('active-modal-menu');
  }

  onBtnLoginClick(evt) {
    evt.preventDefault();

    this.showLoginMenu();
  }

  onBtnCancelClick() {
    this.closeLoginMenu();
  }

  onEscPressKeydown(evt) {
    if (this.elem.classList.contains('login-menu--active') && evt.keyCode === 27) {
      this.closeLoginMenu();
    }
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.onEscPressKeydown(e);
    });

    this.btnLogin.addEventListener('click', (evt) => this.onBtnLoginClick(evt));
    this.btnCancel.addEventListener('click', () => this.onBtnCancelClick());
  }
}

const loginMenu = new LoginMenu({
  elem: document.querySelector('.login-menu'),
  login: document.querySelector('.nav-main__login')
});

loginMenu.init();

// PAGE-TOP-MOVE
class PageMove {
  constructor(options) {
    this.elem = options.elem;
    this.countSteps = 0;
  }

  pageScroll() {
    this.elemCoords = this.elem.getBoundingClientRect().top + pageYOffset;

    if (!this.elem.classList.contains('page-top--active') && this.elemCoords > 975) {
      this.elem.classList.add('page-top--active');
    }

    if (this.elem.classList.contains('page-top--active') && this.elemCoords < 975) {
      this.elem.classList.remove('page-top--active');
    }
  }

  onElemClick() {
    let intervalId = setInterval(() => {
      if (document.documentElement.scrollTop === 0) {
        clearInterval(intervalId);

        this.countSteps = 0;
      }

      if (this.countSteps <= 30) {
        window.scrollBy(0, -5);
      }

      if (this.countSteps <= 50) {
        window.scrollBy(0, -20);
      }

      if (this.countSteps <= 70) {
        window.scrollBy(0, -40);
      }

      if (this.countSteps > 100) {
        window.scrollBy(0, -60);
      }
    }, 15);
  }

  init() {
    this.elem.addEventListener('click', () => {
      this.onElemClick();
    });

    window.addEventListener('scroll', () => {
      this.pageScroll();
    });
  }
}

const pageMove = new PageMove({
  elem: document.querySelector('.page-top')
});

pageMove.init();


// БРЕЙКПОИНТЫ
const mediaQueryList320 = window.matchMedia('(min-width: 320px) and (max-width: 767px)');
const mediaQueryList768 = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
const mediaQueryList1200 = window.matchMedia('(min-width: 1200px)');

const newsSection = document.querySelector('.news');
const newsWrapper = document.querySelector('.news__wrapper');
const newsContainerHidden = document.querySelectorAll('.news__container--hidden');
const newsWrapElement = document.querySelector('.news__wrap-items');
const newsButton = document.querySelector('.news__button');

function isWidthChange320(mql) {
  if (mql.matches) {
    if (newsSection && newsSection.classList.contains('news--active')) {
      newsButton.click();
    }

    // Скрывающиеся блоки с новостями по своим местам
    [].forEach.call(newsContainerHidden, (it) => {
      if (!newsWrapElement.contains(it)) {
        newsWrapElement.appendChild(it);
      }
    });
  }
}

mediaQueryList320.addListener(isWidthChange320);
isWidthChange320(mediaQueryList320);

function isWidthChange768(mql) {
  if (mql.matches) {
    if (newsSection && newsSection.classList.contains('news--active')) {
      newsButton.click();
    }

    // Скрывающиеся блоки с новостями по своим местам
    [].forEach.call(newsContainerHidden, (it) => {
      if (!newsWrapElement.contains(it)) {
        newsWrapElement.appendChild(it);
      }
    });
  }
}

mediaQueryList768.addListener(isWidthChange768);
isWidthChange768(mediaQueryList768);

function isWidthChange1200(mql) {
  if (mql.matches) {
    if (newsSection && newsSection.classList.contains('news--active')) {
      newsButton.click();
    }

    // Один блок новостей переселяется в другой контейнер
    newsWrapper.appendChild(newsWrapElement.firstElementChild);
  }
}

mediaQueryList1200.addListener(isWidthChange1200);
isWidthChange1200(mediaQueryList1200);
