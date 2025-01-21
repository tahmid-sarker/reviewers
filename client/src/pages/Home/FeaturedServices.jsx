import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedServices = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services/featured`)
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-11/12 max-w-7xl mx-auto my-16">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-neutral">
        Featured <span className="text-primary">Services</span>
      </h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((service) => (
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 grow">
                  {service.description.slice(0, 80)}...
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-primary">
                    ${service.price}
                  </span>
                  <span className="inline-block bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                <Link
                  to={`/service-details/${service._id}`}
                  className="mt-auto inline-block bg-primary text-white text-center px-5 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default FeaturedServices;
