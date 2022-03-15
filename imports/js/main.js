export const globalMixin = {
    methods: {
        formatDate(date) {
            // var monthNames = [
            //     "January", "February", "March",
            //     "April", "May", "June", "July",
            //     "August", "September", "October",
            //     "November", "December"
            // ];
            var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
            var mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(); 
            var day = (date.getDate() < 10 ? '0' : '') + date.getDate(); 
            var monthIndex = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1); 
            var year = date.getFullYear();
            // return day + ' ' + monthNames[monthIndex] + ' ' + year;
            return year + '-' + monthIndex + '-' + day + ' ' + hours + ':' + mins + ':' + sec;
        },
        isInteger(obj) {
            return parseInt(obj, 10) === obj;
        }
    }
}