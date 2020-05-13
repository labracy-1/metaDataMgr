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
                    <b-button size="sm" pill variant="success" @click="newItem()" v-show="!this.just_read">新增一个数据集</b-button>
                </b-col>
            </b-row>

            <b-table small striped hover :fields="fields" :items="items" :current-page="currentPage" :per-page="perPage">

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
            <b-modal id="modal_resource_item" centered  size="lg" title="一个数据集" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">元素编码：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.item_id" :state="nameState" required></b-form-input>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素名称：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.item_name"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">引用数据集：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="dict_list" v-model="cur_item.table_ref"> </b-form-select>
                        </b-col>
                    </b-row>
                </b-container>
            </form>
            </b-modal>
        </div>


    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name:'resourceTableList',

    props: {
          just_read:Boolean,
      },
    data() {
      return {
          cur_item: this.genNewItem(),
            nameState:null,

            dict_list:[
                { value: '客户基本信息表（customer）-v0002', text: '客户基本信息表（customer）-v0002' },
                { value: '衣服基本信息表(cloth)-v0001', text: '衣服基本信息表(cloth)-v0001' },
                { value: '楼房基本信息(building)-v0004', text: '楼房基本信息(building)-v0004' },
            ],
            
        fields: [
          {key: 'item_id', label: '元素编码', sortable: true},
          {key: 'item_name', label: '元素名称', sortable: true},
          {key: 'table_ref', label: '对应数据集', sortable: true,},
          {key: 'update_time', label: '更新时间', sortable: true,},
          {key: 'actions', label: '操作', sortable: false,},
        ],
        items: [
            { item_id: 'customer', item_name: '客户基本信息表', table_ref: '客户基本信息表（customer）-v0001' },
            { item_id: 'cloth', item_name: '衣服基本信息表', table_ref: '衣服基本信息表(cloth)-v0004'},
            
        ],
        totalRows: 2,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 20],
    }
  }, 
  methods: {
      genNewItem: function(){ // 获取新建标准元素的初始设置
        return  {
            stdrd_item_name:'',
            stdrd_item_id:'',
            stdrd_item_type:null,
            stdrd_item_length:10,
            stdrd_item_dict:null,
            stdrd_valid_rule:null,
            is_new:true,
            }
      },
      newItem: function(){
          this.cur_item= this.genNewItem()
          this.$bvModal.show("modal_resource_item")
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      checkFormValidity() {
        const valid = this.cur_item.stdrd_item_id.length > 4 && this.cur_item.stdrd_item_type != null
        this.nameState = valid
        return valid
      },
      handleSubmit() {
        // todo: 将cur_item 的内容存储到 数据库中，然后重新读取数据库内的 items 列表。
        if (this.cur_item.is_new){
            // Vue 不能检测以下数组的变动：当你利用索引直接设置一个数组项时 vm.items[indexOfItem] = newValue，需要改造成如下
            this.cur_item.is_new=false
            Vue.set(this.items, this.items.length, this.cur_item)
            this.totalRows+=1
        }
        this.cur_item.update_time = (new Date()).toLocaleString()
        this.$forceUpdate()
        this.$nextTick(() => {this.$bvModal.hide('modal_resource_item')})
      },
      itemEdit(item_obj){
          this.cur_item = item_obj
          this.$bvModal.show("modal_resource_item")
      },
      itemDel(item_obj, index){
          // todo: 将cur_item 的内容从数据库中删除，然后重新读取数据库内的 items 列表。
          this.items.splice(index, 1)
          this.totalRows -= 1
      }
  }

}
</script>