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
    <aside className="profile__sidebar-menu">
      <section className="profile__sidebar-menu-drag-arrow-wrapper">
        <button className="profile__sidebar-menu__drag-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </section>
      <section className="profile__sidebar-menu__friends">
        <h2 className="profile__sidebar-menu__friends__title">Friends</h2>
        <section className="profile__side-menu__friends__btns">
          <button className="profile__side-menu__friends__btns__add-friend">
            <FontAwesomeIcon icon={faUserPlus} />
            Add Friend
          </button>
          <button className="profile__side-menu__friends__btns__find-friend">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            Find Friend
          </button>
        </section>
        <ul className="profile__sidebar-menu__friends__list">
          <h4> Friends list </h4>
          <li className="profile__sidebar-menu__friends__list__item">
            <a
              href="#"
              className="profile__sidebar-menu__friends__list__item__link"
            >
              <img
                src=""
                alt=""
                className="profile__sidebar-menu__friends__list__item__link__img"
              />
              <span className="profile__sidebar-menu__friends__list__item__link__name">
                John Doe <button>...</button>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default ProfileSidebarMenu;
