import React, { useEffect, useState } from "react";
import Js from "./js";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import Footer from "./footer";
import UseScript from "./UseScript";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../store/getUserSlice";
import { useRouter } from "next/router";
import axios from "axios";

export default function Wrapper(props) {
  const [user, setUser] = useState(false);
  const isLogin = user ?? props.isLogin;
  const dispatch = useDispatch();
  const router = useRouter();
  const dis = async () => {
    dispatch(getMe()).then(async (res) => {
      if (res?.payload?.response?.status == 401) {
        // await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/log-out`);
        return router.push("/login");
      }
    });
  };
  useEffect(() => {
    dis();
  }, [dispatch]);

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
