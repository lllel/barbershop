let navMain = document.querySelector('.nav-main');
let currentItem = document.querySelectorAll('.nav-main__link:not([href])');

navMain.classList.remove('no-js');
navMain.classList.remove('nav-main--active');

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

export {ModalMenu};
