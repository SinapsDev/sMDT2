import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string;
    
    @Column()
    password!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @CreateDateColumn()
    created_at: Date;
}