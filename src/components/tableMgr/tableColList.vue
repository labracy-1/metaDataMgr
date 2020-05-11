<template>
    <div>
        <b-container fluid>
            <b-row align-h="end">
                <b-col cols="1" align-self="center" class="my-1 text-right">每页：
                </b-col>
                <b-col cols="1" class="my-1">
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
                </b-col>
                <b-col cols="3" class="my-1">
                    <b-pagination size="sm" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="my-0"></b-pagination>
                </b-col>
                <b-col cols="1.5" align-self="center" class="my-1 text-center">
                    <b-button size="sm" pill variant="success" @click="newTableCol()" v-show="!this.just_read">新建一个数据项</b-button>
                </b-col>
            </b-row>

            <b-table small striped hover :fields="fields" :items="col_list" :current-page="currentPage" :per-page="perPage">

                <template v-slot:cell(actions)="row" v-if="!this.just_read">   
                    <b-button pill  size="sm" @click="itemEdit(row.item, row.index, $event.target)" variant="outline-primary">
                        编  辑
                    </b-button>
                    <b-button pill  size="sm" @click="itemDel(row.item, row.index, $event.target)" variant="danger">
                        删  除
                    </b-button>
                </template>

            </b-table>

        </b-container>

        <!-- 弹出框内容 -->
        <div>
            <b-modal id="modal_table_col" centered  size="lg" title="新建一个数据项" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">元素编码：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.col_id" :state="nameState" required></b-form-input>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素名称：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.col_name"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">引用标准：</div></b-col>
                        <b-col cols="3">
                            <b-form-input @click="changeStandrd" size="sm" v-model="cur_item.col_standrd"> </b-form-input>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">引用字典：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="dict_list" v-model="cur_item.col_dict"> 
                                <template v-slot:first>
                                <b-form-select-option :value="null">-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">元素类型：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="item_type_options" v-model="cur_item.col_type" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素长度：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.col_length"></b-form-input>
                        </b-col>
                    </b-row>
                    
                </b-container>
                

                
            </form>
            </b-modal>
        </div>

        <!-- 选择标准 弹出框内容 -->
        <div>
            <b-modal id="modal_select_strandrd" centered title="选择引用的标准" @ok="handleStdSelectOk" >

                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="3" align-self="center"><div class="text-right">选择标准：</div></b-col>
                        <b-col cols="4">
                            <b-form-select size="sm" :options="standrd_list" v-model="cur_standrd" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="3" align-self="center"><div class="text-right">选择版本：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="version_list" v-model="cur_version" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="3" align-self="center"><div class="text-right">选择标准：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="stdrd_ver_item_list" v-model="cur_stdrd_ver_item" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null">-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                    </b-row>

                </b-container>
            </b-modal>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'

  export default {
      name:"tableColList",
      props: {
          just_read:Boolean,
          col_list:{
              type:Array,
              default:()=>[],
          }
      },
    data() {
      return {
          cur_item: this.genNewItem(),
            nameState:null,
            cur_standrd:'',
            cur_version:'',
            cur_stdrd_ver_item:'',

            standrd_list:[
                { value: 'chrhc', text: '中国行业标准' },
                { value: 'huawei', text: '华为标准' },
                { value: 'IEEE', text: 'IEEE' },
            ],
            version_list:[  // 只展示 已发布状态的版本
                { value: 'v0001', text: 'v0001' },
                { value: 'v0002', text: 'v0002' },
            ],
            stdrd_ver_item_list:[
                { value: 'sex', text: '性别' },
                { value: 'nation', text: '民族' },
                { value: 'country', text: '国家' },],

            dict_list:[
                { value: 'sex', text: '性别' },
                { value: 'nation', text: '民族' },
                { value: 'country', text: '国家' },
            ],
            item_type_options: [
            { value: 'text', text: '文本' },
            { value: 'long', text: '整数' },
            { value: 'double', text: '小数' },
            { value: 'date', text: '日期' },
            { value: 'time', text: '时间' },
        ],
        fields: [
          {key: 'col_id', label: '元素编码', sortable: true},
          {key: 'col_name', label: '元素名称', sortable: true},
          {key: 'col_standrd', label: '引用标准', sortable: true},
          {key: 'col_type', label: '元素类型', sortable: false},
          {key: 'col_length', label: '元素长度', sortable: true,},
          {key: 'col_dict', label: '引用字典组', sortable: true,},
          {key: 'update_time', label: '更新时间', sortable: true,},
          {key: 'actions', label: '操作', sortable: false,},
        ],

        totalRows: 7,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 20],
    }
  },
  methods: {
      genNewItem: function(){ // 获取新建标准元素的初始设置
        return  {
            col_name:'',
            col_id:'',
            col_type:null,
            col_length:10,
            col_dict:null,
            col_standrd:null,
            is_new:true,
            }
      },
      newTableCol: function(){
          this.cur_item= this.genNewItem()
          this.$bvModal.show("modal_table_col")
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      checkFormValidity() {
        const valid = this.cur_item.col_id.length > 4 && this.cur_item.col_type != null
        this.nameState = valid
        return valid
      },
      handleSubmit() {
        // todo: 将cur_item 的内容存储到 数据库中，然后重新读取数据库内的 items 列表。
        if (this.cur_item.is_new){
            // Vue 不能检测以下数组的变动：当你利用索引直接设置一个数组项时 vm.items[indexOfItem] = newValue，需要改造成如下
            this.cur_item.is_new=false
            Vue.set(this.col_list, this.col_list.length, this.cur_item)
            this.totalRows+=1
        }
        this.cur_item.update_time = (new Date()).toLocaleString()
        this.$nextTick(() => {this.$bvModal.hide('modal_table_col')})
      },
      itemEdit(item_obj){
          this.cur_item = item_obj
          this.$bvModal.show("modal_table_col")
      },
      itemDel(item_obj, index){
          // todo: 将cur_item 的内容从数据库中删除，然后重新读取数据库内的 items 列表。
          this.col_list.splice(index, 1)
          this.totalRows -= 1
      },

      changeStandrd(){
          this.$bvModal.show("modal_select_strandrd")
      },

      handleStdSelectOk(){
        this.cur_item.col_standrd = this.cur_stdrd_ver_item
        this.cur_item.update_time = (new Date()).toLocaleString()
        this.$nextTick(() => {this.$bvModal.hide('modal_select_strandrd')})
      }
  }
}

</script>