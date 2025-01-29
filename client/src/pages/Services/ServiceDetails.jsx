import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
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

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [service, setService] = useState({});
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/service-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.reviewText.value;

    const newReview = {
      userName: user.displayName,
      userPhoto: user.photoURL,
      reviewDate: new Date().toISOString(),
      rating: ratingValue,
      text,
    };

    // Send new review to the server
    fetch(`${import.meta.env.VITE_API_URL}/service-details/${id}`, {
      method:'PATCH',
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newReview)
    })
    .then(res => res.json())
    .then(data => {
        if (data.modifiedCount) {
            // Success
            Toast.fire({
                icon: "success",
                title: "Review Created Successfully!",
            });

            // Reset form
            e.target.reset();
            setRatingValue(0);

            // Update service data to reflect new review
            setService((prevService) => ({
              ...prevService,
              reviews: [...(prevService.reviews || []), newReview],
            }));
        }
    })
  };

  return (
    <section className="w-11/12 max-w-6xl mx-auto my-12">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
        {service.title}
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong>Company:</strong> {service.company}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Website:</strong>{" "}
              <a
                href={service.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:text-primary/80 transition"
              >
                {service.website}
              </a>
            </p>

            <div className="flex items-center gap-3">
              <strong className="text-lg text-gray-700">Category:</strong>
              <span className="inline-block bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full">
                {service.category}
              </span>
            </div>

            <p className="text-lg text-gray-700">
              <strong>Price:</strong> ${service.price}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {service.description}
            </p>

            <p className="text-gray-500 text-sm">
              Added:{" "}
              {service.addedDate &&
                new Date(service.addedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">
          Reviews ({service.reviews?.length || 0})
        </h3>

        {service.reviews && service.reviews.length > 0 ? (
          <div className="space-y-4">
            {service.reviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow transition"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.userPhoto}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <p className="text-xs text-gray-400">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-1">
                  <Rating
                    readonly
                    initialRating={review.rating}
                    emptySymbol={<FaRegStar className="text-yellow-400" />}
                    fullSymbol={<FaStar className="text-yellow-400" />}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {review.rating}/5
                  </span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Add Review */}
        <div className="mt-8">
          {user ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-xl"
            >
              <h4 className="text-xl font-semibold">Add Your Review</h4>

              <textarea
                name="reviewText"
                rows="4"
                placeholder="Write your review..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-secondary"
                required
              ></textarea>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Your Rating:
                </label>
                <Rating
                  initialRating={ratingValue}
                  emptySymbol={<FaRegStar className="text-3xl text-yellow-400 cursor-pointer" />}
                  fullSymbol={<FaStar className="text-3xl text-yellow-400 cursor-pointer" />}
                  onChange={handleRatingChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-red-500">Please log in to add a review.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
