import axios from "axios";

export default class EquipamentoService {
    
  url = "http://localhost:8080/";

  //INICIO API EQUIPAMENTO END POINT

    listar() {
        return axios.get(this.url + "equipamentos");
    }

    buscarPeloCodigo(id) {
        return axios.get(this.url + "equipamentos/"+id);
    }

    criar(equipamento) {
        return axios.post(this.url + "equipamentos", equipamento);
    }

    remover(id) {
        return axios.delete(this.url + "equipamentos/"+id);
    }

    atualizar(id,equipamento) {
        return axios.put(this.url + "equipamentos/"+id, equipamento);
    }
  /*---------------------------------------------------------------------------------------------*/
}
