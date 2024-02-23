<template lang="html">
	<div class="SystemP">
			<div class="Sp__wrapper popup">
					<div class="close" @click="showPopupAddSp">
							<img src="./../assets/img/nav/close.svg" alt="закрыть" width="20px">
					</div>
					<div class="flex__wrap">
						<div class="form-left">
							<h1>Добавление системы передачи</h1>
							<div class="main__form">
								<input type="text" placeholder="№ СП" required>
								<input type="text" placeholder="Корреспондент" required>
								<input type="text" placeholder="№ pin" required>
								<input type="text" placeholder="КМУ" class="input__kmu" >
								<input type="text" placeholder="ОМУ" class="input__omu">
							</div>
							<h2>Загрузка системы передачи</h2>
							<div class="payload__form">
								<input type="text" placeholder="Номер канала">
								<input type="text" placeholder="Корреспондент">
								<select name="" id="">
									<option value="" disabled selected hidden>Вид связи</option>
									<option value="Вершина">Вершина</option>
									<option value="Монолит">Монолит</option>
								</select>
								<img src="../assets/plus.svg" width="25px" height="25px" style="margin-left: 1vw; cursor: pointer;" alt="">
							</div>
							<div class="payload__list">
								<p>Добавить нагрузку</p>
							</div>
							<h2>Примечания</h2>
							<textarea class="note"></textarea>
						</div>
						<div class="form__right">
							<img src="../assets/img/settings/Kolibri.png" width="75%" alt="Лого">
							<h2>Линейный тракт</h2>
							<select name="" id="">
								<option value="">Основной линейный тракт</option>
							</select>
						</div>
					</div>

					<button class="save">Сохранить</button>
			</div>
	</div>
</template>
	
<script>


export default {
	data() {
			return {
					isRemove: false,
			}
	},
	methods: {
			showPopupAddSp() {
					this.$store.commit('showPopupAddSp');
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
.flex__wrap {
	display: flex;
	gap: 2vw;
	max-width: 96%;
	height: 96%;
	justify-content: space-between;
}
.form-left{
	max-width: 63%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.form__right{
	display: flex;
	flex-direction: column;
	align-items: center;
}
h1, h2{
	color: white;
	margin-bottom: 1vw;
}
.main__form{
	display: grid;
  grid-template-columns: 20% 40% 20% 10% 10%;
	margin: 0 0 1vw 0;
}
.payload__form{
	display: grid;
	grid-template-columns: 30% 30% 30% 10%;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 1vw 0;

}
.payload__list, .note{
	background-color: #2E3541;
	border-radius: 5px;
	border: 0;
	height: 35%;
	color: rgb(217, 217, 217, 17%);
	padding: 0.7vw;
	font-size: 18px;
	margin-bottom: 1vw;
}
.note{
	height: 15%;
	color: white;
}
input {
	background-color: #2E3541;
	border-radius: 5px;
	border: 0;
	color: white;
	font-size: 16px;
	padding: 0.7vw;
	margin-right: 1vw;
	&::placeholder{
		color: rgb(217, 217, 217, 17%);
		text-align: left;
		font-size: 18px;
		font-weight: 400;
	}
	&:last-child{
		margin-right: 0;
	}
}
.input__kmu{
	margin-right: 0;
	padding: 0.6vw 0 0.6vw 0.6vw;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.input__omu{
	padding: 0.6vw 0.6vw 0.6vw 0;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
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
	border: none;
	border-radius: 5px;
	outline: none;
	background: #2E3541;
	color: #F2F1F1;
	padding: 0.65vw;
	font-size: 18px;
	transition: 0.2s ease-in;
	margin-right: 1vw;
	width: 100%;
	&:hover {
			filter: drop-shadow(0px 0px 2px #ffffff40);
			transition: 0.2s;

	}

	&:focus {
			filter: drop-shadow(0px 0px 2px #000);
			transition: 0.2s ease-in;

	}
}
</style>
	