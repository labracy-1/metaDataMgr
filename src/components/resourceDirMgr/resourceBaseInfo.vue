<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
        <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-resource_id" label-cols="4" label="数据资源编码:" label-for="input-resource_id">
                            <b-form-input id="input-resource_id" v-model="resource_info.resource_id" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-resource_name" label-cols="4" label="数据资源名称:" label-for="input-resource_name">
                            <b-form-input id="input-resource_name" v-model="resource_info.resource_name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_choose_resource_type" label-cols="4" label="数据资源类型:" label-for="choose_resource_type">
                            <b-form-select id="choose_resource_type" v-model="resource_info.resource_type" :options="resource_level_options">
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                            </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="choose_resource_group" label-cols="4" label="数据资源分类:" label-for="input-5">
                            <b-form-select id="choose_resource_group" v-model="resource_info.resource_group" :options="resource_group_options">
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
                                v-model="resource_info.desc"
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
    name:'resourceBaseInfo',
    props:{
        resource_id:String
    },

    data() {
      return {
        resource_info: {
          resource_id: this.resource_id,
          resource_name: '从数据库中查询',
          resource_type:'',
          resource_group:'',
          desc:'无任何描述信息',
        },
        resource_level_options: [
          { value: 'province', text: '省级数据源' },
          { value: 'city', text: '市级数据源' },
          { value: 'company', text: '企业数据源' },
          { value: 'project', text: '项目数据源' },
        ],
        resource_group_options: [
          { value: 'per', text: '人' },
          { value: 'wu', text: '物品' },
          { value: 'event', text: '事件' },
        ],
        }
    },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.resource_info))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.resource_info.resource_name = ''
        this.resource_info.resource_type=null
        this.resource_info.resource_group=null
        this.resource_info.desc=''
      }
    },
}
</script>