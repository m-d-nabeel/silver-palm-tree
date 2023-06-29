import { ProjectInterface } from "@/common.types";
import { footerLinks } from "@/constants";
import { fetchAllProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

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

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link key={link} href="/">
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

export default async function Footer() {
  const result = (await fetchAllProjects()) as ProjectSearchResult;

  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt="Flexibble"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the world's leading community for creators to share,
            grow, and get hired
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            key={footerLinks[0].title}
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              key={footerLinks[1].title}
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              key={footerLinks[2].title}
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumn
            key={footerLinks[3].title}
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              key={footerLinks[4].title}
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              key={footerLinks[5].title}
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumn
            key={footerLinks[6].title}
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p>@ 2023 Flexibble. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black">
            {result?.projectSearch?.edges.length || "1,024"}
          </span>{" "}
          Projects submitted
        </p>
      </div>
    </footer>
  );
}
