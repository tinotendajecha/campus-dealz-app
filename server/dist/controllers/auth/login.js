"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res, next) => {
    res.send('Login endpoint!');
};
exports.default = login;
// export const login:RequestHandler = (req: Request, res: Response, next:NextFunction) => {
//     res.send('Test endpoint hit!')
// }
