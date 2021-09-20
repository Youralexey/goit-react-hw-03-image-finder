import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  CustomSearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./SearchForm.styled";
import PropTypes from "prop-types";

export default class SearchForm extends Component {
  state = {
    value: "",
  };

  static propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputValue = (e) => {
    this.setState({ value: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.value.trim() === "") {
      // alert('Введите название картинки.');
      toast.error("Input picture`s name.");
      return;
    }
    this.props.onSubmit(this.state.value);
    this.resetInput();
  };

  resetInput = () => {
    this.setState({ value: "" });
  };

  render() {
    return (
      <CustomSearchForm onSubmit={this.handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          value={this.state.value}
          placeholder="Search images and photos"
          autocomplete="off"
          onChange={this.handleInputValue}
        />
        <Toaster />
      </CustomSearchForm>
    );
  }
}
