import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, OneToMany} from "typeorm";
import {Album} from "./Album";
import { PlaylistSong } from "./playlistSong";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    name: string;

    @Column({type: "varchar", length: 255, nullable: true})
    singer: string;

    @Column({type: "varchar", length: 255, nullable: true})
    musician: string;

    @Column({type: "varchar", length: 255, nullable: true})
    songUrl: string;

    @Column({type: "varchar", length: 255, nullable: true})
    imageUrl: string;

    @ManyToOne(() => Album, (album) => album.id)
    album: Album

    @OneToMany(() => PlaylistSong, playlistSong => playlistSong.song)
    playlistSongs: PlaylistSong[];

}
