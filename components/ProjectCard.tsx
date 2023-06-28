"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  id: string;
  image: string;
  name: String;
  avatarUrl: string;
  userId: string;
};

export default function ProjectCard({
  title,
  id,
  image,
  name,
  avatarUrl,
  userId,
}: Props) {

  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "K")
    );
  }, []);

  return (
    <div className="flexCenter flex-col group rounded-2xl drop-shadow-card mb-12">
      <Link
        href={`/project/${id}`}
        className="flexCenter w-full relative h-full"
      >
        <Image
          src={image}
          alt="Project Image"
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="hidden profile_card-title group-hover:flex">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              alt="Profile Image"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm">{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image
              src="/heart.svg"
              height={12}
              width={12}
              alt="heart"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-sm">{randomLikes}</p>
          </div>
        </div>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image
              src="/eye.svg"
              height={12}
              width={12}
              style={{ height: "auto", width: "auto" }}
              alt="heart"
            />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
