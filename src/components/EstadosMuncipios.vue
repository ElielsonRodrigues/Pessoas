<template>
  <div class="p-grid">
    <div class="p-col-12 p-md-4">
      <Panel header="Consumindo @Api de Estado/Municipio" style="height: 100%">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 ">
            <label for="estados">Estados:</label>
            <Dropdown
              id="estados"
              v-model="selecionaEstado"
              :options="estados"
              optionLabel="nome"
              placeholder="Selecione um Estado:"
              :filter="true"
              @change ="infoEstadoMunicipio()"
            ></Dropdown>
          </div>
        </div>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 ">
            <label for="municipios">Municipios {{estado.nome}}:</label>
            <Dropdown
              id="municipios"
              v-model="selecionaMunicipio"
              :options="municipios"
              optionLabel="nome"
              placeholder="Selecione um Municipio:"
              :filter="true"
            ></Dropdown>
          </div>
        </div>
        <hr>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 ">
              <p>Nome: {{estado.nome}}</p>
              <p>Sigla: {{estado.sigla}}</p>
              <p>Codido IBGE{{estado.codigoIbgeEstado}}</p>
              <p>ID: {{estado.id}}</p>
          </div>
        </div>
       </Panel>
    </div>
  </div>
</template>


<script>

import EstadosMunicipiosService from '../service/EstadosMunicipiosService'

export default {
  data() {
    return {
        estados: null,
        estado: {
          codigoIbgeEstado: null,
          id: null,
          nome:null,
          sigla: null
        },
        selecionaEstado: null,
        municipios: null,
        selecionaMunicipio: null
    }
  },
  estadosMunicipiosService: null,
  created() {
    this.estadosMunicipiosService = new EstadosMunicipiosService();
  },
  mounted() {
    this.listarEstados();
  },    
  methods: {
      listarEstados(){
          this.estadosMunicipiosService.listar().then(data => {
            this.estados =  data.data;
            //console.log(this.estados);
          });
      },
      buscarPeloCodigo() {
          this.estadosMunicipiosService.buscarPeloCodigo(this.estado.id).then(data => {
            //this.estados =  data.data;
            console.log(data.data);
          });
      },
      listarMunicipiosPorEstado(){
          this.estadosMunicipiosService.listarMunicipiosPorEstado(this.estado.id).then(data => {
            this.municipios =  data.data;
            console.log(this.municipios);
          });
      },
      infoEstadoMunicipio(){
        this.estado =  this.selecionaEstado;
        //console.log(this.estado);
        //console.log(this.estado.id);
        //console.log(this.buscarPeloCodigo());
        console.log(this.listarMunicipiosPorEstado());



      }

  }
};
</script>
