import { Link, createFileRoute } from "@tanstack/react-router";
import { ProjectMeta } from "../types/projects";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

// TODO: Should I export react component when using tanstack router?
function Projects() {
  const [projects, setProjects] = useState<ProjectMeta[]>([]);

  useEffect(() => {
    console.log("Fetching projects");
    // Only fetch projects if there are none
    // if (projects.length > 0) return;

    fetch("https://cmgt.hr.nl/api/projects/?page=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching projects");
        }
        return response.json();
      })
      .then((responseData) => {
        setProjects(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <>
      <section className="w-full h-screen text-gray-600 body-font">
        <div className="p-4 text"></div>
        <div className="flex flex-wrap justify-center gap-4">
          {projects.map(({ project, links }: ProjectMeta) => {
            return (
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
            );
          })}
        </div>
      </section>
    </>
  );
}
