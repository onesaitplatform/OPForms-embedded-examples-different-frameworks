<template>
  <div id="showForm">
    <div :id="divIdentifier"></div>
  </div>
</template>



<script>
import {
  createData,  
  getData,
  updateData,   
  getForm,
} from "../services/onesaitPlatformServices";



export default {
  name: "ShowForm",
  props: {
    platformbase: String,
    appbase: String,
    authorization: Object,
    formcode: String,
    dataoid: String,
    editForm: Boolean,
    name: String,
    entity: String,
    description: String
  },
  data: function () {
    return {
      divIdentifier: 'formdiv',
      build: null,
      notloaded: true,
      cname: "",
      centity: "",
      cdescription: ""
    };
  },
  methods: {
    getEntity: function () {
      return this.centity;
    },
    getName: function () {
      return this.cname;
    },
    getDescription: function () {
      return this.cdescription;
    },
    
    checkRedirect: function (redirecto, that) {
      that.$emit('formredirect', redirecto)
    }
  },
  mounted: function () {
    var that = this;
    that.cname = that.name;
    that.cdescription = that.description;
    that.centity = that.entity;
    //store authorization
    window.authorization = that.authorization;

    //store host for platform base
    window.platformbase = that.platformbase;
    //store host for app base
    window.appbase = that.appbase;
    window.formsBaseURLCreate = that.platformbase + "/controlpanel/api/forms";
    //edit or create a form   
    //SHOW FORM
    if (that.formcode != null && that.formcode.length > 0) {
      window.formId = that.formcode
      if (that.dataoid != null && that.dataoid.length > 0) {
        //show existing form with data

        getData(
          that.platformbase,
          that.formcode,
          that.dataoid,
          that.authorization

        ).then(function (responsedata) {
          var resp = responsedata.data;
          if (!resp.i18nJson) {
            resp.i18nJson = null
          }
          if (resp?.datasources) {
            window.ds = resp.datasources
          }
          window.Formio.createForm(
            document.getElementById(that.divIdentifier),
            resp.schema, resp.i18nJson
          ).then(function (build) {
            that.build = build;
            that.build.submission = {
              data: resp.data[0],
            };
            /* if (that.$i18n.locale) {
               that.build.language = that.$i18n.locale.toUpperCase()
             }*/

            that.build.on('redirect', function (redirecto) {
              that.checkRedirect(redirecto, that)
            })

            that.build.on("submit", function (submission) {
              updateData(
                that.platformbase,
                that.formcode,
                that.dataoid,
                submission,
                that.authorization
              )
                .then(function () {
                  that.build.emit("submitDone", submission);
                })
                .catch(function (error) {
                  console.log(error);
                  that.build.emit('submitError', error);
                });
              document
                .querySelectorAll(".fa-refresh.fa-spin")
                .forEach((el) => el.remove());
            });
          });
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        //show existing form without data

        getForm(that.platformbase, that.formcode, that.authorization)
          .then(function (responsedata) {
            var response = responsedata.data;
            if (!response.i18nJson) {
              response.i18nJson = null
            }
            if (response?.datasources) {
              window.ds = response.datasources
            }

            window.Formio.createForm(
              document.getElementById(that.divIdentifier),
              JSON.parse(response.jsonSchema), JSON.parse(response.i18nJson)
            ).then(function (build) {
              that.build = build;

              that.build.on('redirect', function (redirecto) {
                that.checkRedirect(redirecto, that)
              })

              that.build.on("submit", function (submission) {
                createData(
                  that.platformbase,
                  that.formcode,
                  submission,
                  that.authorization
                )
                  .then(function (data) {
                    if (data.ids && data.ids.length > 0) {
                      window.resultId = data.ids[0]
                    }
                    that.build.emit('submitDone', submission)
                  })
                  .catch(function (error) {
                    that.build.emit('submitError', error)
                    console.log(error)
                  });
                document
                  .querySelectorAll(".fa-refresh.fa-spin")
                  .forEach((el) => el.remove());
              });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
 
  },
};
</script>