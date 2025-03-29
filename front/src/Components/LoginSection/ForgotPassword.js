import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ResetPassword from './ResetPassword';
import api from '../../config/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Call the API to send OTP to the user's email
      const response = await api.post('/auth/forgot-password', { email });
      
      toast.success('OTP sent to your email. Please check your inbox.');
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Call the API to verify the OTP
      const response = await api.post('/auth/verify-otp', { email, otp });
      
      toast.success('OTP verified successfully!');
      setOtpVerified(true);
      
      // Store the email and OTP in localStorage for the reset password page
      localStorage.setItem('resetEmail', email);
      localStorage.setItem('resetOtp', otp);
      
      // Redirect to reset password page
      window.location.href = '/reset-password';
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      // Call the API to resend OTP
      const response = await api.post('/auth/resend-otp', { email });
      
      toast.success('OTP resent to your email. Please check your inbox.');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Progress Steps */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= item ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > item ? <CheckCircle className="h-5 w-5" /> : item}
                </div>
                {item < 3 && (
                  <div className={`h-1 w-12 ${
                    step > item ? 'bg-red-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Reset Password"}
              </h2>
            </div>

            {/* Step 1: Email Input */}
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600">Enter your email address to receive a verification code.</p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Verification Code'}
                </button>
              </motion.form>
            )}

            {/* Step 2: OTP Input */}
            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600">Enter the verification code sent to your email.</p>
                  <p className="text-sm text-gray-500 mt-2">{email}</p>
                </div>
                <div className="flex justify-center space-x-3">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[index] = e.target.value;
                        setOtp(newOtp.join(''));
                        if (e.target.value && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </button>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="font-medium text-red-600 hover:text-red-500 text-sm"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={isSubmitting}
                    className="font-medium text-red-600 hover:text-red-500 text-sm"
                  >
                    Resend OTP
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <ResetPassword 
                onSuccess={() => navigate('/login')}
                currentPassword={false}
              />
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;