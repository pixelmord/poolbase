import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { firestore, auth } from 'lib/initFirebase';
import { UserAccountData, UserSessionData } from 'lib/types';
import { removeUserCookie, setUserCookie, getUserFromCookie } from 'lib/userCookies';
import { mapUserData } from 'lib/mapUserData';
import useI18n from './use-i18n';

export const useSession = (): { user: UserSessionData | null; logout: () => void } => {
  const [user, setUser] = useState<UserSessionData | null>(null);
  const { activeLocale } = useI18n();
  const router = useRouter();
  const logout = async () => {
    return auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push(`/${activeLocale}/login`);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = auth.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push(`/${activeLocale}/login`);
      return;
    } else {
      router.push(`/${activeLocale}`);
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export const useAuthUserProfile = (): [UserAccountData | undefined, Error | firebase.auth.Error | undefined] => {
  const [returnValue, setReturnValue] = useState<{
    user: UserAccountData | undefined;
    error: Error | firebase.auth.Error | undefined;
  }>({
    user: undefined,
    error: undefined,
  });
  const { user } = useSession();

  const [userAccountDocReference, setUserAccountDocReference] = useState<{
    ref: null | firebase.firestore.DocumentReference;
  }>({ ref: null });

  const [userAccountData, dataAccountLoading, dataAccountError] = useDocumentData<UserAccountData & { id: string }>(
    userAccountDocReference.ref,
    {
      idField: 'id',
    }
  );

  useEffect(() => {
    if (user && !userAccountDocReference.ref) {
      setUserAccountDocReference({ ref: firestore.doc(`users/${user.uid}`) });
    }
  }, [user]);

  useEffect(() => {
    if (userAccountData) {
      const newReturnValue = {
        ...returnValue,
        user: {
          ...userAccountData,
        },
      };
      setReturnValue(newReturnValue);
    }
    if (dataAccountError) {
      setReturnValue({
        ...returnValue,
        error: dataAccountError,
      });
    }
  }, [userAccountData]);

  return [returnValue.user, returnValue.error];
};
