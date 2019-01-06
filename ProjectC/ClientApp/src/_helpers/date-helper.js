export const dateHelper = {
    getCurrentWeek,
    getLastWeek,
    getCurrentMonth,
    getLastMonth
};

function getLastWeek() {
    var monday = getMonday(new Date(), 1);
    var sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    var week = { monday, sunday }
    return week;
}

function getCurrentWeek() {
    var monday = getMonday(new Date(), 0);
    var sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    var week = { monday, sunday }
    return week;
}

function getMonday(d, minusWeeks) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff - (minusWeeks * 7)));
}

function getCurrentMonth() {
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    var month = { firstDay, lastDay };
    return month;
}

function getLastMonth() {
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(y, m - 1, 1);
    var lastDay = new Date(y, m, 0);

    var month = { firstDay, lastDay };
    return month;
}