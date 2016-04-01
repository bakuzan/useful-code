//String mode map
        function stringModeMap(array) {
            var modeMap = {}, maxCount = 0;
            angular.forEach(array, function(item) {
                    var text = item.text;
                    if(modeMap[text] === null || modeMap[text] === undefined) {
                        modeMap[text] = 1;
                    } else {
                        modeMap[text]++;
                    }
                    if(modeMap[text] > maxCount) {
                        maxCount = modeMap[text];
                    }
                });
            return maxCount;
        };