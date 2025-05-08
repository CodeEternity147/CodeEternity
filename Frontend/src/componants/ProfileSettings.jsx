import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import img1 from "../assets/img1.svg";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        const { firstName, lastName, dob, college, gender } = res.data.user;
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setDob(dob ? dob.substring(0, 10) : "");
        setCollege(college || "");
        setGender(gender || "");
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load profile." });
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put("/auth/me", { firstName, lastName, dob, college, gender });
      setMessage({ type: "success", text: "✅ Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "❌ Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage({ type: "", text: "" });

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      return setPasswordMessage({ type: "error", text: "❌ New passwords do not match!" });
    }

    if (newPassword.length < 6) {
      return setPasswordMessage({
        type: "error",
        text: "❌ Password must be at least 6 characters!",
      });
    }

    setPasswordLoading(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setPasswordMessage({ type: "success", text: "✅ Password updated successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error.response?.data?.message || "❌ Failed to update password.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const messageClass = (type) =>
    type === "success" ? "text-green-600" : "text-red-600";

  return (
    <>
      <img src={img1} alt="Top Background" className="w-full h-auto object-cover" />

      <div className="min-h-screen bg-black text-white p-4 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 drop-shadow-lg">
          Update Your Profile
        </h1>

        <div className="bg-white text-gray-900 rounded-4xl shadow-2xl p-6 sm:p-10 max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Profile Settings</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Keep your information up-to-date for better service.
          </p>

          {message.text && (
            <div className={`mb-6 text-center font-medium ${messageClass(message.type)}`}>
              {message.text}
            </div>
          )}

          <form autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="First Name" value={firstName} onChange={setFirstName} autoComplete="off" />
              <InputField label="Last Name" value={lastName} onChange={setLastName} autoComplete="off" />
              <InputField label="Date of Birth" value={dob} onChange={setDob} type="date" span={2} autoComplete="off" />
              <InputField label="College Name" value={college} onChange={setCollege} span={2} autoComplete="off" />
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:shadow-md transition duration-200"
                  autoComplete="off"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>

            <div className="mt-16 border-t pt-8">
              <h3 className="text-xl font-bold text-center mb-6">Change Password</h3>

              {passwordMessage.text && (
                <div className={`mb-6 text-center font-medium ${messageClass(passwordMessage.type)}`}>
                  {passwordMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <PasswordField
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(val) =>
                    setPasswordData((prev) => ({ ...prev, currentPassword: val }))
                  }
                />
                <PasswordField
                  label="New Password"
                  value={passwordData.newPassword}
                  onChange={(val) =>
                    setPasswordData((prev) => ({ ...prev, newPassword: val }))
                  }
                />
                <PasswordField
                  label="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(val) =>
                    setPasswordData((prev) => ({ ...prev, confirmPassword: val }))
                  }
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Change Password"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const InputField = ({ label, value, onChange, type = "text", span = 1, autoComplete = "off" }) => (
  <div className={span === 2 ? "sm:col-span-2" : ""}>
    <label className="block text-sm text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:shadow-md transition duration-200"
      autoComplete={autoComplete}
    />
  </div>
);

const PasswordField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-2">{label}</label>
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:shadow-md transition duration-200"
    />
  </div>
);

export default ProfileSettings;
