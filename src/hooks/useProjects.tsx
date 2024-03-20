import axios from "axios";
import { useEffect, useState } from "react";

function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Only fetch projects if there are none
    if (projects.length > 0) return;

    axios
      .get("https://cmgt.hr.nl/api/projects/?page=1")
      .then((response) => {
        // console.log(response.data.data as ProjectMeta[]);
        const responseData = response.data.data;

        setProjects(responseData);
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
