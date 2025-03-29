import { motion } from 'framer-motion';

const GallerySection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 mx-auto relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-red-600 font-semibold text-base sm:text-lg mb-4 block"
          >
            Our Gallery
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
          >
            Blood Donation Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4"
          >
            Witness the impact of blood donation through these powerful moments captured at our donation drives and centers.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <GalleryItem key={item.title} {...item} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ image, title, description, delay }) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-red-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-sm">{description}</p>
        </div>
        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
          View Details
        </div>
      </div>
    </motion.div>
  );
};

const galleryItems = [
  {
    image: "/images/Blood_donation_process.jpg",
    title: "Donation Process",
    description: "Safe and comfortable donation environment with state-of-the-art facilities."
  },
  {
    image: "/images/Community.jpg",
    title: "Community Drive",
    description: "Bringing communities together to save lives through regular donation drives."
  },
  {
    image: "/images/medical_team.jpg",
    title: "Expert Care",
    description: "Professional medical staff ensuring safety and comfort during donation."
  },
  {
    image: "/images/blood_testing.jpg",
    title: "Quality Testing",
    description: "Advanced testing procedures ensuring the highest standards of blood safety."
  },
  {
    image: "/images/young_donoer.jpg",
    title: "Youth Participation",
    description: "Young donors leading the way in community blood donation initiatives."
  },
  {
    image: "/images/blood_storage.jpg",
    title: "Modern Storage",
    description: "State-of-the-art facilities ensuring safe blood storage and management."
  }
];

export default GallerySection;