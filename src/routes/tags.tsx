import useOnlineStatus from "../hooks/useOnlineStatus";
import { createFileRoute } from "@tanstack/react-router";
import useTags from "../hooks/useTags";

export const Route = createFileRoute("/tags")({
  component: TagsPage,
});

function TagsPage() {
  const { tags } = useTags();

  const isOnline = useOnlineStatus();

  return (
    <>
      <section className="w-full text-gray-600 body-font">
        <div className="container flex flex-wrap justify-center gap-4">
          {isOnline ? (
            tags?.map((tag) => (
              <div
                key={tag.id}
                className="h-full px-2 overflow-hidden text-white bg-indigo-600 rounded-lg border-opacity-60"
              >
                {tag.name}
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
