import Nav from "./nav";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
      <div className="flex flex-col">
        <Nav />
        {children}
      </div>

  );
};

export default Layout;
