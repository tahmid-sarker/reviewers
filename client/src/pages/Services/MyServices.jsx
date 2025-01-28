import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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

const MyServices = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);

  useEffect(() => {
    if (user?.email) {
      user.getIdToken().then((token) => {
        fetch(`${import.meta.env.VITE_API_URL}/user-services?email=${user.email}`, {
          credentials: "include",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => setMyServices(data))
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err.message,
          });
        });
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0 || data?.success) {
              setMyServices((prev) => prev.filter((service) => service._id !== id));
              Toast.fire({
                icon: "success",
                title: "Service deleted successfully!",
              });
            }
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              text: err.message,
            });
          });
      }
    });
  };

  return (
    <section className="w-11/12 mx-auto my-12">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-neutral">
        My <span className="text-primary">Services</span>
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Here are the services you have added. You can update or delete them as needed.
      </p>

      {myServices.length === 0 ? (
        <p className="text-center text-gray-500">No services added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myServices.map((service) => (
            <div
              key={service._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col p-5 h-full"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              <div className="flex flex-col grow">
                <h3 className="text-xl font-bold mb-2 text-gray-700">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4 grow">
                  {service.description?.slice(0, 80)}...
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-primary">
                    ${service.price}
                  </span>
                  <span className="inline-block bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    to={`/service-details/${service._id}`}
                    className="inline-block bg-primary text-white text-center px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/update-service/${service._id}`}
                    className="inline-block bg-yellow-500 text-white text-center px-5 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyServices;
