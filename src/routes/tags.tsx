import useOnlineStatus from "../hooks/useOnlineStatus";
import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "../types/projects";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tags")({
  component: TagsPage,
});

function TagsPage() {
  const [items, setItems] = useState<Tag[]>([]);

  useEffect(() => {
    fetch("https://cmgt.hr.nl/api/tags")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching tags");
        }
        return response.json();
      })
      .then((responseData) => {
        setItems(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);
  const isOnline = useOnlineStatus();

  return (
    <>
      <section className="w-full mt-4 text-gray-600 body-font">
        <div className="flex flex-wrap justify-center gap-4 ">
          {isOnline ? (
            items?.map((item: Tag) => (
              <div
                key={item.id}
                className="h-full px-2 overflow-hidden text-white bg-indigo-600 rounded-lg border-opacity-60"
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="text-center">No tags available.</div>
          )}
        </div>
      </section>
    </>
  );
}
