import Link from "next/link";

export default function Sidebar(props) {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link href="/">
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">SPMI APP</div>
        </a>
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link href="/">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Substandar</div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog" />
          <span>Substandar 1</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar1/bagian11/">
              <a className="collapse-item">Bagian 1-1</a>
            </Link>
            <Link href="/substandar1/bagian12">
              <a className="collapse-item">Bagian 1-2</a>
            </Link>
            <Link href="/substandar1/bagian13">
              <a className="collapse-item">Bagian 1-3</a>
            </Link>
          </div>
        </div>
      </li>
      {/* Nav Item - Utilities Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities2"
          aria-expanded="true"
          aria-controls="collapseUtilities2"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 2</span>
        </a>
        <div
          id="collapseUtilities2"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar2/bagian2a">
              <a className="collapse-item">Bagian 2-A</a>
            </Link>
            <Link href="/substandar2/bagian2b">
              <a className="collapse-item">Bagian 2-B</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 3</span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse overflow-y: scroll !important;"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>

            <Link href="/substandar3/bagian3a1">
              <a className="collapse-item">Bagian 3-A-1</a>
            </Link>
            <Link href="/substandar3/bagian3a2">
              <a className="collapse-item">Bagian 3-A-2</a>
            </Link>
            <Link href="/substandar3/bagian3a3">
              <a className="collapse-item">Bagian 3-A-3</a>
            </Link>
            <Link href="/substandar3/bagian3a4">
              <a className="collapse-item">Bagian 3-A-4</a>
            </Link>
            <Link href="/substandar3/bagian3a5">
              <a className="collapse-item">Bagian 3-A-5</a>
            </Link>
            <Link href="/substandar3/bagian3b1">
              <a className="collapse-item">Bagian 3-B-1</a>
            </Link>
            <Link href="/substandar3/bagian3b2">
              <a className="collapse-item">Bagian 3-B-2</a>
            </Link>
            <Link href="/substandar3/bagian3b3">
              <a className="collapse-item">Bagian 3-B-3</a>
            </Link>
            <Link href="/substandar3/bagian3b41">
              <a className="collapse-item">Bagian 3-B-4-1</a>
            </Link>
            <Link href="/substandar3/bagian3b42">
              <a className="collapse-item">Bagian 3-B-4-2</a>
            </Link>
            <Link href="/substandar3/bagian3b5">
              <a className="collapse-item">Bagian 3-B-5</a>
            </Link>
            <Link href="/substandar3/bagian3b6">
              <a className="collapse-item">Bagian 3-B-6</a>
            </Link>
            <Link href="/substandar3/bagian3b71">
              <a className="collapse-item">Bagian 3-B-7-1</a>
            </Link>
            <Link href="/substandar3/bagian3b72">
              <a className="collapse-item">Bagian 3-B-7-2</a>
            </Link>
            <Link href="/substandar3/bagian3b73">
              <a className="collapse-item">Bagian 3-B-7-3</a>
            </Link>
            <Link href="/substandar3/bagian3b74">
              <a className="collapse-item">Bagian 3-B-7-4</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities4"
          aria-expanded="true"
          aria-controls="collapseUtilities4"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 4</span>
        </a>
        <div
          id="collapseUtilities4"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar4/bagian4">
              <a className="collapse-item">Bagian 4</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities5"
          aria-expanded="true"
          aria-controls="collapseUtilities5"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 5</span>
        </a>
        <div
          id="collapseUtilities5"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar5/bagian5a">
              <a className="collapse-item">Bagian 5-A</a>
            </Link>
            <Link href="/substandar5/bagian5b">
              <a className="collapse-item">Bagian 5-B</a>
            </Link>
            <Link href="/substandar5/bagian5c">
              <a className="collapse-item">Bagian 5-C</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities6"
          aria-expanded="true"
          aria-controls="collapseUtilities6"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 6</span>
        </a>
        <div
          id="collapseUtilities6"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar6/bagian6a">
              <a className="collapse-item">Bagian 6-A</a>
            </Link>
            <Link href="/substandar6/bagian6b">
              <a className="collapse-item">Bagian 6-B</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities7"
          aria-expanded="true"
          aria-controls="collapseUtilities7"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 7</span>
        </a>
        <div
          id="collapseUtilities7"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar7/bagian7">
              <a className="collapse-item">Bagian 7</a>
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities8"
          aria-expanded="true"
          aria-controls="collapseUtilities8"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Substandar 8</span>
        </a>
        <div
          id="collapseUtilities8"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Bagian :</h6>
            <Link href="/substandar8/bagian8a">
              <a className="collapse-item">Bagian 8-A</a>
            </Link>
            <Link href="/substandar8/bagian8b1">
              <a className="collapse-item">Bagian 8-B-1</a>
            </Link>
            <Link href="/substandar8/bagian8b2">
              <a className="collapse-item">Bagian 8-B-2</a>
            </Link>
            <Link href="/substandar8/bagian8c">
              <a className="collapse-item">Bagian 8-C</a>
            </Link>
            <Link href="/substandar8/bagian8d1">
              <a className="collapse-item">Bagian 8-D-1</a>
            </Link>
            <Link href="/substandar8/bagian8d2">
              <a className="collapse-item">Bagian 8-D-2</a>
            </Link>
            <Link href="/substandar8/bagian8e1">
              <a className="collapse-item">Bagian 8-E-1</a>
            </Link>
            <Link href="/substandar8/bagianref8e2">
              <a className="collapse-item">Bagian Ref 8-E-2</a>
            </Link>
            <Link href="/substandar8/bagian8e2">
              <a className="collapse-item">Bagian 8-E-2</a>
            </Link>
            <Link href="/substandar8/bagian8f11">
              <a className="collapse-item">Bagian 8-F-1-1</a>
            </Link>
            <Link href="/substandar8/bagian8f12">
              <a className="collapse-item">Bagian 8-F-1-2</a>
            </Link>
            <Link href="/substandar8/bagian8f2">
              <a className="collapse-item">Bagian 8-F-2</a>
            </Link>
            <Link href="/substandar8/bagian8f3">
              <a className="collapse-item">Bagian 8-F-3</a>
            </Link>
            <Link href="/substandar8/bagian8f41">
              <a className="collapse-item">Bagian 8-F-4-1</a>
            </Link>
            <Link href="/substandar8/bagian8f42">
              <a className="collapse-item">Bagian 8-F-4-2</a>
            </Link>
            <Link href="/substandar8/bagian8f43">
              <a className="collapse-item">Bagian 8-F-4-3</a>
            </Link>
            <Link href="/substandar8/bagian8f44">
              <a className="collapse-item">Bagian 8-F-4-4</a>
            </Link>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Addons</div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Pages</span>
        </a>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <a className="collapse-item" href="login.html">
              Login
            </a>
            <a className="collapse-item" href="register.html">
              Register
            </a>
            <a className="collapse-item" href="forgot-password.html">
              Forgot Password
            </a>
            <div className="collapse-divider" />
            <h6 className="collapse-header">Other Pages:</h6>
            <a className="collapse-item" href="404.html">
              404 Page
            </a>
            <a className="collapse-item" href="blank.html">
              Blank Page
            </a>
          </div>
        </div>
      </li>
      {/* Nav Item - Charts */}
      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area" />
          <span>Charts</span>
        </a>
      </li>
      {/* Nav Item - Tables */}
      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-table" />
          <span>Tables</span>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  );
}
