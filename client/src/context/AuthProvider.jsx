import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Create User Info:
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User Info:
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Login with Google Info:
    const provider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // Update User Info:
    const updateUser = (name, photo) => {
        const profile = {
            displayName: name,
            photoURL: photo
        }
        return updateProfile(auth.currentUser, profile)
    }

    // Catch the Current User: 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false)
            setUser(currentUser)
            if (currentUser?.email) {
                const userEmail = {email: currentUser.email}
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userEmail, {
                    withCredentials: true
                })
                .then(response => {
                })
                .catch(error => {
                    Toast.fire({
                        icon: 'error',
                        text: error.message
                    });
                })
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // Log out User:
    const logOut = () => {
        return signOut(auth)
    }

    // Reset Password:
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        updateUser,
        resetPassword,
        loginWithGoogle,
        logOut,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;