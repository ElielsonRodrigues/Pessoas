import axios from "axios";

export default class AuthService {


    //  LOGIN ACESSTOKEN
    login(usuario, senha) {
        return axios({
            method: 'post',
            url: 'http://192.168.111.23:8080/oauth/token',
            withCredentials: true,
            data: 'username=' + usuario + '&password=' + senha + '&grant_type=password',
            headers: {
                'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }
    //  LOGOUT ACESSTOKEN
    logout() {
        let token = localStorage.getItem('token');
        token = JSON.parse(token);
        return axios({
            method: 'delete',
            url: 'http://192.168.111.23:8080/tokens/revoke',
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            },
        });
    }
    //  REFRESH TOKEN
    obterNovoAccessToken() {
        axios({
            method: 'post',
            url: 'http://192.168.111.23:8080/oauth/token',
            withCredentials: true,
            data: 'grant_type=refresh_token',
            headers: {
                'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function (response) {
            const authService = new AuthService();
            //console.log('AcessToken: ' + response.data.access_token);
            if (response.data.access_token) {
                console.log('Novo access token criado!');
                authService.armazenaToken(response.data);
            }
        }).catch(function (error) {
            console.log("Post Error : " + error);
        });
    }
    //  VERIFICA SE EXISTE ALGUM TOKEN EM LOCAL STORAGE
    verificarTokenExistente() {
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        //console.log(token)
        if (token === null || token === "") {
            // console.log('não tem token');
            return false;
        } else {
            //  console.log('Tem token');
            return true;
        }
    }
    verificaAccessTokenInvalido() {
       
    }
    
    //  LIMPANDO TOKEN DO LOCAL STORAGE
    limparAccessToken() {
        localStorage.removeItem('token');
    }
    //  ARMAZENANDO TOKEN EM LOCAL STORAGE
    armazenaToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }


}