import Image from "next/image";
import localFont from "next/font/local";
import SpeechToText from "./components/SpeechToText.js";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [wordCount, setWordCount] = useState(null);

  const handleWordCount = (data) => {
    setWordCount(data);
  };

  return (
    <div>
      <SpeechToText sendWordCount={handleWordCount} />
    </div>
  );
}
