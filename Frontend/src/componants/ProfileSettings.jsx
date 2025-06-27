import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import img1 from "../assets/img1.svg";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, 
  FiCalendar, 
  FiBook, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiShield, 
  FiCheck,
  FiSave,
  FiSettings,
  FiChevronRight,
  FiStar,
  FiEdit3
} from "react-icons/fi";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("");
  const [academicDegree, setAcademicDegree] = useState("");
  const [degreeStatus, setDegreeStatus] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
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
        const { firstName, lastName, dob, college, gender, academicDegree, degreeStatus } = res.data.user;
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setDob(dob ? dob.substring(0, 10) : "");
        setCollege(college || "");
        setGender(gender || "");
        setAcademicDegree(academicDegree || "");
        setDegreeStatus(degreeStatus || "");
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
      await api.put("/auth/me", { firstName, lastName, dob, college, gender, academicDegree, degreeStatus });
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }} 
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white/3 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden border-b border-gray-800">
        <div className="absolute  inset-0 bg-gradient-to-br from-gray-900/50 to-black/80" />
        <img 
          src={img1} 
          alt="Profile Background" 
          className="w-full h-full object-cover opacity-10" 
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto relative overflow-visible flex flex-col items-center justify-center h-full">
            
            
            <div className="relative z-10 opacity-100 translate-y-0 transition-all duration-1000">
              <div className="flex flex-col items-center justify-center text-center space-y-6 p-8">
                
                
                
                {/* Enhanced Header Text with Animated Gradient */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-pulse bg-[length:200%_200%]">
                      Profile Settings
                    </span>
                  </h1>
                  
                  {/* Subtitle with Icon */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{animationDuration: '8s'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm sm:text-base md:text-lg font-medium">Manage your account information</p>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    
                   
                  </div>
                </div>
                
             
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden"
        >
          {/* Enhanced Navigation Tabs */}
          <div className="flex border-b border-gray-700/50 bg-gray-800/30">
            <TabButton 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
              icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Profile Information"
              count="6"
            />
            <TabButton 
              active={activeTab === "security"} 
              onClick={() => setActiveTab("security")}
              icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Security & Privacy"
              count="3"
            />
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 sm:space-y-8 md:space-y-10"
                >
                  {/* Section Header */}
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">Personal Information</h2>
                      <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Keep your profile information up to date</p>
                    </div>
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <FiEdit3 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                    </motion.div>
                  </div>

                  <form className="space-y-6 sm:space-y-8">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <EnhancedInputField 
                        label="First Name" 
                        value={firstName} 
                        onChange={setFirstName} 
                        icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
                        placeholder="Enter your first name"
                      />
                      <EnhancedInputField 
                        label="Last Name" 
                        value={lastName} 
                        onChange={setLastName} 
                        icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
                        placeholder="Enter your last name"
                      />
                    </div>

                    {/* Date of Birth */}
                    <EnhancedInputField 
                      label="Date of Birth" 
                      value={dob} 
                      onChange={setDob} 
                      type="date" 
                      icon={<FiCalendar className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />

                    {/* College */}
                    <EnhancedInputField 
                      label="College/University" 
                      value={college} 
                      onChange={setCollege} 
                      icon={<FiBook className="w-4 h-4 sm:w-5 sm:h-5" />}
                      placeholder="Enter your institution name"
                    />

                    {/* Academic Information Card */}
                    <motion.div 
                      className="bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700/50"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-500/20 self-start">
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold">Academic Information</h3>
                          <p className="text-gray-400 text-sm sm:text-base">Your educational background</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-6">
                        <EnhancedInputField 
                          label="Academic Degree" 
                          value={academicDegree} 
                          onChange={setAcademicDegree} 
                          placeholder="e.g., Bachelor's in Computer Science"
                        />
                        
                        <div className="space-y-3 sm:space-y-4">
                          <label className="block text-sm font-medium text-gray-300">
                            Degree Status
                          </label>
                          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8">
                            <EnhancedCheckbox 
                              label="Currently Pursuing"
                              checked={degreeStatus === 'pursuing'}
                              onChange={() => setDegreeStatus('pursuing')}
                              color="yellow"
                            />
                            <EnhancedCheckbox 
                              label="Completed"
                              checked={degreeStatus === 'complete'}
                              onChange={() => setDegreeStatus('complete')}
                              color="green"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Gender Selection */}
                    <EnhancedSelectField 
                      label="Gender"
                      value={gender}
                      onChange={setGender}
                      options={[
                        { value: "", label: "Select Gender" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                      ]}
                      icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
                    />

                    {/* Save Button */}
                    <div className="pt-4 sm:pt-6 md:pt-8">
                      <motion.button
                        type="button"
                        onClick={handleUpdate}
                        disabled={loading}
                        className="group relative w-full bg-white text-black py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg overflow-hidden"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center">
                          {loading ? (
                            <>
                              <motion.div
                                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-400 border-t-black rounded-full mr-2 sm:mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span className="text-sm sm:text-base">Updating Profile...</span>
                            </>
                          ) : (
                            <>
                              <FiSave className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                              <span className="text-sm sm:text-base">Save Changes</span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 sm:space-y-8 md:space-y-10"
                >
                  {/* Section Header */}
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">Security & Privacy</h2>
                      <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Manage your password and account security</p>
                    </div>
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                    </motion.div>
                  </div>

                  {/* Security Guidelines */}
                  <motion.div 
                    className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-amber-500/20"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-amber-500/30 flex-shrink-0 self-start">
                        <FiShield className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Security Best Practices</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <SecurityTip text="Use at least 8 characters with mixed case" />
                          <SecurityTip text="Include numbers and special characters" />
                          <SecurityTip text="Avoid common passwords and personal info" />
                          <SecurityTip text="Never share your password with others" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Password Form */}
                  <form className="space-y-6 sm:space-y-8">
                    <EnhancedPasswordField
                      label="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(val) => setPasswordData(prev => ({ ...prev, currentPassword: val }))}
                      show={showPasswords.currentPassword}
                      toggleVisibility={() => togglePasswordVisibility("currentPassword")}
                      placeholder="Enter your current password"
                    />
                    
                    <EnhancedPasswordField
                      label="New Password"
                      value={passwordData.newPassword}
                      onChange={(val) => setPasswordData(prev => ({ ...prev, newPassword: val }))}
                      show={showPasswords.newPassword}
                      toggleVisibility={() => togglePasswordVisibility("newPassword")}
                      placeholder="Enter your new password"
                    />
                    
                    <EnhancedPasswordField
                      label="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(val) => setPasswordData(prev => ({ ...prev, confirmPassword: val }))}
                      show={showPasswords.confirmPassword}
                      toggleVisibility={() => togglePasswordVisibility("confirmPassword")}
                      placeholder="Confirm your new password"
                    />

                    {/* Update Password Button */}
                    <div className="pt-4 sm:pt-6 md:pt-8">
                      <motion.button
                        type="button"
                        onClick={handlePasswordChange}
                        disabled={passwordLoading}
                        className="group relative w-full bg-red-600 text-white py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg overflow-hidden"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center">
                          {passwordLoading ? (
                            <>
                              <motion.div
                                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-red-300 border-t-white rounded-full mr-2 sm:mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span className="text-sm sm:text-base">Updating Password...</span>
                            </>
                          ) : (
                            <>
                              <FiLock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                              <span className="text-sm sm:text-base">Update Password</span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <SecurityCard 
            icon={<FiCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Profile Verified"
            description="Your profile information is verified and secure"
            status="Active"
            color="green"
          />
          <SecurityCard 
            icon={<FiLock className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Password Protection"
            description="Strong encryption keeps your account safe"
            status="Protected"
            color="blue"
          />
          <SecurityCard 
            icon={<FiShield className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Data Encryption"
            description="All your data is encrypted and stored securely"
            status="Secured"
            color="purple"
          />
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Helper Components
const TabButton = ({ active, onClick, icon, label, count }) => (
  <motion.button
    onClick={onClick}
    className={`relative flex items-center justify-between px-3 sm:px-6 md:px-8 py-4 sm:py-6 font-medium transition-all duration-300 flex-1 z-10 ${
      active 
        ? "text-white" 
        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
    }`}
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
    style={{ overflow: 'visible' }}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-blue-400 shadow-lg z-0"
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ zIndex: 0 }}
      />
    )}
    <div className="relative flex items-center space-x-2 sm:space-x-3 z-10">
      <div className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
        active 
          ? "bg-white/20 text-white shadow-md" 
          : "bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50"
      }`}>
        {icon}
      </div>
      <span className="text-xs sm:text-base md:text-lg font-semibold">{label}</span>
    </div>
    <div className={`relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all duration-300 z-10 ${
      active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
    }`}>
      {count}
    </div>
    {/* Hover effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-2xl sm:rounded-t-3xl z-0" />
  </motion.button>
);

const EnhancedInputField = ({ label, value, onChange, type = "text", icon, placeholder }) => (
  <motion.div 
    className="space-y-2 sm:space-y-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <label className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-blue-300 group-hover:text-white transition-colors opacity-90">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-white focus:bg-gray-800 focus:outline-none transition-all duration-300 hover:border-gray-500 text-sm sm:text-base"
        placeholder={placeholder}
      />
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  </motion.div>
);

const EnhancedPasswordField = ({ label, value, onChange, show, toggleVisibility, placeholder }) => (
  <motion.div
    className="space-y-2 sm:space-y-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <label className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-blue-300 group-hover:text-white transition-colors opacity-90">
        <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:border-white focus:bg-gray-800 focus:outline-none transition-all duration-300 hover:border-gray-500 text-sm sm:text-base"
        placeholder={placeholder}
      />
      <motion.button 
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 sm:right-4 top-3 sm:top-4 text-blue-300 hover:text-white transition-colors opacity-90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {show ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />}
      </motion.button>
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  </motion.div>
);

const EnhancedSelectField = ({ label, value, onChange, options, icon }) => (
  <motion.div 
    className="space-y-2 sm:space-y-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <label className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-blue-300 group-hover:text-white transition-colors opacity-90 z-10">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg sm:rounded-xl text-white focus:border-white focus:bg-gray-800 focus:outline-none transition-all duration-300 hover:border-gray-500 appearance-none text-sm sm:text-base"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
            {option.label}
          </option>
        ))}
      </select>
      <FiChevronRight className="absolute right-3 sm:right-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-blue-300 group-hover:text-white opacity-90 rotate-90 pointer-events-none" />
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  </motion.div>
);

const EnhancedCheckbox = ({ label, checked, onChange, color }) => {
  const colors = {
    yellow: 'border-yellow-500 bg-yellow-500',
    green: 'border-green-500 bg-green-500'
  };

  return (
    <motion.label 
      className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 transition-all duration-300 ${
          checked 
            ? colors[color]
            : 'border-gray-600 group-hover:border-gray-500'
        }`}>
          {checked && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center h-full"
              >
                <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            )}
          </div>
        </div>
        <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm sm:text-base">
          {label}
        </span>
      </motion.label>
    );
  };
  
  const SecurityTip = ({ text }) => (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full flex-shrink-0" />
      <span className="text-gray-300 text-xs sm:text-sm">{text}</span>
    </div>
  );
  
  const SecurityCard = ({ icon, title, description, status, color }) => {
    const colors = {
      green: 'bg-green-500/10 border-green-500/20 text-green-400',
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    };
  
    const statusColors = {
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
  
    return (
      <motion.div
        className="bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 p-4 sm:p-6 hover:border-gray-600/50 transition-all duration-300"
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${colors[color]} border`}>
            {icon}
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${statusColors[color]}`}>
            {status}
          </div>
        </div>
        <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
      </motion.div>
    );
  };
  
  export default ProfileSettings;