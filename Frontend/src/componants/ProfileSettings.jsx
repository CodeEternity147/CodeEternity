import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import img1 from "../assets/img1.svg";
import { toast } from 'react-toastify';
import { motion } from "framer-motion"; // Add framer-motion for animations
import { FiUser, FiCalendar, FiBook, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Import icons

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // For tab switching
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const toastId = toast.loading("Loading profile...");
        const res = await api.get("/auth/me");
        const { firstName, lastName, dob, college, gender } = res.data.user;
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setDob(dob ? dob.substring(0, 10) : "");
        setCollege(college || "");
        setGender(gender || "");
        toast.update(toastId, {
          render: "Profile loaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        toast.error("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const toastId = toast.loading("Updating profile...");
      await api.put("/auth/me", { firstName, lastName, dob, college, gender });
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage({ type: "", text: "" });

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setPasswordLoading(true);
    try {
      const toastId = toast.loading("Updating password...");
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.update(toastId, {
        render: "Password updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Image with Gradient Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img src={img1} alt="Profile Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 flex items-end">
          <div className="container mx-auto px-6 pb-10">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold drop-shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Profile
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage your personal information and settings
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 -mt-10">
        <motion.div 
          className="bg-gray-800 backdrop-blur-md bg-opacity-80 rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <TabButton 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
              icon={<FiUser className="mr-2" />}
              label="Profile Information"
            />
            <TabButton 
              active={activeTab === "security"} 
              onClick={() => setActiveTab("security")}
              icon={<FiLock className="mr-2" />}
              label="Security Settings"
            />
          </div>

          <div className="p-6 sm:p-10">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                </div>

                <form autoComplete="off" className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <AnimatedInputField 
                      label="First Name" 
                      value={firstName} 
                      onChange={setFirstName} 
                      icon={<FiUser />}
                      delay={0.1}
                    />
                    <AnimatedInputField 
                      label="Last Name" 
                      value={lastName} 
                      onChange={setLastName} 
                      icon={<FiUser />}
                      delay={0.2}
                    />
                    <AnimatedInputField 
                      label="Date of Birth" 
                      value={dob} 
                      onChange={setDob} 
                      type="date" 
                      icon={<FiCalendar />}
                      delay={0.3}
                      span={2}
                    />
                    <AnimatedInputField 
                      label="College Name" 
                      value={college} 
                      onChange={setCollege} 
                      icon={<FiBook />}
                      delay={0.4}
                      span={2}
                    />
                    <motion.div 
                      className="sm:col-span-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="block text-sm text-gray-300 mb-2">Gender</label>
                      <div className="relative">
                        <select
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          className="w-full p-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200"
                          autoComplete="off"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute left-3 top-3 text-gray-400">
                          <FiUser />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </span>
                      ) : "Update Profile"}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Password Settings</h2>
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FiLock className="text-white" />
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <span className="text-yellow-400">⚠️ Security tip:</span> Make your password strong by using a combination of letters, numbers, and special characters. Never reuse passwords across different sites.
                  </p>
                </div>

                <form autoComplete="off" className="space-y-6">
                  <AnimatedPasswordField
                    label="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(val) => setPasswordData((prev) => ({ ...prev, currentPassword: val }))}
                    show={showPasswords.currentPassword}
                    toggleVisibility={() => togglePasswordVisibility("currentPassword")}
                    delay={0.1}
                  />
                  <AnimatedPasswordField
                    label="New Password"
                    value={passwordData.newPassword}
                    onChange={(val) => setPasswordData((prev) => ({ ...prev, newPassword: val }))}
                    show={showPasswords.newPassword}
                    toggleVisibility={() => togglePasswordVisibility("newPassword")}
                    delay={0.2}
                  />
                  <AnimatedPasswordField
                    label="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(val) => setPasswordData((prev) => ({ ...prev, confirmPassword: val }))}
                    show={showPasswords.confirmPassword}
                    toggleVisibility={() => togglePasswordVisibility("confirmPassword")}
                    delay={0.3}
                  />

                  <motion.div 
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <button
                      onClick={handlePasswordChange}
                      disabled={passwordLoading}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {passwordLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </span>
                      ) : "Change Password"}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Additional Card - Profile Tips */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl shadow-xl p-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">Profile Tips</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-start">
              <span className="mr-2 text-indigo-300">•</span>
              <span>Keeping your personal information updated helps us provide you with better service.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-indigo-300">•</span>
              <span>Your privacy is important to us. We never share your information with third parties.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-indigo-300">•</span>
              <span>Remember to change your password regularly for enhanced security.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

// Helper Components
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center py-4 px-6 focus:outline-none transition-all duration-200 ${
      active 
        ? "text-white border-b-2 border-indigo-500 font-medium" 
        : "text-gray-400 hover:text-gray-200"
    }`}
  >
    {icon}
    {label}
  </button>
);

const AnimatedInputField = ({ label, value, onChange, type = "text", icon, span = 1, delay = 0 }) => (
  <motion.div 
    className={span === 2 ? "sm:col-span-2" : ""}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full p-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200"
        autoComplete="off"
      />
      <div className="absolute left-3 top-3 text-gray-400">
        {icon}
      </div>
    </div>
  </motion.div>
);

const AnimatedPasswordField = ({ label, value, onChange, show, toggleVisibility, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="w-full p-3 pl-10 pr-10 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200"
      />
      <div className="absolute left-3 top-3 text-gray-400">
        <FiLock />
      </div>
      <button 
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors duration-200"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </motion.div>
);

export default ProfileSettings;