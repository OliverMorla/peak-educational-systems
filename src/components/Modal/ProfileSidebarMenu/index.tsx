import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {
  faArrowLeft,
  faMagnifyingGlassPlus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const ProfileSidebarMenu: React.FunctionComponent = ():
  | JSX.Element
  | JSX.Element[] => {
  return (
    <aside className="profile-sidebar-menu">
      <section className="profile-sidebar-menu__drag-arrow-wrapper">
        <button className="profile-sidebar-menu__drag-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </section>
      <section className="profile-sidebar-menu__friends">
        <h2 className="profile-sidebar-menu__friends-title">Friends</h2>
        <section className="profile-sidebar-menu__friends-btns">
          <button className="profile-sidebar-menu__add-friend-btn">
            <FontAwesomeIcon icon={faUserPlus} />
            Add Friend
          </button>
          <button className="profile-sidebar-menu__find-friend-btn">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            Find Friend
          </button>
        </section>
        <ul className="profile-sidebar-menu__friends-list">
          <h4> Friends list </h4>
          <li className="profile-sidebar-menu__friends-item">
            <a
              href="#"
              className="profile-sidebar-menu__friends-link"
            >
              <img
                src=""
                alt=""
                className="profile-sidebar-menu__friends-img"
              />
              <span className="profile-sidebar-menu__friends-name">
                John Doe <button className="profile-sidebar-menu__friends-options">...</button>
              </span>
            </a>
          </li>
          <li className="profile-sidebar-menu__friends-item">
            <a
              href="#"
              className="profile-sidebar-menu__friends-link"
            >
              <img
                src=""
                alt=""
                className="profile-sidebar-menu__friends-img"
              />
              <span className="profile-sidebar-menu__friends-name">
                John Doe <button className="profile-sidebar-menu__friends-options">...</button>
              </span>
            </a>
          </li>
          <li className="profile-sidebar-menu__friends-item">
            <a
              href="#"
              className="profile-sidebar-menu__friends-link"
            >
              <img
                src=""
                alt=""
                className="profile-sidebar-menu__friends-img"
              />
              <span className="profile-sidebar-menu__friends-name">
                John Doe <button className="profile-sidebar-menu__friends-options">...</button>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default ProfileSidebarMenu;
