<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col cols="2"><b-alert variant="light" show><h5 class="alert-heading">版本控制</h5></b-alert></b-col>
                <b-col cols="1" align-self="center"><div class="text-right">选择版本：</div></b-col>
                <b-col cols="2" align-self="center">
                    <b-select :options="version_options" v-model="vctl_version_selected"  @input="handleVersionChange">
                    <template v-slot:first>
                        <b-form-select-option  :value="null" disabled>-- Please select one --</b-form-select-option>
                    </template>
                    </b-select> </b-col>
                <b-col cols="2" align-self="center"><div class="text-center">当前版本：<strong>{{ this.vctl_version_selected }}</strong></div></b-col>
                <b-col cols="2" align-self="center"><div class="text-center">版本状态：
                    <strong>{{ this.verionList[this.vctl_version_selected] }}</strong></div></b-col>
                
                <b-col align-self="center"><div class="text-right">
                    <b-button-group vertical>
                        <b-button v-b-tooltip.hover title="必须先选定一个版本，并且该标准没有处于编辑状态的版本！" pill @click="newStdVer(vctl_version_selected)" variant="outline-success" 
                            v-bind:disabled="this.vctl_version_selected==null || this.has_editing_version">新建副本版本</b-button>
                        <b-button v-b-tooltip.hover title="每个标准只能有一个编辑状态的版本！"  pill @click="newStdVer(null)" variant="outline-primary"
                            v-bind:disabled="this.has_editing_version">新建空白版本</b-button>
                        <b-button pill @click="delStdVer(vctl_version_selected)" variant="outline-danger"
                            v-bind:disabled="this.vctl_version_selected==null">删除 / 注销</b-button>
                    </b-button-group>
                </div></b-col>
                
            </b-row>
        </b-container>

    </div>
</template>

<script>


export default {
    name:"versionCtl",
    props:{
        verionList: {},
        defaultVersion:String
    },
    data() {
      return {
          vctl_version_selected: this.defaultVersion,
          version_options:this.gen_version_options(),
          has_editing_version:false,

      }
    },
    watch: {
        defaultVersion: function (newval) {
                this.gen_version_options()
                this.is_editing_version()
                this.$forceUpdate()
                this.$nextTick(() => {
                    this.vctl_version_selected = newval
                })
        },
  },
    methods: {
       handleVersionChange: function(value){
            this.$emit("versionChange", value);
        },
        newStdVer: function(verionId){
            this.$emit("newStdVer", verionId);
        },
        delStdVer: function(verionId){
            this.$emit("delStdVer", verionId);
        },
        gen_version_options: function() {
            var objOptions = [];
            for (var k in this.verionList) {
                var v = this.verionList[k]
                var hasLabel = false;
                for (var i = 0; i < objOptions.length; i++){
                    if (objOptions[i].label == v){
                        hasLabel = true;
                        break;
                    }
                }
                if (hasLabel){
                    objOptions[i].options[objOptions[i].options.length] = k
                }else{
                    let newObj = new Object()
                    newObj.label = v
                    newObj.options = [k]
                    objOptions[objOptions.length] = newObj
                }
            }
            this.version_options = objOptions
            return objOptions
        },
        is_editing_version: function() {
            this.has_editing_version = false
            for (var k in this.verionList) {
                var v = this.verionList[k]
                if (v == '在编辑') {
                    this.has_editing_version = true
                    return
                }
            }
        },
    }
}

</script>