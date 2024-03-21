import { useEffect, useState } from "react";

function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Only fetch projects if there are none
    if (projects.length > 0) return;

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
  }, [setProjects, projects.length]);

  return {
    projects: projects,
    setProjects: setProjects,
  };
}
export default useProjects;
