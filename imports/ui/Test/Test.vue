<template>
	<div class="test">
		<h1>{{ message }}</h1>
		<p></p>
		<router-link to="/test" exact>No ID</router-link>&nbsp;&nbsp;
		<router-link to="/test/post/1"> ID 1</router-link>&nbsp;&nbsp;
		<router-link to="/test/post/abcde"> ID abcde</router-link>
		<p></p>
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="(this.$route.params.id == '1')" key="1">
				<h2>{{this.$route.params.id}}</h2>
			</div>
			<div v-else-if="(this.$route.params.id == 'abcde')" key="2">
				<h2>{{this.$route.params.id}}</h2>
			</div>
			<div v-else key="3">
				<h2>NO</h2>
			</div>
		</transition>
		<hr />
		<h3>Page</h3>
		<router-link to="/test/page/1">Page 1</router-link>&nbsp;&nbsp;
		<router-link to="/test/page/2">Page 2</router-link>&nbsp;&nbsp;
		<p></p>
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<router-view />
		</transition>
	</div>
</template>

<style scoped>
.test {
	margin: 0 30px;
}
.router-link-active {
	font-weight: bold;
	color: #000;
}
</style>

<script>
export default {
	data: () => ({
		message: 'Test Page',
	}),
	created() {
        DocHead.setTitle('Meteor + Vue (Test)');
    }
}
</script>
