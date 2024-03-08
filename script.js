function countDown() {
  const diasCasamento = new Date('26 April 2024 16:30:00');
  const dataAtual = new Date();
  const quantoTempo = diasCasamento.getTime() - dataAtual.getTime();
  const dias = Math.floor(quantoTempo / (24 * 60 * 60 * 1000));
  const horas = Math.floor(quantoTempo / (60 * 60 * 1000)) % 24;
  const minutos = Math.floor(quantoTempo / (60 * 1000)) % 60;
  const segundos = Math.floor(quantoTempo / 1000) % 60;

  if (dias <= 0) {
    const diasDom = (document.querySelector('.dias').innerHTML =
      'Chegou o grande dia!');
  }
  const diasDom = (document.querySelector('.dias').innerHTML = dias);
}

setInterval(() => {
  countDown();
}, 1000);

$('.slider').each(function () {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();

    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }

    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');

    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft,
    });
    $group.animate(
      {
        left: animateLeft,
      },
      function () {
        $slides.eq(currentIndex).css({
          display: 'none',
        });
        $slides.eq(newIndex).css({
          left: 0,
        });
        $group.css({
          left: 0,
        });
        currentIndex = newIndex;
      },
    );
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  $('.next_btn').on('click', function () {
    if (currentIndex < $slides.length - 1) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });

  $('.previous_btn').on('click', function () {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });

  $.each($slides, function (index) {
    var $button = $('<a class="slide_btn">&bull;</a>');

    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button
      .on('click', function () {
        move(index);
      })
      .appendTo('.slide_buttons');
    bulletArray.push($button);
  });

  advance();
});

// Função para abrir o modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Impede o rolamento da página
}

// Função para fechar o modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Permite o rolamento da página novamente
}

// Fechar o modal quando o usuário clicar fora dele
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};
