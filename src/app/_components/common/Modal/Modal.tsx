import React from "react";
import { ModalSelectors } from "@/redux/features/modal/modalSelectors";
import _Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModalAction } from "@/redux/features/modal/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import "./Modal.css";
interface Props {
  children: JSX.Element[] | JSX.Element;
}
export default function Modal({ children }: Props) {
  const modal = useAppSelector(ModalSelectors.getModal());
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(
      ModalAction.updateModal({
        isOpen: false,
        data: {},
      })
    );
  };

  return (
    <_Modal
      closeTimeoutMS={300}
      isOpen={modal.isOpen}
      contentLabel="Modal Score"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
          backgroundColor: "#1e1e1e",
          borderRadius: "5px",
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "70%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          border: "none",
        },
      }}
    >
      {children}
      <IconButton
        onClick={closeModal}
        sx={{
          position: "absolute",
          top: 15,
          right: 20,
          cursor: "pointer",
        }}
      >
        <CloseIcon />
      </IconButton>
    </_Modal>
  );
}

export const Overlay = () => {
  return <></>;
};
