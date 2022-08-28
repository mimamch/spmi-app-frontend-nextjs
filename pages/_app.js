// import "../public/assets/vendor/datatables/dataTables.bootstrap4.min.css";
import "../public/assets/css/sb-admin-2.min.css";
import "../public/assets/vendor/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import axios from "axios";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import ChartModal from "../layouts/ChartModal";

axios.defaults.withCredentials = true;
axios.defaults.headers["token"] = cookies.get("token");
// axios.interceptors.response.use(response => {
//   return response
// }, async(err) => {
//   // const router = useRouter()
//   console.log(err.response.status)
//   if(err.response.status == 401) {
//     await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/log-out`);
//     return router.push('/login')
//   }
// })
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const flash = cookies.get("flash");
  useEffect(() => {
    // cookies.set('flash', JSON.stringify({
    //   type: 'info',
    //   text: 'Selamat Datang!'
    // }))
    if (flash) {
      const flashJson = JSON.parse(flash);
      toast[flashJson.type](flashJson.text);
      cookies.remove("flash");
    }
  }, [flash]);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
      <ChartModal />
    </Provider>
  );
}
