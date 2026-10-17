const consentKey = 'flow.privacy.preferences';
const consentVersion = '2026-10-17';
const consentMaxAgeMs = 180 * 24 * 60 * 60 * 1000;
const banner = document.querySelector('#flow-cookie-banner');
const dialog = document.querySelector('#flow-cookie-dialog');

function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(consentKey) ?? 'null');
    if (saved?.version !== consentVersion || !Number.isFinite(saved?.savedAt)) return null;
    if (saved.savedAt > Date.now() || Date.now() - saved.savedAt > consentMaxAgeMs) return null;
    if (!['all-current', 'essential-only'].includes(saved.choice)
      || saved.essential !== true
      || !Array.isArray(saved.optionalCategories)
      || saved.optionalCategories.length !== 0) return null;
    return saved;
  } catch {
    return null;
  }
}

function saveConsent(choice = 'essential') {
  const value = {
    version: consentVersion,
    savedAt: Date.now(),
    essential: true,
    choice: choice === 'all' ? 'all-current' : 'essential-only',
    optionalCategories: [],
  };
  try {
    localStorage.setItem(consentKey, JSON.stringify(value));
  } catch {
    // The site remains usable when browser storage is disabled; choices then last only for this page view.
  }
  if (banner) banner.hidden = true;
  if (dialog?.open) dialog.close();
  window.dispatchEvent(new CustomEvent('flowconsentchange', { detail: value }));
}

const savedConsent = readConsent();
if (banner && !savedConsent) banner.hidden = false;

document.querySelectorAll('[data-cookie-accept]').forEach((button) => {
  button.addEventListener('click', () => saveConsent(button.dataset.cookieAccept));
});

document.querySelectorAll('[data-open-cookie-choices]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!(dialog instanceof HTMLDialogElement)) return;
    dialog.showModal();
  });
});

document.querySelector('[data-save-cookie-choices]')?.addEventListener('click', () => saveConsent('essential'));

window.FlowConsent = Object.freeze({
  allows(category) {
    if (category === 'essential') return true;
    const current = readConsent();
    return Boolean(current?.optionalCategories?.includes(category));
  },
  open() {
    document.querySelector('[data-open-cookie-choices]')?.click();
  },
});
