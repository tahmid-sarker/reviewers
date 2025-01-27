import useAuth from '../../hooks/useAuth';
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

const UpdateProfile = () => {
    const { user, updateUser } = useAuth();
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { name, photo } = Object.fromEntries(formData.entries());
        updateUser(name, photo)
        .then((result) => {
            e.target.reset(); // Reset the form after submission

            //Send Data to Database:
            //updateInfo:
            const updateInfo = {
                email: user.email,
                name,
                photo,
            }
            // Send to server:
            // Update user info in the database:
            result.user.getIdToken().then((token) => {
                fetch(`${import.meta.env.VITE_API_URL}/users/update-profile`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updateInfo)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        // Success
                        Toast.fire({
                            icon: "success",
                            title: "Profile Updated Successfully!",
                        });
                    }
                })
            })
        })
        .catch((error) => {
            // Error
            Toast.fire({
                icon: "error",
                title: error.message,
            });
        })
    };

    return (
        <div className="flex justify-center my-15">
            <form onSubmit={handleUpdateProfile} className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-11/12 mx-auto md:w-full space-y-4">
                <img src={user?.photoURL} alt={user?.displayName} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary" />
                <h2 className="text-2xl font-bold text-center text-gray-800">Update Profile</h2>
                {/* Email */}
                <div>
                    <label className="label text-sm text-red-700 italic">*you can't change your email</label>
                    <input type="text" name='email' value={user.email} className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden cursor-not-allowed" readOnly />
                </div>
                {/* Name */}
                <div>
                    <label className="label text-sm md:text-lg text-gray-600">Display Name</label>
                    <input type="text" name='name' placeholder="Enter your name" className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" required />
                </div>
                {/* Photo URL */}
                <div>
                    <label className="label text-sm md:text-lg text-gray-600">Photo URL</label>
                    <input type="url" name="photo" placeholder="Enter photo URL" className="w-full text-xs md:text-lg text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" required />
                </div>
                {/* Submit Button*/}
                <button type="submit" className="btn btn-primary hover:btn-primary-focus text-white rounded-full">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;