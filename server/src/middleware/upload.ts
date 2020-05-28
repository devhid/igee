import { Request } from "express";
import multer from "multer";
import path from "path";

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, "/tmp/igee/uploads");
//     },
//     filename(req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
// });

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (err: any, accept?: boolean) => any
) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".json" || file.mimetype !== "application/json") {
        return cb(new Error("Only JSON files are allowed."));
    }

    cb(null, true);
};

export const upload = multer({ fileFilter });
