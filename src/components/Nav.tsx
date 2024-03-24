import { Link } from "@tanstack/react-router";
import OnlineStatusLayout from "./OnlineStatusLayout";

function Nav() {
  return (
    <div className="flex justify-start gap-2 p-2">
      <Link to="/" className="underline [&.active]:font-bold flex-initial">
        Home
      </Link>
      <Link
        to="/projects"
        className="underline [&.active]:font-bold flex-initial"
      >
        Projects
      </Link>
      <Link to="/tags" className="underline [&.active]:font-bold flex-initial">
        Tags
      </Link>
      <OnlineStatusLayout className="justify-self-end" />
    </div>
  );
}
export default Nav;
