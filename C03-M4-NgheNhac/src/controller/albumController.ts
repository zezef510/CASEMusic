import albumService from "../service/albumService";

class AlbumController{
    findAll = async (req,res) => {
        let {id, name} = req.query
        if (id == undefined && name == undefined){
            let data = await albumService.findAll()
            res.json(data)
        } else if (id != undefined && name == undefined){
            let data = await albumService.findById(id)
            res.json(data)
        } else if (id == undefined && name != undefined){
            let data = await albumService.findByName(name)
            res.json(data)
        }
    }
    update = async (req,res) => {
        let object = await albumService.update(req.params.id, req.body)
        res.json(object)
    }
    delete = async (req, res) => {
        let data = await albumService.delete(req.params.id);
        res.json(data)
    }
    add = async (req,res) => {
        let data = await albumService.add(req.body)
        res.json(data)
    }
}
export default new AlbumController()