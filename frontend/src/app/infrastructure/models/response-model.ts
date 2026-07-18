interface ResponseModel<T> {
    readonly data: T;
    readonly detail: string;
}

export type PostOrdersResponseModel = ResponseModel<null>;
