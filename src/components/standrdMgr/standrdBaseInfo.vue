<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
        <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group
                            id="label_input-1"
                            label-cols="4"
                            label="版本唯一编码:"
                            label-for="input-1"
                        >
                        <b-form-input id="input-1" v-model="uuid"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group
                            id="label_input-2"
                            label-cols="4"
                            label="标准版本名称:"
                            label-for="input-2"
                        >
                            <b-form-input id="input-2" v-model="form.name"></b-form-input>
                        </b-form-group>
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
      uuid:String
  },
  components:{
  },
  data() {
      return {
        form: {
          uuid : this.uuid,
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
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
        this.form.email = ''
      }
    },
}

</script>