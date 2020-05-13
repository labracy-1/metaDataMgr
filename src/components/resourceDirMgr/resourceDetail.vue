<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-alert variant="light" show><h4>数据资源 - {{ this.$route.params.resource_id }} </h4></b-alert>
                <b-col align-self="center">
                    <div class="text-right">
                    <b-button pill variant="success" to="/resourceList">返  回</b-button>
                    </div></b-col>
            </b-row>
        </b-container>

        <b-tabs content-class="mt-3">
            <b-tab title="数据资源基本信息" active><resourceBaseInfo :resource_id=this.$route.params.resource_id></resourceBaseInfo></b-tab>
            <b-tab title="数据资源版本">

            <versionCtl :verionList=verList :defaultVersion=vctlDefaultVer 
                    v-on:versionChange="versionChange" v-on:newStdVer="newVersion"></versionCtl>

                <b-tabs content-class="mt-3" v-if="version_selected">
                    <b-tab title="版本基本信息" active>
                        <versionBaseInfo :just_read="this.just_read" :ver_ctl_obj_type="'resource'" 
                            :ver_ctl_obj_id=this.$route.params.resource_id :sel_version_id="version_selected"></versionBaseInfo>
                    </b-tab>
                    <b-tab title="版本包含数据集">
                        <resourceTableList :just_read="this.just_read"></resourceTableList>
                    </b-tab>
                </b-tabs>
                </b-tab>
        </b-tabs>


<!-- 弹出框内容 -->
        <div>
            <b-modal id="modal_new_resource_version" ref="modal" title="新建一个数据资源版本" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                :state="modal_status"
                label="请输入新的版本编码："
                label-for="name-input"
                invalid-feedback="New version ID is required length 4.">
                <b-form-input id="name-input" v-model="resource_version_id" :state="modal_status" required ></b-form-input>
                </b-form-group>
            </form>
            </b-modal>
        </div>


    </div>
</template>
<script>
import versionBaseInfo from '../common/versionBaseInfo'
import resourceBaseInfo from './resourceBaseInfo'
import versionCtl from '../common/versionCtl'
import resourceTableList from './resourceTableList'
export default {
    name:'resourceDetail',
    components:{
        versionBaseInfo,
        resourceBaseInfo,
        versionCtl,
        resourceTableList,
    },

    data(){
        return{

            verList:{v0001:"已发布",v0003:"已发布",v0004:"待审批发布"},
            version_selected:'v0003',
            vctlDefaultVer:'v0003',
            ver_ctl_obj_id: this.$route.params.resource_id,
            resource_version_id:'',
            just_read: true,
            modal_status: null,
            col_list: [
            { col_id: 'item1', col_name: 'Dickerson', col_standrd:'', col_type: 'long', col_length:'4', col_dict: ''},
            { col_id: 'sex', col_name: '性别', col_standrd:'', col_type: 'text' , col_length:'1', col_dict: ''},
            { col_id: 'nation', col_name: '民族', col_standrd:'', col_type: 'text', col_length:'1', col_dict: ''},
        ],

        }
    },
    methods: {
       versionChange: function(version){
            this.version_selected = version;
            if (this.verList[version] == '在编辑'){
                this.just_read = false
            }else{
                this.just_read = true
            }
        },
        newVersion: function(){
            this.$bvModal.show("modal_new_resource_version")
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (!this.checkFormValidity()) {
                return
            }

            this.verList[this.resource_version_id]='在编辑'
            this.vctlDefaultVer = this.resource_version_id
                
            this.$nextTick(() => {
                this.$bvModal.hide('modal_new_resource_version')
            })
        },
        checkFormValidity() {
            const valid = this.resource_version_id && this.resource_version_id.length >= 4
            this.modal_status = valid
            return valid
        },
        
    },
}
</script>