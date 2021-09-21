import React, { Component } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { CurrentModal, Overlay, Img, CloseBtn } from "./Modal.styled";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {

      this.props.onClose();
    }
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <CurrentModal>
          <Img src={this.props.src} width="1000px" />
          <CloseBtn type="button" onClick={this.closeModal}>
            <MdClose size="2em" />
          </CloseBtn>
        </CurrentModal>
      </Overlay>,
      modalRoot
    );
  }
}
