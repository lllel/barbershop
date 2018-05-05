// class SliderReview {
//   constructor(options) {
//     this.elem = options.elem;
//     this.dots = this.elem.querySelectorAll('.buttons__input');
//     this.btnPrev = this.elem.querySelector('.slider-reviews__button-arrow--prev');
//     this.btnNext = this.elem.querySelector('.slider-reviews__button-arrow--next');
//     this.slides = this.elem.querySelectorAll('.slider-reviews__slide');
//     this.slidesLength = this.slides.length - 1;
//     this.last = 0;
//     this.current = 0;
//     this.timerId = null;
//     this.timerDelay = 6000;
//   }
//
//   get prev() {
//     let prev = this.current - 1;
//
//     if (prev < 0) {
//       prev = this.slidesLength;
//     }
//
//     return prev;
//   }
//
//   get next() {
//     let next = this.current + 1;
//
//     if (next > this.slidesLength) {
//       next = 0;
//     }
//
//     return next;
//   }
//
//   hideSlide(num) {
//     this.slides[num].classList.remove('slider-reviews__slide--active');
//   }
//
//   showSlide(num) {
//     this.slides[num].classList.add('slider-reviews__slide--active');
//   }
//
//   setSlide(num) {
//     if (num === this.current) {
//       return;
//     }
//
//     this.last = this.current;
//     this.current = num;
//   }
//
//   changeSlide(num) {
//     this.setSlide(num);
//     this.hideSlide(this.last);
//     this.showSlide(num);
//     this.changeDots(num);
//     this.timer();
//   }
//
//   changeDots(num) {
//     this.dots[this.last].checked = false;
//     this.dots[num].checked = true;
//   }
//
//   timer() {
//     clearInterval(this.timerId);
//
//     this.timerId = setInterval(() => {
//       this.changeSlide(this.next);
//     }, this.timerDelay);
//   }
//
//   init() {
//     [].forEach.call(this.dots, (it, i) => {
//       it.addEventListener('click', () => this.changeSlide(i));
//     });
//
//     this.btnPrev.addEventListener('click', () => this.changeSlide(this.prev));
//     this.btnNext.addEventListener('click', () => this.changeSlide(this.next));
//
//     this.timer();
//   }
// }
//
// export {SliderReview};
