import { Not, getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Song } from "../entity/Song";
import { Service } from "./Service";
import { PlaylistSong } from "src/entity/playlistSong";

class SongService implements Service<Song> {
    private repository = AppDataSource.getRepository(Song);

    findSongsNotInAnyPlaylist = async (playlistId) => {
        return await this.repository
            .createQueryBuilder('song')
            .select(['song.id', 'song.name', 'song.singer', 'song.songUrl', 'song.imageUrl',])
            .leftJoin('song.playlistSongs', 'playlistSong')
            .leftJoinAndSelect("song.album", "album")
            .where('playlistSong.playlistId != :playlistId', { playlistId })
            .orWhere('playlistSong.playlistId IS NULL')
            .getMany();
    }

    findAll = async () => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name"
            ])
            .getMany();
    }

    add = async (data) => {
        return await this.repository.save(data);
    }

    delete = async (id) => {
        return await this.repository.delete(id);
    }
    findByName = async (name) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name"
            ])
            .where("song.name LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    findBySingerName = async (singerName) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name"
            ])
            .where("song.singer LIKE :name", { name: `%${singerName}%` })
            .getMany();
    }
    findByAlbumName = async (albumName) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name"
            ])
            .where("album.name LIKE :name", { name: `%${albumName}%` })
            .getMany();
    }
    findByMusicianName = async (musicianName) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name"
            ])
            .where("song.musician LIKE :name", { name: `%${musicianName}%` })
            .getMany();
    }

    findById = async (id) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.id",
                "album.name"
            ])
            .where("song.id = :id", { id })
            .getMany();
    }

    update = async (id, data) => {
        return await this.repository.update(id, data);
    }


    findAllByAlbumId = async (id) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album","album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name",
                "album.imgUrl",
                "album.singer"
            ])
            .where("album.id = :id",{id})
            .getMany();
    }
    findOneByAlbumId = async (idAlbum, id) => {
        return await this.repository.createQueryBuilder("song")
            .leftJoinAndSelect("song.album", "Album")
            .select([
                "song.id",
                "song.name",
                "song.singer",
                "song.musician",
                "song.songUrl",
                "song.imageUrl",
                "album.name",
                "album.imgUrl",
                "album.singer"
            ])
            .where("album.id = :idAlbum", { idAlbum })
            .andWhere("song.id = :id", { id })
            .getMany();
    }


}
export default new SongService();
