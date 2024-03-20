import { Link, createFileRoute } from "@tanstack/react-router";
import { ProjectMeta } from "../types/projects";
import useProjects from "../hooks/useProjects";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  const { projects } = useProjects();

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
