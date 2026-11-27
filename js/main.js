
// Controla a navegação móvel e o ano apresentado no rodapé.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir navegação' : 'Fechar navegação');

    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir navegação');
      navigation.classList.remove('is-open');
    });
  });
}

// Actualiza automaticamente o ano apresentado no rodapé.
const yearElement = document.querySelector('#current-year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Configuração do contador de visitas GoatCounter.
const goatCounterEndpoint = 'https://claudiocorreads.goatcounter.com/count';

const counterValue = document.querySelector('#visitor-counter-value');

if (counterValue) {
  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  const counterScript = document.createElement('script');

  counterScript.src = 'https://gc.zgo.at/count.js';
  counterScript.async = true;
  counterScript.dataset.goatcounter = goatCounterEndpoint;

  if (isLocalhost) {
    counterScript.dataset.goatcounterSettings = JSON.stringify({
      allow_local: true
    });
  }

  counterScript.addEventListener('load', async () => {
  try {
    const response = await fetch(
      'https://claudiocorreads.goatcounter.com/counter//.json'
    );

    const data = await response.json();

    if (typeof data.count === 'undefined') {
      throw new Error('Resposta inválida do GoatCounter.');
    }

    counterValue.textContent = data.count;

  } catch (error) {
    counterValue.textContent = 'Indisponível';
  }
});

  counterScript.addEventListener('error', () => {
    counterValue.textContent = 'Indisponível';
  });

  document.head.appendChild(counterScript);
}
