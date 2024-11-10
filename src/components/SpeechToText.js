"use client";
import { useState, useRef, useEffect, useContext } from "react";
import json from "./static/keywords.json";
import { UserContext, UserProvider } from "@/firebase/UserProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/router";

const SpeechToText = ({ sendWordCount }) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState({});
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);
  const [user] = useContext(UserContext);

  const data = {
    drugAddiction: "drug addiction",
    alcoholAbuse: "alcohol abuse",
    domesticAbuse: "domestic abuse",
    mentalHealth: "mental health",
    economicInstability: "economic instability",
    anger: "anger",
    optimism: "optimism",
    pessimism: "pessimism",
    mechanical_skills: "mechanical skills",
    construction_skills: "construction skills",
    technical_skills: "technical skills",
    craftsmanship: "craftsmanship",
    physical_labor: "physical labor",
    automotive_skills: "automotive skills",
    electrical_skills: "electrical skills",
    plumbing_skills: "plumbing skills",
    engineering_skills: "engineering skills",
    agricultural_skills: "agricultural skills",
  };

  function handleRecord() {
    if (!recording) {
      setWordCount({})
      console.log("Recording.");
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = async function (event) {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
          setText((text) => text + transcript);
          console.log(transcript);
      };

      recognitionRef.current.start();
      setRecording(true);
    } else {
      console.log("Stopped recording.");
      recognitionRef.current.stop();
      setRecording(false);

      const words = text.split(" ");
      let indicators = {};

      for (const key in json) {
        indicators[key] = words.filter((word) =>
          json[key].includes(word)
        ).length;
      }

      const filteredData = Object.fromEntries(
        Object.entries(indicators).filter(
          ([key, value]) => typeof value === "number" && value !== 0
        )
      );
      setWordCount(filteredData);
    }
  }

  useEffect(() => {
    sendWordCount(wordCount);
  }, [wordCount, sendWordCount]);

  async function handleUpdate() {
    // Update only the preferences field

    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      keywords: wordCount,
      signInFirstTime: false,
    });

    console.log("updated keywords");
    router.push("/");
  }

  console.log(wordCount)

  return (
    <div className="w-screen h-screen flex flex-col  items-center px-20 pt-20">
      <div className="text-center mb-64">
        <h3 className="text-4xl">
          We want to hear more from you.{" "}
          <span className="font-bold text-blue">Tell us your story.</span>
        </h3>
        <h2 className="italic">
          tip: Speak slow, tell us your prior life and work experiences and
          share your skills
        </h2>
      </div>
      <div
        className="bg-blue rounded-md p-3 m-3 text-white font-semibold cursor-pointer mt-10"
        onClick={handleRecord}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </div>

      {Object.keys(wordCount).length > 0 && (
        <div className=" flex flex-col items-center justify-center text-center mt-5">
          From your recording, we understand that you have experience with:
          <div className="grid grid-cols-5">
            {Object.entries(wordCount).map(([key, value]) => (
              <>
                <h2 className="font-bold text-blue">{data[key]}</h2>
              </>
            ))}
          </div>
          <h2 className=" mt-20 text-lg font-bold">
            Not sound like your story? Feel free to{" "}
            <span className="font-bold text-red-400">Re-record.</span>
          </h2>
          <div onClick={handleUpdate} className="cursor-pointer bg-blue mt-10 rounded-full text-white font-semibold p-4 px-10 cursor pointer transition transform hover:scale-110 duration-300 ease-in-out">
            <h2>Continue</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
