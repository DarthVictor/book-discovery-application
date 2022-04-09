export const API_URL = "http://104.248.26.141:3000/api";
export const DEFAULT_HEADERS = {
    "Content-Type": "application/json;charset=utf-8",
};

export type Book = {
    title: string;
    author: string;
    coverImageUrl: string;
    id: string;
    pageCount: number;
    publisher: string;
    synopsis: string;
};
