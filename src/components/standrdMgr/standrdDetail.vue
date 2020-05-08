<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-alert variant="light" show><h4>数据标准 - {{ this.$route.params.std_id }} </h4></b-alert>
                <b-col align-self="center">
                    <div class="text-right">
                    <b-button pill variant="success" to="/standrd">返回</b-button>
                    </div></b-col>
            </b-row>
        </b-container>
        <versionCtl :verionList=verList v-on:versionChange="versionChange" v-on:newStdVer="newStdVersion"></versionCtl>

        <div>
        <b-alert variant="light" show><h5 class="alert-heading">数据标准定义</h5></b-alert>

        <b-tabs content-class="mt-3" v-if=version_selected>
            <b-tab title="基本信息" active><standrdBaseInfo :uuid=stdrd_uuid></standrdBaseInfo></b-tab>
            <b-tab title="标准元素定义"><p>标准元素定义</p></b-tab>
            <b-tab title="字典组定义"><p>字典组定义</p></b-tab>
        </b-tabs>
        </div>
  
    </div>
</template>
<script>
import versionCtl from '../common/versionCtl'
import standrdBaseInfo from './standrdBaseInfo'
export default {
    name: 'stdrdDetail',
    components:{
        versionCtl,
        standrdBaseInfo
    },
    data(){
        return{
            verList:{v0001:"已发布",v0002:"在编辑",v0003:"已发布",v0004:"待审批发布"},
            version_selected:null,
            stdrd_uuid: null,
        }
    },
    methods: {
       versionChange: function(version){
            this.version_selected = version;
            this.stdrd_uuid = this.$route.params.std_id + "|" + version;
            if (version == null)
                this.stdrd_uuid = null;
        },
        newStdVersion: function(version){
            alert(version)
        }
    }
}
</script>