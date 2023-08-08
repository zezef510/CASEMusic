import {Router} from "express";
import songRouter from "./SongRouter";
import {userRouter} from "./userRouter";
import playlistRouter from "./playlistRouter";
import albumRouter from "./albumRouter";
import playlistSongRouter from "./playlistSongRouter";

const router = Router();
router.use('/songs', songRouter);
router.use('/playlists', playlistRouter);
router.use('/albums', albumRouter )
router.use('/playlistSongs', playlistSongRouter)
router.use('/', userRouter);
export default router;
