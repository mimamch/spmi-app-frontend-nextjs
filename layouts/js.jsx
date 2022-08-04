import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

export default function Js(props) {
  const {pathName} = useRouter()
  useEffect(() => {
    const script = document.createElement('script');

    script.src = '/assets/js/sb-admin-2.js'
    script.async = true;

    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, [pathName]); // router prop or w/e
  return (
    <>
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />

      {/* {!props.isHome && ( */}
        <Script src="/assets/js/sb-admin-2.js" strategy="lazyOnload" />
      {/* )} */}

      <Script src="/assets/vendor/jquery-easing/jquery.easing.min.js" />

      {/* <!-- Custom scripts for all pages--> */}
    </>
  );
}
