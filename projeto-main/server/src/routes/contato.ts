import * as express from "express"
import {addContato, deleteContato, getContato, getContatos, updateContato} from "../controllers/contato"


const routerContato = express.Router()

routerContato.post("/contatos/registrar", addContato)
routerContato.get("/contatos/listar", getContatos)
routerContato.put("/contatos/atualizar/:id", updateContato)
routerContato.delete("/contatos/remover/:id", deleteContato)
routerContato.get("/contatos/buscar/:id", getContato)

export default routerContato