"use client";

import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
const Modal: React.FunctionComponent<ModalProps> = ({ text, type }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    return () => undefined;
  }, [dialogRef.current?.open]);

  return (
    <dialog className="dialog" ref={dialogRef}>
      <h1>
        <FontAwesomeIcon icon={faWarning} />
        {type}
      </h1>
      <p>{text}</p>
      <form method="dialog">
        <button className="dialog__button">Okay</button>
      </form>
    </dialog>
  );
};

export default Modal;
