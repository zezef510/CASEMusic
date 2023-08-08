import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "varchar", length: 255, nullable: true})
    description: string;
    @Column({type: "varchar", length: 255, nullable: true})
    imgUrl: string;

    @ManyToOne(() => User, (userObj)=> userObj.id)
    user: User
}
