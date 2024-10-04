import { useState } from "react";
import {
  FaShippingFast,
  FaRegChartBar,
  FaBook,
  FaShoppingBag,
  FaThLarge,
  FaFileInvoiceDollar,
  FaBookOpen,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../App.css";
import Icon from "./icon";
import { hambruger } from "./icons";
const Sidebar = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaThLarge />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/eCommerce",
      name: "ECommerce",
      icon: <FaShoppingBag />,
    },
    {
      path: "/academy",
      name: "Academy",
      icon: <FaBook />,
    },
    {
      path: "/logisticks",
      name: "Logisticks",
      icon: <FaShippingFast />,
    },
    {
      path: "/layouts",
      name: "Layouts",
      icon: <FaShippingFast />,
    },
    {
      path: "/front-pages",
      name: "Front Pages",
      icon: <FaBookOpen />,
    },
    {
      path: "/invoice",
      name: "Invoices",
      icon: <FaFileInvoiceDollar />,
    },
  ];
  return (
    <div>
      <div style={{ width: isOpen ? "220px" : "65px" }} className="sidebar">
        <div className="top_section gap-12">
          <p
            style={{ display: isOpen ? "block" : "none" }}
            className="text-xl font-bold text-[#1F485B]"
          >
            Admin
          </p>
          <div style={{ marginLeft: isOpen ? "45px" : "0px" }} className="bars">
            <Icon icon={hambruger} action={toggle} />
            {/* <FaBars onClick={toggle} /> */}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      <main
        style={{
          marginLeft: isOpen ? "200px" : "50px",
          padding: "10px 0px 0px ",
          transition: "margin-left 0.5s",
          width: `calc(100% - ${isOpen ? "200px" : "50px"})`,
          minHeight: `calc(100vh - 50px)`,
        }}
      >
        {children}
      </main>
     
    </div>
  );
};

export default Sidebar;
