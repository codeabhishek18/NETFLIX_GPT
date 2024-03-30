import Header from "./Header";
import background from "../utils/bg-login.jpg";
import { useState, useRef } from "react";
import { Validation } from "../utils/Validation";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () =>
{
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [ isSignIn, setIsSignIn ] = useState(true);
    let [ errorMessage, setErrorMessage ] = useState(null);

    let fullname = useRef(null);
    let email = useRef(null);
    let password = useRef(null);

    let toggleForm = (e) =>
    {
        e.preventDefault();
        setIsSignIn(!isSignIn);
    }

    let handleForm = (e) =>
    {
        e.preventDefault();
        let message = Validation(email.current?.value, password.current?.value);
        setErrorMessage(message);
        if(message)
            return;

        if(isSignIn)
        {
            signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
            .then((userCredential) => {

            navigate('/browse');

        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        });
        }

        if(!isSignIn)
        {
            createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
            .then((userCredential) => 
            {
                const user = userCredential.user;
                updateProfile(user, {
                displayName: fullname.current.value
                }).then(() => 
                {   
                    const { uid, email, displayName } = auth.currentUser;
                    dispatch(addUser(
                        {
                            uid : uid,
                            email : email,
                            displayName : displayName
                        }))
                    navigate('/browse');
                })
                .catch((error) => 
                {
                    navigate('/error');
                });
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            });
        }
    }

    return(
        <div>
            <Header/>
            <div className="relative">
                <img src={background} alt="background" className="w-full h-full" />
            </div>

            <div className="absolute inset-0 top-40 flex justify-center items-center my-3">
                <form className="flex flex-col items-center p-8 bg-black bg-opacity-70 text-white rounded-md w-1/3">
                    
                    <label 
                    className="w-4/5 text-3xl font-bold mb-6">
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                    </label>
                    
                    { !isSignIn && <input 
                    ref={fullname}
                    className="w-4/5 p-4 my-2 bg-slate-400 bg-opacity-30 rounded-sm border-spacing-4" 
                    placeholder="Enter fullname"/>}
                    
                    <input 
                    ref={email}
                    className="w-4/5 p-4 my-2 bg-slate-400 bg-opacity-30 rounded-sm border-spacing-4" 
                    placeholder="Email or phone number"/>

                    <input 
                    ref={password}
                    className="w-4/5 p-4 my-2 bg-slate-400 bg-opacity-30 rounded-sm" 
                    placeholder="Password"/>

                    <label className="w-4/5 text-red-700 text-sm font-medium">{errorMessage}</label>

                    <button 
                    className="w-4/5 p-2 my-2 bg-red-600 rounded-sm filter saturate-150"
                    onClick={handleForm}>
                    { isSignIn ? 'Sign In' : 'Sign Up' }
                    </button>

                    { isSignIn && <label 
                    className="text-md my-2 text-white text-opacity-70">OR
                    </label> }

                    { isSignIn && <button 
                    className="w-4/5 p-2 my-2 mb-4 bg-slate-300 bg-opacity-20 font-semibold text-white rounded-sm">
                    Use a sign-in code
                    </button> }

                    { isSignIn && <label>
                    Forgot password?
                    </label> }

                    { isSignIn && 
                    <span className="flex w-4/5 mt-6">
                        <input type="checkbox" className="bg-black"/>
                        <label className="px-2"> 
                            Remember me
                        </label>
                    </span> }

                    <label className="w-4/5 my-3  text-white text-opacity-70">
                        { isSignIn? 'New to Netflix?' : 'Already a member?' }
                        <button className="text-md text-white font-bold px-1" 
                            onClick={toggleForm}>
                            { isSignIn ? 'Sign up now' : 'Sign in now' }
                        </button>
                    </label>

                    <label className="w-4/5 text-sm text-white text-opacity-50">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <span className="text-blue-700"> Learn more.</span>
                    </label>

                </form>
            </div>
        </div>
    )
}

export default Login;