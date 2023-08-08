import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "varchar", length: 255, nullable: true})
    imgUrl: string;
    @Column({type: "varchar", length: 255, nullable: true})
    singer: string;

}
