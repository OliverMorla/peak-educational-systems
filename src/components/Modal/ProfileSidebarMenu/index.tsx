"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMagnifyingGlassPlus,
  faStopCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faMessage } from "@fortawesome/free-regular-svg-icons";
import { Session } from "next-auth";
import Chat from "../Chat";
import "./style.scss";

interface Props {
  session: Session;
}

const ProfileSidebarMenu: React.FunctionComponent<Props> = ({
  session,
}): JSX.Element | JSX.Element[] => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [openChatBoxFor, setOpenChatBoxFor] = useState<number>(0);
  const [openChatBox, setOpenChatBox] = useState<boolean>(false);
  const [currentFriends, setCurrentFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);
  const [blockedFriends, setBlockedFriends] = useState<Friend[]>([]);

  const [findFriends, setFindFriends] = useState<User[]>([]);
  const [findFriendsModal, setFindFriendsModal] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const searchFriend = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(search),
        }
      );
      const data = await res.json();
      setFindFriends(data?.users);
      if (data.ok) {
        setFindFriendsModal(true);
      }
      throw new Error(data.message);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const addFriend = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
      status: "pending",
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const removeFriend = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
    };
    console.log(friendData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const acceptFriend = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
      status: "accepted",
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const blockFriend = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
      status: "blocked",
    };
    console.log(friendData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/block`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const unblockFriend = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
      status: "accepted",
    };
    console.log(friendData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/unblock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

  const declineRequest = async (friend_id: number) => {
    const friendData = {
      // @ts-ignore
      user_id: session?.user?.id,
      friend_id: friend_id,
    };
    console.log(friendData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/friends/decline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(friendData),
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occured");
    }
  };

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

  const handleOpenChatBoxFor = (friend_id: number) => {
    console.log(friend_id);
    setOpenChatBoxFor(friend_id);
    setOpenChatBox(!openChatBox);
  };

  return (
    <aside className="profile-sidebar" ref={sidebarRef}>
      <section
        className="profile-sidebar__drag"
        onClick={() => sidebarRef.current?.classList.toggle("open")}
      >
        <button className="profile-sidebar__drag-btn">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </section>

      <section className="profile-sidebar__friends">
        <h2 className="profile-sidebar__title">Friends</h2>
        <section className="profile-sidebar__search">
          <input
            type="text"
            name="search-friend-input"
            className="profile-sidebar__search-input"
            placeholder="Search for friends"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.currentTarget.value)
            }
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                searchFriend();
              }
            }}
          />
          <button
            className="profile-sidebar__search-btn"
            onClick={searchFriend}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            Find Friend
          </button>
        </section>

        <ul className="profile-sidebar__list">
          <h4> Current Friends </h4>
          {currentFriends?.length === 0
            ? "Be the first to add a friend!"
            : currentFriends?.map((friend, index) => {
                // @ts-ignore
                if (friend.user_id === session?.user?.id) {
                  return (
                    <li className="profile-sidebar__item" key={index}>
                      <span className="profile-sidebar__link">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="profile-sidebar__photo"
                        />
                        <span className="profile-sidebar__name">
                          <Link href={`/auth/profile/${friend.friend_id}`}>
                            {friend.friend_name}&nbsp;
                          </Link>
                          <button
                            className="profile-sidebar__options-chat"
                            onClick={() =>
                              handleOpenChatBoxFor(friend.friend_id)
                            }
                          >
                            <FontAwesomeIcon icon={faMessage} />
                          </button>
                          <button
                            className="profile-sidebar__options-decline"
                            onClick={() => removeFriend(friend.friend_id)}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                          <button
                            className="profile-sidebar__options-block"
                            onClick={() => setOpenChatBox(!openChatBox)}
                          >
                            <FontAwesomeIcon icon={faStopCircle} />
                          </button>
                        </span>
                      </span>
                    </li>
                  );
                } else {
                  return (
                    <li className="profile-sidebar__item" key={index}>
                      <span className="profile-sidebar__link">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="profile-sidebar__photo"
                        />
                        <span className="profile-sidebar__name">
                          <Link href={`/auth/profile/${friend.user_id}`}>
                            {friend.user_name}&nbsp;
                          </Link>
                          <button
                            className="profile-sidebar__options-chat"
                            onClick={() => handleOpenChatBoxFor(friend.user_id)}
                          >
                            <FontAwesomeIcon icon={faMessage} />
                          </button>
                          <button
                            className="profile-sidebar__options-decline"
                            onClick={() => removeFriend(friend.user_id)}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                          <button
                            className="profile-sidebar__options-block"
                            onClick={() => blockFriend(friend.user_id)}
                          >
                            <FontAwesomeIcon icon={faStopCircle} />
                          </button>
                        </span>
                      </span>
                    </li>
                  );
                }
              })}
          {openChatBox && <Chat friend_id={openChatBoxFor} />}
        </ul>

        <ul className="profile-sidebar__list">
          <h4> Pending Request </h4>
          {pendingFriends?.length === 0
            ? "You have no pending request!"
            : pendingFriends?.map((friend, index) => {
                //@ts-ignore
                if (friend.user_id === session?.user?.id) {
                  return (
                    <li className="profile-sidebar__item" key={index}>
                      <a href="#" className="profile-sidebar__link">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="profile-sidebar__photo"
                        />
                        <span className="profile-sidebar__name">
                          {friend.friend_name}&nbsp;
                          <button
                            className="profile-sidebar__options-decline"
                            onClick={() => declineRequest(friend.friend_id)}
                          >
                            X
                          </button>
                        </span>
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li className="profile-sidebar__item" key={index}>
                      <a href="#" className="profile-sidebar__link">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="profile-sidebar__photo"
                        />
                        <span className="profile-sidebar__name">
                          {friend.user_name}&nbsp;
                          <button
                            className="profile-sidebar__options-decline"
                            onClick={() => declineRequest(friend.user_id)}
                          >
                            X
                          </button>
                          <button
                            className="profile-sidebar__options-add"
                            onClick={() => acceptFriend(friend.user_id)}
                          >
                            ✔
                          </button>
                        </span>
                      </a>
                    </li>
                  );
                }
              })}
        </ul>

        <ul className="profile-sidebar__list">
          <h4> Blocked Users </h4>
          {blockedFriends?.length === 0
            ? "No blocked users!"
            : blockedFriends?.map((friend) => (
                <li className="profile-sidebar__item" key={friend.friend_id}>
                  <a href="#" className="profile-sidebar__link">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="profile-sidebar__photo"
                    />
                    <span className="profile-sidebar__name">
                      {friend.user_name}&nbsp;
                      <button
                        className="profile-sidebar__options-decline"
                        onClick={() => unblockFriend(friend.user_id)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </span>
                  </a>
                </li>
              ))}
        </ul>
      </section>

      {findFriendsModal && (
        <section className="profile-sidebar__find-friends">
          <h2>List of Users</h2>
          <ul className="find-friends__modal-list">
            {findFriends?.map((friend) => (
              <li key={friend.id} className="find-friends__item">
                {friend.first_name} ({friend.email})
                <button
                  className="find-friends__add-btn"
                  onClick={() => addFriend(friend.id)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
};

export default ProfileSidebarMenu;
