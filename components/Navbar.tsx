import Link from "next/link";
import Image from "next/image";
import { NavbarLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

export default async function Navbar() {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Flexibble"
            width={115}
            height={43}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavbarLinks.map((link) => (
            <li key={link.key}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button type="button" title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}
