import { Meteor } from 'meteor/meteor';
import { Links } from '/lib/collections';
import prerenderio from 'prerender-node'; 
import { WebApp } from 'meteor/webapp'; 

if (Meteor.isServer) {
	Meteor.publish('links', function (limit, search, skip) {
		Counts.publish(this, 'totalLinks', Links.find());
		// Meteor._sleepForMs(1000);
		return Links.find({ "title": { $regex: new RegExp(search, "i") } }, {sort: { createdAt: -1 }, limit: limit, skip: skip});
	});

	Meteor.methods({
		addData: function (title, url) {
			insertLink(title, url);
		},
		deleteData: function (_id) {
			Links.remove(_id);
		},
		editSubmit: function (_id, title, url) {
			Links.update({ _id: _id }, { $set: { title: title, url: url, updatedAt: new Date() } });
		}
	})

	function insertLink(title, url) {
		Links.insert({ title, url, createdAt: new Date() });
	}

	Meteor.startup(() => {
		__meteor_runtime_config__.meteorRelease = undefined;

		// Use https://prerender.io/
		// prerenderio.set('prerenderToken', 'RkZceqz9f35NfwkZ4IuP');
		// prerenderio.set('protocol', 'https');
		// prerenderio.set('forwardHeaders', true);
		// prerenderio.set('afterRender', function afterRender(error) {
		// 	if (error) {
		// 		console.log('prerenderio error', error); // eslint-disable-line no-console 
		// 		return;
		// 	}
		// });
		// WebApp.rawConnectHandlers.use(prerenderio);

		// Use Local Server
		prerenderio.set('prerenderServiceUrl', 'http://172.20.0.16:3000');
		prerenderio.set('protocol', 'https');
		prerenderio.set('forwardHeaders', true);
		prerenderio.set('afterRender', function afterRender(error) {
			if (error) {
				console.log('prerenderio error', error);
				return;
			}
		});
		WebApp.rawConnectHandlers.use(prerenderio); 

	// // If the Links collection is empty, add some data.
		if (Links.find().count() === 0) {
			insertLink(
				'Do the Tutorial',
				'https://www.meteor.com/tutorials/react/creating-an-app'
			);

			insertLink(
				'Follow the Guide',
				'http://guide.meteor.com'
			);

			insertLink(
				'Read the Docs',
				'https://docs.meteor.com'
			);

			insertLink(
				'Discussions',
				'https://forums.meteor.com'
			);
		}
	});
}