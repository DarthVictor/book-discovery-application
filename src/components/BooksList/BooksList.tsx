import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Book, BooksResponse, getBooksUrl } from "../../api/books";

import "./BooksList.css";
import { useApiRequest } from "../../hooks/useApiRequest";

const ONE_TO_FOUR = [1, 2, 3, 4];

type BooksListProps = {
    search: string;
};

export const BooksList = ({ search }: BooksListProps) => {
    const { data, error, loading } = useApiRequest<BooksResponse>(
        getBooksUrl(search)
    );

    return (
        <div className="BooksList">
            {Boolean(error) && (
                <div className="BooksList-error">
                    <ErrorOutlineIcon />
                    <div className="BooksList-error-desc">{error}</div>
                </div>
            )}
            {loading && ONE_TO_FOUR.map((key) => <BookSkeleton key={key} />)}
            {!loading && data != null && data.books.length === 0 && (
                <div className="BooksList-not-fount">Nothing found</div>
            )}
            {!loading &&
                data != null &&
                data.books.map((book) => (
                    <BookComponent key={book.id} book={book} />
                ))}
        </div>
    );
};

type BookComponentProps = {
    book: Book;
};

const BookComponent = ({ book }: BookComponentProps) => {
    return (
        <Card className="Book">
            <div className="Book-img">
                <CardMedia component="img" image={book.coverImageUrl} />
            </div>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.author}: {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.synopsis}
                </Typography>
                <Typography className="Book-link">
                    <Link href={`/book/${book.id}`}>About</Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

const BookSkeleton = () => (
    <div className="Book">
        <div className="Book-img">
            <Skeleton
                animation="wave"
                variant="rectangular"
                width={140}
                height={210}
            />
        </div>
        <div className="Book-content">
            <Skeleton animation="wave" variant="rectangular" height={40} />
            <Skeleton animation="wave" variant="rectangular" height={120} />
        </div>
    </div>
);
