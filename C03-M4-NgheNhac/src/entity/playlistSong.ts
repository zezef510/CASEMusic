import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Song} from "./Song";
import {Playlist} from "./playlist";

@Entity()
export class PlaylistSong {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Song, (song) => song.id)
    song: Song
    @ManyToOne(() => Playlist, (playlist) => playlist.id)
    playlist: Playlist
}