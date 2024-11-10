import { useState } from "react";
import Nav from "@/components/nav"

const jobPostings = [
  {
    "id": 1,
    "title": "Plumbing Apprentice",
    "company": "Canyon Plumbing & Heating Ltd",
    "location": "Beltline, Calgary, AB",
    "description": "Assist with plumbing installations and repairs under guidance. Gain hands-on experience in residential projects.",
    "details": "This position is for those seeking to learn the basics of plumbing with semi-supervised work to ensure quality. Ideal for candidates interested in a long-term career in plumbing."
  },
  {
    "id": 2,
    "title": "Landscaping Assistant",
    "company": "GreenScape Landscaping",
    "location": "Bridgeland, Calgary, AB",
    "description": "Work on sustainable landscaping projects with a focus on eco-friendly practices. Learn plant care and outdoor design.",
    "details": "The role includes basic landscaping tasks with a focus on sustainable practices. Ideal for those with a passion for outdoor work and environmental conservation."
  },
  {
    "id": 3,
    "title": "Electrician Apprentice",
    "company": "Volt Pro Electrical",
    "location": "Inglewood, Calgary, AB",
    "description": "Assist in electrical installations and repairs with experienced professionals. Hands-on experience in residential and commercial projects.",
    "details": "Ideal for beginners looking to understand electrical basics. Supervised training will ensure safety and skill development for those interested in a career as an electrician."
  },
  {
    "id": 4,
    "title": "Construction Helper",
    "company": "BuildRight Construction",
    "location": "Kensington, Calgary, AB",
    "description": "Support various construction projects, from residential to commercial. Work alongside experienced builders to gain foundational construction skills.",
    "details": "This role focuses on basic construction skills, safety protocols, and teamwork, providing essential experience for anyone pursuing a construction career."
  },
  {
    "id": 5,
    "title": "HVAC Technician Assistant",
    "company": "Cool Breeze HVAC Services",
    "location": "Forest Lawn, Calgary, AB",
    "description": "Learn HVAC installation and maintenance basics. Work with seasoned technicians to gain experience in heating and cooling systems.",
    "details": "A great opportunity to understand the fundamentals of HVAC systems, including maintenance and repair. Perfect for those considering HVAC as a career path."
  },
  {
    "id": 6,
    "title": "Painter Assistant",
    "company": "Prime Coat Painters",
    "location": "Mission, Calgary, AB",
    "description": "Assist in interior and exterior painting projects with a focus on technique and quality. Hands-on experience in both residential and commercial settings.",
    "details": "Get trained in various painting techniques and gain real-world experience. Ideal for those interested in pursuing professional painting."
  },
  {
    "id": 7,
    "title": "Carpentry Apprentice",
    "company": "WoodWorks Carpentry",
    "location": "Eau Claire, Calgary, AB",
    "description": "Learn carpentry basics, from framing to finishing. Work alongside master carpenters to gain practical skills in woodworking.",
    "details": "This role provides hands-on experience in carpentry with a focus on craftsmanship and attention to detail. Suitable for those considering a long-term career in carpentry."
  },
  {
    "id": 8,
    "title": "Gardening Assistant",
    "company": "Green Thumb Gardens",
    "location": "Altadore, Calgary, AB",
    "description": "Assist with garden maintenance and plant care. Work with horticulture experts to learn about plant health and sustainable gardening.",
    "details": "Gain practical experience in gardening, from plant selection to soil care. Ideal for individuals interested in landscape gardening or horticulture."
  },
  {
    "id": 9,
    "title": "Flooring Installer Assistant",
    "company": "Floor Masters Ltd",
    "location": "Sunnyside, Calgary, AB",
    "description": "Assist with flooring installations, including hardwood, laminate, and tile. Work under supervision to develop technical skills.",
    "details": "Learn installation techniques and gain experience in flooring projects. Great for those looking to develop skills in a growing industry."
  },
  {
    "id": 10,
    "title": "Welder Assistant",
    "company": "SteelCraft Welding Co",
    "location": "Ramsay, Calgary, AB",
    "description": "Support welding projects in a safe, supervised environment. Work on both small and large-scale projects to gain practical welding experience.",
    "details": "Perfect for those interested in learning welding techniques, safety, and craftsmanship. Ideal for individuals considering a career in metalwork."
  },
  {
    "id": 11,
    "title": "HVAC Install Assistant",
    "company": "Climate Comfort Solutions",
    "location": "Hillhurst, Calgary, AB",
    "description": "Work with an experienced HVAC team on installations and troubleshooting. Gain hands-on experience in heating and cooling systems.",
    "details": "This role focuses on HVAC installation basics, providing essential experience for those interested in HVAC and climate control systems."
  },
  {
    "id": 12,
    "title": "Masonry Apprentice",
    "company": "StoneWorks Masonry",
    "location": "Downtown West End, Calgary, AB",
    "description": "Learn foundational masonry skills, including bricklaying and stonework. Work under a master mason to develop skills in construction.",
    "details": "Ideal for beginners interested in masonry. The role focuses on building and construction techniques for residential and commercial projects."
  }
]
;

export default function JobPostings() {
  const [hoverJobId, setHoverJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const openModal = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJob(null);
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <Nav />
      <main className="w-full max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold text-blue mb-6">Available Job Postings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              onMouseEnter={() => setHoverJobId(job.id)}
              onMouseLeave={() => setHoverJobId(null)}
              onClick={() => openModal(job)}
              className={`border border-gray-300 rounded-lg p-5 shadow-md cursor-pointer ${
                hoverJobId === job.id ? "bg-gray-100" : "bg-white"
              }`}
              style={{
                transform: hoverJobId === job.id ? "scale(1.10)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              <h3 className="text-lg font-semibold text-blue mb-2">{job.title}</h3>
              <h4 className="text-md text-gray-700">{job.company}</h4>
              <p className="text-sm text-gray-500 mb-4">{job.location}</p>
              {hoverJobId === job.id ? (
                <p className="text-sm text-gray-700">{job.details}</p>
              ) : (
                <p className="text-sm text-gray-500">{job.description}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && currentJob && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-20">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative `}
          >
            <button
              onClick={closeModal}
              style={{ position: "absolute", top: "10px", right: "10px", color: "gray" }}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-blue mb-4">{currentJob.title}</h3>
            <h4 className="text-md text-gray-700 mb-2">{currentJob.company}</h4>
            <p className="text-sm text-gray-500 mb-4">{currentJob.location}</p>
            <p className="text-sm text-gray-700 mb-6">{currentJob.details}</p>
            <button
              onClick={() => {
                // We place the action button here
              }}
              className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Take Action
            </button>
          </div>
        </div>
      )}
    </div>
  );
}