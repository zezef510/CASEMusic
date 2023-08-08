import {AppDataSource} from "../data-source";
import {Service} from "./Service";
import {PlaylistSong} from "../entity/playlistSong";

class PlaylistSongService implements Service<PlaylistSong>{
    private repository
    constructor() {
        this.repository = AppDataSource.getRepository(PlaylistSong)
    }
    findAll = async () => {
        return await this.repository.find({
            relations:{
                song: true,
                playlist: true
            }
        })
    }
    add = async (data) => {
        return await this.repository.save(data)
    }

    delete = async (id) => {
        return await this.repository.delete(id)
    }

    findById = async (id) => {
        return await this.repository.findOne({
            where: {
                id : id
            }
        })
    }

    update = async (id, data) => {
        return await this.repository.update(id,data)
    }
    findAllSongByPlaylistId = async (idPlaylist) =>{
        return await this.repository.createQueryBuilder("playlistSong")
            .leftJoinAndSelect("playlistSong.song","song")
            .leftJoinAndSelect("playlistSong.playlist","playlist")
            .leftJoinAndSelect("song.album","album")
            .where("playlist.id = :idPlaylist",{idPlaylist})
            .getMany();
    }
    findOneSongByPlaylistId = async (idPlaylist, idSong) => {
        return await this.repository.createQueryBuilder("playlistSong")
            .leftJoinAndSelect("playlistSong.song","song")
            .leftJoinAndSelect("playlistSong.playlist","playlist")
            .where("playlist.id = :idPlaylist",{idPlaylist})
            .andWhere("song.id = :idSong", {idSong})
            .getMany();
    }
    findAllSongInPlaylistByUser = async (userId) => {
        return await this.repository.createQueryBuilder("playlistSong")
            .leftJoinAndSelect("playlistSong.song","song")
            .leftJoinAndSelect("playlistSong.playlist","playlist")
            .leftJoinAndSelect("playlist.user", "user")
            .leftJoinAndSelect("song.album","album")
            .where("user.id = :userId", {userId})
            .getMany()
    }
    findSongNotInPlaylistId = async (idPlaylist, idSong) =>{
        return await this.repository.createQueryBuilder("playlist_Song")
            .leftJoinAndSelect("playlist_Song.song","song")
            .leftJoin("playlist_Song.playlist","playlist")
            .leftJoin("song.album", "album")
            .where("playlist.id <> :idPlaylist",{idPlaylist})
            .orWhere("playlist_song.playlistId IS NULL")
            .getMany();
    }
}
export default new PlaylistSongService()