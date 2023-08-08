import {AppDataSource} from "../data-source";
import {Album} from "../entity/Album";
import {Service} from "./Service";

class AlbumService implements Service<Album>{

    private repository = AppDataSource.getRepository(Album)

    findAll = async () => {
        return await this.repository.find()
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
                id: id
            }
        })
    }

    update = async (id, data) => {
        return await this.repository.update(id, data)
    }

    findByName = async (name) => {
        return await this.repository.createQueryBuilder("album")
            .select([
                "album.id",
                "album.name",
                "album.imgUrl",
                "album.singer"
            ])
            .where("album.name LIKE :name", { name: `%${name}%` })
            .getMany()
    }
}
export default new AlbumService()