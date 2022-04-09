import React from "react";
import { useParams } from "react-router-dom";

import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { BookResponse, getBookUrl } from "../../api/books";

import "./BookPage.css";
import { useApiRequest } from "../../hooks/useApiRequest";

type BookPageRouteProps = {
    id: string;
};

export const BookPage = () => {
    const { id = "" } = useParams<BookPageRouteProps>();

    const { data, error, loading } = useApiRequest<BookResponse>(
        getBookUrl(id)
    );

    const book = data?.book;

    if (loading) {
        return (
            <div className="BookPage">
                <div className="BookPage-img">
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={140}
                        height={210}
                    />
                </div>
                <div className="BookPage-content">
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={40}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={120}
                    />
                </div>
            </div>
        );
    }

    if (book == null) {
        return (
            <div className="BookPage">
                <ErrorOutlineIcon />
                <div className="BooksList-error-desc">{error}</div>
            </div>
        );
    }

    return (
        <div className="BookPage">
            <div className="BookPage-img">
                <CardMedia component="img" image={book.coverImageUrl} />
            </div>

            <div>
                <Typography gutterBottom variant="h5" component="div">
                    {book.author}: {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.synopsis}
                </Typography>
                <br />
                <Typography variant="subtitle2" color="text.secondary">
                    Publisher: {book.publisher}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    Number of pages: {book.pageCount}
                </Typography>
            </div>
        </div>
    );
};
