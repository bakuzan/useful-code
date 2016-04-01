//get 'daysAgo' days ago from 'thisEnd' date.
    this.getSetDaysAgo = function(thisEnd, daysAgo) {
        var newDate = moment(thisEnd).subtract(daysAgo, 'days');
        return newDate;
    };
