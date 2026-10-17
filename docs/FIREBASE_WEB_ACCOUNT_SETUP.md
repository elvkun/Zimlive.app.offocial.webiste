# Firebase web account setup

The platform section's account panel is implemented on `zimlive.app`. It uses Firebase Authentication's modular Web SDK for email/password account creation, sign-in, verification emails, password recovery, and sign-out. The SDK and page code run without redirecting users to the separate Next.js web-app URL.

New account creation requires the user to acknowledge the linked Flow Privacy Policy. This is an informational acknowledgment, not optional-cookie consent or a substitute for a lawful basis. The separate cookie-choice panel currently records essential/optional preferences only; the reviewed website source has no analytics or advertising integration. The privacy policy is an interim engineering disclosure and must be completed with operator, jurisdiction, privacy contact, retention, and rights-request details before real personal-data collection.

## Configure the account panel

1. In the Flow Firebase project, register `zimlive.app` as a web app if it is not already registered. Use the same Firebase Authentication project and email/password provider as the Next.js browser workspace if users should be able to use the same credentials on both sites. Users still sign in separately on each domain; browser sessions and Firestore data are not shared automatically.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Add `zimlive.app` and `www.zimlive.app` under **Authentication → Settings → Authorized domains**. Set the Firebase email verification and password reset action URL/continue URL to `https://zimlive.app/#account-access` if the Firebase console asks for an action URL.
4. Copy the registered web app's public config values into the JSON element with ID `flow-firebase-config` at the bottom of `index.html`: `apiKey`, `authDomain`, `projectId`, and `appId`. These are Firebase client identifiers, not service-account credentials. Never add a service-account key or Admin SDK credential to this static site.
5. Deploy the site and test account creation, verification return, sign-in, sign-out, password reset request, and password reset completion on both apex and `www` hostnames.

Until those values are present and the `privacyReady` flag is explicitly set to `true`, the account fields remain disabled. Keep `privacyReady` false until the operator/legal identity, launch jurisdictions, privacy contact, age policy, approved purposes/legal bases, retention/deletion/export process, Firebase rules, and hosting configuration are confirmed and reviewed. This is a release safeguard, not a compliance certification. Passwords are handled transiently in the browser and sent to Firebase Authentication; the page does not store them in its own server or Firestore. This static page provides account creation, sign-in, verification, password recovery, and sign-out only. Profile, listing, and report tools are in the separate Next.js browser workspace at `https://zimlive-app-offocial-webiste.vercel.app/`; those data functions require that app's Firebase configuration, deployed Firestore rules, and privacy-readiness gate. The two sites do not share browser sessions or Firestore data automatically.

The page's meta CSP and Vercel response CSP both allow only the Firebase Web SDK CDN and the Firebase Authentication endpoints used by the account flow. Keep those policies aligned if Firebase endpoints change. The CDN SDK version is pinned in `scripts/account.js` and should be updated deliberately with the corresponding Firebase release.

## App store links

The Android and iOS buttons currently open store search pages for Flow and O'Riley Foundation. Replace them with the exact public store listing URLs once the apps have verified published listings. Do not advertise a direct install until the listing is live.
