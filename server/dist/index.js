"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(json())
const port = process.env.PORT || 3000;
// app.get('/', (req: Request, res: Response) => {
//   res.send('My Typescript express server is now running okay and fine')
// })
app.use('/', routes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
