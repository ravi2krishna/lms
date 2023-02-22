import React from "react";
import logoSrc from "../assets/logo.png";
import { Link, useLocation, useRouter } from "@tanstack/react-location";
import TopBarLoader from "../components/TopBarLoader";
import { FaExternalLinkAlt } from "react-icons/fa";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout(props: MainLayoutProps) {
  const router = useRouter();
  const location = useLocation();

  return (
    <div>
      {router.pending ? <TopBarLoader /> : null}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 drop-shadow-lg">
        <div>
          <Link to={"/"}>
            <img src={logoSrc} alt="Digital Lync Logo" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {location.current.pathname.includes("/admin") ? null : (
            <div>
              <Link
                // target={"_blank"}
                to={"admin"}
                className="link-primary  text-blue-500"
              >
                <span className="flex items-center">
                  Admin Portal <FaExternalLinkAlt className="pl-1" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="min-h-screen">{props.children}</div>
    </div>
  );
}

export default MainLayout;
