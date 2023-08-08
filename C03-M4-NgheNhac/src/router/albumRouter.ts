import {Router} from "express";
import albumController from "../controller/albumController";
import {auth} from "../middleware/jwt";

const albumRouter = Router();
// albumRouter.use(auth)
albumRouter.get('/', albumController.findAll);
albumRouter.post('', albumController.add);
albumRouter.put('/:id', albumController.update);
albumRouter.delete('/:id', albumController.delete);
export default albumRouter;
