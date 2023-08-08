import {AppDataSource} from "../data-source";
import {Playlist} from "../entity/playlist";
import {Service} from "./Service";

class PlaylistService implements Service<Playlist>{

    private repository = AppDataSource.getRepository(Playlist)

    findAll = async () => {
        return await this.repository.createQueryBuilder("playlist")
            .leftJoinAndSelect("playlist.user","user")
            .select([
                "playlist.id",
                "playlist.name",
                "playlist.imgUrl",
                "playlist.description",
                "user.username",
                "user.imgUrl"
            ])
            .orderBy("playlist.id","ASC")
            .getMany();
    }
    add = async (playlist) => {
        return await this.repository.save(playlist)
    }

    delete = async (playlistId) => {
        return await this.repository.delete(playlistId)
    }


    findById = async (id) => {
        return await this.repository.findOne({
            where: {
                id: id
            }
        })
    }

    update = async (id, data) => {
        return await this.repository.update(id,data)
    }

    findByUserName = async (userId) => {
        return await this.repository.createQueryBuilder("playlist")
            .leftJoinAndSelect("playlist.user","user")
            .select([
                "playlist.id",
                "playlist.name",
                "playlist.imgUrl",
                "playlist.description",
                "user.username",
                "user.imgUrl"
            ])
            .where("user.id = :userId", {userId})
            .getMany();
    }
    getSortByAsc = async () => {
        return await this.repository.createQueryBuilder("playlist")
            .orderBy("playlist.name","ASC")
            .getMany()
    }
    getSortByDesc = async () => {
        return await this.repository.createQueryBuilder("playlist")
            .orderBy("playlist.name","DESC")
            .getMany()
    }
    getSortAscByUserId = async (idUser) => {
        return await this.repository.createQueryBuilder("playlist")
            .leftJoinAndSelect("playlist.user","user")
            .orderBy("playlist.name","ASC")
            .where("user.id = :idUser", {idUser})
            .getMany()
    }
    getSortDescByUserId = async (idUser) => {
        return await this.repository.createQueryBuilder("playlist")
            .leftJoinAndSelect("playlist.user","user")
            .orderBy("playlist.name","DESC")
            .where("user.id = :idUser", {idUser})
            .getMany()
    }
}
export default new PlaylistService()