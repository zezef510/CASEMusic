import songService from "../service/SongService";

class SongController {
    add = async (req, res) => {
        let data = await songService.add(req.body);
        res.json(data)
    }
    update = async (req, res) => {
        let data = await songService.update(req.params.id, req.body);
        res.json(data)
    }
    delete = async (req, res) => {
        let data = await songService.delete(req.params.id);
        res.json(data)
    }
    findAllById = async (req,res) => {
        let {id, idAlbum} = req.query
        if (id == undefined && idAlbum == undefined){
            let data = await songService.findAll();
            res.json(data)
        } else if (id != undefined && idAlbum == undefined) {
            let data = await songService.findById(id)
            res.json(data)
        } else if (id == undefined && idAlbum != undefined){
            let data = await songService.findAllByAlbumId(idAlbum)
            res.json(data)
        } else if (id != undefined && idAlbum != undefined){
            let data = await songService.findOneByAlbumId(Number(idAlbum), Number(id))
            res.json(data)
        }
    }
    findOneByName = async (req,res) => {
        let {song, singer, album, musician} = req.query
        if (song != undefined && singer == undefined && album == undefined && musician == undefined){
            let data = await songService.findByName(song)
            res.json(data)
        } else if (song == undefined && singer != undefined && album == undefined && musician == undefined){
            let data = await songService.findBySingerName(singer)
            res.json(data)
        } else if (song == undefined && singer == undefined && album != undefined && musician == undefined){
            let data = await songService.findByAlbumName(album)
            res.json(data)
        } else if (song == undefined && singer == undefined && album == undefined && musician != undefined){
            let data = await songService.findByMusicianName(musician)
            res.json(data)
        }
    }

       getSongsNotInAnyPlaylist = async (req, res) => {
        try {
          const data = await songService.findSongsNotInAnyPlaylist(req.params.notSong);
          res.json(data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

    
    
}

export default new SongController();
