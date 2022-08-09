import { useRouter } from "next/router";
export default function Js(props) {
  const { pathName } = useRouter();

  return (
    <>
      {/* <UseScript url='/assets/vendor/bootstrap/js/bootstrap.bundle.min.js'/>
    <UseScript url='/assets/js/sb-admin-2.js'/>
    <UseScript url='/assets/vendor/jquery-easing/jquery.easing.min.js'/> */}

      {/* <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" /> */}

      {/* {!props.isHome && ( */}
      {/* <Script src="/assets/js/sb-admin-2.js" strategy="lazyOnload" /> */}
      {/* )} */}

      {/* <Script src="/assets/vendor/jquery-easing/jquery.easing.min.js" /> */}

      {/* <!-- Custom scripts for all pages--> */}
    </>
  );
}
