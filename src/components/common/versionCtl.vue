<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col cols="2"><b-alert variant="light" show><h5 class="alert-heading">版本控制</h5></b-alert></b-col>
                <b-col cols="1" align-self="center"><div class="text-right">选择版本：</div></b-col>
                <b-col cols="2" align-self="center">
                    <b-form-select :options="options" v-model="version_selected" v-on:change="handleVersionChange">
                    <template v-slot:first>
                        <b-form-select-option  :value="null" disabled>-- Please select an option --</b-form-select-option>
                    </template>
                    </b-form-select> </b-col>
                <b-col cols="2" align-self="center"><div class="text-center">当前版本：<strong>{{ this.version_selected }}</strong></div></b-col>
                <b-col cols="2" align-self="center"><div class="text-center">版本状态：
                    <strong>{{ this.verionList[this.version_selected] }}</strong></div></b-col>
                
            </b-row>
            <b-row>
                <b-col cols="4" align-self="center"><div class="text-center">
                    <b-form-group id="label_input-21" label-cols="4" label-for="bu_newstdver_1" description="必须先选定一个版本！">
                        <b-button id="bu_newstdver_1" pill @click="newStdVer(this.version_selected)" variant="outline-success" 
                            v-bind:disabled="this.version_selected==null || this.has_editing_version">新建副本版本</b-button>
                    </b-form-group>
                </div></b-col>
                <b-col cols="4" align-self="end"><div class="text-center">
                    <b-form-group id="label_input-21" label-cols="4" label-for="bu_newstdver_2" description="只能一个编辑状态的版本！">
                        <b-button id="bu_newstdver_2" pill @click="newStdVer(null)" variant="outline-primary"
                         v-bind:disabled="this.has_editing_version">新建空白版本</b-button>
                    </b-form-group>
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
        version_selected: this.defaultVersion,
        options: this.genOptions(),
        has_editing_version: false,
      }
    },
    methods: {
       handleVersionChange: function(){
            this.$emit("versionChange", this.version_selected);
        },
        newStdVer: function(verionId){
            this.$emit("newStdVer", verionId);
        },
        genOptions: function(){
            this.has_editing_version = false
            var objOptions = [];
            for (var k in this.verionList) {
                var v = this.verionList[k]
                if (v == '在编辑') this.has_editing_version = true
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
            return objOptions
        }
    },
    watch: {
            // 如果 `uuid` 发生改变，这个函数就会运行
            defaultVersion: function (val) {
                this.options = this.genOptions()
                this.version_selected = val
            }
    },
}

</script>