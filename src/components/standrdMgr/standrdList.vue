<template>

<div>
  <b-container fluid>
    <b-row>
      <b-alert variant="light" show><h4 class="alert-heading">数据标准列表</h4></b-alert>
      <b-col cols="3"></b-col>
      <b-col align-self="center">
        <div class="text-right">
        <b-button pill variant="success" @click="newStd()">新建一个数据标准</b-button>
        </div>
        </b-col>
    </b-row>
  </b-container>

  <versionList :fields="fields" :publish_items="publish_items" :editing_items="editing_items" :cancel_items="cancel_items"
    v-on:watch="watch" v-on:delet="delet" ></versionList>

  <!-- 弹出框内容 -->
  <div>
    <b-modal id="modal-prevent-closing" ref="modal" title="新建一个数据标准"
      @show="resetModal" @hidden="resetModal" @ok="handleOk" >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="请输入新的标准编码："
          label-for="name-input"
          invalid-feedback="New standrd ID need length large than 5">
          <b-form-input id="name-input" v-model="standrdId" :state="nameState" required ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</div>

</template>

<script>
import versionList from '../common/versionList'
export default {
  name: 'standrdList',
  components:{
      versionList
  },
  data() {
      return {
        standrdId: '',
        nameState: null,
        fields: [
          {key: 'standrd_id', label: '标准编码', sortable: true},
          {key: 'standrd_name', label: '标准名称', sortable: true},
          {key: 'version', label: '当前版本', sortable: false},
          {key: 'standrd_type', label: '标准类型', sortable: true,},
          {key: 'standrd_group', label: '行业归属', sortable: true,},
          {key: 'status_time', label: '发布时间', sortable: true,},
          {key: 'status', label: '当前状态', sortable: true,},
          {key: 'actions', label: '操作' }
        ],
        editing_items: [
            { standrd_id: 'standrd11', standrd_name: 'Dickerson', version:'V1.0', status_time: '2020-03-21 11:59:23', status:'编辑中', standrd_type: '国家标准', standrd_group:'国军标'},
            { standrd_id: 'standrd21', standrd_name: 'Larsen', version:'V1.0', status_time: '2020-03-27 18:09:20' , status:'编辑中', standrd_type: '世界标准', standrd_group:'ISO'},
            { standrd_id: 'standrd31', standrd_name: 'Geneva', version:'V3.0', status_time: '2020-02-15 21:34:25' , status:'审批驳回', standrd_type: '世界标准', standrd_group:'IEEE'},
            { standrd_id: 'standrd41', standrd_name: 'Jami001', version:'V1.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd51', standrd_name: 'Jami002', version:'V2.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd61', standrd_name: 'Jami003', version:'V1.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd71', standrd_name: 'Jami004', version:'V5.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
        
        ],
        publish_items: [
            { standrd_id: 'standrd1', standrd_name: 'Dickerson', status_time: '2020-03-21 11:59:23', status:'已发布', standrd_type: '国家标准', standrd_group:'国军标'},
            { standrd_id: 'standrd2', standrd_name: 'Larsen', status_time: '2020-03-27 18:09:20' , status:'已发布', standrd_type: '世界标准', standrd_group:'ISO'},
            { standrd_id: 'standrd3', standrd_name: 'Geneva', status_time: '2020-02-15 21:34:25' , status:'发布待审批', standrd_type: '世界标准', standrd_group:'IEEE'},
            { standrd_id: 'standrd4', standrd_name: 'Jami001', status_time: '2020-03-29 08:06:52', status:'已发布', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd5', standrd_name: 'Jami002', status_time: '2020-03-29 08:06:52', status:'注销待审批', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd6', standrd_name: 'Jami003', status_time: '2020-03-29 08:06:52', status:'已发布', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd7', standrd_name: 'Jami004', status_time: '2020-03-29 08:06:52', status:'已发布', standrd_type: '国家标准', standrd_group:'HT' },
            
        ],
        cancel_items: [
            { standrd_id: 'standrd12', standrd_name: 'Dickerson', status_time: '2020-03-21 11:59:23', status:'已注销', standrd_type: '国家标准', standrd_group:'国军标'},
            { standrd_id: 'standrd22', standrd_name: 'Larsen', status_time: '2020-03-27 18:09:20' , status:'已删除', standrd_type: '世界标准', standrd_group:'ISO'},
            { standrd_id: 'standrd32', standrd_name: 'Geneva', status_time: '2020-02-15 21:34:25' , status:'已注销', standrd_type: '世界标准', standrd_group:'IEEE'},
            { standrd_id: 'standrd42', standrd_name: 'Jami001', status_time: '2020-03-29 08:06:52', status:'已注销', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd52', standrd_name: 'Jami002', status_time: '2020-03-29 08:06:52', status:'已删除', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd62', standrd_name: 'Jami003', status_time: '2020-03-29 08:06:52', status:'已注销', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd72', standrd_name: 'Jami004', status_time: '2020-03-29 08:06:52', status:'已删除', standrd_type: '国家标准', standrd_group:'HT' },
            
        ],
      }
    },
  methods: {
      newStd() {
        this.$bvModal.show("modal-prevent-closing")
      },
      checkFormValidity() {
        const valid = this.standrdId.length > 4
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {this.$bvModal.hide('modal-prevent-closing')})
        this.$router.push({path: `/stdrdDetail/${this.standrdId}`});
      },

      watch: function(item){
          //alert(JSON.stringify(item))
          this.$router.push({path: `/stdrdDetail/${item.standrd_id}`});
      },
      delet: function(item_index){
        var index = item_index[1]
        this.editing_items.splice(index, 1)
          
      }
    },

      
}

</script>