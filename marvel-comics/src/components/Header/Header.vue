<template>
	<header class="header">
		<img
			src="../../assets/marvel-logo.png"
			alt="Logo da marvel, imagem retangular com o fundo vermelho e a palavra marvel escrita em branco."
			class="header__logo"
            @click="$route.path != '/' ? $router.push('/') : {}"
		/>
	</header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
	// setup() {},
});
</script>

<style lang="scss" scoped>
.header {
	width: 100vw;
	height: 100px;
	background: black;
	box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.8);

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 5%;
	transition: 500ms;

	&:hover {
		box-shadow: 0 0 40px rgba($color: #000000, $alpha: 0.8);
	}

	&__logo {
		max-height: 70px;
        cursor: pointer;
	}
}
</style>
