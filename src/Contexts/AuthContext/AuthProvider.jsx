import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../FirebaseInfo/FirebaseInfo';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //Observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        })
        return () => unSubscribe();
    },[])


    //Forgot Password
    const forgotPassword = (email) => {

        return sendPasswordResetEmail(
            auth,
            email
        );
    };

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }
   

    const userInfo = {
        registerUser,
        loginUser,
        user,
        loading,
        setLoading,
        googleSignIn,
        signOutUser,
        forgotPassword

    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;