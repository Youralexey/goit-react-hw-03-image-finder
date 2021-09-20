import React, { Component } from "react";
import { CustomApp } from "./App.styled";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Button } from "./components/Button/Button.styled";
import Modal from "./components/Modal/Modal";
import api from "./services/gallery-api";
import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    page: 1,
    selectedImage: null,
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { status, imageName, images, page } = this.state;
    if (status === Status.RESOLVED && images.length === 0) {
      // alert(`Oops, we did not find such picture as ${imageName}`);
      toast.error(`Oops, we did not find such picture as ${imageName}`);
      this.setState({ status: Status.IDLE });
    }

    if (status === Status.PENDING) {
      api
        .fetchImages(imageName, page)
        .then((newImages) =>
          this.setState((prevState) => ({
            images: [...prevState.images, ...newImages],
            status: Status.RESOLVED,
          }))
        )
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  searchbarInputValueHandler = (value) => {
    // console.log('value :>> ', value);
    if (value.trim() !== "") {
      this.setState({
        imageName: value,
        status: Status.PENDING,
      });
    }

    if (this.state.imageName !== value) {
      this.setState({
        images: [],
        page: 1,
      });
    }
  };

  handleLoadMoreBtnClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      status: Status.PENDING,
    }));
  };

  handleSelectImage = (data) => {
    this.setState({ selectedImage: data });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { status, images, selectedImage } = this.state;
    return (
      <CustomApp>
        <Searchbar onSubmit={this.searchbarInputValueHandler} />
        <Toaster />
        <ImageGallery images={images} onSelect={this.handleSelectImage} />
        {status === Status.RESOLVED && (
          <Button type="button" onClick={this.handleLoadMoreBtnClick}>
            Load more
          </Button>
        )}
        {selectedImage && (
          <Modal
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            onClose={this.closeModal}
            state={this.state.status}
          />
        )}
        {this.state.status === Status.PENDING && (
          <Loader
            type="Circles"
            color="#00BFFF"
            height={300}
            width={300}
            timeout={5000}
          />
        )}
      </CustomApp>
    );
  }
}
