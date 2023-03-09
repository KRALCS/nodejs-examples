const moment = require('moment')

module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
    },
    limit: (arr, limit) => {
        if(!Array.isArray(arr)) {
            return [];
        } else {
            return arr.slice(0, limit);
        }
    },
    truncate: (str, len) => {
        if(str.length > len) {
            str = str.substring(0, len) + "...";
        }
        return str;
    },
    setSelectedItem: (selected, option) => {
        return (selected.toString() === option.toString()) ? 'selected="selected"' : '';
    },
    escapeRegex: (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    pagination: (options) => {
        let outPutHtml = "";
        let current = options.hash.current;
        let pages = options.hash.pages;
        if(current === 1) {
            outPutHtml += `<li class="page-item disabled"><a class="page-link" href="#">First</a></li>`;
        } else {
            outPutHtml += `<li class="page-item"><a class="page-link" href="?page=1">First</a></li>`;
        }
        let i = Number(current) > 5 ? Number(current) - 3 : 1;
        if(i !== 1) {
            outPutHtml += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
        }
        for(; i <= (Number(current) + 3) && i <= Number(pages); i++) {
            if(i === current) {
                outPutHtml += `<li class="page-item active"><a class="page-link" href="#">${i}</a></li>`;
            } else {
                outPutHtml += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`;
            }
            if(i === (Number(current) + 3) && i < Number(pages)) {
                outPutHtml += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
            }
        }
        if(current === pages) {
            outPutHtml += `<li class="page-item disabled"><a class="page-link" href="#">Last</a></li>`;
        } else {
            outPutHtml += `<li class="page-item"><a class="page-link" href="?page=${pages}">First</a></li>`;
        }
        return outPutHtml;
    }
}