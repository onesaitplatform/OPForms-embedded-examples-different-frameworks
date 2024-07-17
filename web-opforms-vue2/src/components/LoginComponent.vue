<template>
  <div>
    <el-button icon="el-icon-user" v-if="!authorizationLoaded" @click="dialogVisible = true" circle></el-button>
    <el-popover placement="bottom" title="User Info" width="400" trigger="hover">
      <p>{{ popoverVertical() }}</p>
      <p>{{ popoverTenant() }}</p>
      <p>{{ popoverAuthorities() }}</p>

      <el-button slot="reference" v-show="authorizationLoaded" @click="dialogVisible = true" icon="el-icon-user" circle
        style="width:40px">{{ authorization.name }}</el-button>
    </el-popover>


    <el-dialog title="Login" :visible.sync="dialogVisible" width="30%">
      <span>User</span>
      <el-input placeholder="Please input " v-model="user"></el-input>
      <span>Password</span>
      <el-input show-password placeholder="Please input " v-model="pass"></el-input>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="login">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import {
  login
} from "../services/onesaitPlatformServices";


export default {
  name: "LoginComponent",
  props: {
    platformbase: String,
    auth: String
  },
  data: function () {
    return {
      user: "",
      pass: "",
      authorization: {},
      authorizationLoaded: false,
      dialogVisible: false,
      vertical: "onesaitplatform",
      clientId: null,
      token: "",
      authorities: null,
      apps: null
    };
  },
  methods: {

    login: function () {
      var that = this

      login(this.platformbase,this.auth, this.user, this.pass).then(function (response) {

        console.log(response);
        that.authorizationLoaded = true
        that.authorization = response.data;
        that.$emit("dataLogin", response.data);
        that.dialogVisible = false
        localStorage.setItem('session', JSON.stringify(response.data))
        localStorage.setItem('userpass', JSON.stringify({ 'user': that.user, 'pass': that.pass }))
      })
        .catch(function (error) {
          console.log(error);
        });


    },
    popoverVertical: function () {
      var text = ''
      if (this.authorization.vertical) {
        return ' vertical: ' + this.authorization.vertical
      }

      return text
    }
    , popoverTenant: function () {
      var text = ''

      if (this.authorization.tenant) {
        text = ' tenant: ' + this.authorization.tenant
      }

      return text
    }
    , popoverAuthorities: function () {
      var text = ''

      if (this.authorization.authorities) {
        text += ' authorities: ' + this.authorization.authorities.toString()
      }
      return text
    }

  },
  mounted: function () {

    if (localStorage.getItem('session')) {
      this.authorization = JSON.parse(localStorage.getItem('session'));
      this.$emit("dataLogin", this.authorization);
      this.authorizationLoaded = true
    }
    if (localStorage.getItem('userpass')) {
      let userpass = JSON.parse(localStorage.getItem('userpass'));
      this.user = userpass.user;
      this.pass = userpass.pass;
    }


  },
};
</script>