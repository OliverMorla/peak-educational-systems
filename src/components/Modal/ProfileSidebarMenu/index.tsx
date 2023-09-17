"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlassPlus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Session } from "next-auth";
import Chat from "../Chat";

interface Props {
  session: Session;
}

const ProfileSidebarMenu: React.FunctionComponent<Props> = ({
  session,
}): JSX.Element | JSX.Element[] => {

  
  const [openChatBox, setOpenChatBox] = useState<boolean>(false);
  console.log(openChatBox)
  const [currentFriends, setCurrentFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);
  const [blockedFriends, setBlockedFriends] = useState<Friend[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const getFriends = async () => {
    const res = await fetch(
      //@ts-ignore
      `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/${session?.user?.id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setCurrentFriends(data?.currentFriends);
    setBlockedFriends(data?.blockedFriends);
    setPendingFriends(data?.pendingFriends);
  };
  useEffect(() => {
    getFriends();
    //@ts-ignore
  }, [session?.user?.id]);
  return (
    <aside className="profile-sidebar-menu" ref={sidebarRef}>
      {openChatBox && <Chat />}
      <section
        className="profile-sidebar-menu__drag-arrow-wrapper"
        onClick={() => sidebarRef.current?.classList.toggle("open")}
      >
        <button className="profile-sidebar-menu__drag-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
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
          <h4> Current Friends </h4>

          {currentFriends?.length === 0
            ? "Be the first to add a friend!"
            : currentFriends?.map((friend) => (
                <>
                  <li className="profile-sidebar-menu__friends-item">
                    <a href="#" className="profile-sidebar-menu__friends-link">
                      <FontAwesomeIcon icon={faUser} />
                      <span className="profile-sidebar-menu__friends-name">
                        {friend.friend_name}&nbsp;
                        <button className="profile-sidebar-menu__friends-options" onClick={() => setOpenChatBox(!openChatBox)}>
                          ...
                        </button>
                      </span>
                    </a>
                  </li>
                </>
              ))}
        </ul>
        <ul className="profile-sidebar-menu__friends-list">
          <h4> Pending Request </h4>

          {pendingFriends?.length === 0
            ? "You have no pending request!"
            : pendingFriends?.map((friend) => (
                <>
                  <li className="profile-sidebar-menu__friends-item">
                    <a href="#" className="profile-sidebar-menu__friends-link">
                      <FontAwesomeIcon icon={faUser} />
                      <span className="profile-sidebar-menu__friends-name">
                        {friend.friend_name}&nbsp;
                        <button className="profile-sidebar-menu__friends-options">
                          ...
                        </button>
                      </span>
                    </a>
                  </li>
                </>
              ))}
        </ul>
        <ul className="profile-sidebar-menu__friends-list">
          <h4> Blocked Users </h4>

          {blockedFriends?.length === 0
            ? "No blocked users!"
            : blockedFriends?.map((friend) => (
                <>
                  <li className="profile-sidebar-menu__friends-item">
                    <a href="#" className="profile-sidebar-menu__friends-link">
                      <FontAwesomeIcon icon={faUser} />
                      <span className="profile-sidebar-menu__friends-name">
                        {friend.friend_name}&nbsp;
                        <button className="profile-sidebar-menu__friends-options">
                          ...
                        </button>
                      </span>
                    </a>
                  </li>
                </>
              ))}
        </ul>
      </section>
    </aside>
  );
};

export default ProfileSidebarMenu;
