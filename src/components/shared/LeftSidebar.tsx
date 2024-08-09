import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSideBar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const { mutateAsync: signOutAccount, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={140}
            height={360}
          />
        </Link>

        <Link to={`/profile/${user?.id}`} className="flex gap-3 items-center">
          <Avatar className="w-11 h-11">
            <AvatarImage
              src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="@profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="text-light-3 text-[12px]">{user?.email}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-gradient-to-l from-purple-500 to-pink-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => signOutAccount()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <strong>Log out</strong>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
