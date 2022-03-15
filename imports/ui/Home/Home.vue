<template>
<div class="app">
	<h1>Simple Meteor example using Vue 2.x</h1>
	<img src="/images/human.jpg" width="200">
	<p>
		You pressed the button {{count}} time(s).
	</p>
	<my-button :label="buttonLabel" @click="addOne"></my-button>
	<p>
		Learn more about the vue integration <a href="https://github.com/Akryum/meteor-vue-component">on GitHub</a>.
	</p>
	<hr />
	<test2></test2>
	<hr />

	<h3>Start Stop Meteor</h3>
	<button class="btn btn-success" @click="activate">activate</button>
	<button class="btn btn-danger" @click="deactivate">deactivate</button>
	<hr />

	<h3>Links</h3>
	<p></p>
	<div class="form-group">
		Title: <input class="form-control" v-model="newTitle" />
	</div>
	<div class="form-group">
		URL: <input class="form-control" v-model="newURL" />
	</div>
	<button class="btn btn-primary" @click="addData">Add</button>
	<div class="float-right"><input class="form-control" placeholder="Search" v-model.lazy="search" /></div>

	<hr />
	<div v-if="links && links.length == 0 && search">Empty</div>
	<div v-else>
        <!-- Back -->
        <div v-if="currPage > 1"><div class="text-center" style="padding: 15px 0"><button class="btn btn-primary" @click="back">上一頁</button></div></div>

		<!-- Loop Data -->
		<div ref="datas" v-for="(link, index) in links" :key="link._id">
            <!-- Page Top -->
            <div v-if="index % perPage == 0" class="text-center btn-success" :class="'page_'+ Math.ceil(currPage + index / perPage)" style="padding: 5px; margin-bottom:15px">
                第 {{ Math.ceil(currPage + index / perPage) }} 頁
            </div>

			<div v-if="!editMode[link._id]">
				<p>Title: <b>{{link.title}}</b></p>
				<p>URL: <a :href="link.url">{{link.url}}</a></p>
				<p>Date: <span class="date">{{link.createdAt}}</span></p>
				<p v-if="link.updatedAt">Update Date: <span class="date">{{link.updatedAt}}</span></p>
				<button class="btn btn-primary" @click="editData(link._id)">Edit</button>
				<button class="btn btn-danger" @click="deleteData(link._id)">Delete</button>
			</div>
			<div v-else>
				<form :ref="'form_'+link._id" @submit.prevent="editSubmit(link._id)">
					<div class="form-group">
						Title: <input class="form-control" name="title" :value="link.title" />
					</div>
					<div class="form-group">
						URL: <input class="form-control" name="url" :value="link.url" />
					</div>
					<button class="btn btn-success" type="submit">Edit Submit</button>
					<button class="btn btn-danger" @click="cancelSubmit(link._id)">Cancel Submit</button>
				</form>
			</div>

            <!-- Page Bottom -->
            <div v-if="index % perPage == perPage - 1" :class="'pageBottom_'+ (Math.ceil(currPage + index / perPage) - 1)"></div>

			<hr />
		</div>
		<!-- End Loop Data -->
	</div>

	<!-- Last Page Bottom -->
	<div v-if="links.length != perPage" :class="'pageBottom_'+ (Math.ceil(totalLinks / perPage))"></div>

	<!-- Load More -->
    <div v-if="limit == links.length && totalLinks / this.$route.params.page != perPage">
        <div class="text-center"><button class="btn btn-primary" @click="loadMore">Load More</button></div>
    </div>
	<div v-else>
		<div class="text-center">- Last -</div>
	</div>

	<!-- Loading Data -->
    <div v-if="!$subReady.links" class="text-center">Loading...</div>

	<p>Total: {{totalLinks}}</p>

    <footer></footer>
</div>
</template>
<script src="Home.js"></script>
<style scoped>
footer{
    padding: 200px 0;
}
</style>