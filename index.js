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
/* ============================================================
   1. ФУНКЦИЯ: Сохранение данных в fallback-очередь (localStorage)
   ============================================================ */
function saveToFallbackQueue(data) {
  let queue = JSON.parse(localStorage.getItem("emailQueue") || "[]");
  queue.push(data);
  localStorage.setItem("emailQueue", JSON.stringify(queue));
}


/* ============================================================
   2. ФУНКЦИЯ: Повторная отправка всех сохранённых данных
      Запускается при загрузке страницы и при появлении интернета
   ============================================================ */
function resendQueuedEmails() {
  let queue = JSON.parse(localStorage.getItem("emailQueue") || "[]");
  if (queue.length === 0) return; // если очередь пустая — выходим

  queue.forEach((item, index) => {
    emailjs.send("service_7mutvum", "template_xy3x7jl", item)
      .then(() => {
        // Успешно отправлено — удаляем из очереди
        queue.splice(index, 1);
        localStorage.setItem("emailQueue", JSON.stringify(queue));
      })
      .catch(() => {
        // Safari может не показать ошибку — просто оставляем в очереди
      });
  });
}


/* ============================================================
   3. ОСНОВНАЯ ОТПРАВКА ФОРМЫ С FALLBACK
   ============================================================ */
document.querySelector(".record-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("status");

  // Собираем данные формы
  const payload = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    discount: document.getElementById("discount").value,
    time: new Date().toISOString() // время отправки
  };

  // Пытаемся отправить EmailJS
  return emailjs.send("service_7mutvum", "template_xy3x7jl", payload)
    .then(() => {

      /* === УСПЕШНАЯ ОТПРАВКА === */
      status.textContent = "Данные успешно отправлены!";
      status.style.color = "green";

      // Сбрасываем форму
      document.querySelector(".record-form").reset();
      document.getElementById("discount").value = "";
      document.getElementById("final-value").textContent = "Нажмите старт";

      // Сброс состояния колеса (если используется)
      rotation = 0;
      used = false;
      spinning = false;
      drawWheel(rotation);

      btn.disabled = false;
    })
    .catch(() => {

      /* === FALLBACK: EmailJS НЕ ОТВЕТИЛ === */
      status.textContent = "Связь потеряна. Данные сохранены и будут отправлены позже.";
      status.style.color = "orange";

      // Сохраняем данные в очередь
      saveToFallbackQueue(payload);
    });
});


/* ============================================================
   4. АВТОЗАПУСК ПОВТОРНОЙ ОТПРАВКИ
   ============================================================ */

// При загрузке страницы
window.addEventListener("load", resendQueuedEmails);

// При появлении интернета
window.addEventListener("online", resendQueuedEmails);


// навигация на мобилке
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
