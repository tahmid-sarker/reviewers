import CountUpImport from "react-countup";
import { motion } from "motion/react";

// Vite/CJS interop: react-countup nests default twice
const CountUp =
  typeof CountUpImport === "function"
    ? CountUpImport
    : typeof CountUpImport?.default === "function"
      ? CountUpImport.default
      : CountUpImport?.default?.default;

const Stats = () => {
  const stats = [
    {
      id: 1,
      label: 'Registered Users',
      value: 1240,
    },
    {
      id: 2,
      label: 'Reviews Posted',
      value: 875,
    },
    {
      id: 3,
      label: 'Services Listed',
      value: 210,
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="w-11/12 mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral text-center mb-8">
          Our Platform <span className='text-primary'>Stats</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map(stat => (
            <div key={stat.id} className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition">
              <CountUp end={stat.value} duration={8} className="text-4xl font-extrabold text-primary" />
              <p className="mt-2 text-lg text-gray-700 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;