import { API_URL } from "./constants";

export type Book = {
    title: string;
    author: string;
    coverImageUrl: string;
    id: string;
    pageCount: number;
    publisher: string;
    synopsis: string;
};

export type BooksResponse = {
    books: Book[];
};

export type BookResponse = {
    book: Book;
};

export const getBooksUrl = (search: string) =>
    `${API_URL}/books${Boolean(search) ? `?q=${search}` : ""}`;

export const getBookUrl = (id: string) => `${API_URL}/books/${id}`;
