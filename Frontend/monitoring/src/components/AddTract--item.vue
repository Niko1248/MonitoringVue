<template>
  <div class="addedNode">
    <div class="line">
      <div class="line__name">
        <input
          type="text"
          v-model="nodeData.name"
          @input="updateData('name')" />
      </div>
      <div class="line__middle"></div>
      <div class="line__section">
        <input
          type="text"
          v-model="nodeData.section"
          @input="updateData('section')" />
      </div>
    </div>
    <div
      class="node"
      @click="showID">
      <input
        type="text"
        placeholder="№"
        v-model="nodeData.number"
        @input="updateData('number')" />
      <div
        class="close"
        @click="removeItem">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="12px" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      componentId: {
        type: Number,
        required: true
      },
      nodeData: {
        type: Object,
        required: true
      }
    },
    methods: {
      removeItem() {
        this.$emit('remove-item', this.componentId)
      },
      updateData(field) {
        this.$emit('update-node', { id: this.componentId, field, value: this.nodeData[field] })
      },
      showID() {
        console.log(this.componentId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .node {
    border-radius: 50%;
    position: relative;
    width: 50px;
    height: 50px;
    background: #fff;
    input {
      width: 50px;
      height: 50px;
      border: none;
      text-align: center;
      background: rgba(0, 0, 0, 0);
      border-radius: 50%;
      font-weight: 700;
    }
  }
  .close {
    position: absolute;
    top: -10px;
    right: -6px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transition: 0.3s;
      opacity: 0.5;
    }
    &:active {
      transition: 0.3s;
      transform: scale(0.9);
      opacity: 1;
    }
  }
  .line {
    display: flex;
    flex-direction: column;
    input {
      width: 70px;
      background-color: #494951;
      border: none;
      border-radius: 5px;
      height: 18px;
      color: #fff;
      text-align: center;
    }
    .line__name,
    .line__section {
      display: flex;
      justify-content: center;
    }
    .line__middle {
      width: 90px;
      height: 1px;
      margin: 2px 0px 3px;
      background: #fff;
    }
  }
  .addedNode {
    display: flex;
    align-items: center;
  }
</style>
