import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import "./BooksSearchForm.css";

export const BooksSearchForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryValue = searchParams.get("search") ?? "";
    const [search, setSearch] = useState(searchQueryValue);

    return (
        <form
            className="BooksSearchForm-form"
            onSubmit={(event) => {
                setSearchParams(Boolean(search) ? { search } : {});
                event.preventDefault();
            }}
        >
            <TextField
                label="Search books..."
                type="search"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                size="small"
                className="BooksSearchForm-search"
            />

            <Button
                type="submit"
                disabled={!search && !searchQueryValue}
                variant="outlined"
                className="BooksSearchForm-search-button"
            >
                <SearchIcon />
            </Button>
        </form>
    );
};
