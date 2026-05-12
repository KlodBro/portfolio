const slider = document.getElementById('slider');
const next = document.getElementById('next');
// const prev = document.getElementById('prev');

function getItemWidth() {
  return slider.querySelector('.white-box').getBoundingClientRect().width;
}

next.addEventListener('click', () => {
  const itemWidth = getItemWidth();
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  if (slider.scrollLeft + itemWidth > maxScroll) {
    // если выходим за предел — прыгаем в начало
    slider.scrollLeft = 0;
  } else {
    slider.scrollLeft += (itemWidth + 28);
  }
});

// prev.addEventListener('click', () => {
//   const itemWidth = getItemWidth();

//   if (slider.scrollLeft - itemWidth < 0) {
//     // если уходим в минус — прыгаем в конец
//     slider.scrollLeft = slider.scrollWidth;
//   } else {
//     slider.scrollLeft -= itemWidth;
//   }
// });

const nav = document.querySelector('.header-desc');
const navOffset = nav.offsetTop;
const burger = document.querySelector('.burger')

window.addEventListener('scroll', () => {
  if (window.scrollY > navOffset && burger.style.display != 'block') {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});


// Обработчик для всех заголовков
// document.querySelectorAll('.white-box-text').forEach(header => {
//   header.addEventListener('click', () => {
//     const content = header.nextElementSibling;
//     const arrow = header.querySelector('.arrow');
//     const isOpen = content.classList.contains('open');

//     // Открываем или закрываем текущий раздел
//     if (isOpen) {
//       // если открыт, закрываем
//       content.classList.remove('open');
//       header.classList.remove('open');
//       arrow.textContent = '>';
//     } else {
//       // если закрыт, открываем
//       content.classList.add('open');
//       header.classList.add('open');
//       arrow.textContent = '>';
//     }
//   });
// });


const header = document.querySelectorAll('.price-section')
header.forEach(header => {
  header.addEventListener('click', () => {
    console.log('good')
    const content = header.querySelector('.price-content');
    console.log(content)
    const arrow = header.querySelector('.arrow');
    const button = header.querySelector('.price-btn')
    const isOpen = content.classList.contains('open')

    if (isOpen) {
      // если открыт, закрываем
      content.classList.remove('open');
      header.classList.remove('open');
      button.classList.remove('rotated')
      // arrow.textContent = '>';
    } else {
      // если закрыт, открываем
      content.classList.add('open');
      header.classList.add('open');
      button.classList.add('rotated')
      // arrow.textContent = '>';
    }
  })
})

// Отправка на почту
document.querySelector(".record-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("status");

  emailjs.send("service_7mutvum", "template_xy3x7jl", {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    discount: document.getElementById("discount").value
  })


    .then(() => {
      // Сообщение об успехе
      status.textContent = "Данные успешно отправлены!";
      status.style.color = "green";

      // Сброс формы
      document.querySelector(".record-form").reset();

      // Сброс скидки
      document.getElementById("discount").value = "";

      // Сброс текста результата
      document.getElementById("final-value").textContent = "Нажмите старт";

      document.getElementById('status').reset()

      // Сброс состояния колеса
      rotation = 0;
      used = false;
      spinning = false;
      drawWheel(rotation);

      // Включаем кнопку снова
      btn.disabled = false;

    })
    .catch((err) => {
      status.textContent = "Ошибка отправки: " + err.text;
      status.style.color = "red";
    });
  console.log(document.getElementById("discount").value);

});


document.querySelector('.burger').addEventListener('click', function() {
  const content = document.querySelector('.header-btns');
  const isHide = content.classList.contains('hide');

  if (isHide) {
    content.classList.remove('hide')
    document.querySelector('..header-btns').style.display = 'block'
  }
  else {
    content.classList.add('hide')
    document.querySelector('..header-btns').style.display = 'none'
  }
})