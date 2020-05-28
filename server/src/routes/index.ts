import { Route } from "../models/route";
import * as DataController from "./controllers/upload";
import { upload } from "../middleware/upload";

export const routes: Route[] = [
    {
        path: "/upload",
        method: "post",
        controller: DataController.upload(),
        middleware: [
            upload.single('data')
        ]
    }
];