<template>
    <div>
        <b-container fluid>
            <b-row align-h="end">
                <b-col sm="5" md="3" class="my-1">
                <b-form-group
                label="Per page"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
                class="mb-0"
                >
                <b-form-select
                    v-model="perPage"
                    id="perPageSelect"
                    size="sm"
                    :options="pageOptions"
                ></b-form-select>
                </b-form-group>
            </b-col>

            <b-col sm="7" md="3" class="my-1">
                <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
                ></b-pagination>
            </b-col>
            </b-row>
            <b-table striped hover :fields="fields" :items="items" :current-page="currentPage" :per-page="perPage">

                <template v-slot:cell(actions)="row"> 
                    <b-button pill  size="sm" @click="watch(row.item, row.index, $event.target)" variant="outline-primary" 
                    v-show="showWatch">
                        查看
                    </b-button>
                    <b-button pill  size="sm" @click="canceled(row.item, row.index, $event.target)" variant="danger"
                    v-show="showCancel">
                        注销
                    </b-button>
                     <b-button pill  size="sm" @click="publish(row.item, row.index, $event.target)" variant="success"
                     v-show="showPublish">
                        发布
                    </b-button>
                    <b-button pill  size="sm" @click="delet(row.item, row.index, $event.target)" variant="danger"
                    v-show="showDel">
                        删除
                    </b-button>
                </template>
            </b-table>
        </b-container>

   </div>
</template>
<script>
export default {
    name: 'verStatusList',
    props: {
        fields: {type:Array, default: () => []},
        items: {type:Array, default: () => []},
        status: String,
    },
  data() {
      return {
        totalRows: this.items.length,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 20],

        showWatch:this.status=='publish' || this.status=='editing',
        showPublish:this.status=='editing',
        showDel: this.status=='editing',
        showCancel:this.status=='publish'
      }
    },
    methods: {
      watch(item) {
          this.$emit("watch", item)
      },
      canceled(){
          alert("待实现， 需要引入 工作流机制启动审批流程")
      },
      delet(item, index){
          this.$emit("delet", [item, index])
      },
      publish(){
          alert("待实现， 需要引入 工作流机制启动审批流程")
      }
    }
}
</script>