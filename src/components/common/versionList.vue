<template>
    <div>
    <b-card no-body>
        <b-tabs card>
            <b-tab title="发布中" active>
                <verStatusList :status="'publish'" :items="this.publish_items" :fields="this.fields" 
                v-on:watch="watch" v-on:delet="delet"></verStatusList>
            </b-tab>
            <b-tab title="可编辑">
                <verStatusList :status="'editing'" :items="this.editing_items" :fields="this.fields" 
                v-on:watch="watch" v-on:delet="delet"></verStatusList>
            </b-tab>
            <b-tab title="已删除">
                <verStatusList :items="this.cancel_items" :fields="this.fields"></verStatusList>
            </b-tab>
        </b-tabs>
    </b-card>

    </div>
</template>

<script>
import verStatusList from './versionStatusList'
export default {
    name:'versionList',
    components:{
        verStatusList,
    },
    props:{
        fields:{type:Array, default: () => []},
        publish_items:{type:Array, default: () => []},
        editing_items:{type:Array, default: () => []},
        cancel_items:{type:Array, default: () => []},
    },

    data(){
        return{
        }
    },

    methods:{
       watch(item) {
          this.$emit("watch", item)
      },
      delet(item_index){
          this.$emit("delet", item_index)
      },
    }
}
</script>