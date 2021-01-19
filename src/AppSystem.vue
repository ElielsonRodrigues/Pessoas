<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <transition name="layout-sidebar">
      <div
        :class="sidebarClass"
        @click="onSidebarClick"
        v-show="isSidebarVisible()"
      >
        <div class="layout-logo">
          <router-link to="/appSystem">
            <img src="assets/layout/images/sespa.png" alt="SESPA" width="210" />
          </router-link>
        </div>
        <br />
        <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
      </div>
    </transition>
    <div class="layout-main">
      <div v-if="pages.Dashboard"><Dashboard /></div>
      <div v-if="pages.Equipamento"><Equipamento /></div>
      <div v-if="pages.EstadosMunicipios"><EstadosMunicipios /></div>
      <div v-if="pages.FormLayoutDemo"><FormLayoutDemo /></div>
      <div v-if="pages.Pessoa"><Pessoa /></div>
      <div v-if="pages.Pessoa2"><Pessoa2 /></div>
      <div v-if="pages.Crud"><Crud /></div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AuthService from "./service/auth/AuthService";

/*COMPONENTS */
import AppTopBar from "./AppTopbar.vue";
import AppMenu from "./AppMenu.vue";
import AppFooter from "./AppFooter.vue";

/*PAGES*/
import Dashboard from "./components/Dashboard.vue";
import Equipamento from "./components/Equipamento.vue";
import EstadosMunicipios from "./components/EstadosMuncipios.vue";
import FormLayoutDemo from "./components/FormLayoutDemo.vue";
import Pessoa from "./components/Pessoa.vue";
import Pessoa2 from "./components/Pessoa2.vue";
import Crud from "./pages/CrudDemo.vue";

export default {
  data() {
    return {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      pages: {
        Dashboard: true,
        Equipamento: false,
        EstadosMunicipios: false,
        FormLayoutDemo: false,
        Pessoa: false,
        Pessoa2: false,
        Crud: false,
      },
      menu: [
        {
          label: "Exemplo Dashboard",
          icon: "pi pi-fw pi-home",
          command: () => {
            this.pages = {};
            this.pages.Dashboard = true;
          },
        },
        {
          label: "Exemplo Formulario",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Form Layout",
              icon: "pi pi-fw pi-id-card",
              command: () => {
                this.pages = {};
                this.pages.FormLayoutDemo = true;
              },
            },
          ],
        },
        {
          label: "Exemplo Crud",
          icon: "pi pi-fw pi-clone",
          items: [
            {
              label: "Crud",
              icon: "pi pi-fw pi-user-edit",
              command: () => {
                this.pages = {};
                this.pages.Crud = true;
              },
            },
          ],
        },
        {
          label: "API-CADEIRAS",
          icon: "pi pi-fw pi-clone",
          items: [
            {
              label: "Consumindo Estados/Municipios",
              icon: "pi pi-fw pi-user-edit",
              command: () => {
                this.pages = {};
                this.pages.EstadosMunicipios = true;
              },
            },
            {
              label: "Consumindo Equipamento",
              icon: "pi pi-fw pi-user-edit",
              command: () => {
                this.pages = {};
                this.pages.Equipamento = true;
              },
            },
            {
              label: "Consumindo Pessoa",
              icon: "pi pi-fw pi-user-edit",
              command: () => {
                this.pages = {};
                this.pages.Pessoa = true;
              },
            },
            {
              label: "Consumindo Pessoa2",
              icon: "pi pi-fw pi-user-edit",
              command: () => {
                this.pages = {};
                this.pages.Pessoa2 = true;
              },
            },
          ],
        },
        {
          label: "Formas de Acesso",
          icon: "pi pi-fw pi-clone",
          items: [
            {
              label: "Formulario de Login",
              icon: "pi pi-fw pi-user-edit",
              to: "/",
            },
          ],
        },
        {
          label: "Sair",
          icon: "pi pi-sign-out",
          command: () => {
            this.logout();
          },
        },
        {
          label: "Renovar Acess Token",
          icon: "pi pi-fw pi-home",
          command: () => {
            //this.$jwt.hasToken()
            this.authService.verificaAccessTokenInvalido();
            //this.renovarAcessToken();
          },
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  authService: null,
  created() {
    this.authService = new AuthService();
    if (this.authService.verificarTokenExistente() == true) {
      this.$router.push("/appSystem");
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }
      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    onLayoutColorChange(layoutColorMode) {
      this.layoutColorMode = layoutColorMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
        else return true;
      } else {
        return true;
      }
    },
    logout() {
      this.authService.logout().then((response) => {
        if (response.status == 204) {
          this.$router.push("/");
          this.authService.limparAccessToken();
        }
      });
    },
    renovarAcessToken() {
      this.authService.obterNovoAccessToken();
      //this.authService.verificaAccessTokenInvalido();
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$appState.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.ripple === false,
        },
      ];
    },
    sidebarClass() {
      return [
        "layout-sidebar",
        {
          "layout-sidebar-dark": this.layoutColorMode === "dark",
          "layout-sidebar-light": this.layoutColorMode === "light",
        },
      ];
    },
    logo() {
      return this.layoutColorMode === "dark"
        ? "assets/layout/images/logo-white.svg"
        : "assets/layout/images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    /*COMPONENTS*/
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppFooter: AppFooter,
    /*PAGES*/
    Dashboard: Dashboard,
    Equipamento: Equipamento,
    EstadosMunicipios: EstadosMunicipios,
    FormLayoutDemo: FormLayoutDemo,
    Pessoa: Pessoa,
    Pessoa2: Pessoa2,
    Crud: Crud,
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
