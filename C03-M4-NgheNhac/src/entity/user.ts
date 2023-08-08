import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {Playlist} from "./playlist";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar'})
    username: string;
    @Column({type: 'varchar'})
    password: string
    @Column({type: "varchar", length: 255, nullable: true})
    imgUrl: string;

    @Column({type: 'varchar', nullable: true})
    role: string
}
