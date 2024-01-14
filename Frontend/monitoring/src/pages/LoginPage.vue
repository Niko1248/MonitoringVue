<template>
	<div class="wrapper">
		<form class="form" @submit.prevent>
			<h1 class="title">Войти в систему</h1>
			<div class="input__wrapper">
				<input
					type="text"
					placeholder="Введите логин..."
					v-model="user.username"
				>
				<input
					type="password"
					placeholder="Введите пароль..."
					v-model="user.password"
				>
			</div>
			<button @click.prevent="sendLogin">Войти</button>
		</form>
	</div>
</template>


<script>
import axios from 'axios';
import Config from '../../config/index.js';


export default {
	data(){
		return {
			user:{
				username: '',
				password: '',
			}
		}
	},
	methods: {
		async sendLogin() {
			try {
				console.log(this.user);
				const response = await axios.post(`${Config.SERVER_URL}/api/auth/login`, this.user)  //Добавить обработчик ошибки на неправильный ввод
				localStorage.setItem('token', response.data.token)
				this.$router.push('/user')
			} catch (e) {
				console.log(e);
			}
		}
	}
}
</script>
<style scoped>
	.wrapper{
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title{
		color: white;
		margin-bottom: 20px;
	}
	.form{
		border: 1px solid white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 50vw;
		min-height: 30vh;
	}
	.input__wrapper{
		display: flex;
		flex-direction: column;
	}
	input{
		height: 30px;
		width: 300px;
		margin-bottom: 20px;
	}
	button{
		width: 200px;
		height: 30px;
	}
</style>