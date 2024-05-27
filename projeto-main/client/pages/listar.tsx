import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ContatoService from "@/services/contatoService";

const ListarContatos = () => {
    const [contatos, setContatos] = useState<any>(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        ContatoService.getContatos().then((data) => {
            setContatos(data)
            console.log(data)
        }).catch((error) => {
            console.error('Erro ao listar contatos:', error)
            setError(error)
        })
    }, [])

    const handleRemove = async (id: any) => {
        ContatoService.deleteContato(id).then((data) => {
            setContatos(contatos.filter((contato: { id: any }) => contato.id !== id))
        }).catch((error) => {
            console.error('Erro ao deletar contato:', error)
            setError(error)
        })
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!contatos) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Lista de Contatos</h3>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Data de Nascimento</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {contatos.map((contato: any) => (
                    <tr key={contato.id}>
                        <td>{contato.nome}</td>
                        <td>{contato.telefone}</td>
                        <td>{contato.email}</td>
                        <td>{contato.endereco}</td>
                        <td>{contato.data_nascimento}</td>
                        <td>
                            <Button onClick={() => navigate(`/atualizar/${contato.id}`)}>
                                <FaEdit />
                            </Button>
                            <Button onClick={() => handleRemove(contato.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ListarContatos