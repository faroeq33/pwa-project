import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/detail")({
  component: Detail,
});

function Detail() {
  return <div>Projectdetail</div>;
}
