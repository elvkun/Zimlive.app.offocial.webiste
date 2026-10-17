# Firebase web account setup

The platform section's account panel is implemented on `zimlive.app`. It uses Firebase Authentication's modular Web SDK for email/password account creation, sign-in, verification emails, password recovery, and sign-out. The SDK and page code run without redirecting users to the separate Next.js web-app URL.

New account creation requires the user to acknowledge the linked Flow Privacy Policy. This is an informational acknowledgment, not optional-cookie consent or a substitute for a lawful basis. The separate cookie-choice panel currently records essential/optional preferences only; the reviewed website source has no analytics or advertising integration. The privacy policy is an interim engineering disclosure and must be completed with operator, jurisdiction, privacy contact, retention, and rights-request details before real personal-data collection.

## Configure the account panel

1. The Firebase Web app `Flow production web` is registered in `flow-f17b3` with app ID `1:87359071553:web:c5af2e96c2984ee2f92dc0`.
2. Email/password Authentication is enabled in the project. Add the production hostname `zimlive.app` under **Authentication → Settings → Authorized domains** before activating the account panel. Add `www.zimlive.app` only if that hostname is actually served as a first-party site. This console setting could not be configured through the available local browser/CLI tools during this task.
3. The Web app's public client config is now in the `flow-firebase-config` JSON element at the bottom of `index.html`. It contains only `apiKey`, `authDomain`, `projectId`, and `appId`; it has no service-account credential. The Firebase config is public by design. Do not restrict Firebase APIs needed by Auth or add admin credentials to the page.
4. `privacyReady` remains `false`, so account form fields stay disabled and the site does not initialize Firebase Auth or submit credentials. Do not change it to `true` until the responsible operator, exact launch countries, privacy contact, age policy, retention/deletion/export handling, authorized domain, and hosting configuration are confirmed and reviewed.
5. The Vercel project currently serving `zimlive.app` is a static site rooted at the website repository. The separate Next.js workspace has no Vercel production project or environment variables configured. Do not add unused `NEXT_PUBLIC_FIREBASE_*` values to the static-site project; configure them in the Next.js host after that production project and origin are selected.
6. After the authorized domain and release gate are resolved, test account creation, verification return, sign-in, sign-out, password reset request, and password reset completion on each served first-party hostname.

Until those values are present and the `privacyReady` flag is explicitly set to `true`, the account fields remain disabled. Keep `privacyReady` false until the operator/legal identity, launch jurisdictions, privacy contact, age policy, approved purposes/legal bases, retention/deletion/export process, Firebase rules, and hosting configuration are confirmed and reviewed. This is a release safeguard, not a compliance certification. Passwords are handled transiently in the browser and sent to Firebase Authentication; the page does not store them in its own server or Firestore. This static page provides account creation, sign-in, verification, password recovery, and sign-out only. Profile, listing, and report tools are in the separate Next.js browser workspace at `https://zimlive-app-offocial-webiste.vercel.app/`; those data functions require that app's Firebase configuration, deployed Firestore rules, and privacy-readiness gate. The two sites do not share browser sessions or Firestore data automatically.

The page's meta CSP and Vercel response CSP both allow only the Firebase Web SDK CDN and the Firebase Authentication endpoints used by the account flow. Keep those policies aligned if Firebase endpoints change. The CDN SDK version is pinned in `scripts/account.js` and should be updated deliberately with the corresponding Firebase release.

## App store links

The Android and iOS buttons currently open store search pages for Flow and O'Riley Foundation. Replace them with the exact public store listing URLs once the apps have verified published listings. Do not advertise a direct install until the listing is live.
