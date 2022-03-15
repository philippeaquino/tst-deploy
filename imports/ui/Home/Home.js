import { Session } from 'meteor/session';
// import Test from '../Test/Test.vue';
// import { Links } from '/lib/collections';
import { meteors } from '/imports/api/home';

Session.setDefault("counter", 0);

let labels = ['Click me!', 'Click me again!', 'Here! Click here!', 'Again! Again!',
    'Don\'t click me! No, I\'m just kidding. You can.', 'You like that?',
    'Can you stratch me in the back please?', 'You are soooo nice! Click!',
    'Hmmmm...', 'You know, you are wasting time clicking me.',
    'No really, you can click me as much as you want.', 'Click me to level up!'];

export default {
    mixins: [meteors],
    data() {
        return {
            buttonLabel: 'Click me!',
            count: 0,
            editMode: [],
            newTitle: 'Demo',
            newURL: 'http://www.test.com',
            search: '',
            perPage: 3,
            limit: 3,
            currPage: 1,
        }
    },

    created() {
        // Get Page Number
        let getPage = parseInt(this.$route.params.page);
        if (this.isInteger(getPage)) {
            this.currPage = getPage;
        }

        // Set Title
        DocHead.setTitle('Meteor + Vue (Page: ' + this.currPage + ')');
    },

    methods: {
        activate() {
            this.$startMeteor()
        },

        deactivate() {
            this.$stopMeteor()
        },

        addOne() {
            Session.set('counter', this.count + 1);
            this.count = Session.get('counter');
            this.buttonLabel = labels[Math.round(Math.random() * (labels.length - 1))];
        },

        // Add / Edit DB
        addData() {
            if (this.newTitle && this.newURL) {
                Meteor.call('addData', this.newTitle, this.newURL);
                this.newTitle = 'Demo';
                this.newURL = 'http://www.test.com';
            }
        },

        editData(_id) {
            this.$set(this.editMode, _id, true);
        },
        // End Add / Edit DB

        // Delete DB
        deleteData(_id) {
            Meteor.call('deleteData', _id);
        },
        // End Delete DB

        // List DB Submit Buttn
        editSubmit(_id) {
            if (_id) {
                const $_id = 'form_' + _id;
                Meteor.call('editSubmit', _id, this.$refs[$_id][0].title.value.trim(), this.$refs[$_id][0].url.value.trim());
                this.$set(this.editMode, _id, false);
            }
        },

        cancelSubmit(_id) {
            this.$set(this.editMode, _id, false);
        },
        // End List DB Submit Buttn

        loadMore() {
            console.log('Load More');
            this.limit += this.perPage;
        },

        back() {
            console.log('back');
            this.currPage -= 1;
            this.limit += this.perPage;
            this.$router.replace({ path: '/home/page/' + this.currPage });
            DocHead.setTitle('Meteor + Vue (Page: ' + this.currPage + ')');
        },

        scrollUpdatePage(lengths) {
            let self = this;
            $(window).on('scroll', function () {
                let scrollTop = $(window).scrollTop();
                for (let index = 0; index < lengths; index++) {
                    if ($('.page_' + index).length > 0 &&
                        scrollTop >= $('.page_' + index).offset().top &&
                        scrollTop <= $('.pageBottom_' + index).offset().top &&
                        this.currentPage != index) {
                        console.log('Page ' + index);
                        this.currentPage = index;
                        const path = '/home/page/' + index;
                        if (self.$router.currentRoute.path != path) {
                            self.$router.replace({ path: path });
                            DocHead.setTitle('Meteor + Vue (Page: ' + this.currentPage + ')');
                        }
                    }
                }
            });
        }
    },
};