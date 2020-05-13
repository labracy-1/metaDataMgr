<template>
    <div>
        <b-form @submit="onVerInfoSubmit" @reset="onVerInfoReset">
            <b-container fluid>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group label-cols="4" label="版本编码:" label-for="input-table_version_id">
                            <b-form-input id="input-table_version_id" v-model="this.sel_version_id" disabled></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group label-cols="4" label="版本名称:" label-for="input-21">
                            <b-form-input id="input-21" v-model="cur_version_info.version_name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group label-cols="4" label="备注说明:" label-for="input-table-desc">
                            <b-form-textarea id="input-table-desc" placeholder="Enter something..." rows="2" max-rows="4" 
                            v-model="cur_version_info.desc"></b-form-textarea>
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
    name:'versionBaseInfo',
    props:{
        just_read:Boolean,
        ver_ctl_obj_type:String,
        ver_ctl_obj_id:String,
        sel_version_id: String,
    },

    data(){
        return{
            cur_version_info:{
                version_obj_type:this.ver_ctl_obj_type, // 当前版本控制的对象的类型， 数据标准/ 数据集/ 数据资源等
                version_obj_id:this.ver_ctl_obj_id,     // 版本控制的对象的编码
                version_id:'',
                version_name:'',
                desc:'',
            }
        }
    },
    methods:{
        onVerInfoSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.cur_version_info))
        },
        onVerInfoReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.cur_version_info.version_name = ''
            this.cur_version_info.desc= ''
        }
    },
    
    
}
</script>