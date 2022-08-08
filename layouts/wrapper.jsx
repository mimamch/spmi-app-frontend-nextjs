import React, { useEffect, useState } from "react";
import Js from "./js";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import Footer from "./footer";
import UseScript from "./UseScript";
import { useDispatch } from "react-redux";
import { getMe } from "../store/getUserSlice";

export default function Wrapper(props) {
  const [user, setUser] = useState(false);
  const isLogin = user ?? props.isLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <>
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        {!props.hideSidebar && (
          <Sidebar isLogin={isLogin} isHome={props.isHome} />
        )}
        {/* <!-- End of Sidebar --> */}
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <Topbar isLogin={isLogin} isHome={props.isHome} />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            {props.children}

            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <Footer />
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <UseScript url='/assets/vendor/bootstrap/js/bootstrap.bundle.min.js'/> */}
      <UseScript url="/assets/vendor/jquery-easing/jquery.easing.min.js" />
      <UseScript url="/assets/js/sb-admin-2.min.js" />
      {/* <UseScript url='/assets/vendor/datatables/jquery.dataTables.min.js' /> */}
      <UseScript url="/assets/vendor/datatables/dataTables.bootstrap4.min.js" />
      {/* <UseScript url="/assets/js/demo/datatables-demo.js" /> */}
      <Js isHome={props.isHome} />
    </>
  );
}
