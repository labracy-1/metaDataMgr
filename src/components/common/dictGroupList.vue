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
                    <b-button size="sm" pill variant="success" @click="newDictGroup()" v-show="!only_read">新建一个字典</b-button>
                </b-col>
            </b-row>

            <b-table small striped hover :fields="dict_group_fields" :items="dictGroupList" :current-page="currentPage" :per-page="perPage">
                <template v-slot:cell(actions)="row"> 
                        <b-button pill  size="sm" v-if="only_read"
                        @click="dictGroupEdit(row.item, row.index, $event.target)" variant="outline-primary">
                            查  看
                        </b-button>
                        <b-button pill  size="sm" v-if="!only_read"
                        @click="dictGroupEdit(row.item, row.index, $event.target)" variant="outline-primary">
                            编  辑
                        </b-button>
                        <b-button pill  size="sm" v-if="!only_read"
                        @click="dictGroupDel(row.item, row.index, $event.target)" variant="danger">
                            删  除
                        </b-button>
                </template>
                


            </b-table>

        </b-container>

        <!-- 字典弹出框内容 -->
        <div>
            <b-modal id="modal_dict_group_info" ok-only centered  size="lg" title="新建一个字典" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">字典编码：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_dict_group.dictgroup_id" :state="nameState" required v-bind:disabled="this.only_read"></b-form-input>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">字典名称：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_dict_group.dictgroup_name" v-bind:disabled="this.only_read"></b-form-input>
                        </b-col>
                    </b-row>
                    
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">备注说明：</div></b-col>
                        <b-col cols="8">
                            <b-form-textarea size="sm" v-model="cur_dict_group.desc" v-bind:disabled="this.only_read"> </b-form-textarea>
                        </b-col>
                    </b-row>
                </b-container>
            </form>

            <b-container fluid>
                <b-row align-h="end">
                    <b-col cols="2" align-self="center" class="my-1 text-right">每页：
                    </b-col>
                    <b-col cols="3" class="my-1">
                        <b-pagination size="sm" v-model="dict_item_currentPage" :total-rows="dict_item_totalRows" :per-page="4" align="fill" class="my-0"></b-pagination>
                    </b-col>
                    <b-col cols="1.5" align-self="center" class="my-1 text-center">
                        <b-button size="sm" pill variant="success" @click="newDictItem()" v-show="!only_read">新建一个字典项</b-button>
                    </b-col>
                </b-row>

                <b-table small striped hover :fields="dict_item_fields" :items="this.cur_dict_group.dict_items" :current-page="dict_item_currentPage" :per-page="4">

                <template v-slot:cell(actions)="row" v-if="!only_read">   
                    <b-button pill  size="sm" @click="dictItemEdit(row.item, row.index, $event.target)" variant="outline-primary">
                        编  辑
                    </b-button>
                    <b-button pill  size="sm" 
                    @click="dictItemDel(row.item, row.index, $event.target)" variant="danger">
                        删  除
                    </b-button>
                </template>
            </b-table>
            </b-container>


            </b-modal>
        </div>


        <!-- 字典项弹出框内容 -->
        <div>
            <b-modal id="modal_dict_item_info" ok-only centered title="新建一个字典项" @ok="dict_item_handleOk" >
            <form ref="form">
                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="5" align-self="center"><div class="text-right">字典项编码：</div></b-col>
                        <b-col cols="6">
                            <b-form-input size="sm" v-model="cur_dict_item.dictgitem_id" :state="nameState" required></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="5" align-self="center"><div class="text-right">字典项名称：</div></b-col>
                        <b-col cols="6">
                            <b-form-input size="sm" v-model="cur_dict_item.dictitem_name"></b-form-input>
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
      name:"dictGroupList",
      props: {
          just_read:Boolean,
      },
    data() {
      return {
        cur_dict_item: {
              dictgitem_id:'',
              dictitem_name:'',
              is_new:true,
          },
        cur_dict_group: this.genNewItem(),
        nameState:null,
        dict_group_fields: [
          {key: 'dictgroup_id', label: '字典编码', sortable: true},
          {key: 'dictgroup_name', label: '字典名称', sortable: true},
          {key: 'desc', label: '备注说明', sortable: false,},
          {key: 'update_time', label: '更新时间', sortable: true,},
          {key: 'actions', label: '操作', sortable: false,},
        ],
        dictGroupList: [
            { dictgroup_id: 'sex', dictgroup_name: '性别', desc: 'sex111', update_time:'', 
            dict_items:[{dictgitem_id:'M',dictitem_name:'男'},{dictgitem_id:'F',dictitem_name:'女'},{dictgitem_id:'UK',dictitem_name:'未知'}]},
            { dictgroup_id: 'nation', stdrd_item_name: '民族', desc: 'nation111', update_time:'', 
            dict_items:[{dictgitem_id:'HAN',dictitem_name:'汉族'},{dictgitem_id:'MAN',dictitem_name:'满族'},{dictgitem_id:'WWL',dictitem_name:'维吾尔族'}] },
            
        ],
        totalRows: 7,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 20],
        dict_item_fields:[
            {key: 'dictgitem_id', label: '字典项编码', sortable: true},
            {key: 'dictitem_name', label: '字典项名称', sortable: true},
            {key: 'update_time', label: '更新时间', sortable: true,},
            {key: 'actions', label: '操作', sortable: false,},
        ],
        dict_item_currentPage:1,
        dict_item_totalRows: 0,
    }
  },
  computed:{
      only_read:function(){
          return this.just_read==true
      }
  },
  methods: {
      genNewItem: function(){ // 获取新建标准元素的初始设置
        return  {
            dictgroup_name:'',
            dictgroup_id:'',
            desc:'',
            update_time: (new Date()).toLocaleString(),
            is_new:true,
            dict_items:[],
            }
      },
      newDictGroup: function(){
          this.cur_dict_group= this.genNewItem()
          this.$bvModal.show("modal_dict_group_info")
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        if (!this.just_read)
            this.handleSubmit()
        this.$nextTick(() => {this.$bvModal.hide('modal_dict_group_info')})
      },
      checkFormValidity() {
        const valid = this.cur_dict_group.stdrd_item_id.length > 4 && this.cur_dict_group.stdrd_item_type != null
        this.nameState = valid
        return valid
      },
      handleSubmit() {
        // todo: 将cur_dict_group 的内容存储到 数据库中，然后重新读取数据库内的 items 列表。
        if (this.cur_dict_group.is_new){
            // Vue 不能检测以下数组的变动：当你利用索引直接设置一个数组项时 vm.items[indexOfItem] = newValue，需要改造成如下
            this.cur_dict_group.is_new=false
            Vue.set(this.dictGroupList, this.dictGroupList.length, this.cur_dict_group)
            this.totalRows += 1
        }
        this.cur_dict_group.update_time = (new Date()).toLocaleString()
      },
      dictGroupEdit(item_obj){
          this.cur_dict_group = item_obj
          this.dict_item_totalRows = this.cur_dict_group.dict_items.length
          this.$bvModal.show("modal_dict_group_info")
      },
      dictGroupDel(item_obj, index){
          // todo: 将 cur_dict_group 的内容从数据库中删除，然后重新读取数据库内的 items 列表。
          this.dictGroupList.splice(index, 1)
          this.totalRows -= 1
      },
      newDictItem(){
          this.cur_dict_item= {
              dictgitem_id:'',
              dictitem_name:'',
              is_new:true,
          }
          this.$bvModal.show("modal_dict_item_info")
      },
      dictItemEdit(item_obj){
          this.cur_dict_item = item_obj
          this.$bvModal.show("modal_dict_item_info")
      },
      dictItemDel(item_obj, index){
          // todo: 将 cur_dict_group 的内容从数据库中删除，然后重新读取数据库内的 items 列表。
          this.cur_dict_group.dict_items.splice(index, 1)
          this.dict_item_totalRows -= 1
      },
      dict_item_handleOk(bvModalEvt) {
          if (this.cur_dict_item.dictgitem_id.length > 0 && this.cur_dict_item.dictitem_name.length > 0)
          {
            bvModalEvt.preventDefault()
          }
        
        this.dict_item_handleSubmit()
      },
      dict_item_handleSubmit() {
        // todo: 将cur_dict_group 的内容存储到 数据库中，然后重新读取数据库内的 items 列表。
        if (this.cur_dict_item.is_new){
            // Vue 不能检测以下数组的变动：当你利用索引直接设置一个数组项时 vm.items[indexOfItem] = newValue，需要改造成如下
            this.cur_dict_item.is_new=false
            Vue.set(this.cur_dict_group.dict_items, this.cur_dict_group.dict_items.length, this.cur_dict_item)
            this.dict_item_totalRows += 1
        }
        this.cur_dict_item.update_time = (new Date()).toLocaleString()
        this.cur_dict_group.update_time = (new Date()).toLocaleString()
        this.$nextTick(() => {this.$bvModal.hide('modal_dict_item_info')})
      },
  }
}

</script>