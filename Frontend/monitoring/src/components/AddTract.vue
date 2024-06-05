<template lang="html">
  <div class="addTract--background">
    <div class="addTract__wrapper">
      <div class="addTract popup">
        <div
          class="close"
          @click="showAddTract">
          <img
            src="./../assets/img/nav/close.svg"
            alt="закрыть"
            width="20px" />
        </div>

        <h1>Добавление резервного линейного тракта</h1>
        <input
          type="text"
          placeholder="Введите название тракта"
          class="tract__name" />
        <div class="content__wrapper">
          <div class="node">
            <input
              type="text"
              placeholder="595Б" />
          </div>
          <transition-group name="add">
            <div
              v-for="(id, index) in NodesIds"
              :key="index">
              <item
                :component-id="id"
                @remove-item="removeNondes"
                :nodeData="nodesData[id]"
                @update-node="updateNodeData" />
            </div>
          </transition-group>
          <img
            src="../assets/plus.svg"
            @click="addNondes"
            v-if="plus"
            width="20px"
            height="20px"
            style="cursor: pointer; margin: 0px 10px; transition: 0.2s easy"
            alt="add" />
        </div>

        <button
          class="save"
          @click="logItems">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import item from './AddTract--item.vue'

  export default {
    components: {
      item
    },
    data() {
      return {
        plus: true,
        NodesIds: [],
        nodesData: {},
        nextNodeId: 1
      }
    },
    methods: {
      showAddTract() {
        if (this.$store.state.popups.popupAddTract === true) this.$store.commit('showPopupAddTract')
        document.querySelector('.Sp__wrapper').classList.remove('Sp__wrapper--close')
      },
      addNondes() {
        const id = this.nextNodeId
        this.NodesIds.push(this.nextNodeId)
        this.nextNodeId += 1
        this.nodesData[id] = { name: '', section: '', number: '' }
      },
      removeNondes(id) {
        this.NodesIds = this.NodesIds.filter((nodeId) => nodeId !== id)
        delete this.nodesData[id]
        if (this.NodesIds.length <= 0) {
          this.nextNodeId = 1
        }
        console.log('sss' + this.nextNodeId)
      },
      updateNodeData({ id, field, value }) {
        if (this.nodesData[id]) {
          this.nodesData[id][field] = value
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addTract--background {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addTract__wrapper {
    width: 70vw;
    max-height: 60vh;
    font-family: Wix Madefor Display;
    background: #0e1621;
    border-radius: 10px;
    padding: 20px 10px 60px 10px;
    filter: drop-shadow(-10px 20px 20px #0000006d);

    h1 {
      color: #f2f1f1;
      font-weight: bold;
      margin-bottom: 10px;
      margin-left: 20px;
      font-size: 24px;
    }

    div {
      display: flex;
    }
  }
  .tract__name {
    height: 1.5vw;
    outline: none;
    border: none;
    margin: 0px 40px 20px 20px;
    text-align: left;
    background: #49495100;
    border-radius: 5px;
    font-weight: 700;
    color: #fff;
    font-family: Wix Madefor Display;
    font-size: 17px;
    transition: 0.3s ease;
    cursor: pointer;
    &::placeholder {
      transition: 0.3s ease;
    }
    &:hover {
      transition: 0.3s ease;
      color: #02f0fc;
      &::placeholder {
        transition: 0.3s ease;
        color: #02f0fc;
      }
    }
  }
  .addTract {
    display: flex;
    flex-direction: column;
  }
  .content__wrapper {
    margin: 0px 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 0px;
    flex-direction: row;
    align-items: center;
  }
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
  .close {
    height: 100%;
    width: 25px;
    background: #053429;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0px 10px 10px 0px;
    transition: 0.2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      top: 0px;
      background-image: url(./../assets/img/nav/left-top.png);
    }

    &:hover {
      filter: drop-shadow(-2px 0px 5px #ffffff34);
      transition: 0.2s ease-in;
    }
  }

  .save {
    background: #053429;
    outline: none;
    color: #f2f1f1;
    position: absolute;
    bottom: 0;
    left: calc((100% - 130px) / 2);
    width: 130px;
    height: 35px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-size: 18px;
    transition: 0.2s ease-in;

    &:hover {
      filter: drop-shadow(0px -2px 5px #ffffff34);
      transition: 0.2s ease-in;
      color: #fff;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      right: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/right-down.svg);
    }
  }
  .add-enter-active,
  .add-leave-active {
    transition: all 0.4s ease;
  }

  .add-enter-from,
  .add-leave-to {
    opacity: 0;
    transition: all 0.2s ease;
  }

  .add-move {
    transition: transform 0.6s ease;
  }
</style>
