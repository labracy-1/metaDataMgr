<template>
    <div>
    <b-container fluid>
        <b-row>
        <b-alert variant="light" show><h4 class="alert-heading">数据集列表</h4></b-alert>
        <b-col cols="3"></b-col>
        <b-col align-self="center">
            <div class="text-right">
            <b-button pill variant="success" @click="newTable()">新建一个数据集</b-button>
            </div>
            </b-col>
        </b-row>
    </b-container>

    <versionList :fields="fields" :publish_items="publish_items" :editing_items="editing_items" :cancel_items="cancel_items"
    v-on:watch="watch" v-on:delet="delet" ></versionList>

<!-- 弹出框内容 -->
        <div>
            <b-modal id="modal_new_table_id" ref="modal" title="新建一个数据集" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                :state="nameState"
                label="请输入新的数据集编码（编码设定后不可更改）："
                label-for="name_table_id"
                invalid-feedback="数据集编码为英文字母，可以有下划线，长度大于3">
                <b-form-input id="name_table_id" v-model="table_id" :state="nameState" required ></b-form-input>
                </b-form-group>
            </form>
            </b-modal>
        </div>

    </div>
</template>

<script>
import versionList from '../common/versionList'
export default {
    name:'tableList',
    components:{
        versionList,
    },

    data(){
        return{
            table_id:'',
            nameState:null,

            fields: [
            {key: 'table_id', label: '数据集编码', sortable: true},
            {key: 'table_name', label: '数据集名称', sortable: true},
            {key: 'version', label: '当前版本', sortable: false},
            {key: 'table_type', label: '数据类型', sortable: true,},
            {key: 'table_group', label: '数据集分类', sortable: true,},
            {key: 'status_time', label: '更新时间', sortable: true,},
            {key: 'status', label: '当前状态', sortable: true,},
            {key: 'actions', label: '操作' }
            ],
            publish_items: [
            { table_id: 'customer', table_name: '客户信息表', status:'已发布', table_type: '主数据', table_group:'客户'},
            { table_id: 'callEvent', table_name: '电话通联事件',status:'已发布', table_type: '从数据', table_group:'事件'},
            
            ],editing_items: [
                { table_id: 'device', table_name: '设备信息表', status:'编辑中', table_type: '主数据', table_group:'物品'},
                { table_id: 'device_fetch_event', table_name: '设备采集事件',status:'编辑中', table_type: '从数据', table_group:'事件'},
                
            ],
            cancel_items: [
                { table_id: 'user', table_name: '用户信息表', status:'已删除', table_type: '主数据', table_group:'人'},
                { table_id: 'fight_event', table_name: '打架事件',status:'已注销', table_type: '从数据', table_group:'事件'},
            ],
        }
    },

    methods:{
        newTable: function(){
            this.$bvModal.show("modal_new_table_id")
        },

        checkFormValidity() {
        const valid = this.table_id.length > 3
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
        this.$nextTick(() => {this.$bvModal.hide('modal_new_table_id')})
        this.$router.push({path: `/tableDetail/${this.table_id}`});
      },

      watch: function(item){
          //alert(JSON.stringify(item))
          this.$router.push({path: `/tableDetail/${item.table_id}`});
      },
      delet: function(item_index){
        var index = item_index[1]
        this.editing_items.splice(index, 1)
          
      }
    }
}
</script>