<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-alert variant="light" show><h4>数据标准 - {{ this.$route.params.std_id }} </h4></b-alert>
                <b-col align-self="center">
                    <div class="text-right">
                    <b-button pill variant="success" to="/standrd">返  回</b-button>
                    </div></b-col>
            </b-row>
        </b-container>

        <b-tabs content-class="mt-3">
            <b-tab title="标准基本信息" active><standrdBaseInfo :stdrd_id=this.$route.params.std_id></standrdBaseInfo></b-tab>
            <b-tab title="标准版本管理">
                <versionCtl :verionList=verList :defaultVersion=vctlDefaultVer v-on:versionChange="versionChange" v-on:newStdVer="newStdVersion"></versionCtl>

                <div>
                <b-tabs content-class="mt-3" v-if="version_selected">
                    <b-tab title="版本基本信息" active><versionBaseInfo :just_read="this.just_read" :ver_ctl_obj_type="'standrd'" 
                            :ver_ctl_obj_id=this.$route.params.std_id :sel_version_id="version_selected"></versionBaseInfo>
                            </b-tab>
                    <b-tab title="版本元素定义"><stdrdItemList :just_read="this.just_read"></stdrdItemList></b-tab>
                    <b-tab title="版本字典定义"><dictGroupList :just_read="this.just_read"></dictGroupList></b-tab>
                </b-tabs>
                </div>
            </b-tab>
        </b-tabs>
  
        <!-- 弹出框内容 -->
        <div>
            <b-modal id="modal-prevent-closing" ref="modal" title="新建一个标准版本" @ok="handleOk" >
            <form ref="form">
                <b-form-group
                :state="nameState"
                label="请输入新的版本编码："
                label-for="name-input"
                invalid-feedback="New version ID is required length 4.">
                <b-form-input id="name-input" v-model="standrd_version_id" :state="nameState" required ></b-form-input>
                </b-form-group>
            </form>
            </b-modal>
        </div>
    </div>
</template>
<script>
import versionCtl from '../common/versionCtl'
import standrdBaseInfo from './standrdBaseInfo'
import stdrdItemList from './stdrdItemList'
import dictGroupList from '../common/dictGroupList'
import versionBaseInfo from '../common/versionBaseInfo'
export default {
    name: 'stdrdDetail',
    components:{
        versionCtl,
        standrdBaseInfo,
        versionBaseInfo,
        stdrdItemList,
        dictGroupList
    },
    data(){
        return{
            verList:{v0001:"已发布",v0003:"已发布",v0004:"待审批发布"},
            version_selected:'v0003',
            vctlDefaultVer:'v0003',
            stdrd_uuid: null,
            standrd_version_id:'',
            nameState:null,
            just_read: true,
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
            this.stdrd_uuid = this.$route.params.std_id + "|" + version;
            if (version == null)
                this.stdrd_uuid = null;
        },
        newStdVersion: function(){
            this.$bvModal.show("modal-prevent-closing")
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (!this.checkFormValidity()) {
                return
            }

            this.verList[this.standrd_version_id]='在编辑'
            this.vctlDefaultVer = this.standrd_version_id
                
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },
        checkFormValidity() {
            const valid = this.standrd_version_id && this.standrd_version_id.length >= 4
            this.modal_status = valid
            return valid
        },
        resetModal() {
            this.nameState = null
        },
        
    }
}
</script>