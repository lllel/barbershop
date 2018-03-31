let navMain = document.querySelector('.nav-main');
let modalMenuBtn = document.querySelector('.nav-main__open-menu');
let currentItem = document.querySelectorAll('.nav-main__link:not([href])');

navMain.classList.remove('no-js');
navMain.classList.remove('active-menu');

[].forEach.call(currentItem, function (it) {
  it.parentElement.style.display = 'flex';
});

function openModalMenu() {
  navMain.classList.add('active-menu');
}

function closeModalMenu() {
  navMain.classList.remove('active-menu');
}

function onModalMenuBtnClick() {
  if (navMain.classList.contains('active-menu')) {
    closeModalMenu();

  } else {
    openModalMenu();
  }
}

modalMenuBtn.addEventListener('click', onModalMenuBtnClick);
