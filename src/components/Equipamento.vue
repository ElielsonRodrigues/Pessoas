<template>
  <div class="p-grid">
    <Toast />
    <div class="p-col-12 p-md-12">
      <Panel header="Consumindo @Api de Equipamento" style="height: 100%">
        <Menubar :model="items" />
        <br />
        <DataTable
          :value="equipamentos"
          :paginator="true"
          :rows="5"
          v-model:selection="selecionaEquipamento"
          selectionMode="single"
          dataKey="id"
          @click="exibirDelAlter()"
        >
          <Column field="id" header="#"></Column>
          <Column field="nome" header="Nome"></Column>
          <Column field="descricao" header="Descricão"></Column>
        </DataTable>
      </Panel>
    </div>

    <!--MODAL CADASTRAR-->
    <Dialog
      v-model:visible="equipDialog"
      :style="{ width: '450px' }"
      header="Cadastro de Equipamento"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="nome">Nome :</label>
        <InputText
          id="nome"
          v-model.trim="equipamento.nome"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !equipamento.nome }"
        />
        <small class="p-invalid" v-if="submitted && !equipamento.nome"
          >Nome é Obrigatorio.</small
        >
      </div>
      <div class="p-field">
        <label for="descricao">Descrição :</label>
        <Textarea
          id="descricao"
          v-model="equipamento.descricao"
          required="true"
          rows="3"
          cols="20"
          :class="{ 'p-invalid': submitted && !equipamento.nome }"
        />
        <small class="p-invalid" v-if="submitted && !equipamento.descricao"
          >Descricão é Obrigatorio.</small
        >
      </div>
      <template #footer>
        <Button
          label="Salvar"
          icon="pi pi-check"
          class="p-button-text"
          @click="salvarEquipamento"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="equipDialog = false"
        />
      </template>
    </Dialog>
    <!--FIM MODAL CADASTRAR-->

    <!--MODAL ATUALIZAR-->
    <Dialog
      v-model:visible="equipAtuaDialog"
      :style="{ width: '450px' }"
      header="Editando Equipamento"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="nome">Nome :</label>
        <InputText
          id="nome"
          v-model.trim="equipamento.nome"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !equipamento.nome }"
        />
        <small class="p-invalid" v-if="submitted && !equipamento.nome"
          >Nome é Obrigatorio.
        </small>
      </div>
      <div class="p-field">
        <label for="descricao">Descrição :</label>
        <Textarea
          id="descricao"
          v-model="equipamento.descricao"
          required="true"
          rows="3"
          cols="20"
          :class="{ 'p-invalid': submitted && !equipamento.nome }"
        />
        <small class="p-invalid" v-if="submitted && !equipamento.descricao">Descricão é Obrigatorio.</small>
      </div>
      <template #footer>
        <Button
          label="Editar"
          icon="pi pi-check"
          class="p-button-text"
          @click="alterarEquipamento()"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="equipAtuaDialog = false"
        />
      </template>
    </Dialog>
    <!--FIM MODAL ATUALIZAR-->

    <Dialog
      v-model:visible="deletaEquipamentoDialog"
      :style="{ width: '450px' }"
      header="Mensagem de Confirmação!"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="equipamento"
          >Tem certeza de que deseja excluir o registro
          <b> {{ selecionaEquipamento.nome }} </b>?
        </span>
      </div>
      <template #footer>
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="deletarEquipamento()"
        />
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletaEquipamentoDialog = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import EquipamentosService from "../service/EquipamentoService";

export default {
  data() {
    return {
      equipamento: {
        id: null,
        nome: null,
        descricao: null,
      },
      equipamentos: null,
      equipDialog: false,
      equipAtuaDialog: false,
      submitted: false,
      deletaEquipamentoDialog: null,
      selecionaEquipamento: null,
      items: [
        {
          label: "Novo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.abrirCadastrar();
            this.items.[1].disabled = true;
            this.items.[2].disabled = true;
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
            this.listarEquipamentos();
          },
        },
      ],
    };
  },
  equipamentosService: null,
  created() {
    this.equipamentosService = new EquipamentosService();
  },
  mounted() {
    this.listarEquipamentos();
  },
  methods: {
    abrirCadastrar() {
      this.submitted = false;
      this.equipDialog = true;
      this.selecionaEquipamento = null;
      this.equipamento = {
            nome: null,
            descricao: null,
      };
      this.items.[1].disabled =  false;
      this.items.[2].disabled =  false;

    },
    abrirDeletar() {
      this.deletaEquipamentoDialog = true;
    },
    abrirEditar() {
      this.equipamento = this.selecionaEquipamento;
      this.equipAtuaDialog = true;
    },
    listarEquipamentos() {
      this.equipamentosService.listar().then((data) => {
        this.equipamentos = data.data;
        //console.log(this.estados);
      });
    },
    salvarEquipamento() {
      this.submitted = true;
      this.equipamentosService.criar(this.equipamento).then((data) => {
        if (data.status === 201) {
          this.equipDialog = false;
          this.equipamento = {
            nome: null,
            descricao: null,
          };
          this.listarEquipamentos();
          this.$toast.add({
            severity: "success",
            summary: "Alerta!",
            detail: "Equipamento cadastrado com sucesso.",
          });
        }
      });
    },
    alterarEquipamento(){
      this.equipamentosService. atualizar(this.selecionaEquipamento.id,this.equipamento).then( data => {
          if (data.status === 200) {
            //console.log(data.data);
            this.$toast.add({
              severity:'success',
              summary: 'Alerta!', 
              detail:'Equipamento alterado com sucesso!'});
              this.equipAtuaDialog = false;
          } 
      });

    },
    deletarEquipamento() {
      this.equipamentosService.remover(this.selecionaEquipamento.id).then( data => {
          if (data.status === 204) {
            this.listarEquipamentos();
            this.$toast.add({
              severity:'success',
              summary: 'Alerta!', 
              detail:'Equipamento excluido com  sucesso.'});
            this.deletaEquipamentoDialog = false;
          }
      });
    },
    exibirDelAlter() {
      this.items.[1].disabled =  false;
      this.items.[2].disabled =  false;
    },
  },
};
</script>
