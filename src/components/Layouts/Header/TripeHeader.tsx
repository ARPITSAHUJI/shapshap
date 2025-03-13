"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TripeHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-gray-900 drop-shadow-1 px-4 ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 text-white">
        <div className="">
          <div className="relative">
            <Link href={"/dashboard"} className="text-md font-bold  sm:text-2xl">
              Trip Details 
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
        
          <Link 
            href={"/dashboard"}
            className="px-6 py-2 bg-gray-800 rounded-md flex items-center justify-center"
          >
           <ArrowLeft className="h-4" /> Back
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TripeHeader;
