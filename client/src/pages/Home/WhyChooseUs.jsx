import { MdVerified } from "react-icons/md";
import { motion } from "motion/react"
import { asset } from "../../utils/asset";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const cardDetails = [
    {
      title: "Verified Reviews",
      description:
        "All reviews are posted by real users so you can trust the feedback you read.",
    },
    {
      title: "Secure & Private",
      description:
        "We protect your data with robust authentication and secure API routes.",
    },
    {
      title: "Responsive Design",
      description:
        "Enjoy a clean, modern look that works perfectly on desktop, tablet, or mobile.",
    },
    {
      title: "Community Powered",
      description:
        "Thousands of users share honest insights to help you choose the best services.",
    },
  ];

  return (
    <section className="w-11/12 md:min-h-screen mx-auto mt-5 md:mt-8">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-neutral mb-5">
        <span className="text-primary">Why Choose </span>Rate Cloud?
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        {/* Left - Banner */}
        <div className="w-full md:w-1/2">
          <img
            src={asset("images/Teams.svg")}
            alt="Why Choose Us Banner"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right - Content */}
        <div className="w-full md:w-1/2">
          <div className="space-y-2">
            {cardDetails.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-xl p-5 rounded-xl"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
                  <MdVerified className="text-blue-500" size={20} />
                  {card.title}
                </div>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;