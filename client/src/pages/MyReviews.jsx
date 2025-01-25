import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

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

const MyReviews = () => {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        const reviews = data.flatMap((service) =>
          (service.reviews || [])
            .filter((review) => review.userPhoto === user.photoURL)
            .map((review) => ({
              ...review,
              serviceTitle: service.title,
              serviceId: service._id,
            }))
        );
        setMyReviews(reviews);
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  }, [user]);

  return (
    <section className="w-11/12 mx-auto my-12">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-neutral">
        My <span className="text-primary">Reviews</span>
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Here are the reviews you've submitted for various services.
      </p>

      {myReviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't submitted any reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {myReviews.map((review, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-4">
                {/* Left: Review Info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-1">{review.serviceTitle}</h3>
                  <p className="text-gray-800 mb-2"><strong>Review:</strong> {review.text}</p>
                  <p className="text-yellow-500 font-medium">⭐ Rating: {review.rating} / 5</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Right: Service Info */}
                <div>
                  <Link to={`/service-details/${review.serviceId}`} className="btn btn-primary hover:btn-primary-focus text-white rounded-full">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReviews;