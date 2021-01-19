<template>
  <div class="p-grid p-col-12">
    <Toast />
    <!-- INICIO FORM LOGIN-->
    <div class="p-col-12 p-lg-3 fullScreen">
      <div class="p-shadow-4 formlogin login">
        <!--header form 30%-->
        <div class="headerForm">
          <div class="p-d-flex p-ai-center p-jc-center img-responsive">
            <img src="assets/layout/images/ctis.png" alt="SESPA" width="450" />
          </div>
        </div>
        <!-- FIM header form -->
        <!--INICIO BODY FORM LOGIN-->
        <div class="bodyForm">
          <div class="p-d-flex p-ai-center p-jc-center p-fluid p-grid">
            <div class="p-field p-col-8 p-md-7 p-shadow-4 formulario">
              <form @submit.prevent="logar()">
                <div class="p-d-flex p-ai-center p-jc-center">
                  <label for="usuario"></label>
                  <InputText
                    id="usuario"
                    class="p-col-8 p-text-center"
                    :class="{ 'p-invalid': submitted && !usuario }"
                    placeholder="Usuario"
                    type="text"
                    autofocus
                    v-model="usuario"
                  />
                </div>
                <div class="p-field p-d-flex p-ai-center p-jc-center">
                  <small class="p-invalid" v-if="submitted && !usuario"
                    >Informe o usuario!</small
                  >
                </div>
                <div class="p-d-flex p-ai-center p-jc-center">
                  <label for="senha"></label>
                  <InputText
                    id="senha"
                    class="p-col-8 p-text-center"
                    :class="{ 'p-invalid': submitted && !senha }"
                    placeholder="Senha"
                    type="password"
                    v-model="senha"
                  />
                </div>
                <div class="p-field p-d-flex p-ai-center p-jc-center">
                  <small class="p-invalid" v-if="submitted && !senha"
                    >Informe a senha!</small
                  >
                </div>
                <div class="p-d-flex p-ai-center p-jc-center">
                  <a href="#" @click="esqueceuSenha()">Esqueceu sua senha?</a>
                </div>
                <br />

                <div class="p-d-flex p-ai-center p-jc-center">
                  <Button
                    label="Acessar"
                    icon="pi pi-sign-in"
                    class="p-col-8 p-button-info"
                    type="submit"
                  ></Button>
                </div>

                <br />
                <div class="p-d-flex p-ai-center p-jc-center">
                  <Button
                    label="Registre-se"
                    icon="pi pi-user-plus"
                    class="p-col-8 p-button-success"
                    @click="registrar()"
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!--fim body form -->
        <!--footer form 20%-->
        <div class="layout-footer footer">
          <div class="p-text-left">
            <div class="p-text-center">
              <span class="footer-text"
                >&copy; CTIS - Coordenação de Tecnologia em Saúde
              </span>
            </div>
          </div>
        </div>
        <!--footer form -->
      </div>
    </div>
    <!--FIM FORM LOGIN-->

    <!--INICIO PAINEL LOGIN-->
    <div class="p-col-12 p-lg-9 fullScreen">
      <div class="p-shadow-4 formPainel painel">
        <!--HEADER PAINEL -->
        <div class="headerPainel">
          <div class="p-d-flex p-ai-center p-jc-center"></div>
        </div>
        <!--FIM HEADER PAINEL-->
        <!--BODY PAINEL-->
        <div class="bodyPainel">
          <!--
          <div class="p-d-flex p-ai-center p-jc-center">
            <div class="p-col-12 p-lg-7">
              <Carousel
                :value="products"
                :numVisible="1"
                :numScroll="1"
                :responsiveOptions="responsiveOptions"
                class="custom-carousel"
                :circular="true"
                :autoplayInterval="3000"
              >
                <template #header>
                  <div class="p-col-12 p-d-flex p-ai-center p-jc-center"></div>
                </template>
                <template #item="slotProps">
                  <div class="product-item">
                    <div class="product-item-content">
                      <div class="p-mb-3">
                        <img
                          :src="'assets/layout/images/product/'+slotProps.data.image"
                          :alt="slotProps.data.name"
                          class="product-image"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div>
          </div>
          -->
        </div>
        <!--FIM BODY PAINEL-->
        <!--FOOTER PAINEL-->
        <div class="footerPainel">
          <div class="layout-footer footer">
            <div class="p-text-right">
              <img
                src="assets/layout/images/sespa.png"
                alt="SESPA"
                width="105"
              />
            </div>
          </div>
        </div>
        <!--FIM FOOTER PAINEL-->
      </div>
    </div>
    <!-- FIM INICIO PAINEL LOGIN-->

    <!--MODAL CADASTRAR-->
    <Dialog
      v-model:visible="usuarioDialog"
      :style="{ width: '500px' }"
      :modal="true"
    >
      <template #header>
        <h3>Cadastro de Usuario</h3>
      </template>
      <br />
      <div class="p-shadow-4" style="padding: 30px">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="nome">Nome</label>
            <span class="p-input-icon-left">
              <i class="pi pi-user" />
              <InputText id="nome" class="p-inputtext-lg" autofocus />
            </span>
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="cpf">CPF</label>
            <span class="p-input-icon-left">
              <i class="pi pi-id-card" />
              <InputMask
                id="cpf"
                class="p-inputtext-lg"
                mask="999.999.999-99"
              />
            </span>
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="contato">Contato</label>
            <span class="p-input-icon-left">
              <i class="pi pi-mobile" />
              <InputMask
                id="contato"
                class="p-inputtext-lg"
                mask="(99) 99999-9999"
              />
            </span>
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="email">Email</label>
            <span class="p-input-icon-left">
              <i class="pi pi-envelope" />
              <InputText id="email" class="p-inputtext-lg" type="email" />
            </span>
          </div>
        </div>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="senha">Senha</label>
            <span class="p-input-icon-left">
              <i class="pi pi-lock" />
              <InputText id="senha" class="p-inputtext-lg" type="password" />
            </span>
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="confSenha">Confirmar Senha</label>
            <span class="p-input-icon-left">
              <i class="pi pi-lock" />
              <InputText
                id="confSenha"
                class="p-inputtext-lg"
                type="password"
              />
            </span>
          </div>
        </div>
      </div>
      <hr />
      <template #footer>
        <Button
          label="Salvar"
          icon="pi pi-check"
          class="p-button-raised p-button-info"
          @click="salvarUsuario()"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-raised p-button-danger"
          @click="usuarioDialog = false"
        />
      </template>
    </Dialog>
    <!--FIM MODAL CADASTRAR-->

    <!-- MODAL ESQUECEU SENHA-->
    <Dialog
      header="Recuperção de Senha"
      v-model:visible="esqueceuSenhaDialog"
      :style="{ width: '450px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label for="confSenha">Informe o Email</label>
            <span class="p-input-icon-left">
              <i class="pi pi-envelope" />
              <InputText id="confSenha" class="p-inputtext-lg" type="email" />
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="Enviar"
          icon="pi pi-check"
          @click="enviarSenha()"
          class="p-button-raised p-button-info"
          autofocus
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="esqueceuSenhaDialog = false"
          class="p-button-raised p-button-danger"
        />
      </template>
    </Dialog>
    <!--FIM MODAL ESQUECEU SENHA-->
  </div>
</template>

<script>
import ProductService from "./service/ProductService";
import AuthService from "./service/auth/AuthService";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      products: null,
      usuario: null,
      senha: null,
      submitted: false,
      usuarioDialog: false,
      esqueceuSenhaDialog: false,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  produtoService: null,
  authService: null,
  created() {
    this.productService = new ProductService();
    this.authService = new AuthService();
    if (this.authService.verificarTokenExistente() == true) {
      this.$router.push("/appSystem");
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data.slice(0, 9)));
  },
  methods: {
    async logar() {
      this.authService
        .login(this.usuario, this.senha)
        .then((response) => {
          this.authService.armazenaToken(response.data);
          this.$router.push("/appSystem");
        })
        .catch((request) => {
          this.$toast.add({
            severity: "error",
            summary: "Atenção!",
            detail: "Usuario e senha incorretos, tente novamente!",
          });
          console.log("Não Autenticado - " + request);
        });
    },
    registrar() {
      this.usuarioDialog = true;
    },
    esqueceuSenha() {
      this.esqueceuSenhaDialog = true;
    },
  },
};
</script>

<style scoped>
.content {
  color: #ffffff;
  display: table-cell;
  vertical-align: middle;
  padding: 7%;
}
.product-item-content {
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}
.product-image {
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.fullScreen {
  height: 100vh;
  overflow: hidden;
}
.formlogin {
  height: 99%;
  margin-top: 3px;
  margin-left: 10px;
}
.formPainel {
  margin-top: 3px;
  height: 99%;
  margin-left: 10px;
}
.login {
  background-color: white;
  background-image: radial-gradient(#f8f8f8, #ffffff);
}
.painel {
  background-color: #0288d1;
  background-image: radial-gradient(#4169e1, #0288d1);
}
.headerForm {
  height: 40%;
}
.bodyForm {
  height: 53%;
}
.headerPainel {
  height: 20%;
}
.bodyPainel {
  height: 72%;
}
.layout-footer {
  background-color: #dddddd;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.cadastro {
  background-color: #0288d1;
  background-image: radial-gradient(#4169e1, #0288d1);
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
.formulario {
  width: 80%;
  padding: 10%;
}
</style>