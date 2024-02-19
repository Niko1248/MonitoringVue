<template lang="html">
	<div class="SystemP">
			<div class="Sp__wrapper popup">
					<div class="close" @click="showPopupSP">
							<img src="./../assets/img/nav/close.svg" alt="закрыть" width="20px">
					</div>
					<div class="Sp__wrapper-header">
							
							<div type="text" class="correspondent__wrap">
								<input placeholder="Введите номер СП" style="margin-right: 1vw;">
								<h1 class="systemCorrespondent"> Колибри - {{ systemData.systemCorrespondent }}</h1>
								<input type="text" placeholder="Введите корреспондента" style="margin-right: 1vw;">
							</div>
					</div>
					<div class="Sp__wrapper-content">
							<div class="payload__wrap">
								<div class="payload__content"></div>
								<form action="" class="payload__form">
									<input type="text" placeholder="Введите номер КС" class="payload__input">
									<input type="text" placeholder="Корреспондент" class="payload__input">
									<select name="" id="">
										<option value="" disabled selected hidden>Выберите тип</option>
										<option value="">Вершина</option>
										<option value="">Монолит</option>
									</select>
									<button class="payload__btn">Добавить</button>
								</form>
							</div>
							<div class="note__wrap">
								<div class="note__form">
									<input class="payload__input" type="text" placeholder="Введите номер пина">
									<select name="" id="">
										<option value="" disabled selected hidden>КМУ/ОМУ</option>
										<option value="КМУ">КМУ</option>
										<option value="ОМУ">ОМУ</option>
									</select>
									<input class="payload__input" type="text" placeholder="Введите КМУ/ОМУ">
									
								</div>

								<div class="Sp__note">
									<textarea cols="30" rows="10" placeholder="Примечания"></textarea>
								</div>
							</div>
							
					</div>
					<button class="save">Сохранить</button>
			</div>
	</div>
</template>
	
<script>
import axios from 'axios';
import Config from '../../config';


export default {
	data() {
			return {
					isRemove: false,
			}
	},
	methods: {
			showPopupSP() {
					this.$store.commit('showPopupSp');
			},
			showRemoveSp() {
					this.isRemove = !this.isRemove
			},
			async removeSystem() {
				 await axios.delete(`${Config.SERVER_URL}/api/systems/removeSystem/${this.systemData.systemID}`)
				 const newSystems = this.$store.state.systems.filter(el => el._id !== this.systemData.systemID)
				 this.$store.commit('changeSystems', newSystems)
				 this.showPopupSP()
			},
			viewIco(ico) {
				switch(ico){
					case 'Вершина':
						return '/src/assets/img/payload/Вершина.svg';
					case 'Монолит':
						return '/src/assets/img/payload/Монолит.svg';
				}
			}
	},
	props: {
			systemData: {
					type: Object,
					default: () => ({})
			}
	}
}
</script>
	
<style lang="scss" scoped>
input {
	background-color: #2E3541;
	border-radius: 5px;
	border: 0;
	color: white;
	font-size: 16px;
	padding-left: 1vw;
}
input::placeholder{
	color: white;
	text-align: left;
}
.payload__input{
	padding: 1vw;
}
.SystemP {
	font-family: Wix Madefor Display;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.887);
	position: fixed;
	left: 0px;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.Sp__wrapper {
	padding: 1.1vw 1.5vw;
	width: 80vw;
	height: 80vh;
	background-color: #0E1621;
	border-radius: 10px;
	filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4274509804));
}
.ico{
width: 20px;
height: 20px;
margin-right: 5px;
}
.Sp__content-items{
margin-bottom: 5px;
}
.payload__form{
	display: flex;
	flex-direction: column;
	height: 35%;
	justify-content: space-between;
}
.payload__text{
color: #DBFFDA;
}
.correspondent__wrap{
	display: flex;
}
.payload__wrap{
	width: 30%;
	display: flex;
	flex-direction: column;
}
.note__form{
	display: flex;
	flex-direction: column;
	height: 26%;
	margin-bottom: 1vw;
	justify-content: space-between;
}
.close {
	height: 100%;
	width: 3%;
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
			content: "";
			display: block;
			position: absolute;
			width: 13px;
			height: 13px;
			left: -13px;
			bottom: 0px;
			background-image: url(./../assets/img/nav/left-down.svg);

	}

	&::after {
			content: "";
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

.Sp__wrapper-header {
	display: flex;
	align-items: center;
	justify-content: start;
	color: #fff;
	font-family: Wix Madefor Display;
	margin-bottom: 2vw;
}

.Sp__wrapper-content {
	display: flex;
	gap: 1vw;
	height: 85%;
}
.item__wrapper{
display: flex;
}
.systemNumber {
	font-family: Viga Regular;
	margin-right: 2vw;
	font-size: 3vw;
	font-weight: 100;
}

.systemCorrespondent {
	margin-right: 1vw;

}

.systemState {
	display: block;
	padding: 0.1vw 0.7vw 0.3vw 0.7vw;
	border-radius: 7px;
	margin-top: 5px;
}
.payload__btn {
	background: #053429;
	outline: none;
	color: #F2F1F1;
	width: 100%;
	height: 35px;
	border: none;
	border-radius: 10px;
	font-size: 18px;
	transition: 0.2s ease-in;

	&:hover {
			filter: drop-shadow(0px -2px 5px #ffffff34);
			transition: 0.2s ease-in;
			color: #fff;
	}
}
.save {
	background: #053429;
	outline: none;
	color: #F2F1F1;
	position: absolute;
	bottom: 0;
	left: calc((100% - 130px)/2);
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
			content: "";
			display: block;
			position: absolute;
			width: 13px;
			height: 13px;
			left: -13px;
			bottom: 0px;
			background-image: url(./../assets/img/nav/left-down.svg);

	}

	&::after {
			content: "";
			display: block;
			position: absolute;
			width: 13px;
			height: 13px;
			right: -13px;
			bottom: 0px;
			background-image: url(./../assets/img/nav/right-down.svg);
	}
}

textarea {
	background: #2E3541;
	border: none;
	min-width: calc(100% - 20px);
	max-width: calc(100% - 20px);
	border-radius: 5px;
	max-height: 70%;
	outline: none;
	color: #F2F1F1;
	padding: 10px;
	font-size: 18px;

	&::placeholder {
			padding: 0px 10px;
			font-size: 18px;
			color: #F2F1F1;
			font-family: Wix Madefor Display;
	}

	&:hover {
			filter: drop-shadow(0px 0px 2px #ffffff40);
			transition: 0.2s;
	}

	&:focus {
			filter: drop-shadow(0px 0px 2px #000);
			transition: 0.2s ease-in;

	}
}

select {
	width: calc(86% + 40px);
	height: 45px;
	border: none;
	border-radius: 5px;
	outline: none;
	background: #2E3541;
	color: #F2F1F1;
	padding: 0 10px;
	font-size: 18px;
	color: #F2F1F1;
	transition: 0.2s ease-in;
	margin-right: 10px;

	&:hover {
			filter: drop-shadow(0px 0px 2px #ffffff40);
			transition: 0.2s;

	}

	&:focus {
			filter: drop-shadow(0px 0px 2px #000);
			transition: 0.2s ease-in;

	}
}

.payload__content {
	height: 60%;
	background: #2E3541;
	border-radius: 5px;
	margin-bottom: 2vw;
}

.Sp__tract {
	width: 30%;
	height: 71vh;
}

.note__wrap {
	height: 100%;
	display: flex;
	flex-direction: column;
	width: 30%;
}

.remove_wrapper {
	display: flex;

	div {
			margin-top: 5px;
			display: flex;
			margin-left: 1vw;
			background: #b70000;
			border-radius: 7px;
			padding: 0 0 0 0.7vw;
	}

	p:nth-child(2) {
			margin-bottom: 0.1vw;
			display: block;
			padding: 0.1vw 0vw 0.1vw 0vw;
			height: 90%;
			width: 3vw;
			margin-left: 1vw;
			border-radius: 7px 0px 0px 7px;
			text-align: center;
			transition: 0.1s;

			&:hover {
					background: #0000009b;
					transition: 0.1s;

			}
	}

	p:nth-child(3) {
			display: block;
			padding: 0.1vw 0vw;
			height: 90%;
			width: 3vw;
			border-radius: 0px 7px 7px 0px;
			text-align: center;
			margin-bottom: 0.1vw;
			transition: 0.1s;

			&:hover {
					transition: 0.1s;
					background: #0000009b;

			}

	}
}

.remove__ico {
	width: 1.5vw;
	margin-left: 2vw;
	transition: 0.2s;

	&:hover {
			filter: drop-shadow(0 0 10px #fff);
			stroke: #fff;
			transition: 0.2s;
	}

	&:active {
			filter: drop-shadow(0 0 10px #000);
			stroke: #fff;
			transition: 0.2s;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: 1.5s ease;
	opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transition: 1.5s ease;

}
</style>
	