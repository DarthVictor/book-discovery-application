import React from "react";
import { useSearchParams } from "react-router-dom";
import { BooksList } from "../BooksList/BooksList";
import { BooksSearchForm } from "../BooksSearchForm/BooksSearchForm";
import "./BooksPage.css";

export const BooksPage = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";

    return (
        <div className="BooksPage">
            <BooksSearchForm />
            <BooksList search={search} />
        </div>
    );
};
