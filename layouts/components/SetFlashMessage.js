import Cookies from "js-cookie";

export default function SetFlashMessage(payload) {
  return Cookies.set("flash", JSON.stringify(payload));
}
