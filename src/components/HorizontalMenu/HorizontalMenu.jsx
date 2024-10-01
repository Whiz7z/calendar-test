import DropdownArrowSvg from "../../svg/DropdownArrowSvg";
import SearchSvg from "../../svg/SearchSvg";
import styles from "./HorizontalMenu.module.scss";
import userImage from "../../assets/images/Avatar@2x.png";
import SupportSvg from "../../svg/SupportSvg";
import MessagesSvg from "../../svg/MessagesSvg";
import NotificationSvg from "../../svg/NotificationSvg";
const HorizontalMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <SearchSvg />
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search transactions, invoices or help"
        />
      </div>

      <div className={styles.profileBar}>
        <div className={styles.actions}>
          <div className={styles.action}>
            <SupportSvg />
          </div>
          <div className={styles.action}>
            <MessagesSvg />
          </div>
          <div className={styles.action}>
            <NotificationSvg />
          </div>
        </div>

        <div className={styles.user}>
          <div className={styles.dropdown}>
            <p>John Doe</p>
            <span>
              <DropdownArrowSvg />
            </span>
          </div>
          <div className={styles.avatar}>
            <img src={userImage} alt="user" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalMenu;
