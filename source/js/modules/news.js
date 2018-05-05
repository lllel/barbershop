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

export {News};
