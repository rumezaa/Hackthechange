import { useState } from "react";

const mentors = [
    {
      "name": "Jordan McKay",
      "image": { "src": "/images/jordan.png" },
      "specialization": "Plumbing",
      "details": "Experienced in all plumbing techniques with a focus on safety and quality.",
      "extradetails": "Jordan believes that plumbing can be an art when done with precision and care. He has a reputation for being patient with new learners and emphasizes the importance of safety at every step. His goal is to help others find pride in their work."
    },
    {
      "name": "Sarah Leone",
      "image": { "src": "/images/sarah.png" },
      "specialization": "Green Plumbing",
      "details": "Specializes in eco-friendly plumbing solutions for sustainable homes.",
      "extradetails": "Sarah is passionate about creating a positive environmental impact through plumbing. She brings warmth and energy to every project, inspiring her trainees to embrace sustainable practices. Her approach is highly collaborative and eco-conscious."
    },
    {
      "name": "Carlos Vega",
      "image": { "src": "/images/carlos.png" },
      "specialization": "Landscaping",
      "details": "Expert in sustainable landscaping and garden design with over 10 years of experience.",
      "extradetails": "Carlos sees landscaping as a way to bring harmony between people and nature. Known for his creativity, he encourages trainees to experiment and innovate. His teaching style is hands-on and deeply rooted in respect for the environment."
    },
    {
      "name": "Lila Thompson",
      "image": { "src": "/images/lila.png" },
      "specialization": "Residential Landscaping",
      "details": "Expert in residential landscaping, offering personalized guidance on garden design and plant care.",
      "extradetails": "Lila loves transforming spaces into beautiful, green sanctuaries. She has a calm and encouraging demeanor that helps trainees feel comfortable and motivated. Lila teaches with a focus on creativity, letting others find their own style."
    },
    {
      "name": "Tomas Nguyen",
      "image": { "src": "/images/tomas.png" },
      "specialization": "Turf Management",
      "details": "Skilled in turf care and garden setups with a focus on eco-friendly methods.",
      "extradetails": "Tomas is known for his patience and his dedication to quality. He believes that landscaping work can boost confidence and a sense of accomplishment. His trainees appreciate his friendly, supportive nature and attention to detail."
    },
    {
      "name": "Nadia Chen",
      "image": { "src": "/images/nadia.png" },
      "specialization": "Garden Design",
      "details": "Garden designer with a passion for sustainable and community-focused projects.",
      "extradetails": "Nadia is passionate about plants and creating peaceful, green spaces. Her teaching style is nurturing and attentive, making her trainees feel valued and capable. She encourages each apprentice to find joy in working with nature."
    },
    {
      "name": "Marcus Bell",
      "image": { "src": "/images/marcus.png" },
      "specialization": "Urban Gardening",
      "details": "Dedicated to creating vibrant urban spaces through sustainable garden setups.",
      "extradetails": "Marcus has a deep respect for the natural world and shares this with his trainees. He values creativity and encourages unique designs that reflect personal style. Marcus believes that gardening can be therapeutic and fulfilling."
    },
    {
      "name": "Alexandra Cruz",
      "image": { "src": "/images/alexandra.png" },
      "specialization": "HVAC Systems",
      "details": "Experienced in energy-efficient HVAC solutions with a passion for eco-friendly technology.",
      "extradetails": "Alexandra is detail-oriented and passionate about green technology. Her mentorship style is encouraging, aiming to build both technical skills and self-assurance. She is dedicated to her apprentices' personal and professional growth."
    },
    {
      "name": "John Singh",
      "image": { "src": "/images/john.png" },
      "specialization": "Clean Air HVAC",
      "details": "Specialist in clean air HVAC systems focused on community health.",
      "extradetails": "John is a strong advocate for air quality and health. He has a methodical approach to teaching, making sure everyone understands the importance of each task. His mentorship is known to instill both skills and responsibility in his trainees."
    },
    {
      "name": "Danielle Martin",
      "image": { "src": "/images/danielle.png" },
      "specialization": "Construction Safety",
      "details": "With over 12 years of construction experience, Danielle is dedicated to safety and quality.",
      "extradetails": "Danielle values precision and safety in construction. She is known for her supportive teaching style and her focus on building confidence. Her goal is to inspire a sense of pride and craftsmanship in her apprentices."
    }
  ]
  ;

export default function MentorsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % mentors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + mentors.length) % mentors.length);
  };

  const closeModal = () => setSelectedMentor(null);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl text-black font-bold mb-4">Meet Our Mentors</h1>

      {/* Slideshow/grid toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`mr-2 px-4 py-2 rounded ${viewMode === "grid" ? "bg-blue text-black" : "bg-gray-200 text-black"}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode("slideshow")}
          className={`px-4 py-2 rounded ${viewMode === "slideshow" ? "bg-blue text-black" : "bg-gray-200 text-black"}`}
        >
          Slideshow View
        </button>
      </div>

      {/* Render grid or slideshow based on view mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-black">
          {mentors.map((mentor, index) => (
            <MentorCard
              key={index}
              mentor={mentor}
              onClick={() => setSelectedMentor(mentor)}
            />
          ))}
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <button onClick={prevSlide} className="flex left-0 p-20 text-black">
            &lt;
          </button>
          <div className="flex scale-150">
            <MentorCard
              mentor={mentors[currentSlide]}
              onClick={() => setSelectedMentor(mentors[currentSlide])}
            />
          </div>
          <button onClick={nextSlide} className="flex right-0 p-20 text-black">
            &gt;
          </button>
        </div>
      )}

      {/* Modal for mentor details */}
      {selectedMentor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-black">&times;</button>
            <h2 className="text-2xl font-bold mb-2 text-blue">{selectedMentor.name}</h2>
            <h3 className="text-lg mb-4 text-black">{selectedMentor.specialization}</h3>
            <p className="text-md mb-3 text-black">{selectedMentor.extradetails}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// MentorCard component with hover effect
function MentorCard({ mentor, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-300 rounded shadow-lg bg-white p-4 transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <div
        className="h-40 bg-cover bg-center rounded"
        style={{ backgroundImage: `url(${mentor.image.src})` }}
      />
      <h2 className="text-lg font-bold mt-2 text-blue">{mentor.name}</h2>
      <h3 className="text-sm text-gray-600">{mentor.specialization}</h3>

      <div className="flex items-center mt-4 text-blue-500 cursor-pointer">
        <h2 className="text-black text-xs">Learn more about {mentor.name}</h2>
        <div
          className="ml-2 w-4 h-4 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/arrow-icon.svg')` }}
        />
      </div>
    </div>
  );
}
