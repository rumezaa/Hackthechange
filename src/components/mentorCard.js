import Arrow from "/public/arrow-icon.svg";

export default function MentorCard({ name, image, specialization }) {
  return (
    <div className="rounded shadow-lg bg-white">
      <div style={{ backgroundImage: `url(${image.src})` }} />
      <h2>{name}</h2>
      <h2>{specialization}</h2>

      <div>
        <h2>learn more about {name}</h2>{" "}
        <div
          className="bg-no-repeat bg-cover w-4 h-4"
          style={{ backgroundImage: `url(${Arrow.src})` }}
        />
      </div>
    </div>
  );
}
