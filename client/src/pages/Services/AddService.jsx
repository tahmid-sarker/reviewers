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

const AddService = () => {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const serviceData = Object.fromEntries(formData.entries());

    serviceData.price = parseFloat(serviceData.price);
    serviceData.addedDate = new Date().toISOString();
    serviceData.userEmail = user.email;

    // POST to server
    fetch(`${import.meta.env.VITE_API_URL}/services`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId) {
        Toast.fire({
          icon: 'success',
          text: 'Service added successfully!'
        });
        form.reset();
      }
    })
    .catch(error => {
      Toast.fire({
        icon: 'error',
        text: error.message
      });
    });
  };

  return (
    <section className="w-11/12 md:w-2/3 mx-auto my-10 bg-white p-6 shadow-lg rounded-xl">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-4">
        Add a <span className="text-primary">New Service</span>
      </h2>
      <p className="text-center text-gray-500 mb-6 max-w-2xl mx-auto">
        Fill in the service details below to share it on Rate Cloud.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Title */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Service Title</label>
          <input type="text" name="title" placeholder="e.g., Logo Design Service"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required />
        </div>

        {/* Service Image */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Image URL</label>
          <input type="text" name="image"
            placeholder="Direct image link"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required />
        </div>

        {/* Company Name */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Company Name</label>
          <input type="text" name="company" placeholder="e.g., Creative Studio"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required />
        </div>

        {/* Website */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Company Website</label>
          <input type="url" name="website" placeholder="https://"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required />
        </div>

        {/* Description */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Description</label>
          <textarea name="description" rows="5"
            placeholder="Describe the service..."
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Category</label>
          <select name="category"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary cursor-pointer"
            required>
            <option value="IT Services">IT Services</option>
            <option value="Design">Design</option>
            <option value="Consulting">Consulting</option>
            <option value="Education">Education</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Transport">Transport</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="label text-sm md:text-lg font-semibold text-gray-600">Price ($)</label>
          <input type="number" name="price"
            placeholder="Enter price"
            step="0.01"
            min="0"
            className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary"
            required />
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="label text-sm text-red-700 italic">*you can't change your name</label>
                <input type="text" value={user.email} readOnly className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
                <label className="label text-sm font-semibold text-gray-600">Added Date</label>
                <input type="email" value={new Date().toLocaleDateString()} readOnly className="w-full text-xs md:text-lg px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-hidden bg-gray-100 cursor-not-allowed" />
            </div>
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full btn btn-primary hover:btn-primary-focus text-white text-sm md:text-lg">
          Add Service
        </button>
      </form>
    </section>
  );
};

export default AddService;