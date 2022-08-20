import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Clock from "react-live-clock";
export default function TimeNow() {
  const [time, settime] = useState("");
  const [hour, setHour] = useState(new Date());
  const hourOptions = {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };

  const hourFormat = new Intl.DateTimeFormat(useRouter().locale, hourOptions);
  const hora = hourFormat.format(hour);

  const getHora = (date) => {
    const ONE_SECOND = 1000;
    // useEffect(() => {
    const time = setTimeout(() => {
      setHour(date);
    }, ONE_SECOND);
    // return () => {
    // clearTimeout(time);
    // };
    // }, [hour]);
    // console.log(hora);
    settime(hora);
    // clearTimeout(time);

    return hora;
  };

  useEffect(() => {
    getHora(new Date());
  }, [hour]);

  // console.log(time);

  return <span>{time}</span>;
}
