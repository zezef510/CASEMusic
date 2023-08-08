import {Router} from "express";
import playlistSongController from "../controller/playlistSongController";
import {auth} from "../middleware/jwt";

const playlistSongRouter = Router();
// playlistSongRouter.use(auth)
playlistSongRouter.get('/id/', playlistSongController.findAll);
playlistSongRouter.post('/', playlistSongController.add);
playlistSongRouter.get('/:id', playlistSongController.findById);
playlistSongRouter.put('/:id', playlistSongController.update);
playlistSongRouter.delete('/:id', playlistSongController.delete);
export default playlistSongRouter;
