<template>
	<div class="app-layout">
		<!-- <app-menu></app-menu> -->
		<router-view name="nav"></router-view>
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
// import AppMenu from '/imports/ui/AppMenu.vue';
// export default {
// 	components: {
//     // AppMenu
// 	},
// }
</script>

<style>
.animated {
    animation-duration: 0.3s !important;
}
</style>