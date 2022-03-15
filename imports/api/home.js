import { Links } from '/lib/collections';

export const meteors = {
    meteor: {
        $subscribe: {
            'links': function () {
                return [this.limit, this.search, this.perPage * this.currPage - this.perPage];
            }
        },
        links() {
            this.totalLinks = Counts.get('totalLinks');
            var rtn = Links.find({}, { sort: { createdAt: -1 } }).fetch();
            for (const key in rtn) {
                if (rtn[key].createdAt) {
                    rtn[key].createdAt = this.formatDate(rtn[key].createdAt);
                }
                if (rtn[key].updatedAt) {
                    rtn[key].updatedAt = this.formatDate(rtn[key].updatedAt);
                }
            }
            this.scrollUpdatePage(rtn.length);
            return rtn;
        }
    }
}