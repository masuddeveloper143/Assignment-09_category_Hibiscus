import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";

import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Register

  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Login

  const loginUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Google Login

  const googleLogin = () => {
    setLoading(true);

    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // Logout

  const logoutUser = () => {
    setLoading(true);

    return signOut(auth);
  };

  // Update Profile

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Reset Password

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Current User

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,

    createUser,
    loginUser,
    googleLogin,
    logoutUser,

    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;