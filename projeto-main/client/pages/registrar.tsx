import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom'
import ContatoService from "@/services/contatoService";

const Registrar = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        data_nascimento: ''
    })

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission

         ContatoService.addContato(formData).then( (response) => {
            console.log('Contato adicionado:')
            setFormData({
                nome: '',
                telefone: '',
                email: '',
                endereco: '',
                data_nascimento: ''
            })
        }).catch( (error: { data: any; }) => {
            console.log('Erro ao adicionar o contato:', error)
        })
    };

    return (
        <div className={"formulario"}>
            <h2>Adicionar Contato</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        type="varchar"
                        placeholder="Telefone"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Endereço"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Data de Nascimento"
                        id="data_nascimento"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registrar;