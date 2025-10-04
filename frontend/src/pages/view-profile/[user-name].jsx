import DashboardLayout from "@/layout/DashboardLayout";
import Image from "next/image";

const demoProfile = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  profilePicture: "/default.jpg",
  bio: "Full Stack Developer | AI Enthusiast | Tech Blogger",
  currentPost: "Senior Software Engineer at XYZ Corp",
  pastWork: [
    { company: "ABC Ltd", position: "Software Engineer", years: "2019 - 2021" },
    { company: "Tech Solutions", position: "Junior Developer", years: "2017 - 2019" }
  ],
  education: [
    { school: "MIT", degree: "BSc Computer Science", fieldOfStudy: "Software Engineering" },
    { school: "Harvard", degree: "MSc AI", fieldOfStudy: "Artificial Intelligence" }
  ],
  connections: 256,
  posts: 34
};

export default function Profile() {
  const { name, username, profilePicture, bio, currentPost, pastWork, education, connections, posts } = demoProfile;

  return (
    <DashboardLayout>
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-28 h-28">
          <Image 
            src={profilePicture} 
            alt="Profile Picture" 
            className="rounded-full border-4 border-blue-600 object-cover" 
            fill
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="text-gray-500">@{username}</p>
          <p className="italic text-gray-700 mt-2">{bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around bg-blue-100 p-4 rounded-lg mb-6">
        <div className="text-center">
          <p className="font-bold text-lg">{connections}</p>
          <p className="text-gray-600">Connections</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{posts}</p>
          <p className="text-gray-600">Posts</p>
        </div>
      </div>

      {/* Current Position */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-2">Current Position</h2>
        <p>{currentPost}</p>
      </section>

      {/* Past Work */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-2">Past Work</h2>
        <div className="space-y-3">
          {pastWork.map((work, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">{work.position} @ {work.company}</h3>
              <p className="text-gray-500">{work.years}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-1 mb-2">Education</h2>
        <div className="space-y-3">
          {education.map((edu, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">{edu.degree} - {edu.fieldOfStudy}</h3>
              <p className="text-gray-500">{edu.school}</p>
            </div>
          ))}
        </div>
      </section>
    </div></DashboardLayout>
  );
}
