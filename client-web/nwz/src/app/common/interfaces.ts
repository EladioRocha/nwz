// ROOT INTERFACE
interface NWZ {
    status: number,
    statusText: string,
    message: string
}

export interface AuthenticationLoginResponse extends NWZ {
    data: User
}

export interface DataNullResponse extends NWZ {
    data: null
}

interface DataNameResponse {
    _id: string,
    name: string
}

export interface Genre extends DataNameResponse {}

export interface Format extends DataNameResponse {}

export interface Language extends DataNameResponse {}

export interface Author extends DataNameResponse {}

export interface BooksBunch {
    _id: string,
    title: string,
    borrowed: boolean,
    genre_id: Genre,
    format_id: Format[]
}


export interface Book {
    _id: string
    title: string,
    isbn: string,
    number_pages: number,
    summary: string,
    borrowed: boolean,
    rank: number,
    filename: string
    format_id: Format[],
    genre_id: Genre,
    language_id: Language,
    author_id: Author,
    user_id: User
}

export interface GenresResponse extends NWZ {
    data: Genre[]
}

export interface FormatsResponse extends NWZ {
    data: Format[]
}

export interface LanguagesResponse extends NWZ {
    data: Language[]
}

export interface BooksBunchResponse extends NWZ {
    data: BooksBunch[]
}

export interface BookResponse extends NWZ {
    data: Book
}

export interface User {
    _id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    filename: string,
    token: string,
    picture: string
}

export interface BookURLResponse extends NWZ {
    data: string
}

export interface BookRankdId {
    _id: string,
    borrowed: boolean,
    title: string,
    filename: string
}

export interface BooksRank {
    _id: BookRankdId
}

export interface BookRankResponse extends NWZ {
    data: BooksRank[]
}