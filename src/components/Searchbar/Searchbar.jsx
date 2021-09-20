import { CustomSearchbar } from "./Searchbar.styled";
import SearchForm from "../SearchForm/SearchForm";

export default function Searchbar({ onSubmit }) {
  return (
    <CustomSearchbar>
      <SearchForm onSubmit={onSubmit} />
    </CustomSearchbar>
  );
}
