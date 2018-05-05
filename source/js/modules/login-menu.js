let body = document.querySelector('body');

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

export {LoginMenu};
