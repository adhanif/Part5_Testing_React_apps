import React from "react";

export default function ErrorNotification({ message }) {
  if (message === null) {
    return null;
  }
  return <div className={`${message ? "error" : ""}`}>{message}</div>;
}
