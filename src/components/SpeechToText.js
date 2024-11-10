"use client";
import { useState, useRef, useEffect } from "react";
import json from "./static/keywords.json";

const SpeechToText = ({ sendWordCount }) => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState({});
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  function handleRecord() {
    if (!recording) {
      console.log("Recording.");
      const SpeechRecognition =
        window.SpeechRegonition || window.webkitSpeechRecognition;
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

      console.log(indicators);
      setWordCount(indicators);
    }
  }

  useEffect(() => {
    sendWordCount(wordCount);
  }, [wordCount]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h3>We want to hear more from you. Tell us your story.</h3>
      <div
        className="bg-blue rounded-md p-3 m-3 text-white font-semibold cursor-pointer"
        onClick={handleRecord}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </div>
    </div>
  );
};

export default SpeechToText;
