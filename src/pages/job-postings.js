import { useState } from "react";
import Nav from "@/components/nav"

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
  {
    "id": 3,
    "title": "Electrician Apprentice",
    "company": "Volt Pro Electrical",
    "location": "Vancouver, BC",
    "description": "Assist in electrical installations and repairs with experienced professionals. Hands-on experience in residential and commercial projects.",
    "details": "Ideal for beginners looking to understand electrical basics. Supervised training will ensure safety and skill development for those interested in a career as an electrician."
  },
  {
    "id": 4,
    "title": "Construction Helper",
    "company": "BuildRight Construction",
    "location": "Toronto, ON",
    "description": "Support various construction projects, from residential to commercial. Work alongside experienced builders to gain foundational construction skills.",
    "details": "This role focuses on basic construction skills, safety protocols, and teamwork, providing essential experience for anyone pursuing a construction career."
  },
  {
    "id": 5,
    "title": "HVAC Technician Assistant",
    "company": "Cool Breeze HVAC Services",
    "location": "Ottawa, ON",
    "description": "Learn HVAC installation and maintenance basics. Work with seasoned technicians to gain experience in heating and cooling systems.",
    "details": "A great opportunity to understand the fundamentals of HVAC systems, including maintenance and repair. Perfect for those considering HVAC as a career path."
  },
  {
    "id": 6,
    "title": "Painter Assistant",
    "company": "Prime Coat Painters",
    "location": "Calgary, AB",
    "description": "Assist in interior and exterior painting projects with a focus on technique and quality. Hands-on experience in both residential and commercial settings.",
    "details": "Get trained in various painting techniques and gain real-world experience. Ideal for those interested in pursuing professional painting."
  },
  {
    "id": 7,
    "title": "Carpentry Apprentice",
    "company": "WoodWorks Carpentry",
    "location": "Edmonton, AB",
    "description": "Learn carpentry basics, from framing to finishing. Work alongside master carpenters to gain practical skills in woodworking.",
    "details": "This role provides hands-on experience in carpentry with a focus on craftsmanship and attention to detail. Suitable for those considering a long-term career in carpentry."
  },
  {
    "id": 8,
    "title": "Gardening Assistant",
    "company": "Green Thumb Gardens",
    "location": "Victoria, BC",
    "description": "Assist with garden maintenance and plant care. Work with horticulture experts to learn about plant health and sustainable gardening.",
    "details": "Gain practical experience in gardening, from plant selection to soil care. Ideal for individuals interested in landscape gardening or horticulture."
  },
  {
    "id": 9,
    "title": "Flooring Installer Assistant",
    "company": "Floor Masters Ltd",
    "location": "Montreal, QC",
    "description": "Assist with flooring installations, including hardwood, laminate, and tile. Work under supervision to develop technical skills.",
    "details": "Learn installation techniques and gain experience in flooring projects. Great for those looking to develop skills in a growing industry."
  },
  {
    "id": 10,
    "title": "Welder Assistant",
    "company": "SteelCraft Welding Co",
    "location": "Hamilton, ON",
    "description": "Support welding projects in a safe, supervised environment. Work on both small and large-scale projects to gain practical welding experience.",
    "details": "Perfect for those interested in learning welding techniques, safety, and craftsmanship. Ideal for individuals considering a career in metalwork."
  },
  {
    "id": 11,
    "title": "HVAC Install Assistant",
    "company": "Climate Comfort Solutions",
    "location": "Calgary, AB",
    "description": "Work with an experienced HVAC team on installations and troubleshooting. Gain hands-on experience in heating and cooling systems.",
    "details": "This role focuses on HVAC installation basics, providing essential experience for those interested in HVAC and climate control systems."
  },
  {
    "id": 12,
    "title": "Masonry Apprentice",
    "company": "StoneWorks Masonry",
    "location": "Winnipeg, MB",
    "description": "Learn foundational masonry skills, including bricklaying and stonework. Work under a master mason to develop skills in construction.",
    "details": "Ideal for beginners interested in masonry. The role focuses on building and construction techniques for residential and commercial projects."
  }
];

export default function JobPostings() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <Nav />
      <main className="w-full max-w-6xl p-10">
        <h2 className="text-3xl font-bold text-blue mb-6">Available Job Postings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              onMouseEnter={() => setHoveredId(job.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative overflow-hidden border border-gray-300 rounded-lg p-6 shadow-md transform transition-transform duration-300 ${
                hoveredId === job.id ? "scale-110 bg-gray-50" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-blue mb-2">{job.title}</h3>
              <h4 className="text-md text-gray-700">{job.company}</h4>
              <p className="text-sm text-gray-500 mb-4">{job.location}</p>
              {hoveredId === job.id ? (
                <p className="text-sm text-gray-700">{job.details}</p>
              ) : (
                <p className="text-sm text-gray-500 line-clamp-3">{job.description}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
