import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";

export default async function Project({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result.project;
  const userDetails = result.project.createdBy;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex flex-1 items-start w-full max-xs:flex-col gap-5">
          <Image
            src={userDetails.avatarUrl}
            alt="image"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{projectDetails?.title}</p>

            <div className="user-info">
              <Link href={"/"}>{userDetails.name}</Link>
              <Image
                src="/dot.svg"
                width={4}
                height={4}
                style={{ height: "auto", width: "auto" }}
                alt="dot"
              />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectDetails.category}
              </Link>
            </div>
          </div>
        </div>
        {session?.user.email === userDetails.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={projectDetails.image}
          className="object-cover rounded-2xl aspect-auto"
          width={900}
          height={540}
          alt="poster"
        />
      </section>
      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>
        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Image
          src={projectDetails?.createdBy?.avatarUrl}
          className="rounded-full"
          width={82}
          height={82}
          alt="profile image"
        />
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
      <RelatedProjects userId={userDetails.id} projectId={projectDetails.id} />
    </Modal>
  );
}
