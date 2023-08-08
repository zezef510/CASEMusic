import {Router} from "express";
import songController from "../controller/SongController";
import {auth} from "../middleware/jwt";

const songRouter = Router();
// songRouter.use(auth);
songRouter.post('', songController.add);
songRouter.get('/id/',songController.findAllById);
songRouter.get('/notId/:notSong',songController.getSongsNotInAnyPlaylist);
songRouter.get('/name/', songController.findOneByName);
songRouter.put('/:id', songController.update);
songRouter.delete('/:id', songController.delete);
export default songRouter;
