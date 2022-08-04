import Link from "next/link";

export default function Sidebar(props) {

 
  return (
    <ul
    className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
    id="accordionSidebar"
  >
    {/* Sidebar - Brand */}
   <Link href="/">
   <a
      className="sidebar-brand d-flex align-items-center justify-content-center"
    >
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink" />
      </div>
      <div className="sidebar-brand-text mx-3">
        SPMI APP
      </div>
    </a>
   </Link>
    {/* Divider */}
    <hr className="sidebar-divider my-0" />
    {/* Nav Item - Dashboard */}
    <li className="nav-item active">
     <Link href='/'>
     <a className="nav-link" >
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
         <Link href="/substandar1/bagian1">
         <a className="collapse-item" >
            Bagian 1
          </a>
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
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i className="fas fa-fw fa-wrench" />
        <span>Substandar 2</span>
      </a>
      <div
        id="collapseUtilities"
        className="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Bagian :</h6>
          <Link href='/substandar2/bagian1'>
          <a className="collapse-item" >
            Bagian 1
          </a>
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
