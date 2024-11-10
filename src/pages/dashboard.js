import Nav from "@/components/nav";
import MentorCard from "@/components/mentorCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/firebase/UserProvider";
import { JobsContext } from "@/firebase/JobProvider";
import ResourceRecommendation from "@/components/ResourceRecommendation";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [posts] = useContext(JobsContext);
  const [user] = useContext(UserContext);

  const openModal = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJob(null);
  };
  const [interestedPosts, setInterestedPosts] = useState([]);

  useEffect(() => {
    // Filter posts to add only those that the user has liked and not already in the interestedPosts list
    const updatedPosts = posts?.filter((post) => {
      return (
        user?.job_postings.includes(post?.id) &&
        !interestedPosts.some((existingPost) => existingPost.id === post.id)
      );
    });

    // If there are new posts, add them to the interestedPosts state
    if (updatedPosts?.length > 0) {
      setInterestedPosts((prev) => {
        // Merge previous posts with new ones, then filter out duplicates by id
        const allPosts = [...prev, ...updatedPosts];

        // Remove duplicates by 'id' using `filter()`
        return allPosts?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
      });
    }
  }, [user, posts, interestedPosts]);

  return (
    <div className="flex flex-col gap-y-10 bg-white w-screen h-screen text-black py-10 px-10">
      <h2 className="text-3xl font-bold text-blue">
        Hello, {user?.full_name}{" "}
      </h2>

      <div>
        <h2 className="font-semibold text-lg mt-3">
          Your Recent Activity, Keep Going!
        </h2>

        <div>
          <h2 className="uppercase font-thin text-sm mb-2">
            interests you&apos;'ve taken action with
          </h2>
          <div className="overflow-x-auto w-full">
            <div className="flex flex-row gap-6 min-w-max">
              {interestedPosts?.length > 0 && interestedPosts?.map((job) => (
                <div
                  key={job.id} // Make sure to add a key if job.id is available
                  onClick={() => openModal(job)}
                  className={`border border-gray-300 h-[15rem] w-[18rem] rounded-lg p-5 shadow-md cursor-pointer bg-white text-gray-500 transition transform hover:scale-110 hover:text-gray-700 hover:bg-gray-100 duration-300 ease-in-out`}
                >
                  <h3 className="text-lg font-semibold text-blue mb-2">
                    {job.title}
                  </h3>
                  <h4 className="text-md text-gray-700">{job.company}</h4>
                  <p className="text-sm mb-4">{job.location}</p>

                  <p className="text-sm ">{job.details}</p>
                </div>
              ))}
              {interestedPosts?.length == 0 && <h2 className="text-gray-500 italic">Nothing to see here</h2>}
            </div>
          </div>
        </div>
      </div>

      <ResourceRecommendation userKeywords={user && user?.keywords} />

      {isModalOpen && currentJob && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-20">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative `}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "gray",
              }}
            >
              x
            </button>
            <h3 className="text-2xl font-semibold text-blue mb-4">
              {currentJob.title}
            </h3>
            <h4 className="text-md text-gray-700 mb-2">{currentJob.company}</h4>
            <p className="text-sm text-gray-500 mb-4">{currentJob.location}</p>
            <p className="text-sm text-gray-700 mb-6">{currentJob.details}</p>
            <button
              className={`${
                user.job_postings.includes(currentJob.id)
                  ? "bg-green-500"
                  : "bg-blue"
              } text-white px-4 py-2 rounded hover:bg-blue-700 transition`}
            >
              {(user.job_postings.includes(currentJob.id) &&
                "Listing Adding") ||
                "Take Action"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
