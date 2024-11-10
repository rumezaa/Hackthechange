import { useContext, useState } from "react";
import Nav from "@/components/nav";
import jobPostings from "../components/static/jobPostings.json";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { JobsContext } from "@/firebase/JobProvider";
import { UserContext } from "@/firebase/UserProvider";

export default function JobPostings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [posts] = useContext(JobsContext);
  const [user] = useContext(UserContext);
  const [showRecommendation, setShowRecommendation] = useState(true);

  const openModal = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJob(null);
  };

  //this is for adding stuff to firebase
  // async function addPostings() {
  //   const postsRef = collection(db, "job-posts");

  //   console.log(jobPostings)

  //   // Iterate over jobPostings array and add each job to the "job-posts" collection
  //   for (const  job of jobPostings) {
  //     try {

  //       console.log(job)
  //       // Assuming `job` contains the data for each posting
  //       const postRef = await addDoc(postsRef, job);

  //       // Update the document with its own ID
  //       await updateDoc(postRef, { id: postRef.id });
  //       console.log(`Document successfully written with ID: ${postRef.id}`);
  //     } catch (error) {
  //       console.error("Error adding document: ", error);
  //     }
  //   }
  // }

  async function handleUpdate() {
    // Update only the preferences field

    if (!user.job_postings.includes(currentJob.id)) {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        job_postings: !!user.job_postings
          ? arrayUnion(currentJob.id)
          : currentJob.id,
      });

      console.log("Added interest");
      closeModal();
    }
  }

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <main className="w-full max-w-6xl px-6 py-10">
        <div className="w-full flex flex-row justify-between text-black">
          <h2 className="text-2xl font-bold text-blue mb-6">
            Available Job Postings
          </h2>

          <div
            onClick={() => setShowRecommendation(!showRecommendation)}
            className={`${
              showRecommendation
                ? "bg-green-600 text-white"
                : "bg-gray-400 text-black"
            } rounded-md h-8 px-2 cursor-pointer text-center flex justify-center items-center`}
          >
            <h2>
              {showRecommendation
                ? "Showing recommendations"
                : "Click to show recommendations"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map(
            (job) =>
              (!showRecommendation ||
                (showRecommendation &&
                  Object.keys(user.keywords).some((key) =>
                    job.noKeywords.includes(key)
                  ))) && (
                <div
                  key={job.id}
                  onClick={() => openModal(job)}
                  className={`border border-gray-300 rounded-lg p-5 shadow-md cursor-pointer bg-white text-gray-500 transition transform hover:scale-110 hover:text-gray-700 hover:bg-gray-100 duration-300 ease-in-out`}
                >
                  <h3 className="text-lg font-semibold text-blue mb-2">
                    {job.title}
                  </h3>
                  <h4 className="text-md text-gray-700">{job.company}</h4>
                  <p className="text-sm mb-4">{job.location}</p>
                  <p className="text-sm ">{job.details}</p>
                </div>
              )
          )}
        </div>
      </main>

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
              onClick={handleUpdate}
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
