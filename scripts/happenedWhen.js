    this.happenedWhen = function(when) {
//          console.log(latest, updated);
        var today = moment(new Date()).startOf('day'), thisDate = moment(when).startOf('day'),
            diff = today.diff(thisDate, 'days');
                
        //for 0 and 1 day(s) ago use the special term.
        if (diff === 0) {
            return 'Today at ' + moment(when).format('HH:mm');
        } else if (diff === 1) {
            return 'Yesterday at ' + moment(when).format('HH:mm');
        } else {
            return diff + ' days ago at ' + moment(when).format('HH:mm');
        }
    };