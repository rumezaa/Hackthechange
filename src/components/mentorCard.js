import Arrow from "/public/arrow-icon.svg";

export default function MentorCard({ name, image, specialization }) {
  return (
    <div className="rounded shadow-lg bg-white p-4">
      <div
        className="h-40 bg-cover bg-center rounded-t"
        style={{ backgroundImage: `url(${image.src})` }}
      />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <h3 className="text-sm text-gray-600">{specialization}</h3>

      <div className="flex items-center mt-4 text-blue-500 cursor-pointer">
        <h2>Learn more about {name}</h2>
        <div
          className="ml-2 w-4 h-4 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${Arrow.src})` }}
        />
      </div>
    </div>
  );
}
