/* globals window */
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../utils/auth/initFirebase';

// Init the Firebase app.

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account',
      },
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  credentialHelper: 'none',
};

const FirebaseAuth = (): JSX.Element => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect((): void => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>{renderAuth ? <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={firebase.auth()} /> : null}</div>
  );
};

export default FirebaseAuth;