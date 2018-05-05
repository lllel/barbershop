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

function isWidthChange1200(mql) {
  if (mql.matches) {
    if (newsSection && newsSection.classList.contains('news--active')) {
      newsButton.click();
    }

    // Один блок новостей переселяется в другой контейнер
    if (newsWrapper) {
      newsWrapper.appendChild(newsWrapElement.firstElementChild);
    }
  }
}

export {isWidthChange320, isWidthChange768, isWidthChange1200};
