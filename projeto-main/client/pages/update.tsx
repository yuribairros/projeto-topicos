import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import ContatoService from '@/services/contatoService';

interface ContatoData {
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    data_nascimento: string;
}

const Registrar = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState<ContatoData | null>(null);
    const [formData, setFormData] = useState<ContatoData>({
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        data_nascimento: '',
    });

    useEffect(() => {
        console.log(itemId);
        ContatoService.getContato(itemId).then((data: ContatoData) => {
            setItemData(data);
            setFormData(data);
        }).catch();
    }, [itemId]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        ContatoService.updateContato(itemId, formData).then((data) => {
            console.log('Contato adicionada:');
            if (data === 204) {
                navigate('/listar');
            }
            setFormData({
                nome: '',
                telefone: '',
                email: '',
                endereco: '',
                data_nascimento: '',
            });
        }).catch((error: { data: any; }) => {
            console.log('Erro ao adicionar o contato:', error);
        });
    }

    if (!itemData) {
        return (
            <h4>Carregando</h4>
        );
    }

    return (
        <div className={"formulario"}>
            <h2>Atualizar Contato</h2>
            <Form onSubmit={handleSubmit} className={"formulario"}>
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
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
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
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Data"
                                id="data_nascimento"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
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
