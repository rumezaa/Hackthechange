import { useState } from "react";

const jobPostings = [
  {
    id: 1,
    title: "Plumbing Apprentice",
    company: "Canyon Plumbing & Heating Ltd",
    location: "Calgary, AB",
    description:
      "Assist with plumbing installations and repairs under guidance. Gain hands-on experience in residential projects.",
    details:
      "This position is for those seeking to learn the basics of plumbing with semi-supervised work to ensure quality. Ideal for candidates interested in a long-term career in plumbing.",
  },
  {
    id: 2,
    title: "Landscaping Assistant",
    company: "GreenScape Landscaping",
    location: "Calgary, AB",
    description:
      "Work on sustainable landscaping projects with a focus on eco-friendly practices. Learn plant care and outdoor design.",
    details:
      "The role includes basic landscaping tasks with a focus on sustainable practices. Ideal for those with a passion for outdoor work and environmental conservation.",
  },
  // Place for more job postings
];

export default function JobPostings() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-blurple mb-8">Available Job Postings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {jobPostings.map((job) => (
          <div
            key={job.id}
            onMouseEnter={() => setHoveredId(job.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative overflow-hidden border border-gray-300 rounded-lg p-4 transition-transform duration-300 ${
              hoveredId === job.id ? "scale-105 shadow-lg" : "scale-100"
            } bg-white`}
          >
            <h2 className="text-lg font-semibold text-blurple mb-1">{job.title}</h2>
            <h3 className="text-sm text-gray-600">{job.company}</h3>
            <p className="text-xs text-gray-500">{job.location}</p>
            {hoveredId === job.id ? (
              <p className="mt-3 text-sm text-gray-700">{job.details}</p>
            ) : (
              <p className="mt-3 text-sm text-gray-500 line-clamp-3">{job.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
