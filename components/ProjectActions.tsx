"use client";
import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectActions({ projectId }: { projectId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    try {
      const deletedId = await deleteProject(projectId, token);
      if (deletedId) {
        setIsDeleting(false);
        router.push("/");
      }
    } catch (error) {
      console.error({ msg: "Error deleting project", error: error });
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencil.svg" height={14} width={14} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          !isDeleting ? "bg-primary-purple" : "bg-light-white-200"
        }`}
        onClick={() => handleDeleteProject(projectId)}
      >
        <Image src="/trash.svg" height={14} width={14} alt="delete" />
      </button>
    </>
  );
}
