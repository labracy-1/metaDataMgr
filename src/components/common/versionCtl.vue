<template>
    <div>
        
        <b-container fluid>
            <b-row>
                <b-col cols="2"><b-alert variant="light" show><h5 class="alert-heading">版本控制</h5></b-alert></b-col>
                <b-col cols="1" align-self="center"><div class="text-right">选择版本：</div></b-col>
                <b-col cols="2" align-self="center">
                    <b-form-select v-model="version_selected" :options="options" v-on:change="handleVersionChange">
                    <template v-slot:first>
                        <b-form-select-option  :value="null">-- Please select an option --</b-form-select-option>
                    </template>
                    </b-form-select> </b-col>
                <b-col cols="2" align-self="center"><div class="text-center">当前版本：<strong>{{ version_selected }}</strong></div></b-col>
                <b-col cols="2" align-self="center"><div class="text-center">版本状态：
                    <strong>{{ this.verionList[version_selected] }}</strong></div></b-col>
                
            </b-row>
            <b-row align-h="center">
                <b-col cols="2" align-self="center"><div class="text-center">
                    <b-button pill @click="newStdVer(version_selected)" variant="outline-success" v-bind:disabled="version_selected==null">新建副本版本</b-button>
                </div></b-col>
                <b-col cols="2" align-self="center"><div class="text-center">
                   <b-button pill @click="newStdVer(null)" variant="outline-primary">新建空白版本</b-button>
                </div></b-col>
                
            </b-row>
        </b-container>

    </div>
</template>

<script>


export default {
    name:"versionCtl",
    props:{
        verionList: {}
    },
    data() {
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

      return {
        version_selected: null,
        options: objOptions,
      }
    },
    methods: {
       handleVersionChange: function(){
            this.$emit("versionChange", this.version_selected);
        },
        newStdVer: function(verionId){
            this.$emit("newStdVer", verionId);
        }
    },
}

</script>