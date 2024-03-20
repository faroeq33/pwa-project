import { Link } from "@tanstack/react-router";
import OnlineStatusLayout from "./OnlineStatusLayout";

function Nav() {
  return (
    <div className="flex justify-start gap-2 p-2">
      <Link to="/" className="[&.active]:font-bold flex-initial">
        Home
      </Link>
      <Link to="/projects" className="[&.active]:font-bold flex-initial">
        Projects
      </Link>
      <OnlineStatusLayout className="justify-self-end" />
    </div>
  );
}
export default Nav;
