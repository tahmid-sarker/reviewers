import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { asset } from '../../utils/asset';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

// Sweet Alert
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

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const location = useLocation()
    const from = location.state || "/";
    const navigate = useNavigate();
    const { user, createUser, updateUser, loginWithGoogle } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { name, email, password, checkbox, photo, ...restFormData } = Object.fromEntries(formData.entries());
        setPasswordErrorMessage("");
        // Password Validate
        const passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRex.test(password)) {
            if (password.length < 8) {
                setPasswordErrorMessage("Password must be at least 8 characters long.");
            } else if (!/[a-z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one lowercase letter.");
            } else if (!/[A-Z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one uppercase letter.");
            } else if (!/\d/.test(password)) {
                setPasswordErrorMessage("Password must include at least one digit.");
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one special character.");
            } else {
                setPasswordErrorMessage("Password must meet all required conditions.");
            }
            return;
        }

        // Checkbox Check
        if (!checkbox) {
            Toast.fire({
                icon: "error",
                title: "You Have to Accept our Terms and Conditions!",
            });
            return;
        }

        // Create A User:
        createUser(email, password)
            .then((result) => {
                navigate(from)

                // Update User Info
                updateUser(name, photo)
                    .then()
                    .catch((error) => {
                        //Error
                        Toast.fire({
                            icon: "error",
                            title: error.message,
                        });
                    })
                // Send Data to Database:
                // User Profile 
                const userInfo = {
                    name,
                    email,
                    photo,
                    ...restFormData,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }
                result.user.getIdToken().then((token) => {
                    fetch(`${import.meta.env.VITE_API_URL}/users`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": 'application/json',
                            authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(userInfo)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            // Success
                            Toast.fire({
                                icon: "success",
                                title: "Account Created Successfully!",
                            });
                        }
                    })
                    .catch((error) => {
                        // Error
                        Toast.fire({
                            icon: "error",
                            title: error.message,
                        });
                    })
                })
            })
            .catch((error) => {
                // Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    }

    const handleGoogleSignUp = () => {
        loginWithGoogle()
            .then(() => {
                navigate(location.state || "/");
                // Success
                Toast.fire({
                    icon: "success",
                    title: "Create Account Successfully!",
                });
            })
            .catch((error) => {
                // Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };
    if (user) {
        navigate(from)
        return;
    } else {
        return (
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5">
                {/* Left Side - Banner */}
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold text-neutral'>Join <span className='text-primary'>Rate</span> <span className='text-secondary'>Cloud</span> Today</h1>
                    <h1 className='text-xl text-neutral'>Create your free account to start discovering, adding, and reviewing trusted services.</h1>
                    <img src={asset("images/Register.svg")} alt="Banner" className='max-h-[75vh] object-contain' />
                </div>
                {/* Right Side - Registration Form */}
                <div className='w-full'>
                    <div className="w-11/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign Up for an Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Name */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-700">Your Name</label>
                                <input type="text" name="name" placeholder="Enter your name" required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Photo URL */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-700">Your Photo</label>
                                <input type="url" name="photo" placeholder="Enter your photo URL" required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-700">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com" required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Password */}
                            <div className="relative">
                                <label className="label text-sm md:text-lg text-gray-700">Password</label>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                                <div onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-8 md:top-10 right-4 cursor-pointer text-gray-500">
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </div>
                            </div>
                            {/* Password Error Message */}
                            <div className='text-sm md:text-lg text-center text-red-600'>
                                {passwordErrorMessage}
                            </div>
                            {/* Terms and Conditions */}
                            <div className='flex gap-1 text-sm md:text-lg text-gray-700'>
                                <p>Accept our terms and conditions</p>
                                <input type="checkbox" name="checkbox" className="accent-primary" />
                            </div>
                            {/* Register Button*/}
                            <div>
                                <button type="submit" className="w-full btn btn-primary hover:btn-secondary text-white">Register</button>
                            </div>
                            {/* OR */}
                            <div className="divider divider-primary text-gray-600">
                                OR
                            </div>
                            {/* Sign in with Google */}
                            <div className='flex justify-center'>
                                <button onClick={handleGoogleSignUp} className="w-full bg-white btn text-primary border-secondary hover:shadow-xl"><FcGoogle size={24} /> Register With Google</button>
                            </div>
                        </form>
                        {/* Check Link */}
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-500">
                            Already Have an Account? <Link to="/login" className="text-primary hover:text-secondary hover:underline">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;