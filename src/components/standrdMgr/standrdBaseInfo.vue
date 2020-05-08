<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
        <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-1" label-cols="4" label="标准编码:" label-for="input-1">
                            <b-form-input id="input-1" v-model="stdrd_id" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-2" label-cols="4" label="标准名称:" label-for="input-2">
                            <b-form-input id="input-2" v-model="form.name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_choose_std_level" label-cols="4" label="标准级别:" label-for="choose_std_level">
                            <b-form-select id="choose_std_level" v-model="form.stdrd_level" :options="std_level_options">
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                            </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-5" label-cols="4" label="标 准 号:" label-for="input-5">
                            <b-form-input id="input-5" v-model="form.stdrd_num"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-3" label-cols="4" label="中国标准分类号:" label-for="input-3">
                            <b-form-input id="input-3" v-model="form.cn_num"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-6" label-cols="4" label="归口单位:" label-for="input-6">
                            <b-form-input id="input-6" v-model="form.org_name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-4" label-cols="4" label="国际标准分类号:" label-for="input-4">
                            <b-form-input id="input-4" v-model="form.world_num"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_stdrd_desc" label-cols="4" label="备注说明:" label-for="text_stdrd_desc">
                        <b-form-textarea
                                id="text_stdrd_desc"
                                v-model="form.desc"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"
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
  name: 'standrdBaseInfo',
  props:{
      stdrd_id:String
  },
  components:{
  },
  data() {
      return {
        form: {
          stdrd_id: this.stdrd_id,
          stdrd_num:'GB/T 38962',
          cn_num:'L72',
          world_num:'35.240.99',
          org_name:'全国信息技术标准化技术委员会',
          stdrd_level:'Country',
          industry_type:'D',
          name: '个人健康信息码 数据格式',
          desc:'由TC28（全国信息技术标准化技术委员会）归口上报，TC28SC28（全国信息技术标准化技术委员会办公机器、外围设备和耗材分会）执行，主管部门为国家标准化管理委员会。',
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        std_level_options: [
          { value: 'Country', text: '国家标准' },
          { value: 'Industry', text: '行业标准' },
          { value: 'Place', text: '地方标准' },
          { value: 'Enterprise', text: '企业标准' }
        ],
        industry_type_options: [
          { value: 'A', text: '农、牧、林、渔业' },
          { value: 'B', text: '采矿和采石' },
          { value: 'C', text: '制造业' },
          { value: 'D', text: '电、煤气、蒸汽和空调供应' },
          { value: 'E', text: '供水；污水处理、废物管理和补救' },
          { value: 'F', text: '建筑业' },
          { value: 'G', text: '批发和零售业；汽车和摩托车修理' },
          { value: 'H', text: '运输与存储' },
          { value: 'I', text: '食宿服务' },
          { value: 'J', text: '信息和通信' }
        ]
      }
    },
    watch: {
            // 如果 `uuid` 发生改变，这个函数就会运行
            uuid: function () {
                alert(this.uuid)
            }
        },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.stdrd_level=null
        this.form.industry_type=null
        this.form.desc=''
      }
    },
}

</script>