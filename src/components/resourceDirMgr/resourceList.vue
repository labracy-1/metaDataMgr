<template>
    <div>
    <b-container fluid>
        <b-row>
        <b-alert variant="light" show><h4 class="alert-heading">数据资源列表</h4></b-alert>
        <b-col cols="3"></b-col>
        <b-col align-self="center">
            <div class="text-right">
            <b-button pill variant="success" @click="newresource()">新建一个资源</b-button>
            </div>
            </b-col>
        </b-row>
    </b-container>

    <versionList :fields="fields" :publish_items="publish_items" :editing_items="editing_items" :cancel_items="cancel_items"
    v-on:watch="watch" v-on:delet="delet" ></versionList>

<!-- 弹出框内容 -->
        <div>
            <b-modal id="modal_new_resource_id" ref="modal" title="新建一个数据资源" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                :state="nameState"
                label="请输入新的数据资源编码（编码设定后不可更改）："
                label-for="name_resource_id"
                invalid-feedback="编码为英文字母，可以有下划线，长度大于3">
                <b-form-input id="name_resource_id" v-model="resource_id" :state="nameState" required ></b-form-input>
                </b-form-group>
            </form>
            </b-modal>
        </div>

    </div>
</template>

<script>
import versionList from '../common/versionList'
export default {
    name:'resourceList',
    components:{
        versionList,
    },

    data(){
        return{
            resource_id:'',
            nameState:null,

            fields: [
            {key: 'resource_id', label: '资源编码', sortable: true},
            {key: 'resource_name', label: '资源名称', sortable: true},
            {key: 'version', label: '当前版本', sortable: false},
            {key: 'resource_type', label: '资源类型', sortable: true,},
            {key: 'resource_group', label: '资源分类', sortable: true,},
            {key: 'status_time', label: '更新时间', sortable: true,},
            {key: 'status', label: '当前状态', sortable: true,},
            {key: 'actions', label: '操作' }
            ],
            publish_items: [
            { resource_id: 'net_situation', resource_name: '网络舆情数据', status:'已发布', resource_type: '开源数据', resource_group:'事件'},
            { resource_id: 'guotu', resource_name: '国土资源数据',status:'已发布', resource_type: '政府公开数据', resource_group:'个人财产'},
            
            ],editing_items: [
                { resource_id: 'device', resource_name: '车间生产数据', status:'编辑中', resource_type: '私有数据', resource_group:'MES'},
                { resource_id: 'device_fetch', resource_name: '企业销售数据',status:'编辑中', resource_type: '私有数据', resource_group:'事件'},
                
            ],
            cancel_items: [
                { resource_id: 'user', resource_name: '用户住址数据', status:'已删除', resource_type: '私有数据', resource_group:'人'},
                { resource_id: 'fight_event', resource_name: '治安数据',status:'已注销', resource_type: '振幅公开数据', resource_group:'事件'},
            ],
        }
    },

    methods:{
        newresource: function(){
            this.$bvModal.show("modal_new_resource_id")
        },

        checkFormValidity() {
        const valid = this.resource_id.length > 3
        this.nameState = valid
        return valid
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {this.$bvModal.hide('modal_new_resource_id')})
        this.$router.push({path: `/resourceDetail/${this.resource_id}`});
      },

      watch: function(item){
          //alert(JSON.stringify(item))
          this.$router.push({path: `/resourceDetail/${item.resource_id}`});
      },
      delet: function(item_index){
        var index = item_index[1]
        this.editing_items.splice(index, 1)
          
      }
    }
}
</script>