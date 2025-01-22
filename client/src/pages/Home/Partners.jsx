import { motion } from "motion/react"

const Partners = () => {
  const partners = [
    {
      id: 1,
      logo: 'https://i.ibb.co/ycCgGv3Y/Trustpilot.png',
      name: 'TrustPilot',
      description: 'Trusted reviews partner providing verified user feedback.'
    },
    {
      id: 2,
      logo: 'https://i.ibb.co/b5XjM6Zv/Cloud-Host.png',
      name: 'CloudHost',
      description: 'Reliable cloud hosting for scalable review systems.'
    },
    {
      id: 3,
      logo: 'https://i.ibb.co/pjzGHvt2/Secure-Auth.png',
      name: 'SecureAuth',
      description: 'Authentication & security solutions for user safety.'
    },
    {
      id: 4,
      logo: 'https://i.ibb.co/yB75Bhgc/GrowBiz.png',
      name: 'GrowBiz',
      description: 'Helping businesses connect with real customer voices.'
    }
  ];

  return (
    <section className="w-11/12 mx-auto my-5">
      <h2 className="text-2xl md:text-4xl font-bold text-neutral text-center mb-8">
        Meet Our <span className="text-primary">Partners</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition h-full"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="mb-4 w-[150px] h-[50px] object-contain"
            />
            <h3 className="text-lg text-gray-700 font-semibold mb-2">{partner.name}</h3>
            <p className="text-gray-600 text-sm grow">{partner.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Partners;