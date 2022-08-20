import React from "react";

export default function DateNow() {
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  return <span>{date}</span>;
}
