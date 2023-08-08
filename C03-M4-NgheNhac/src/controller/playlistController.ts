import playlistService from "../service/playlistService";

class PlaylistController{
    findAll = async (req, res) => {
        let {userId, asc, desc, id,} = req.query
        if (userId == undefined && asc == undefined && desc == undefined && id == undefined){
            let list = await playlistService.findAll();
            res.json(list)
        } else if (userId != undefined && asc == undefined && desc == undefined && id == undefined){
            let list = await playlistService.findByUserName(Number(userId));
            res.json(list)
        } else if (userId == undefined && asc == '' && desc == undefined && id == undefined){
            let list = await playlistService.getSortByAsc()
            res.json(list)
        } else if (userId == undefined && asc == undefined && desc == '' && id == undefined){
            let list = await playlistService.getSortByDesc()
            res.json(list)
        } else if (userId != undefined && asc == '' && desc == undefined && id == undefined){
            let list = await playlistService.getSortAscByUserId(Number(userId))
            res.json(list)
        } else if (userId != undefined && asc == undefined && desc == '' && id == undefined){
            let list = await playlistService.getSortDescByUserId(Number(userId))
            res.json(list)
        } else if (userId == undefined && asc == undefined && desc == undefined && id != undefined){
            let list = await playlistService.findById(id)
            res.json(list)
        }
    }
    add = async (req, res) => {
        let data = await playlistService.add(req.body);
        res.json(data)
    }
    update = async (req, res) => {
        let data = await playlistService.update(req.params.id, req.body);
        res.json(data)
    }
    delete = async (req, res) => {
        let data = await playlistService.delete(req.params.id);
        res.json(data)
    }
}
export default new PlaylistController()