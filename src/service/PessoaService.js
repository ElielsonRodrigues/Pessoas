import axios from "axios";

//import AuthService from "./auth/AuthService"


const API_URL = "http://localhost:8080/";
//let authService = new AuthService();


export default class PessoaService {
  listar(token) {
    return axios({
      method: 'get',
      url: API_URL + 'pessoas',
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    //  return axios.get(API_URL + "pessoas");
  }

  buscarPeloCodigo(id,token) {
    return axios({
      method: 'get',
      url: API_URL + 'pessoas/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    //  return axios.get(API_URL + "pessoas/" + id);
  }
  criar(pessoa,token) {
    return axios({
      method: 'post',
      url: API_URL + 'pessoas',
      withCredentials: true,
      data: pessoa,
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    //  return axios.post(API_URL + "pessoas", pessoa);
  }
  remover(id,token) {
    return axios({
      method: 'delete',
      url: API_URL + 'pessoas/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    //  return axios.delete(API_URL + "pessoas/" + id);
  }
  atualizar(id, pessoa,token) {
    return axios({
      method: 'put',
      url: API_URL + 'pessoas/' + id,
      withCredentials: true,
      data: pessoa,
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    //  return axios.put(API_URL + "pessoas/" + id, pessoa);
  }
  /*---------------------------------------------------------------------------------------------*/
}
