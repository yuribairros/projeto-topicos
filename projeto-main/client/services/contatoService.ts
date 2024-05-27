import axios from 'axios'

const baseUrl = 'http://localhost:3001/contatos'

class ContatoService {
    getContatos() {
        return axios.get(`${baseUrl}/listar`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    getContato(id: any) {
        return axios.get(`${baseUrl}/buscar/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addContato(data: any) {
        return axios.post(`${baseUrl}/registrar`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteContato(id: any) {
        return axios.delete(`${baseUrl}/remover/${id}`)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover contato', error)
            })
    }

    updateContato(id: any, data: any) {
        return axios.put(`${baseUrl}/atualizar/${id}`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new ContatoService() 