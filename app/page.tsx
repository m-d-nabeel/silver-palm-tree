import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearchResult = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    searchInfo: {
      totalHits: number;
    };
  };
};
type Props = {
  searchParams: {
    category?: string;
    endCursor?: string;
  };
};



export default async function Home({
  searchParams: { category, endCursor }
}: Props) {
  const data = (await fetchAllProjects(category, endCursor)) as ProjectSearchResult;
  
  const pageInfo = data?.projectSearch?.pageInfo;
  
  const projectArray = data?.projectSearch?.edges || [];

  if (projectArray.length === 0)
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects exists at the current moment
        </p>
      </section>
    );
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectArray.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            title={node.title}
            id={node.id}
            image={node.image}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            userId={node.createdBy.id}
          />
        ))}
      </section>
      <Pagination
        startCursor={pageInfo.startCursor}
        endCursor={pageInfo.endCursor}
        hasPreviousPage={pageInfo.hasPreviousPage}
        hasNextPage={pageInfo.hasNextPage}
      />
    </section>
  );
}
