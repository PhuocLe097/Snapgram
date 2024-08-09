import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
  const { mutateAsync: signOutAccount, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    user?.imageUrl || "/assets/icons/profile-placeholder.svg"
                  }
                  alt="@profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="w-full text-right pr-2">{user?.name}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to={`/profile/${user?.id}`}
                  className="w-full flex justify-between"
                >
                  Profile
                  <img
                    src="/assets/icons/people.svg"
                    alt="logout"
                    className="mr-2"
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOutAccount()}>
                <div className="w-full flex justify-between">
                  Log out
                  <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    className="mr-2"
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
            <img
              src={user?.imageUrl || "/assets/images/profile.svg"}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <Button
            variant={"ghost"}
            className="shad-buton_ghost"
            onClick={() => signOutAccount()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default TopBar;
