
import HomeSvg from "../../svg/HomeSvg";
import Settings from "../../svg/Settings";
import SupportSvg from "../../svg/SupportSvg";
import styles from "./VerticalMenu.module.scss";
import CalendarSvg from "../../svg/CalendarSvg";
import InboxSvg from "../../svg/InboxSvg";
import InvoicesSvg from "../../svg/InvoicesSvg";
import ProfileSvg from "../../svg/ProfileSvg";
import ProductsSvg from "../../svg/ProductsSvg";
import DashboardSvg from "../../svg/DashboardSvg";
import ChatRoomSvg from "../../svg/ChatRoomSvg";

const menuItems = [
  {
    icon: <HomeSvg />,
    text: "Home",
  },
  {
    icon: <DashboardSvg />,
    text: "Dashboard",
  },
  {
    icon: <InboxSvg />,
    text: "Inbox",
  },
  {
    icon: <ProductsSvg />,
    text: "Products",
  },
  {
    icon: <InvoicesSvg />,
    text: "Invoices",
  },

  {
    icon: <ProfileSvg />,
    text: "Customers",
  },

  {
    icon: <ChatRoomSvg />,
    text: "Chat Room",
  },

  {
    icon: <CalendarSvg />,
    text: "Calendar",
    status: "active",
  },

  {
    icon: <SupportSvg />,
    text: "Help Center",
  },

  {
    icon: <Settings />,
    text: "Settings",
  },
];

const VerticalMenu = () => {
  return (
    <div className={styles.container}>
      <a href="#" className={styles.logo}>Impekable</a>
      <div className={styles.menu}>
        {menuItems.map((item) => (
          <div
            className={`${styles.menuItem} ${item.status ? styles.active : ""}`}
            key={item.text}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalMenu;
