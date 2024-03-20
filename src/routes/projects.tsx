import { useEffect, useState } from "react";
import axios from "axios";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);

  useEffect(() => {
    axios
      .get("https://cmgt.hr.nl/api/projects/?page=1")
      .then((response) => {
        // console.log(response.data.data as ProjectMeta[]);
        setProjects(response.data.data as ProjectMeta[]);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <>
      <section className="w-full text-gray-600 body-font ">
        <div className="container flex flex-wrap justify-center">
          {projects.map(({ project, links }: ProjectMeta) => (
            <div
              key={project.id}
              className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60"
            >
              <img
                className="object-cover object-center w-full lg:h-48 md:h-36"
                src={project.header_image}
                alt="blog"
              />
              <div className="p-6">
                <h2 className="font-sans text-lg text-gray-900 capitalize title-font">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center ">
                  <Link
                    to="/detail"
                    href={links.self}
                    className="inline-flex items-center text-xs text-indigo-600 md:mb-2 lg:mb-0"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>{" "}
    </>
  );
}

export interface ProjectsResponse {
  data: ProjectMeta[];
  links: PaginationLinks;
  meta: Meta;
}

export interface ProjectMeta {
  project: Project;
  links: Links;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  header_image: string;
  tagline: string;
  description: string;
  author: string;
  youtube?: string;
  screenshots: string[];
  spotlight: number;
  isValidated: number;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Links {
  self: string;
  collection: string;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: unknown;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
