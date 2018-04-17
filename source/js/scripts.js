let body = document.querySelector('body');
let navMain = document.querySelector('.nav-main');
let currentItem = document.querySelectorAll('.nav-main__link:not([href])');

navMain.classList.remove('no-js');
navMain.classList.remove('active-menu');

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
    this.button = this.elem.querySelector('.nav-main__open-menu');
  }

  openMenu() {
    this.elem.classList.add('active-menu');

    document.addEventListener('keydown', (evt) => {
      this.onEscPressKeydown(evt);
    });
  }

  closeMenu() {
    this.elem.classList.remove('active-menu');

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
    if (this.elem.classList.contains('active-menu')) {
      this.closeMenu();

    } else {
      this.openMenu();
    }
  }

  init() {
    document.addEventListener('click', (evt) => {
      if (this.elem.classList.contains('active-menu') && !evt.target.closest('nav')) {
        this.closeMenu();
      }
    });

    this.button.addEventListener('click', (evt) => {
      this.onButtonClick(evt);
    });

    [].forEach.call(currentItem, function (it) {
      it.parentElement.style.display = 'flex';
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
    // this.startTouch = null;
    // this.touch = null;
    // this.currentSlideTouch = null;
    // this.duration = null;
    // this.activeDuration = null;
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

    // ========================================  ДОДЕЛАТЬ ====================================================

    // this.elem.addEventListener('touchstart', (evtStart) => {
    //   this.startTouch = evtStart.targetTouches[0].clientX;
    //   this.elem.querySelector('slider-reviews__slide--active').classList.remove('slider-reviews__slide--active');
    // });
    //
    // this.elem.addEventListener('touchmove', (evtMove) => {
    //   if (evtMove.targetTouches.length === 1) {
    //     this.touch = evtMove.targetTouches[0];
    //     this.currentSlideTouch = this.elem.querySelector('slider-reviews__slide--active');
    //     this.duration = this.startTouch - this.touch;
    //     this.currentSlideTouch.style.right = this.duration + 'px';
    //   }
    // });
    //
    // this.elem.addEventListener('touchend', () => {
    //   this.elem.querySelector('slider-reviews__slide--active').classList.remove('slider-reviews__slide--active');
    //   this.currentSlideTouch.style.right = '';
    //   this.activeDuration = window.innerWidth / 3;
    //
    //   if (Math.abs(event.changedTouches[0].clientX - this.startTouch) > 20) {
    //     if (event.changedTouches[0].clientX < this.activeDuration) {
    //       this.changeSlide(this.next);
    //     } else if ((window.innerWidth - event.changedTouches[0].clientX) < this.activeDuration) {
    //       this.changeSlide(this.prev);
    //     }
    //   }
    // });

    // ==============================================================================================================
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
    this.news = this.elem.querySelectorAll('.news__container');
    this.newsLength = this.elem.querySelectorAll('.news__container').length;
    this.button = this.elem.querySelector('.news__button');
    this.showCount = 2;
  }

  hideNews() {
    for (let i = this.showCount; i < this.newsLength; i++) {
      this.news[i].classList.remove('news__container--active');
    }

    this.elem.classList.remove('news--active');
    this.button.textContent = 'показать все';
  }

  showNews() {
    for (let i = this.showCount; i < this.newsLength; i++) {
      this.news[i].classList.add('news__container--active');
    }

    this.elem.classList.add('news--active');
    this.button.textContent = 'скрыть';
  }

  init() {
    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (this.elem.classList.contains('news--active')) {
        this.hideNews();

      } else {
        this.showNews();
      }
    });
  }
}

if (document.querySelector('.news')) {
  const news = new News({
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
    this.elem.classList.add('login-menu--animation-play');
    body.classList.add('active-modal-menu');
  }

  closeLoginMenu() {
    this.elem.classList.add('login-menu--hidden');
    this.elem.classList.remove('login-menu--active');
    this.elem.classList.remove('login-menu--animation-play');
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
