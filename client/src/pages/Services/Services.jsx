import { useEffect, useState } from "react";
import { Link } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...services];

    if (searchText) {
      filtered = filtered.filter((service) =>
        service.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayServices(filtered);
  }, [services, searchText, selectedCategory, sortOrder]);

  return (
    <section className="w-11/12 mx-auto my-12">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-neutral">All <span className="text-primary">Services</span></h2>
      <p className="text-center text-gray-500 mb-6">
        Explore a wide range of services offered by our community. Find the perfect service that meets your needs.
      </p>
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <input type="text" placeholder="🔍 Search services..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
          className="px-5 py-3 w-full cursor-pointer border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary" />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-5 py-3 w-full cursor-pointer border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary">
          <option value="All">All Categories</option>
          <option value="IT Services">IT Services</option>
          <option value="Consulting">Consulting</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Design">Design</option>
          <option value="Education">Education</option>
          <option value="Transport">Transport</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
          className="px-5 py-3 w-full cursor-pointer border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-secondary">
          <option value="">Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayServices.map((service) => (
          <div key={service._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col p-5 h-full">
            <img src={service.image} alt={service.title} className="w-full h-52 object-cover rounded-lg mb-4" />

            <div className="flex flex-col grow">
              <h3 className="text-xl font-bold mb-2 text-gray-700">{service.title}</h3>
              <p className="text-gray-700 mb-4 grow">{service.description.slice(0, 80)}...</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-primary">${service.price}</span>
                <span className="inline-block bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full">{service.category}</span>
              </div>

              <Link to={`/service-details/${service._id}`}
                className="mt-auto inline-block bg-primary text-white text-center px-5 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;