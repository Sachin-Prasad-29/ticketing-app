import { Request, Response, NextFunction } from 'express';
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Something Wenty Wrong', err);
    res.status(400).send({
        message: 'Something went wrong'
    });
};
