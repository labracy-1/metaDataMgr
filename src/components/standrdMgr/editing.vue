<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col sm="5" md="6" class="my-1"></b-col>
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
                    <b-button pill  size="sm" @click="edit(row.item, row.index, $event.target)" variant="outline-primary">
                        编辑
                    </b-button>
                    <b-button pill  size="sm" @click="publish(row.item, row.index, $event.target)" variant="success">
                        发布
                    </b-button>
                    <b-button pill  size="sm" @click="delet(row.item, row.index, $event.target)" variant="danger">
                        删除
                    </b-button>
                </template>

            </b-table>
        </b-container>

   </div>
</template>
<script>

export default {
    name: 'editing',
  data() {
      return {
          fields: [
          {key: 'standrd_id', label: '标准编码', sortable: true},
          {key: 'standrd_name', label: '标准名称', sortable: true},
          {key: 'version', label: '当前版本', sortable: false},
          {key: 'standrd_type', label: '标准类型', sortable: true,},
          {key: 'standrd_group', label: '行业归属', sortable: true,},
          {key: 'status_time', label: '发布时间', sortable: true,},
          {key: 'status', label: '当前状态', sortable: true,},
          {key: 'actions', label: '操作' }
        ],
            items: [
            { standrd_id: 'standrd11', standrd_name: 'Dickerson', version:'V1.0', status_time: '2020-03-21 11:59:23', status:'编辑中', standrd_type: '国家标准', standrd_group:'国军标'},
            { standrd_id: 'standrd21', standrd_name: 'Larsen', version:'V1.0', status_time: '2020-03-27 18:09:20' , status:'编辑中', standrd_type: '世界标准', standrd_group:'ISO'},
            { standrd_id: 'standrd31', standrd_name: 'Geneva', version:'V3.0', status_time: '2020-02-15 21:34:25' , status:'审批驳回', standrd_type: '世界标准', standrd_group:'IEEE'},
            { standrd_id: 'standrd41', standrd_name: 'Jami001', version:'V1.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd51', standrd_name: 'Jami002', version:'V2.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd61', standrd_name: 'Jami003', version:'V1.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
            { standrd_id: 'standrd71', standrd_name: 'Jami004', version:'V5.0', status_time: '2020-03-29 08:06:52', status:'编辑中', standrd_type: '国家标准', standrd_group:'HT' },
        
        ],
        totalRows: 7,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
      }
    }
}
</script>