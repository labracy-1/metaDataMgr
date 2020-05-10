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
                    <b-button size="sm" pill variant="success" @click="newStdItem()" v-show="!this.just_read">新建一个元素</b-button>
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
            <b-modal id="modal-stdrd_item" centered  size="lg" title="新建一个标准元素" @ok="handleOk" >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container fluid>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">元素编码：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.stdrd_item_id" :state="nameState" required></b-form-input>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素名称：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.stdrd_item_name"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">元素类型：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="item_type_options" v-model="cur_item.stdrd_item_type" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素长度：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.stdrd_item_length"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">引用字典：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="dict_list" v-model="cur_item.stdrd_item_dict"> </b-form-select>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">校验规则：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.stdrd_valid_rule"> </b-form-input>
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
      name:"stdrdItemList",
      props: {
          just_read:Boolean,
      },
    data() {
      return {
          cur_item: this.genNewItem(),
            nameState:null,

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
          {key: 'stdrd_item_id', label: '元素编码', sortable: true},
          {key: 'stdrd_item_name', label: '元素名称', sortable: true},
          {key: 'stdrd_item_type', label: '元素类型', sortable: false},
          {key: 'stdrd_item_length', label: '元素长度', sortable: true,},
          {key: 'stdrd_item_dict', label: '引用字典组', sortable: true,},
          {key: 'stdrd_valid_rule', label: '校验规则', sortable: true,},
          {key: 'update_time', label: '更新时间', sortable: true,},
          {key: 'actions', label: '操作', sortable: false,},
        ],
        items: [
            { stdrd_item_id: 'item1', stdrd_item_name: 'Dickerson', stdrd_item_type: 'long', stdrd_item_length:'4', stdrd_item_dict: '', update_time:''},
            { stdrd_item_id: 'sex', stdrd_item_name: '性别', stdrd_item_type: 'text' , stdrd_item_length:'1', stdrd_item_dict: 'sex', update_time:''},
            { stdrd_item_id: 'item3', stdrd_item_name: 'Geneva', stdrd_item_type: 'long' , stdrd_item_length:'8', stdrd_item_dict: '', update_time:''},
            { stdrd_item_id: 'item4', stdrd_item_name: 'Jami001', stdrd_item_type: 'double', stdrd_item_length:'(4,2)', stdrd_item_dict: '', update_time:'' },
            { stdrd_item_id: 'item5', stdrd_item_name: 'Jami002', stdrd_item_type: 'text', stdrd_item_length:'4', stdrd_item_dict: '', update_time:'' },
            { stdrd_item_id: 'nation', stdrd_item_name: '民族', stdrd_item_type: 'text', stdrd_item_length:'1', stdrd_item_dict: 'nation', update_time:'' },
            { stdrd_item_id: 'item7', stdrd_item_name: 'Jami004', stdrd_item_type: 'time', stdrd_item_length:'10', stdrd_item_dict: '', update_time:'' },
            
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
            stdrd_item_name:'',
            stdrd_item_id:'',
            stdrd_item_type:null,
            stdrd_item_length:10,
            stdrd_item_dict:null,
            stdrd_valid_rule:null,
            is_new:true,
            }
      },
      newStdItem: function(){
          this.cur_item= this.genNewItem()
          this.$bvModal.show("modal-stdrd_item")
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
        this.$nextTick(() => {this.$bvModal.hide('modal-stdrd_item')})
      },
      itemEdit(item_obj){
          this.cur_item = item_obj
          this.$bvModal.show("modal-stdrd_item")
      },
      itemDel(item_obj, index){
          // todo: 将cur_item 的内容从数据库中删除，然后重新读取数据库内的 items 列表。
          this.items.splice(index, 1)
          this.totalRows -= 1
      }
  }
}

</script>