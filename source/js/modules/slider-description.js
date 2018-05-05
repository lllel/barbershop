// import {SliderReview} from './slider-review';
//
// class SliderDescription extends SliderReview {
//   constructor(options) {
//     super(options);
//     this.slides = this.elem.querySelectorAll('.slider-description__slide');
//     this.slidesLength = this.slides.length - 1;
//   }
//
//   hideSlide(num) {
//     this.slides[num].classList.remove('slider-description__slide--active');
//   }
//
//   showSlide(num) {
//     this.slides[num].classList.add('slider-description__slide--active');
//   }
//
//   init() {
//     [].forEach.call(this.dots, (it, i) => {
//       it.addEventListener('click', () => this.changeSlide(i));
//     });
//
//     this.timer();
//   }
// }
//
// export {SliderDescription};
