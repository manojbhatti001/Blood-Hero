import { Heart, Users, Calendar, Award, CheckCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedSection, fadeIn, slideIn, staggerContainer } from '../Animation'
import { toast } from 'react-hot-toast'

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    interests: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Application submitted successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        availability: "",
        interests: []
      })
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-red-600 to-red-700 text-white overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="absolute inset-0">
          <img
            src="/images/volunter_bg.jpg"
            alt="Volunteers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-700/90"></div>
        </div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={slideIn}
            >
              Join Our Volunteer Community
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-red-100"
              variants={slideIn}
            >
              Make a difference in your community by volunteering with us. Help save lives
              and support our blood donation initiatives.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={slideIn}
            >
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                Apply Now
              </button>
              <button className="bg-red-500/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-500/30 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <AnimatedSection className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Volunteer With Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Heart className="w-8 h-8 text-red-500" />}
              title="Make an Impact"
              description="Help save lives and make a real difference in your community"
            />
            <BenefitCard
              icon={<Users className="w-8 h-8 text-red-500" />}
              title="Meet New People"
              description="Connect with like-minded individuals who share your passion"
            />
            <BenefitCard
              icon={<Calendar className="w-8 h-8 text-red-500" />}
              title="Flexible Schedule"
              description="Choose volunteer opportunities that fit your availability"
            />
            <BenefitCard
              icon={<Award className="w-8 h-8 text-red-500" />}
              title="Gain Experience"
              description="Develop new skills and enhance your resume"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Volunteer Form */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px]">
              <img 
                src="/images/young_donoer.jpg" 
                alt="Volunteer" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-3">Join Our Team</h2>
                <p className="text-gray-200 text-lg">Make a difference in your community by becoming a volunteer. Every helping hand counts.</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {['Blood Drive Support', 'Community Outreach', 'Event Planning'].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Application</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 transition-all"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 transition-all"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 transition-all"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Availability</label>
                    <select 
                      className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 transition-all"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option value="">Select your availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Areas of Interest</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Blood Drive Support",
                        "Administrative Support",
                        "Community Outreach",
                        "Event Planning"
                      ].map((interest) => (
                        <label key={interest} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                          />
                          <span className="ml-2 text-sm text-gray-600">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : "Submit Application"}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Volunteer Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {volunteerTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="text-center p-6">
      <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ image, name, role, quote }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <blockquote className="text-gray-600 italic mb-4">{quote}</blockquote>
      <div className="text-center">
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  )
}

const volunteerTestimonials = [
  {
    image: "/images/volunteers/volunteer1.jpg",
    name: "Sarah Johnson",
    role: "Blood Drive Coordinator",
    quote: "Volunteering here has been incredibly rewarding. I've met amazing people and helped save countless lives."
  },
  {
    image: "/images/volunteers/volunteer2.jpg",
    name: "Michael Chen",
    role: "Community Outreach",
    quote: "Being able to educate others about blood donation and its importance has been a fantastic experience."
  },
  {
    image: "/images/volunteers/volunteer3.jpg",
    name: "Emily Rodriguez",
    role: "Event Planner",
    quote: "I love organizing blood drives and seeing the direct impact we have on our community."
  }
]