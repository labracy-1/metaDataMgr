<template>

<div>
  <b-container fluid>
    <b-row>
      <b-alert variant="light" show><h4 class="alert-heading">数据标准列表</h4></b-alert>
      <b-col cols="3"></b-col>
      <b-col align-self="center">
        <div class="text-right">
        <b-button pill variant="success" @click="newStd()">新建一个数据标准</b-button>
        </div>
        </b-col>
    </b-row>
  </b-container>

  <b-card no-body>
    <b-tabs card>
      <b-tab title="发布中" active>
        <publish></publish>
      </b-tab>
      <b-tab title="可编辑">
        <editing></editing>
      </b-tab>
      <b-tab title="已删除">
        <canceled></canceled>
      </b-tab>
    </b-tabs>
  </b-card>

  <!-- 弹出框内容 -->
  <div>
    <b-modal id="modal-prevent-closing" ref="modal" title="新建一个数据标准"
      @show="resetModal" @hidden="resetModal" @ok="handleOk" >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="请输入新的标准编码："
          label-for="name-input"
          invalid-feedback="New standrd ID is required">
          <b-form-input id="name-input" v-model="standrdId" :state="nameState" required ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</div>

</template>

<script>
import publish from './publish'
import editing from './editing'
import canceled from './canceled'

export default {
  name: 'standrdList',
  components:{
      publish,
      editing,
      canceled
  },
  data() {
      return {
        standrdId: '',
        nameState: null,
      }
    },
  methods: {
      newStd() {
        this.$bvModal.show("modal-prevent-closing")
      },
      checkFormValidity() {
        const valid = this.standrdId.length > 4
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {this.$bvModal.hide('modal-prevent-closing')})
        this.$router.push({path: `/stdrdDetail/${this.standrdId}`});
      }
    }
}

</script>