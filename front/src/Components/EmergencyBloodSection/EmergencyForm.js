import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../Animation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
export default function EmergencyForm() {
  const [formData, setFormData] = useState({
    bloodType: "",
    requestorName: "",
    phone: "",
    city: "",
    state: "",
    hospital: "",
    urgencyLevel: "normal",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with actual API call

      toast.success("Emergency blood request submitted successfully!");

      // Scroll to process section smoothly
      const processSection = document.querySelector(
        "#emergency-process-section"
      );
      if (processSection) {
        processSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit emergency request");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AnimatedSection>
      <div className="container max-w-4xl px-4 mx-auto py-6">
        <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Image Section - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-1/2 relative min-h-[500px]">
            <img
              src="/images/Blood_donation_process.jpg"
              alt="Emergency Blood"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-bold mb-1">
                Emergency Blood Request
              </h2>
              <p className="text-sm text-gray-200">
                Fill out the form to submit your emergency blood request.
              </p>
            </div>
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-5 sm:p-8">
            <div className="md:hidden mb-6 text-center">
              {/* <p className="text-gray-600">
                Fill out the form to submit your emergency blood request.
              </p> */}
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Alert Header */}
              <div className="flex items-center p-4 bg-red-50 rounded-lg mb-6">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4 ">
                  <p className="text-lg  text-gray-900 font-bold">Emergency <span className="text-red-600">Blood Request</span></p>
                </div>
              </div>
              {/* Blood Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Blood Type Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodType"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all bg-gray-50 text-sm"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              {/* Requestor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Requestor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="requestorName"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Enter your name"
                    value={formData.requestorName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Enter state name"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospital"
                  className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                  placeholder="Enter hospital name"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Urgency Level */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              {/* Additional Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                  rows="2"
                  placeholder="Any additional details..."
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 text-sm"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting Request...
                  </span>
                ) : (
                  "Submit Emergency Request"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}