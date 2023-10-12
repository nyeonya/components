import reactDom from "react-dom";

export default function Modal({ children }: any) {
  if (typeof window === "undefined") {
    return null;
  }

  const el = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, el);
}
