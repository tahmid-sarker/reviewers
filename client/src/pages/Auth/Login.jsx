import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { asset } from '../../utils/asset';

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

const Login = () => {
    const { user, loginUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        // Login a user:
        loginUser(email, password)
            .then((result) => {
                navigate(from);
                //Send Data to Database:
                //signInInfo:
                const signInInfo = {
                    email,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                }
                result.user.getIdToken().then((token) => {
                    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: {
                            "Content-Type": 'application/json',
                            authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(signInInfo)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            // Success
                            Toast.fire({
                                icon: "success",
                                title: "Login Successfully!",
                            });
                        }
                    })
                    .catch((error) => {
                        Toast.fire({
                            icon: "error",
                            title: error.message,
                        });
                    });
                })
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: error.message,
                })
            })
    }
    const handleGoogleSignIn = () => {
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
                    <h1 className='text-2xl md:text-4xl font-bold text-neutral'>Welcome Back to <span className='text-primary'>Rate</span> <span className='text-secondary'>Cloud</span></h1>
                    <h1 className='text-xl text-neutral'>Log in to continue discovering and reviewing trusted services.</h1>
                    <img src={asset("images/Login.svg")} alt="Login Banner" className='max-h-[75vh] object-contain' />
                </div>
                {/* Right Side - Login Form */}
                <div className='w-full'>
                    <div className="w-11/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign In to Your Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com"
                                    required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/* Password */}
                            <div>
                                <label className="label text-sm md:text-lg text-gray-600">Password</label>
                                <input type="password" name="password" placeholder="Enter your password"
                                    required
                                    className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                            </div>
                            {/*Forget Password*/}
                            <p onClick={() => navigate("/forget-password")} className="text-sm md:text-lg text-primary text-right hover:text-secondary hover:underline cursor-pointer">Forget Password</p>
                            {/*Login Button*/}
                            <div className='flex justify-center'>
                                <button type="submit" className="w-full btn btn-primary hover:btn-secondary text-white text-sm md:text-lg">Login</button>
                            </div>
                            {/*OR*/}
                            <div className="divider divider-primary text-gray-600">
                                OR
                            </div>
                            {/*Sign in with google*/}
                            <div className='flex justify-center'>
                                <button className="w-full bg-white btn text-primary border-secondary hover:shadow-xl" onClick={handleGoogleSignIn}><FcGoogle size={24} /> Login With Google</button>
                            </div>
                        </form>
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-500">
                            Don't have an account? <Link to="/register" className="text-primary hover:text-secondary hover:underline">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;