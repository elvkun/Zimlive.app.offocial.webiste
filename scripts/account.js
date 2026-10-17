const tabButtons = [...document.querySelectorAll('[data-account-tab]')];
const accountPanels = [...document.querySelectorAll('[data-account-panel]')];
const accountForms = document.querySelector('#account-forms');
const signedInPanel = document.querySelector('#account-signed-in');
const accountStatus = document.querySelector('#account-status');
const configNote = document.querySelector('#account-config-note');
const fields = [...document.querySelectorAll('[data-auth-fields]')];
const resetRequestForm = document.querySelector('#form-reset-request');
const resetPasswordForm = document.querySelector('#form-reset');
const resetRequestButton = document.querySelector('#forgot-password');
const backToSignInButton = document.querySelector('#back-to-sign-in');
const resendButton = document.querySelector('#account-resend-verification');
const signOutButton = document.querySelector('#account-sign-out');

const setStatus = (message, isError = false) => {
  if (!accountStatus) return;
  accountStatus.textContent = message;
  accountStatus.dataset.state = isError ? 'error' : 'success';
};

function showTab(name) {
  for (const button of tabButtons) {
    const selected = button.dataset.accountTab === name;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  for (const panel of accountPanels) panel.hidden = panel.dataset.accountPanel !== name;
  if (resetRequestForm) resetRequestForm.hidden = true;
  if (resetPasswordForm) resetPasswordForm.hidden = true;
  if (accountForms) accountForms.hidden = false;
  setStatus('');
}

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => showTab(button.dataset.accountTab));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabButtons.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length;
    tabButtons[nextIndex]?.focus();
    tabButtons[nextIndex]?.click();
  });
});

resetRequestButton?.addEventListener('click', () => {
  for (const panel of accountPanels) panel.hidden = true;
  if (resetRequestForm) resetRequestForm.hidden = false;
  setStatus('');
  resetRequestForm?.querySelector('input')?.focus();
});
backToSignInButton?.addEventListener('click', () => showTab('sign-in'));

const configElement = document.querySelector('#flow-firebase-config');
let config;
try {
  config = JSON.parse(configElement?.textContent ?? '{}');
} catch {
  config = {};
}
const configReady = ['apiKey', 'authDomain', 'projectId', 'appId']
  .every((key) => typeof config[key] === 'string' && config[key].trim().length > 0);

if (!configReady) {
  if (configNote) configNote.textContent = 'Account setup is not finished. Your credentials will not be accepted or stored on this page.';
  setStatus('Connect the Flow Firebase web app to enable sign in and account creation.', true);
} else {
  initializeAccount(config).catch(() => {
    if (configNote) configNote.textContent = 'Flow account service could not be reached. Please try again later.';
    setStatus('Account service is temporarily unavailable. Please try again later.', true);
  });
}

async function initializeAccount(firebaseConfig) {
  const version = '13.0.0';
  const [{ initializeApp }, authSdk] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`),
  ]);
  const app = initializeApp(firebaseConfig);
  const auth = authSdk.getAuth(app);
  for (const fieldset of fields) fieldset.disabled = false;
  if (resetRequestButton) resetRequestButton.disabled = false;
  if (configNote) configNote.textContent = 'Your account stays on this site. If the Flow browser workspace uses the same Firebase Authentication project and sign-in provider, you can use the same credentials there too; sign in separately on each site.';

  authSdk.onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (accountForms) accountForms.hidden = false;
      if (signedInPanel) signedInPanel.hidden = true;
      return;
    }
    if (accountForms) accountForms.hidden = true;
    if (signedInPanel) signedInPanel.hidden = false;
    const email = document.querySelector('#account-user-email');
    const verification = document.querySelector('#account-verification-state');
    if (email) email.textContent = user.email ?? 'Flow account';
    if (verification) verification.textContent = user.emailVerified
      ? 'Your email is verified. You can use your available Flow account features.'
      : 'Verify your email to use private Flow account features.';
    if (resendButton) resendButton.hidden = user.emailVerified;
  });

  document.querySelector('#form-sign-in')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const values = new FormData(form);
    const email = String(values.get('email') ?? '').trim().toLowerCase();
    const password = String(values.get('password') ?? '');
    if (!email || !password || password.length > 128) return setStatus('Enter your email and password.', true);
    setFormBusy(form, true);
    try {
      await authSdk.signInWithEmailAndPassword(auth, email, password);
      form.reset();
      setStatus('You are signed in.');
    } catch (error) {
      setStatus(authErrorMessage(error, 'sign-in'), true);
    } finally {
      setFormBusy(form, false);
    }
  });

  document.querySelector('#form-create')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const values = new FormData(form);
    const email = String(values.get('email') ?? '').trim().toLowerCase();
    const password = String(values.get('password') ?? '');
    if (!email || password.length < 12 || password.length > 128) return setStatus('Use a valid email and a password between 12 and 128 characters.', true);
    setFormBusy(form, true);
    try {
      const credential = await authSdk.createUserWithEmailAndPassword(auth, email, password);
      try {
        await authSdk.sendEmailVerification(credential.user, {
          url: `${window.location.origin}/#account-access`,
          handleCodeInApp: true,
        });
      } catch {
        await authSdk.signOut(auth);
        form.reset();
        showTab('sign-in');
        setStatus('Your account was created, but we could not send its verification email. Sign in and request a new verification link.', true);
        return;
      }
      await authSdk.signOut(auth);
      form.reset();
      showTab('sign-in');
      setStatus('Account created. Check your email for a verification link, then sign in here.');
    } catch (error) {
      setStatus(authErrorMessage(error, 'create'), true);
    } finally {
      setFormBusy(form, false);
    }
  });

  resetRequestForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const email = String(new FormData(form).get('email') ?? '').trim().toLowerCase();
    if (!email) return setStatus('Enter the email address for your Flow account.', true);
    setFormBusy(form, true);
    try {
      await authSdk.sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/#account-access`,
        handleCodeInApp: true,
      });
    } catch {
      // Keep the message the same for existing and unknown email addresses.
    } finally {
      form.reset();
      setFormBusy(form, false);
      setStatus('If an account matches that address, a password reset link will arrive shortly.');
    }
  });

  resetPasswordForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement) || !resetCode) return;
    const password = String(new FormData(form).get('password') ?? '');
    if (password.length < 12 || password.length > 128) return setStatus('Use a password between 12 and 128 characters.', true);
    setFormBusy(form, true);
    try {
      await authSdk.confirmPasswordReset(auth, resetCode, password);
      resetCode = '';
      form.reset();
      form.hidden = true;
      if (accountForms) accountForms.hidden = false;
      showTab('sign-in');
      setStatus('Password updated. Sign in with your new password.');
    } catch {
      setStatus('That password reset link is invalid or expired. Request another link and try again.', true);
    } finally {
      setFormBusy(form, false);
    }
  });

  resendButton?.addEventListener('click', async () => {
    if (!auth.currentUser || auth.currentUser.emailVerified) return;
    resendButton.disabled = true;
    try {
      await authSdk.sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/#account-access`,
        handleCodeInApp: true,
      });
    } catch {
      // Use a generic response so the UI does not expose provider or address details.
    } finally {
      setStatus('If the account can receive verification email, a new link has been sent.');
      resendButton.disabled = false;
    }
  });

  signOutButton?.addEventListener('click', async () => {
    try {
      await authSdk.signOut(auth);
      setStatus('You have signed out.');
    } catch {
      setStatus('Sign out could not be completed. Try again.', true);
    }
  });

  await handleAccountAction(auth, authSdk);
}

let resetCode = '';

async function handleAccountAction(auth, authSdk) {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const code = params.get('oobCode');
  if (!mode || !code) return;
  try {
    if (mode === 'verifyEmail') {
      await authSdk.applyActionCode(auth, code);
      if (auth.currentUser) await authSdk.reload(auth.currentUser);
      setStatus('Email verified. Sign in to continue.');
    } else if (mode === 'resetPassword') {
      await authSdk.verifyPasswordResetCode(auth, code);
      resetCode = code;
      if (accountForms) accountForms.hidden = true;
      if (resetPasswordForm) resetPasswordForm.hidden = false;
      setStatus('Choose a new password for your account.');
      resetPasswordForm?.querySelector('input')?.focus();
    }
  } catch {
    setStatus('That account link is invalid or has expired. Request a new one and try again.', true);
  } finally {
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash || '#account-access'}`);
  }
}

function setFormBusy(form, busy) {
  for (const control of form.querySelectorAll('button, input')) control.disabled = busy;
}

function authErrorMessage(error, operation) {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : '';
  if (code.includes('too-many-requests')) return 'Too many attempts. Wait a little and try again.';
  if (code.includes('network-request-failed')) return 'Check your connection and try again.';
  if (operation === 'create' && code.includes('weak-password')) return 'Choose a stronger password with at least 12 characters.';
  if (operation === 'create' && code.includes('email-already-in-use')) return 'An account could not be created with those details. Try signing in or resetting your password.';
  return operation === 'sign-in' ? 'Email or password was not accepted.' : 'Account creation could not be completed. Check your details and try again.';
}
