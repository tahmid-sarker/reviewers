import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { asset } from '../../utils/asset';

// Sweet Alert Toast
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

const ForgetPassword = () => {
    const { resetPassword } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        resetPassword(email)
        .then(() => {
            //Success
            Toast.fire({
                icon: 'success',
                title: `Reset link sent to ${email}`
            });
        })
    }
    return (
        <section className='w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5'>
            {/* Left Side - Banner */}
            <div className='flex flex-col items-center justify-center gap-2 w-full'>
                <h1 className='text-2xl md:text-4xl font-bold text-natural'>Reset Your Password</h1>
                <h1 className='text-base text-neutral'>Enter your email address and we’ll send you a link to reset your password. <br /> Let’s get you back to growing in no time!</h1>
                <img src={asset("images/Forget-Password.svg")} alt="Login Banner" className='h-[30vh] md:h-[70vh] object-contain' />
            </div>
            {/* Right Side - Reset Password Form */}
            <div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full'>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-6">Enter your email</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='text-left'>
                        <label className="block text-sm md:text-base font-medium text-gray-600 mb-1">Email Address</label>
                        <input type="email" name="email" placeholder="example@email.com" required
                            className="w-full text-sm md:text-base text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />
                    </div>
                    <button type="submit" className="btn btn-primary hover:btn-primary-focus w-full text-white">Reset Password</button>
                </form>
            </div>
        </section>
    );
};

export default ForgetPassword;