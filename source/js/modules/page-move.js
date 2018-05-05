// class PageMove {
//   constructor(options) {
//     this.elem = options.elem;
//     this.countSteps = 0;
//   }
//
//   pageScroll() {
//     this.elemCoords = this.elem.getBoundingClientRect().top + pageYOffset;
//
//     if (!this.elem.classList.contains('page-top--active') && this.elemCoords > 975) {
//       this.elem.classList.add('page-top--active');
//     }
//
//     if (this.elem.classList.contains('page-top--active') && this.elemCoords < 975) {
//       this.elem.classList.remove('page-top--active');
//     }
//   }
//
//   onElemClick() {
//     let intervalId = setInterval(() => {
//       if (document.documentElement.scrollTop === 0) {
//         clearInterval(intervalId);
//
//         this.countSteps = 0;
//       }
//
//       if (this.countSteps <= 30) {
//         window.scrollBy(0, -5);
//       }
//
//       if (this.countSteps <= 50) {
//         window.scrollBy(0, -20);
//       }
//
//       if (this.countSteps <= 70) {
//         window.scrollBy(0, -40);
//       }
//
//       if (this.countSteps > 100) {
//         window.scrollBy(0, -60);
//       }
//     }, 15);
//   }
//
//   init() {
//     this.elem.addEventListener('click', () => {
//       this.onElemClick();
//     });
//
//     window.addEventListener('scroll', () => {
//       this.pageScroll();
//     });
//   }
// }
//
// export {PageMove};
