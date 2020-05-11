<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
        <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-table_id" label-cols="4" label="数据集编码:" label-for="input-table_id">
                            <b-form-input id="input-table_id" v-model="table_info.table_id" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-table_name" label-cols="4" label="数据集名称:" label-for="input-table_name">
                            <b-form-input id="input-table_name" v-model="table_info.table_name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_choose_table_type" label-cols="4" label="数据集类型:" label-for="choose_table_type">
                            <b-form-select id="choose_table_type" v-model="table_info.table_type" :options="table_level_options">
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                            </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="choose_table_group" label-cols="4" label="数据集分类:" label-for="input-5">
                            <b-form-select id="choose_table_group" v-model="table_info.table_group" :options="table_group_options">
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                            </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_stdrd_desc" label-cols="4" label="备注说明:" label-for="text_stdrd_desc">
                        <b-form-textarea
                                id="text_stdrd_desc"
                                v-model="table_info.desc"
                                placeholder="Enter something..."
                                rows="2"
                                max-rows="4"
                                ></b-form-textarea>
                            </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-right"><b-button pill type="submit" variant="primary">保  存</b-button>
                    </b-col>
                    <b-col cols="4" class="text-center"><b-button pill type="reset" variant="danger">重  置</b-button>
                    </b-col>
                </b-row>
            </b-container>
            
            
        </b-form>
        
    </div>
</template>
<script>

export default {
  name: 'tableBaseInfo',
  props:{
      table_id:String
  },
  components:{
  },
  data() {
      return {
        table_info: {
          table_id: this.table_id,
          table_name: '从数据库中查询',
          table_type:'',
          table_group:'',
          desc:'无任何描述信息',
        },
        table_level_options: [
          { value: 'main', text: '主数据' },
          { value: 'follow', text: '从数据' },
        ],
        table_group_options: [
          { value: 'per', text: '人' },
          { value: 'wu', text: '物品' },
          { value: 'event', text: '事件' },
        ],
        }
    },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.table_info))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.table_info.table_name = ''
        this.table_info.table_type=null
        this.table_info.table_group=null
        this.table_info.desc=''
      }
    },
}

</script>