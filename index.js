/*
var shortid = require('shortid');
var HashMap = require('hashmap');

shortid.seed(3009);
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
var testFunc = function() {
    
    var successFlag = true;
    var map = new HashMap();
    
    for (var index = 0; index < 300000; index++) {
        var key = shortid.generate();
        console.log(key);
        if(map.has(key)) {
            map.set(key, index);
            successFlag = false;
        }
    }
    
    if(!successFlag) {
        map.forEach(function(value, key) {
            console.log(key + " : " + value);
        });
    }
    else {
        console.log("program execution successful");
    }
};

testFunc();
*/