export enum STATUSES {
    IDEL = 'idel',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface StoreData {
    _id: String
    name: String;
    description: String;
    banner: String
    avatar: String;
    email: String;
    number: String;
    vatNumber: String;
    panNumber: String;
    citizenship: {
        number: String;
        images: {
            url: string
        }[];
    };
    verified: boolean;
    createdAt: String
}