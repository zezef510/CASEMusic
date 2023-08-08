import {Router} from "express";
import playlistController from "../controller/playlistController";
import {auth} from "../middleware/jwt";

const playlistRouter = Router();
// playlistRouter.use(auth)
playlistRouter.get('', playlistController.findAll);
playlistRouter.post('', playlistController.add);
playlistRouter.put('/:id', playlistController.update);
playlistRouter.delete('/:id', playlistController.delete);
export default playlistRouter;
