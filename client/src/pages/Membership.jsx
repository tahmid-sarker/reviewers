import { motion } from "motion/react"
import { FaCheckCircle } from "react-icons/fa";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Membership = () => {
  const plans = [
    {
      id: 1,
      title: "Free",
      price: "$0 / month",
      features: [
        "Access to basic reviews",
        "Post unlimited reviews",
        "Basic support",
      ],
      bg: "bg-base-100",
    },
    {
      id: 2,
      title: "Pro",
      price: "$9.99 / month",
      features: [
        "Priority listing for your services",
        "Detailed analytics dashboard",
        "Email notifications",
        "Premium support",
      ],
      bg: "bg-base-200",
    },
    {
      id: 3,
      title: "Premium",
      price: "$29.99 / month",
      features: [
        "Featured listings",
        "Advanced analytics & insights",
        "Custom branding",
        "Dedicated account manager",
      ],
      bg: "bg-base-300",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-12">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-neutral">
        Membership <span className="text-primary">Plans</span>
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Choose the plan that best suits your needs and start enjoying the benefits of Rate Cloud.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`${plan.bg} rounded-lg p-8 text-center border border-primary`}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
            <p className="text-3xl font-extrabold text-primary mb-6">
              {plan.price}
            </p>
            <ul className="text-neutral space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition">
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Membership;