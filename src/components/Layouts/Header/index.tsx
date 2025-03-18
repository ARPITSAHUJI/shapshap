"use client";
import { useLoadUserQuery } from "@/store/actions/api/apiSlice";
import { removeTokens } from "@/store/actions/helpers/authHelpers";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
   const { data } = useLoadUserQuery({
      refetchOnMountOrArgChange: true,
    });
  const LogoutHandler = async () => {
    await removeTokens();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    }
  };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-gray-900 drop-shadow-1 ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 text-white">
        <div className="">
          <div className="relative">
            <Link href={"/dashboard"} className="text-md font-bold  sm:text-2xl">
              Delivery Dashboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {data && data?.email &&
           <a
            href={`mailto:i${data?.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 rounded-md hidden sm:block"
          >
            {data?.email}
          </a>}
          <button
            onClick={LogoutHandler}
            className="px-4 py-2 bg-red-400 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
