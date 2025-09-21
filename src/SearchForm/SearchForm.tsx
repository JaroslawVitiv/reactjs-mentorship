import "./SearchForm.css";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";

interface SearchFormValues {
  search: string;
}

const SearchForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchValue = searchParams.get("search") || "";

  const formik = useFormik<SearchFormValues>({
    initialValues: {
      search: initialSearchValue,
    },
    onSubmit: (values) => {
      setSearchParams((prevParams) => {
        prevParams.set("searchBy", "title");
        prevParams.set("search", values.search);
        return prevParams;
      });
    },
  });

  return (
    <div className="Search">
      <p className="White-Capitals">Find your movie</p>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="search"
          name="search"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.search}
          placeholder="What do you want to watch?"
          className="Search-bar"
        />
        <button type="submit" className="Search-button">
          search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
