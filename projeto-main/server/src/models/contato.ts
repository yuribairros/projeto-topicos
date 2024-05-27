import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Contato {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    telefone: number

    @Column()
    email: string

    @Column()
    endereco: string

    @Column({ type: 'date' })
    data_nascimento: string
}