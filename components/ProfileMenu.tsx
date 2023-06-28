"use client";

import { SessionInterface } from "@/common.types";
import { Transition, Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, Fragment } from "react";

export default function ProfileMenu({
  session,
}: {
  session: SessionInterface;
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    // <div className="flexCenter flex-col relative">
    //   <div>
    //     <div className="flexCenter" onMouseEnter={() => setOpenModal(true)}>
    //       {session?.user?.image && (
    //         <Image
    //           className="rounded-full hover:cursor-pointer"
    //           alt={session.user.name}
    //           src={session.user.image}
    //           width={40}
    //           height={40}
    //         />
    //       )}
    //     </div>
    //     <Transition
    //       show={openModal}
    //       as={Fragment}
    //       enter="transition ease-out duration-200"
    //       enterFrom="transform opacity-0 scale-95"
    //       enterTo="transform opacity-100 scale-100"
    //       leave="transition ease-in duration-75"
    //       leaveFrom="transform opacity-100 scale-100"
    //       leaveTo="transform opacity-0 scale-95"
    //     >
    //       <div onMouseLeave={() => setOpenModal(false)}>
    //         {openModal && (
    //           <div className="static flexStart profile_menu-items">
    //             <div className="flex flex-col items-center gap-y-4">
    //               {session?.user?.image && (
    //                 <Image
    //                   src={session?.user?.image}
    //                   className="rounded-full"
    //                   width={80}
    //                   height={80}
    //                   alt="profile Image"
    //                 />
    //               )}
    //               <p className="font-semibold">{session?.user?.name}</p>
    //             </div>
    //             <ul className="flex flex-col pt-10 items-start w-full">
    //               <li>
    //                 <Link
    //                   href={`/profile/${session?.user?.id}`}
    //                   className="text-sm"
    //                 >
    //                   Work Preferences
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href={`/profile/${session?.user?.id}`}
    //                   className="text-sm"
    //                 >
    //                   Settings
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href={`/profile/${session?.user?.id}`}
    //                   className="text-sm"
    //                 >
    //                   Profile
    //                 </Link>
    //               </li>
    //             </ul>
    //             <div className="border-t mt-5 pt-5 w-full flex border-nav-border justify-center">
    //               <button
    //                 type="button"
    //                 className="text-sm"
    //                 onClick={() => signOut()}
    //               >
    //                 Sign Out
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </Transition>
    //   </div>
    // </div>
    <div className="flexCenter z-10 flex-col relative">
      <Menu as="div">
        <Menu.Button
          className="flexCenter"
          onMouseEnter={() => setOpenModal(true)}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{session?.user?.name}</p>
            </div>

            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Work Preferences
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Profile
                </Link>
              </Menu.Item>
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
