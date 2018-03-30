let modalMenuBtn = document.querySelector('.nav-main__open-menu');
let modalMenuItem = document.querySelectorAll('.nav-main__item');
let modalMenuItems = document.querySelector('.nav-main__items');

// modalMenuItems.addEventListener('click', function (evt) {
//   closeModalMenu();
//
//   [].forEach.call(modalMenuItem, function (item) {
//     item.classList.remove('nav-main__item--active');
//   });
//
//   evt.target.closest('li').style.display = 'flex';
// });

function openModalMenu() {
  modalMenuBtn.classList.add('active-menu');

  // [].forEach.call(modalMenuItem, function (item) {
  //   item.classList.add('nav-main__item--active');
  // });
}

function closeModalMenu() {
  modalMenuBtn.classList.remove('active-menu');

  [].forEach.call(modalMenuItem, function (item) {
    item.classList.remove('nav-main__item--active');
  });

  // evt.target.style.display = 'flex';
}

function onModalMenuBtnClick() {
  if (modalMenuBtn.classList.contains('active-menu')) {
    closeModalMenu();

  } else {
    openModalMenu();
  }
}

modalMenuBtn.addEventListener('click', onModalMenuBtnClick);
