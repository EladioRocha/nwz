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

export interface Genre {
    _id: string,
    name: string
}

export interface GenresResponse extends NWZ {
    data: Genre[]
}

export interface User {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    token: string
}
