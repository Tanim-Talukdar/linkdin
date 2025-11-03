// pages/edit.jsx
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DashboardLayout from "@/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAndProfile,
  updateUser,
  updateProfileData,
  uploadProfilePicture,
} from "@/config/redux/action/authAction";

export default function EditProfilePage() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // ----------------- LOCAL STATES -----------------
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  const [currentPost, setCurrentPost] = useState("");
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [preview, setPreview] = useState("");

  // ----------------- FETCH PROFILE -----------------
  useEffect(() => {
    dispatch(getUserAndProfile({ token: localStorage.getItem("token") }));
  }, [dispatch]);

  useEffect(() => {
    if (authState.myProfile) {
      setForm({
        name: authState.myProfile.userId?.name || "",
        username: authState.myProfile.userId?.username || "",
        email: authState.myProfile.userId?.email || "",
        bio: authState.myProfile.bio || "",
      });

      setCurrentPost(authState.myProfile.currentPost || "");

      setEducation(
        authState.myProfile.education?.length
          ? authState.myProfile.education
          : [{ school: "", degree: "", fieldOfStudy: "" }]
      );

      setWork(
        authState.myProfile.pastWork?.length
          ? authState.myProfile.pastWork
          : [{ company: "", position: "", years: "" }]
      );

      setPreview(authState.myProfile.userId?.profilePicture?.path || "");
    }
  }, [authState.myProfile]);

  // ----------------- HANDLERS -----------------
  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEduChange = (index, e) => {
    const newEdu = education.map((edu, idx) =>
      idx === index ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEducation(newEdu);
  };

  const addEducation = () =>
    setEducation([...education, { school: "", degree: "", fieldOfStudy: "" }]);
  const removeEducation = (index) =>
    setEducation(education.filter((_, idx) => idx !== index));

  const handleWorkChange = (index, e) => {
    const newWork = work.map((w, idx) =>
      idx === index ? { ...w, [e.target.name]: e.target.value } : w
    );
    setWork(newWork);
  };

  const addWork = () =>
    setWork([...work, { company: "", position: "", years: "" }]);
  const removeWork = (index) => setWork(work.filter((_, idx) => idx !== index));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  // ----------------- REDUX ACTIONS -----------------
  const handleUploadPic = async () => {
    if (!file) return toast.error("Please select a file first!");
    try {
      setIsLoading(true);
      const CryptoToken = localStorage.getItem("token");
      await dispatch(uploadProfilePicture({ CryptoToken, file })).unwrap();
      toast.success("✅ Profile picture updated!");
      setFile(null);
      setIsLoading(false);
    } catch (err) {
      toast.error(err || "Failed to upload picture");
      setIsLoading(false);
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      setIsLoading(true);
      const CryptoToken = localStorage.getItem("token");
      const { name, username, email } = form;

      await dispatch(updateUser({ CryptoToken, name, username, email })).unwrap();
      toast.success("✅ User info updated!");
      setIsLoading(false);
    } catch (err) {
      toast.error(err || "Failed to update user info");
      setIsLoading(false);
    }
  };

  const handleSaveProfileInfo = async () => {
    try {
      setIsLoading(true);
      const CryptoToken = localStorage.getItem("token");

      await dispatch(
        updateProfileData({ CryptoToken, bio: form.bio, education, pastWork: work, currentPost })
      ).unwrap();

      toast.success("✅ Bio, education, work & current post updated!");
      setIsLoading(false);
    } catch (err) {
      toast.error(err || "Failed to update profile info");
      setIsLoading(false);
    }
  };

  // ----------------- RENDER HELPERS -----------------
  const renderInputWithLabel = (label, name, value, onChange, type = "text") => (
    <div className="flex flex-col">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <input
        key={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-300 outline-none transition"
      />
    </div>
  );

  const renderSection = (title, list, handleChange, addItem, removeItem, fields) => (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-teal-700">{title}</h2>
        <button
          onClick={addItem}
          className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md"
        >
          + Add
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-white/70 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Entry #{idx + 1}</h3>
              {list.length > 1 && (
                <button
                  onClick={() => removeItem(idx)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              {fields.map((field) =>
                renderInputWithLabel(
                  field.charAt(0).toUpperCase() + field.slice(1),
                  field,
                  item[field],
                  (e) => handleChange(idx, e)
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ----------------- JSX -----------------
  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
          <h1 className="text-3xl font-semibold text-teal-700 mb-8 text-center">
            ✨ Edit Profile
          </h1>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-teal-200 shadow-md">
              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Photo
                </div>
              )}
            </div>
            <label className="mt-4 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow text-sm">
              Upload Photo
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              onClick={handleUploadPic}
              disabled={!file || isLoading}
              className="mt-2 px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white text-sm disabled:opacity-50"
            >
              {isLoading ? "Uploading..." : "Save Picture"}
            </button>
          </div>

          {/* ---------------- USER INFO ---------------- */}
          <div className="mb-6 border-b pb-6">
            <h2 className="text-xl font-semibold text-teal-700 mb-4">User Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInputWithLabel("Name", "name", form.name, handleFormChange)}
              {renderInputWithLabel("Username", "username", form.username, handleFormChange)}
              {renderInputWithLabel("Email", "email", form.email, handleFormChange, "email")}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveUserInfo}
                disabled={isLoading}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition shadow disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save User Info"}
              </button>
            </div>
          </div>

          {/* ---------------- PROFILE INFO ---------------- */}
          <div className="mb-6 border-b pb-6">
            <h2 className="text-xl font-semibold text-teal-700 mb-4">Profile Info</h2>

            {/* Bio */}
            <div className="mt-2">
              <label className="text-gray-600 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-300 outline-none transition resize-none"
              />
            </div>

            {/* Current Post */}
            <div className="mt-4">
              {renderInputWithLabel(
                "Current Post",
                "currentPost",
                currentPost,
                (e) => setCurrentPost(e.target.value)
              )}
            </div>

            {/* Education Section */}
            {renderSection(
              "🎓 Education",
              education,
              handleEduChange,
              addEducation,
              removeEducation,
              ["school", "degree", "fieldOfStudy"]
            )}

            {/* Work Section */}
            {renderSection(
              "💼 Work Experience",
              work,
              handleWorkChange,
              addWork,
              removeWork,
              ["company", "position", "years"]
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveProfileInfo}
                disabled={isLoading}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition shadow disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Profile Info"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
