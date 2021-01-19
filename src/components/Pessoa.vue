<template>
  <div class="p-grid">
    <Toast />
    <div class="p-col-12 p-md-12">
      <Panel header="Consumindo @Api de Pessoa" style="height: 100%">
        <Menubar :model="items" />
        <br />
        <DataTable
          :value="pessoas"
          :paginator="true"
          :rows="10"
          v-model:selection="selecionaPessoa"
          selectionMode="single"
          dataKey="id"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
          class="p-datatable-responsive-demo"
          @click="exibirDelAlter()"
        >
          <template #header>
            <div class="table-header">
              <h5 class="p-m-0"></h5>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Buscar..." />
              </span>
            </div>
          </template>
          <Column field="id" header="#" :sortable="true"></Column>
          <Column field="nome" header="Nome" :sortable="true"></Column>
          <Column field="dataNascimento" header="Data de Nascimento" :sortable="true"></Column>
          <Column field="sexo" header="Sexo" :sortable="true"></Column>
          <Column field="cpf" header="Cpf" :sortable="true"></Column>
        </DataTable>
      </Panel>
    </div>

    <!--MODAL CADASTRAR-->
    <Dialog
      v-model:visible="pessoaDialog"
      :style="{ width: '800px' }"
      header="Ficha de Cadastro"
      :modal="true"
      class="p-fluid"
    >
      <hr />
      <div class="p-shadow-4" style="padding: 30px">
        <div class="p-text-bold">
          <h5>Informações Pessoais</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="nome">Nome</label>
            <InputText
              id="nome"
              :class="{ 'p-invalid': submitted && !pessoa.nome }"
              v-model="pessoa.nome"
              autofocus
            />
            <small class="p-invalid" v-if="submitted && !pessoa.nome"
              >Nome é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="email">Email</label>
            <InputText
              id="email"
              :class="{ 'p-invalid': submitted && !pessoa.email }"
              v-model="pessoa.email"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.email"
              >Email é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="cpf">CPF</label>
            <InputMask
              id="cpf"
              mask="999.999.999-99"
              :class="{ 'p-invalid': submitted && !pessoa.cpf }"
              v-model="pessoa.cpf"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cpf"
              >Cpf é Obrigatorio.</small
            >
          </div>
        </div>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="sus">Cartão SUS</label>
            <InputMask
              id="sus"
              mask="999 9999 9999 9999"
              :class="{ 'p-invalid': submitted && !pessoa.cartaoSus }"
              v-model.trim="pessoa.cartaoSus"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cartaoSus"
              >Cartão SUS é Obrigatorio.</small
            >
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label for="dataNascimento">Data de Nascimento</label>
            <Calendar
              id="dataNascimento"
              v-model="pessoa.dataNascimento"
              :showIcon="true"
              :class="{ 'p-invalid': submitted && !pessoa.dataNascimento }"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.dataNascimento"
              >Data de Nascimento é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="sexo">Sexo</label>
              <!-- ESSE AKI e DO CADASTRAR -->
            <Dropdown
              id="sexo"
              :options="sexo"
              optionLabel="nome" 
              optionValue="code"
              placeholder="Selecione"
              :class="{ 'p-invalid': submitted && !pessoa.sexo }"
              v-model="pessoa.sexo"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.sexo"
              >Sexo é Obrigatorio.</small
            >
          </div>
        </div>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="rg">Rg</label>
            <InputMask
              id="rg"
              mask="99.999.999-9"
              :class="{ 'p-invalid': submitted && !pessoa.rg }"
              v-model="pessoa.rg"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.rg"
              >RG é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="dataEmissao">Data da Emissão</label>
            <Calendar
              id="dataEmissao"
              v-model="pessoa.dataEmissaoRg"
              :showIcon="true"
              :class="{ 'p-invalid': submitted && !pessoa.dataEmissaoRg }"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.dataEmissaoRg"
              >Data da Emissão é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="orgEmissor">Orgão Emissor</label>
            <InputText
              id="orgEmissor"
              :class="{ 'p-invalid': submitted && !pessoa.orgaoEmissorRg }"
              v-model="pessoa.orgaoEmissorRg"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.orgaoEmissorRg"
              >Orgão Emissor é Obrigatorio.</small
            >
          </div>
        </div>
      </div>

      <br />
      <div class="p-shadow-4" style="padding: 30px">
        <div class="p-text-bold">
          <h5>Informações Residenciais</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="cep">Cep</label>
            <InputMask
              id="cep"
              mask="99999-999"
              :class="{ 'p-invalid': submitted && !pessoa.cep }"
              v-model="pessoa.cep"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cep"
              >Cep é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="logradouro">Logradouro</label>
            <InputText
              id="logradouro"
              :class="{ 'p-invalid': submitted && !pessoa.logradouro }"
              v-model="pessoa.logradouro"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.logradouro"
              >Logradouro é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="bairro">Bairro</label>
            <InputText
              id="bairro"
              :class="{ 'p-invalid': submitted && !pessoa.bairro }"
              v-model="pessoa.bairro"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.bairro"
              >Bairro é Obrigatorio.</small
            >
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="numero">Nº</label>
            <InputText id="numero" />
          </div>
          <div class="p-field p-col-12 p-md-9">
            <label for="complemento">Complemento</label>
            <InputText id="complemento" />
          </div>
        </div>
        <div class="p-text-bold">
          <h5>Informações de Contato</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="tel1">Telefone 1 </label>
            <InputMask
              id="tel1"
              mask="(99) 99999-9999"
              :class="{ 'p-invalid': submitted && !pessoa.telefone }"
              v-model="pessoa.telefone"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.telefone"
              >Telefone 1 é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="tel2">Telefone 2</label>
            <InputMask
              id="tel2"
              mask="(99) 99999-9999"
              :class="{ 'p-invalid': submitted && !pessoa.telefone2 }"
              v-model="pessoa.telefone2"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.telefone2"
              >Telefone 2 é Obrigatorio.</small
            >
          </div>
        </div>
      </div>
      <hr />
      <template #footer>
        <Button label="Salvar" icon="pi pi-check" @click="salvarPessoa" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" />
      </template>
    </Dialog>

    <!--FIM MODAL CADASTRAR-->

    <!--INICIO MODAL DELETAR-->
    <Dialog
        v-model:visible="deletaPessoaDialog"
        :style="{ width: '450px' }"
        header="Mensagem de Confirmação!"
        :modal="true"
        >
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
          <span v-if="pessoa">Tem certeza de que deseja excluir o registro
            <b> {{selecionaPessoa.nome }} </b>?
          </span>
        </div>
      <template #footer>
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deletarPessoa()"
        />
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletaPessoaDialog = false"
        />
      </template>
    </Dialog>
    <!--FIM MODAL DELETAR-->


    <!--MODAL ATUALIZAR-->
    <Dialog
      v-model:visible="alteraPessoaDialog"
      :style="{ width: '800px' }"
      header="Atualização de Registro"
      :modal="true"
      class="p-fluid"
    >
      <hr />
      <div class="p-shadow-4" style="padding: 30px">
        <div class="p-text-bold">
          <h5>Informações Pessoais</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="nome">Nome</label>
            <InputText
              id="nome"
              :class="{ 'p-invalid': submitted && !pessoa.nome }"
              v-model="pessoa.nome"
              autofocus
            />
            <small class="p-invalid" v-if="submitted && !pessoa.nome"
              >Nome é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="email">Email</label>
            <InputText
              id="email"
              :class="{ 'p-invalid': submitted && !pessoa.email }"
              v-model="pessoa.email"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.email"
              >Email é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="cpf">CPF</label>
            <InputMask
              id="cpf"
              mask="999.999.999-99"
              :class="{ 'p-invalid': submitted && !pessoa.cpf }"
              v-model="pessoa.cpf"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cpf"
              >Cpf é Obrigatorio.</small
            >
          </div>
        </div>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="sus">Cartão SUS</label>
            <!--
            <InputMask
              id="sus"
              mask="999 9999 9999 9999"
              :class="{ 'p-invalid': submitted && !pessoa.cartaoSus }"
              v-model.trim="pessoa.cartaoSus"
            />-->
            <InputText
              id="sus"
              :class="{ 'p-invalid': submitted && !pessoa.cartaoSus }"
              v-model.trim="pessoa.cartaoSus"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cartaoSus"
              >Cartão SUS é Obrigatorio.</small
            >
          </div>

          <div class="p-field p-col-12 p-md-4">
            <label for="dataNascimento">Data de Nascimento</label>
            <Calendar
              id="dataNascimento"
              v-model="pessoa.dataNascimento"
              :showIcon="true"
              :class="{ 'p-invalid': submitted && !pessoa.dataNascimento }"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.dataNascimento"
              >Data de Nascimento é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="sexo">Sexo</label>
            <Dropdown
              id="sexo"
              :options="sexo"
              optionLabel="nome" 
              optionValue="code"
              :class="{ 'p-invalid': submitted && !pessoa.sexo }"
              v-model="pessoa.sexo"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.sexo"
              >Sexo é Obrigatorio.</small>

          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="rg">Rg</label>
            <InputMask
              id="rg"
              mask="99.999.999-9"
              :class="{ 'p-invalid': submitted && !pessoa.rg }"
              v-model="pessoa.rg"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.rg"
              >RG é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="dataEmissao">Data da Emissão</label>
            <Calendar
              id="dataEmissao"
              v-model="pessoa.dataEmissaoRg"
              :showIcon="true"
              :class="{ 'p-invalid': submitted && !pessoa.dataEmissaoRg }"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.dataEmissaoRg"
              >Data da Emissão é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="orgEmissor">Orgão Emissor</label>
            <InputText
              id="orgEmissor"
              :class="{ 'p-invalid': submitted && !pessoa.orgaoEmissorRg }"
              v-model="pessoa.orgaoEmissorRg"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.orgaoEmissorRg"
              >Orgão Emissor é Obrigatorio.</small
            >
          </div>
        </div>
      </div>
      <br />
      <div class="p-shadow-4" style="padding: 30px">
        <div class="p-text-bold">
          <h5>Informações Residenciais</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="cep">Cep</label>
            <InputMask
              id="cep"
              mask="99999-999"
              :class="{ 'p-invalid': submitted && !pessoa.cep }"
              v-model="pessoa.cep"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.cep"
              >Cep é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="logradouro">Logradouro</label>
            <InputText
              id="logradouro"
              :class="{ 'p-invalid': submitted && !pessoa.logradouro }"
              v-model="pessoa.logradouro"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.logradouro"
              >Logradouro é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="bairro">Bairro</label>
            <InputText
              id="bairro"
              :class="{ 'p-invalid': submitted && !pessoa.bairro }"
              v-model="pessoa.bairro"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.bairro"
              >Bairro é Obrigatorio.</small
            >
          </div>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="numero">Nº</label>
            <InputText id="numero" />
          </div>
          <div class="p-field p-col-12 p-md-9">
            <label for="complemento">Complemento</label>
            <InputText id="complemento" />
          </div>
        </div>
        <div class="p-text-bold">
          <h5>Informações de Contato</h5>
        </div>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="tel1">Telefone 1 </label>
            <InputMask
              id="tel1"
              mask="(99) 99999-9999"
              :class="{ 'p-invalid': submitted && !pessoa.telefone }"
              v-model="pessoa.telefone"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.telefone"
              >Telefone 1 é Obrigatorio.</small
            >
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="tel2">Telefone 2</label>
            <InputMask
              id="tel2"
              mask="(99) 99999-9999"
              :class="{ 'p-invalid': submitted && !pessoa.telefone2 }"
              v-model="pessoa.telefone2"
            />
            <small class="p-invalid" v-if="submitted && !pessoa.telefone2"
              >Telefone 2 é Obrigatorio.</small
            >
          </div>
        </div>
      </div>
      <hr />
      <template #footer>
        <Button label="Alterar" icon="pi pi-check" @click="alterarPessoa()" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="alteraPessoaDialog = false" />
      </template>
    </Dialog>

    <!--FIM MODAL ATUALIZAR-->
  </div>
</template>

<script>
import PessoaService from "../service/PessoaService";

export default {
  data() {
    return {
      pessoa: {
        email: null,
        cartaoSus: null,
        nome: null,
        sexo: null,
        rg: null,
        dataEmissaoRg: null,
        orgaoEmissorRg: null,
        dataNascimento: null,
        cpf: null,
        logradouro: null,
        bairro: null,
        cep: null,
        telefone: null,
        telefone2: null,
      },
      pessoas: null,
      selecionaPessoa: null,
      pessoaDialog: false,
      deletaPessoaDialog: false,
      alteraPessoaDialog: false,
      submitted: false,
      filters: {},
      sexo: [
        { nome: "Masculino", code: "M" },
        { nome: "Femino", code: "F" },
        { nome: "Outros", code: "O" },
      ],
      items: [
        {
          label: "Novo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.items[1].disabled = true;
            this.items[2].disabled = true;
            this.abrirCadastrar();
          },
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          disabled: true,
          command: () => {
            this.abrirEditar();
          },
        },
        {
          label: "Deletar",
          icon: "pi pi-fw pi-trash",
          disabled: true,
          command: () => {
            this.abrirDeletar();
          },
        },
        {
          label: "Atualizar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.listarPessoas();
          },
        },
      ],
    };
  },
  pessoasService: null,
  created() {
    this.pessoasService = new PessoaService();
  },
  mounted() {
    this.listarPessoas();
  },
  methods: {
    listarPessoas() {
      this.pessoasService.listar().then((data) => {
        this.pessoas = data.data;
      });
    },
    abrirCadastrar() {
      this.submitted = false;
      this.pessoaDialog = true;

      this.items[1].disabled = true;
      this.items[2].disabled = true;
      this.pessoa = {
            email: null,
            cartaoSus: null,
            nome: null,
            sexo: null,
            rg: null,
            dataEmissaoRg: null,
            orgaoEmissorRg: null,
            dataNascimento: null,
            cpf: null,
            logradouro: null,
            bairro: null,
            cep: null,
            telefone: null,
            telefone2: null,
      };
   },
    abrirDeletar(){
      this.deletaPessoaDialog =  true;
    },
    abrirEditar(){
      this.pessoa = this.selecionaPessoa;
      this.pessoa.sexo = this.selecionaPessoa.sexo;
      this.alteraPessoaDialog = true
    },
    exibirDelAlter() {
      this.items.[1].disabled =  false;
      this.items.[2].disabled =  false;
    },
    salvarPessoa() {
      this.submitted = true;
      //this.pessoa.sexo = this.pessoa.sexo.code;

      
      this.pessoasService.criar(this.pessoa).then((data) => {
        if (data.status === 201) {
          console.log(data);
          this.pessoaDialog = false;
          this.pessoa = {
            email: null,
            cartaoSus: null,
            nome: null,
            sexo: null,
            rg: null,
            dataEmissaoRg: null,
            orgaoEmissorRg: null,
            dataNascimento: null,
            cpf: null,
            logradouro: null,
            bairro: null,
            cep: null,
            telefone: null,
            telefone2: null,
          };
          this.listarPessoas();
          this.$toast.add({
            severity: "success",
            summary: "Alerta!",
            detail: "Pessoa cadastrada com sucesso.",
          });
        }
      });
      
    },
    alterarPessoa(){
      this.submitted = true;
      this.pessoasService.atualizar(this.selecionaPessoa.id,this.pessoa).then( data => {
          if (data.status === 200) {
            //console.log(data.data);
            this.$toast.add({
              severity:'success',
              summary: 'Alerta!', 
              detail:'Pessoa alterado com sucesso!'});
              this.alteraPessoaDialog = false;
          } 
      });
    },
    deletarPessoa(){
      this.pessoasService.remover(this.selecionaPessoa.id).then( data => {
        if (data.status === 204) {
          this.listarPessoas();
          this.$toast.add({
            severity:'success',
            summary: 'Alerta!', 
            detail:'Pessoa excluida com  sucesso.'});
          this.deletaPessoaDialog = false;
        }
      });
    },
    /*
    formatadata(data) {
      var dia = data.split("/")[0];
      var mes = data.split("/")[1];
      var ano = data.split("/")[2];

      return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    },*/
  },
};
</script>

<style scoped lang="scss">
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  ::v-deep(.p-datatable) {
    &.p-datatable-responsive-demo {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 100%;
        float: left;
        clear: left;
        border: 0 none;

        .p-column-title {
          padding: 0.4rem;
          min-width: 30%;
          display: inline-block;
          margin: -0.4em 1em -0.4em -0.4rem;
          font-weight: bold;
        }

        &:last-child {
          border-bottom: 1px solid var(--surface-d);
        }

        .p-rating {
          display: inline-block;
        }
      }
    }
  }
}
</style>
