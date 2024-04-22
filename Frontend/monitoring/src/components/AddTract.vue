<template lang="html">
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

      <div class="content__wrapper">
        <div class="node">
          <input
            type="text"
            placeholder="595Б" />
        </div>
        <img
          src="../assets/plus.svg"
          @click="addNondes"
          width="20px"
          height="20px"
          style="cursor: pointer; margin: 0px 10px"
          alt="add" />

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
          <img
            src="../assets/plus.svg"
            @click="aa"
            width="20px"
            height="20px"
            style="cursor: pointer; margin: 0px 10px"
            alt="add" />
        </div>
      </div>

      <button class="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      showAddTract() {
        if (this.$store.state.popups.popupAddTract === true) this.$store.commit('showPopupAddTract')
        document.querySelector('.Sp__wrapper').classList.remove('Sp__wrapper--close')
      },
      addNondes() {}
    }
  }
</script>

<style lang="scss" scoped>
  .addTract__wrapper {
    width: 70vw;
    max-height: 60vh;
    font-family: Wix Madefor Display;
    background: #0e1621;
    border-radius: 10px;
    padding: 20px 0px 60px 0px;
    position: absolute;
    top: 40vh;
    left: 15vw;
    filter: drop-shadow(-10px 20px 20px #0000006d);

    h1 {
      color: #f2f1f1;
      font-weight: bold;
      margin-bottom: 30px;
      margin-left: 20px;
      font-size: 24px;
    }

    div {
      display: flex;
    }
  }
  .addTract {
    display: flex;
    flex-direction: column;
  }
  .content__wrapper {
    margin: 0px 20px;
    display: flex;
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
    width: 2%;
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
</style>
