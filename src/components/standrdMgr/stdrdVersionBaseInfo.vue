<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-stdrd_ver_id" label-cols="4" label="版本编码:" label-for="input-stdrd_ver_id">
                            <b-form-input id="input-stdrd_ver_id" v-model="form.stdrd_ver_id" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-ver_stdrd_id" label-cols="4" label="版本标准号:" label-for="input-ver_stdrd_id">
                            <b-form-input id="input-ver_stdrd_id" v-model="form.ver_stdrd_id"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-right"><b-button pill type="submit" variant="primary" v-show="!this.just_read">保  存</b-button>
                    </b-col>
                    <b-col cols="4" class="text-center"><b-button pill type="reset" variant="danger" v-show="!this.just_read">重  置</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>
<script>
export default {
    name:'stdrdVerBaseInfo',
    props:{
        version_id:String,
        just_read: Boolean,
    },
    data(){
        return {
            form: {
                stdrd_ver_id: this.version_id,
                cn_num:'L72',
                ver_stdrd_id:'GB/T 38962-2020'
            }
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
        this.form.stdrd_ver_id = ''
        this.form.ver_stdrd_id= ''
      }
    },
    watch:{
        version_id: function(val){
            this.form.stdrd_ver_id = val
        }
    }
}
</script>