<template>
    <div>
        <b-container fluid>
            <b-row>
                
            </b-row>
            <b-row align-h="end">
                <b-col cols="3" class="my-1">
                    <b-form-group label="每页" label-cols="2" label-align-sm="right" label-size="sm" label-for="perPageSelect" class="mb-0">
                        <b-form-select v-model="perPage" id="perPageSelect" size="sm" sm="0" :options="pageOptions"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="3" class="my-1">
                    <b-pagination size="sm" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="my-0"></b-pagination>
                </b-col>
                <b-col cols="1.5" align-self="center">
                    <b-button size="sm" pill variant="success" @click="newStdItem()" v-show="!this.just_read">新建一个元素</b-button>
                </b-col>
            </b-row>

            <b-table striped hover :fields="fields" :items="items" :current-page="currentPage" :per-page="perPage">

                <template v-slot:cell(actions)="row" v-if="!this.just_read">   
                    <b-button pill  size="sm" @click="watch(row.item, row.index, $event.target)" variant="outline-primary">
                        编辑
                    </b-button>
                    <b-button pill  size="sm" @click="canceled(row.item, row.index, $event.target)" variant="danger">
                        删除
                    </b-button>
                </template>

            </b-table>

        </b-container>

        <!-- 弹出框内容 -->
        <div>
            <b-modal id="modal-stdrd_item" centered  size="lg" title="新建一个标准元素"
            @show="resetModal" @hidden="resetModal" @ok="handleOk" >
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
                        <b-col cols="2" align-self="center"><div class="text-right">元素类型：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="item_type_options" v-model="cur_item.item_type" required>
                                <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select one --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素长度：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.item_length"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2" align-self="center"><div class="text-right">引用字典：</div></b-col>
                        <b-col cols="3">
                            <b-form-select size="sm" :options="dict_list" v-model="cur_item.item_dict"> </b-form-select>
                        </b-col>
                        <b-col cols="2" align-self="center"><div class="text-right">元素长度：</div></b-col>
                        <b-col cols="3">
                            <b-form-input size="sm" v-model="cur_item.item_length"></b-form-input>
                        </b-col>
                    </b-row>
                </b-container>
                
                
            </form>
            </b-modal>
        </div>

    </div>
</template>

<script>
  export default {
      name:"stdrdItemList",
      props: {
          just_read:Boolean,
      },
    data() {
      return {
          cur_item: {
            item_name:'',
            item_id:'',
            item_type:null,
            item_length:4,
            item_dict:null,
            
            },
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
            { value: 'time', text: '时间' }
        ],
        fields: [
          {key: 'stdrd_item_id', label: '元素编码', sortable: true},
          {key: 'stdrd_item_name', label: '元素名称', sortable: true},
          {key: 'stdrd_item_type', label: '元素类型', sortable: false},
          {key: 'stdrd_item_length', label: '元素长度', sortable: true,},
          {key: 'stdrd_item_dict', label: '引用字典组', sortable: true,},
          {key: 'update_time', label: '发布时间', sortable: true,},
          {key: 'actions', label: '操作', sortable: false,},
        ],
        items: [
            { stdrd_item_id: 'item1', stdrd_item_name: 'Dickerson', stdrd_item_type: '整数', stdrd_item_length:'4', stdrd_item_dict: '', update_time:''},
            { stdrd_item_id: 'sex', stdrd_item_name: '性别', stdrd_item_type: '字典' , stdrd_item_length:'1', stdrd_item_dict: 'sex', update_time:''},
            { stdrd_item_id: 'item3', stdrd_item_name: 'Geneva', stdrd_item_type: '整数' , stdrd_item_length:'8', stdrd_item_dict: '', update_time:''},
            { stdrd_item_id: 'item4', stdrd_item_name: 'Jami001', stdrd_item_type: '小数', stdrd_item_length:'(4,2)', stdrd_item_dict: '', update_time:'' },
            { stdrd_item_id: 'item5', stdrd_item_name: 'Jami002', stdrd_item_type: '文本', stdrd_item_length:'4', stdrd_item_dict: '', update_time:'' },
            { stdrd_item_id: 'nation', stdrd_item_name: '民族', stdrd_item_type: '字典', stdrd_item_length:'1', stdrd_item_dict: 'nation', update_time:'' },
            { stdrd_item_id: 'item7', stdrd_item_name: 'Jami004', stdrd_item_type: '时间', stdrd_item_length:'10', stdrd_item_dict: '', update_time:'' },
            
        ],
        totalRows: 7,
        currentPage: 1,
        perPage: 3,
        pageOptions: [3, 10, 50],
    }
  },
  methods: {
      newStdItem: function(){
          this.$bvModal.show("modal-stdrd_item")
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {this.$bvModal.hide('modal-stdrd_item')})
      }
  }
}

</script>