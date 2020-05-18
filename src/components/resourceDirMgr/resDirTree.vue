
<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col>
                    <el-tree default-expand-all highlight-current :data="treelist" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

export default {
    name:'resDirTree',
    props:{
        treelist: {type:Array, default: () => []},
    },

    data(){
        return{
            open: false,
            defaultProps: {
                children: 'children',
                label: 'label'
        }

        }
    },
    computed:{
        isFolder:function(){
            return this.treelist.children
         }
    }
    ,methods:{
        handleNodeClick(data) {
            this.$emit("nodeClicked", data.id)
      },
      loadNode(node, resolve) {
        console.log(node + resolve)
      }
    }

}
</script>