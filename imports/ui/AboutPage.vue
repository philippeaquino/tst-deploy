<template>
<div>
  <h1>About</h1>
</div>
</template>
<style scoped>
h1 {
  text-align: center;
  position: absolute;
  top: 45%;
  width: 100%;
}
</style>
<script>
export default {
	data: () => ({
		message: 'About Page',
	}),
	created() {
    DocHead.setTitle('Meteor + Vue (About)');
  }
}
</script>