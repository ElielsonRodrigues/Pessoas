import axios from 'axios'

export default class EstadosMunicipiosService {

    url = "http://localhost:8080/";

//INICIO API ESTADOS END POINT

    // ACESSANDO METODO DE LISTAR TODOS OS ESTADOS;
    listar() {
        return axios.get(this.url + "estados");
    }
    // ACESSANDO METODO QUE CRIA UM NOVO ESTADO;
    criar(estado) {
        return axios.get(this.url + "estados",estado);
    }
    // ACESSANDO METODO LISTA SOMENTE UM UNICO ESTADO DE ACORDO COM O ID INFORMADO;
    buscarPeloCodigo(id) {
        return axios.get(this.url + "estados/"+id);
    }
    // ACESSANDO METODO DE LISTAGEM DE MUNICIPIOS DE ACORDO COM ID DO ESTADO INFORMADO;
    listarMunicipiosPorEstado(id) {
        return axios.get(this.url + "estados/"+id+"/municipios");
    }

//FIM API ESTADOS END POINT

/*---------------------------------------------------------------------------------------------*/

//INICIO API MUNICIPIOS END POINT

//FIM API MUNICIPIOS END POINT

}
