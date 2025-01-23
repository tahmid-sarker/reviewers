import { motion } from "motion/react"
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      photo: "https://i.pravatar.cc/80?img=1",
      review:
        "Rate Cloud made it super easy for me to find reliable services with real reviews. Highly recommended!",
    },
    {
      id: 2,
      name: "Mohammad Rahim",
      photo: "https://i.pravatar.cc/80?img=2",
      review:
        "I love how secure and simple it is to share my feedback. The community is really helpful too.",
    },
    {
      id: 3,
      name: "Emily Carter",
      photo: "https://i.pravatar.cc/80?img=3",
      review:
        "Fantastic platform! The design is clean and works perfectly on my phone and laptop.",
    },
    {
      id: 4,
      name: "Arif Hossain",
      photo: "https://i.pravatar.cc/80?img=4",
      review:
        "The best place to get honest insights before trying any new service. I trust Rate Cloud!",
    },
  ];

  return (
    <section className="w-11/12 mx-auto mb-10">
      <h2 className="text-2xl md:text-4xl font-bold text-neutral text-center mb-8">
        What Our <span className="text-primary">Users</span> Say
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition h-full flex flex-col justify-between"
          >
            <div className="grow">
              <FaQuoteLeft className="text-primary text-2xl mb-3 mx-auto" />
              <p className="text-gray-600 italic mb-4 min-h-[100px]">
                "{t.review}"
              </p>
            </div>
            <div>
              <img
                src={t.photo}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-primary"
              />
              <h4 className="text-lg text-primary font-semibold">{t.name}</h4>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;