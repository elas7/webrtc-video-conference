(function () {
    'use strict';

    module.exports.randomString = function (len) {
        var i = 0,
            text = '',
            possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (i; i < len; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

}).call(this);
