import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SetFlashMessage from "./components/SetFlashMessage";

export default function Topbar(props) {
  const router = useRouter();
  const { getMe } = useSelector((state) => state);
  const logOut = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/log-out`);
    Cookies.remove("token");
    axios.defaults.headers["token"] = undefined;
    SetFlashMessage({ type: "success", text: "Berhasil Log-Out" });
    router.push("/login");
  };

  if (getMe.isError) {
    logOut();
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-gray-100 topbar mb-4 static-top shadow-sm">
      {/* <!-- Sidebar Toggle (Topbar) --> */}

      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* <!-- Topbar Search --> */}

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

        {/* <!-- Nav Item - User Information --> */}
        {getMe.user.username ? (
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {getMe.user.fullName} | {getMe.user.role}
              </span>
              <img
                className="img-profile rounded-circle"
                src="/assets/img/undraw_profile.svg"
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link href="/profile">
                <a className="dropdown-item">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
              </Link>
              <div className="dropdown-divider"></div>
              <a
                // onClick={signOut}
                className="dropdown-item"
                onClick={logOut}
                style={{ cursor: "pointer" }}
                href="#"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        ) : (
          <li className="nav-item align-items-center row mx-3">
            <a href="/login" className="btn btn-dark btn-sm btn-icon-split">
              <span className="icon text-gray-600">
                <i className="fas fa-sign-in-alt"></i>
              </span>
              <span className="text">Masuk</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
