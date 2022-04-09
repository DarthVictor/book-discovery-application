import React, { useEffect } from "react";

import {
    Navigate,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { getAuthInfo } from "../../api/auth";

import { Auth } from "../Auth/Auth";
import { BookPage } from "../BookPage/BookPage";
import { BooksPage } from "../BooksPage/BooksPage";

export const App = () => {
    const { isLoggedIn } = getAuthInfo();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!isLoggedIn && pathname !== "/auth") navigate("/auth");
    });

    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/" element={<Navigate to="/books" />} />
        </Routes>
    );
};
