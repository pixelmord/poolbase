export const mapUserData = (user) => {
  const { uid, email, xa } = user;
  return {
    uid,
    email,
    token: xa,
  };
};
