<template>
  <div class="addedNode">
    <div class="line">
      <div class="line__name">
        <input type="text" />
      </div>
      <div class="line__middle"></div>
      <div class="line__section">
        <input type="text" />
      </div>
    </div>
    <div class="node">
      <input
        type="text"
        placeholder="№" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
        plus: true
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .node {
    border-radius: 50%;
    overflow: hidden;
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
