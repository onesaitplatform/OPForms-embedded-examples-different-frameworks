<template>
  <div id="app">
    <script type="application/javascript" v-bind:src="
        platformbase +
        '/controlpanel/static/formsio/formiojs/dist/formio.full.js'
      "></script>
    <script type="application/javascript" v-bind:src="platformbase + '/controlpanel/static/js/pages/forms.js'"></script>
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item disabled>
            <img alt="OneSait" src="./assets/onesait.svg" style="height: 50px" /></el-menu-item>
          <el-menu-item index="1" @click=" activeIndex = '1'">Form List</el-menu-item>
          <!-- <el-menu-item index="2">Show form</el-menu-item>-->
          <el-menu-item index="2" @click=" activeIndex = '2'">Show form</el-menu-item>

          <LoginComponent class="pull-right" style="margin-top: 10px;margin-right: 20px;"
            v-bind:platformbase="platformbase" v-bind:auth="auth" @dataLogin="getLoginData($event)"></LoginComponent>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div v-if="activeIndex === '1'">
          <el-container style="height: 93.8vh">
            <el-card shadow="hover" class="box-card" style="
                height: 100%;
                width: 100%;
                border: 1px solid #eee;
                overflow-y: auto;
                margin-top:10px;
                margin-bottom:10px;
              ">
              <h4>FORMS TEMPLATE LIST</h4>
              <el-col :span="5">
                <el-card class="box-card" style=" margin: 20px;">
                  <el-button size="small" style="margin-top: 15px; background-color: #1168a6" @click="handleUpdateList"
                    type="primary">RELOAD FORM LIST</el-button>
                </el-card>
              </el-col>
              <el-col :span="19" style="padding: 20px">
                <el-table :data="formslist" border empty-text=" " style="width: 100%">
                  <el-table-column prop="name" label="Name"> </el-table-column>
                  <el-table-column prop="code" label="Code"> </el-table-column>
                  <el-table-column prop="entity" label="Entity">
                  </el-table-column>
                  <el-table-column prop="description" label="Description">
                  </el-table-column>
                  <el-table-column label="Options">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="use the code of this form" placement="top-start">
                        <el-button size="mini" @click="handleUseFromList(scope.row)">Use</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="update this form" placement="top-start">
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-card>
          </el-container>
        </div>

        <div v-if="activeIndex === '2'">
          <el-container style="height: 93.8vh">
            <el-card class="box-card" shadow="hover" style="
                height: 100%;
                width: 100%;
                border: 1px solid #eee;
                overflow-y: auto;
                margin-top:10px;
                margin-bottom:10px;
              ">
              <h4>SHOW FORM</h4>
              <el-col :span="5">
                <el-card class="box-card" style=" margin: 20px;">

                  <span>Code Form</span>
                  <el-input placeholder="Please input " v-model="formcode"></el-input>
                  <span>ID Data</span>
                  <el-input placeholder="Please input " v-model="dataoid"></el-input>
                  <el-button size="small" style="margin-top: 15px; background-color: #1168a6" @click="handleUpdateForm"
                    type="primary">SHOW</el-button>
                </el-card>
              </el-col>
              <el-col :span="19" style="padding: 20px">
                <div v-if="showHideForm">
                  <ShowForm v-bind:platformbase="platformbase" v-bind:appbase="appbase"
                    v-bind:authorization="authorization" v-bind:formcode="formcode" v-bind:dataoid="dataoid"
                    v-bind:editForm="false" @interface="getFormInterface" @formredirect="handleRedirect" />
                </div>
              </el-col>
            </el-card>
          </el-container>
        </div>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import ShowForm from "./components/ShowForm.vue";

import LoginComponent from "./components/LoginComponent.vue";

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./services/onesaitPlatformServices";
import {
  loadFormsList,
} from "./services/onesaitPlatformServices";

Vue.use(ElementUI);
export default {
  name: "App",
  components: {
    ShowForm,
    LoginComponent
  },
  data() {
    return {
      activeIndex: "1",
      // host for app base like http:localhost:8080 or https://lab.onesaitplatform.com/web/app
      appbase: "http:localhost:8080",
      // platform host
      platformbase: "https://lab.onesaitplatform.com",
      // header authorization
      auth:'Basic b25lc2FpdHBsYXRmb3JtOm9uZXNhaXRwbGF0Zm9ybQ==',
      authorization: null,
      formcode: "",
      name: "",
      entity: "",
      description: "",
      dataoid: "",
      showHideForm: false,
      entitiesList: [],
      formslist: [],
    };
  },

  methods: {
    handleSelect(key) {
      this.active = key;
      this.showHideForm = false;
    },
    handleRedirect(redirecto) {
      this.dataoid = redirecto.dataoid;
      this.formcode = redirecto.formcode;
      this.handleUpdateForm();
    },
    handleUpdateForm() {
      this.showHideForm = false;
      setTimeout(
        function () {
          this.showHideForm = true;
        }.bind(this),
        2
      );
    },
    handleUpdateList() {
      loadFormsList(this.platformbase, this.authorization).then((res) => {
        this.formslist = res;
      });
      this.showHideForm = false;
      setTimeout(
        function () {
          this.showHideForm = true;
        }.bind(this),
        2
      );
    },
    handleUseFromList(row) {
      this.formcode = row.code;       
      this.activeIndex = "2";
      this.activeIndex = "2";
      this.handleUpdateForm();
    },
    getFormInterface(childInterface) {
      this.$options.childInterface = childInterface;
    },
     
    getLoginData(dat) {
      this.authorization = dat
    }

  },
  mounted: function () {
    window.redirectBy = 'events';
    var HeaderLibs = [
      {
        link: this.platformbase + "/controlpanel/static/formsio/boostrap.css",
        loaded: false,
      },
      {
        link:
          this.platformbase +
          "/controlpanel/static/formsio/formiojs/dist/formio.full.css",
        loaded: false,
      },
      {
        link:
          this.platformbase + "/controlpanel/static/formsio/assets/styles.css",
        loaded: false,
      },
      {
        link:
          this.platformbase +
          "/controlpanel/static/formsio/assets/boostrap-form.css",
        loaded: false,
      },
      {
        link:
          this.platformbase +
          "/controlpanel/static/formsio/assets/form-editor.css",
        loaded: false,
      },
    ];
    var mountCSS = function (link) {
      let l = document.createElement("link");
      l.rel = "stylesheet";
      l.type = "text/css";
      l.href = link;
      document.head.appendChild(l);
    };

    for (var i = 0; i < HeaderLibs.length; i++) {
      if (HeaderLibs[i].loaded === true) {
        continue;
      }
      HeaderLibs[i].loaded = true;
      mountCSS(HeaderLibs[i].link);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-menu-demo {
  width: 100%;
}

h3:after {
  content: "";
  display: block;
  width: 56px;
  height: 3px;
  background-color: #1168a6;
  margin-top: 12px;
}
</style>
