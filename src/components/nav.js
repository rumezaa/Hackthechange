import {useRouter }from "next/router";

export default function Nav() {
  const route = useRouter();
  return (
    <div className="bg-blue w-screen h-16 flex flex-row text-white justify-center items-center gap-x-10 ">
      <h2>mentors</h2>

      <h2>job posting</h2>

      <h2>resources</h2>
    </div>
  );
}
