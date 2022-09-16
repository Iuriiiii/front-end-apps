export interface ApiBase {
    _id?: string
}

export interface User extends ApiBase {
    firstName: string,
    lastName: string,
    email: string,
    website: string
}