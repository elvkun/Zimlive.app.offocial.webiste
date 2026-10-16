const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');

if (menuButton instanceof HTMLButtonElement && navigation instanceof HTMLElement) {
  document.documentElement.classList.add('js');

  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
    navigation.dataset.open = String(open);
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });
}
