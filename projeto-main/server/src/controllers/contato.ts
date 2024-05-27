import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Contato} from "../models/contato"

export const getContatos = async (req: Request, res: Response) => {
    try {
        const contatos:Contato[] = await AppDataSource.getRepository(Contato).find()
        res.status(200).json(contatos)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar contatos' })
    }
}

export const getContato = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Contato = await AppDataSource.getRepository(Contato).findOneBy({id: id})
    if(results == null)
        return res.status(500).json({ message: 'Contato não encontrada' });

    return res.status(200).send(results)
}

export const addContato = async (req: Request, res: Response) => {
    const contato: Contato[] = AppDataSource.getRepository(Contato).create(req.body)
    const results: Contato[] = await AppDataSource.getRepository(Contato).save(contato)
    return res.send(results)
}

export const updateContato = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const contato: Contato = await AppDataSource.
        getRepository(Contato).
        findOneBy({ id: id })

    AppDataSource.getRepository(Contato).merge(contato, req.body)
    const results: Contato = await AppDataSource.getRepository(Contato).save(contato)
    return res.send(results)
}

export const deleteContato = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Contato).delete(id)
    return res.send(results)
}