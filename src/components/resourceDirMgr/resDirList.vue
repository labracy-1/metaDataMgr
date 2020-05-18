<template>
    <div>
        <b-container fluid>
        <b-row>
        <b-alert variant="light" show><h4 class="alert-heading">资源目录列表</h4></b-alert>
        <b-col cols="3"></b-col>
        <b-col align-self="center">
            <div class="text-right">
            <b-button pill variant="success" @click="newDir()">新建一个资源目录</b-button>
            </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="3">
                    <resDirTree :treelist="all" v-on:nodeClicked="nodeClicked"></resDirTree>
            </b-col>
            <b-col>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container fluid>
                    <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-1" label-cols="4" label="目录编码:" label-for="input-1">
                            <b-form-input id="input-1" v-model="cur_node.dir_id" v-bind:disabled="!cur_node.is_new"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_input-2" label-cols="4" label="目录名称:" label-for="input-2">
                            <b-form-input id="input-2" v-model="cur_node.dir_name"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4" class="text-center">
                        <b-form-group id="label_choose_std_level" label-cols="4" label="上级目录:" label-for="choose_std_level">
                            <b-form-select id="choose_std_level" v-model="cur_node.parent_dir_id" :options="dir_options">
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                            </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" align-self="center">
                        <b-form-group id="label_choose_textarea" label-cols="4" label="备注说明:" label-for="choose_textarea">
                            <b-form-textarea id="choose_textarea" size="sm" v-model="cur_node.desc"> </b-form-textarea>
                            </b-form-group>
                        </b-col>
                </b-row>

                <b-row>
                    <b-col cols="4" class="text-right"><b-button pill type="submit" variant="primary">保  存</b-button>
                    </b-col>
                    <b-col cols="4" class="text-center"><b-button pill type="reset"  @click="dirDel()" variant="danger">删  除</b-button>
                    </b-col>
                </b-row>

<!-- 

                <b-row align-h="end">
                    <b-col cols="2" align-self="center" class="my-1 text-right">每页：
                    </b-col>
                    <b-col cols="1" class="my-1">
                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
                    </b-col>
                    <b-col cols="3" class="my-1">
                        <b-pagination size="sm" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="my-0"></b-pagination>
                    </b-col>
                </b-row>

                <b-table small striped hover :fields="fields" :items="items" :current-page="currentPage" :per-page="perPage">
                    <template v-slot:cell(actions)="row"> 
                            <b-button pill  size="sm"
                            @click="dirEdit(row.item, row.index, $event.target)" variant="outline-primary">
                                查  看
                            </b-button>
                            <b-button pill  size="sm"
                            @click="dirDel(row.item, row.index, $event.target)" variant="outline-danger">
                                删  除
                            </b-button>
                    </template>
                </b-table> -->
                </b-container>
            </form>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
import resDirTree from './resDirTree'
import Vue from 'vue'
let dir_list = [
    {
        dir_id:"custom_dir",
        dir_name:"按涉密属性分类",
        dir_level:'0',
        parent_dir_id:'root',
        parent_dir_name:'root',
    },{
        dir_id:"gps_sec",
        dir_name:"涉密测绘地理信息成果",
        dir_level:'1',
        parent_dir_id:'custom_dir',
        parent_dir_name:'按涉密属性分类',
    },{
        dir_id:"zhongli",
        dir_name:"重力点",
        dir_level:'2',
        parent_dir_id:'gps_sec',
        parent_dir_name:'涉密测绘地理信息成果',
    },{
        dir_id:"shuizhun",
        dir_name:"水准点",
        dir_level:'2',
        parent_dir_id:'gps_sec',
        parent_dir_name:'涉密测绘地理信息成果',
    },{
        dir_id:"sanjiao",
        dir_name:"三角点",
        dir_level:'2',
        parent_dir_id:'gps_sec',
        parent_dir_name:'涉密测绘地理信息成果',
    },{
        dir_id:"gps_no_sec",
        dir_name:"非涉密测绘地理信息成果",
        dir_level:'1',
        parent_dir_id:'custom_dir',
        parent_dir_name:'custom_dir',
    },{
        dir_id:"shiliangditu",
        dir_name:"矢量地图数据",
        dir_level:'2',
        parent_dir_id:'gps_no_sec',
        parent_dir_name:'非涉密测绘地理信息成果',
    },{
        dir_id:"moniditu",
        dir_name:"模拟地形图",
        dir_level:'2',
        parent_dir_id:'gps_no_sec',
        parent_dir_name:'非涉密测绘地理信息成果',
    },
    {
        dir_id:"shu8zigaocheng",
        dir_name:"数字高程模型",
        dir_level:'2',
        parent_dir_id:'gps_no_sec',
        parent_dir_name:'非涉密测绘地理信息成果',
    }
]


export default {
    name:'resDirList',
    components:{
        resDirTree,
    },
    data(){
        return{
            cur_node: dir_list[0],
            all: this.genTreeNodes(),
            fields: [
            {key: 'dir_id', label: '资源编码', sortable: true},
            {key: 'dir_name', label: '资源名称', sortable: true},
            {key: 'dir_level', label: '所处层级', sortable: false,},
            {key: 'parent_dir_id', label: '上级资源编码', sortable: false},
            {key: 'parent_dir_name', label: '上级资源名称', sortable: true,},
            {key: 'status_time', label: '更新时间', sortable: true,},
            {key: 'desc', label: '备注说明', sortable: false,},
            {key: 'actions', label: '操作' }
            ],
            items: dir_list,
            totalRows: dir_list.length,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 20],
            dir_options : this.genDirOptions(),
            
        }
    },
    methods:{
        nodeClicked(dir_id){
            dir_list.forEach(d => {
                if (d.dir_id == dir_id){
                    this.cur_node = d
                }
            })
            console.log("cur_node: " + this.cur_node.dir_id)
        },
        dirEdit(item){
            this.cur_node=item
        },
        dirDel(){
            for(var i =0 ; i < dir_list.length; i++){
                if (dir_list[i].dir_id == this.cur_node.dir_id)
                {
                    dir_list.splice(i, 1)
                    this.onDirListChange()
                    break;
                }
            }
        },
        newDir(){
            var p_id = this.cur_node.dir_id;
            this.cur_node={
            dir_id:"",
            dir_name:"",
            dir_level:'',
            parent_dir_id:p_id,
            parent_dir_name:'',
            is_new:true,
            }
        },
      checkFormValidity() {
        const valid = this.cur_node.dir_id.length > 4 && this.cur_node.parent_dir_id != null
        this.nameState = valid
        return valid
      },
      handleSubmit() {
        // todo: 将cur_dict_group 的内容存储到 数据库中，然后重新读取数据库内的 items 列表。
        if (this.cur_node.is_new){
            // Vue 不能检测以下数组的变动：当你利用索引直接设置一个数组项时 vm.items[indexOfItem] = newValue，需要改造成如下
            this.cur_node.is_new=false
            Vue.set(dir_list, dir_list.length, this.cur_node)
            this.totalRows += 1
            this.onDirListChange()
        }
        this.cur_node.update_time = (new Date()).toLocaleString()
      },
      onDirListChange(){
            this.all = this.genTreeNodes()
            this.dir_options = this.genDirOptions()
      },
      genTreeNodes(){
            let all_nodes= new Map();
            all_nodes.set("root", {
                    label:"root",
                    id:"root",
                    children:[]
            })
            dir_list.forEach(x =>{
                var node = {
                    label:x.dir_name,
                    id:x.dir_id,
                    children:[]
                }

                all_nodes.set(x.dir_id, node)
                var parent_id = all_nodes.get(x.parent_dir_id)
                if (parent_id){
                    parent_id.children[parent_id.children.length]=node
                }
            })
            return all_nodes.get("root").children
      },
      genDirOptions(){
          let dir_options = []
            dir_list.forEach(x =>{
                dir_options[dir_options.length] = {value:x.dir_id, text:x.dir_name}
            })
            return dir_options
      }
    }
}
</script>