// mongoose-v2-compat

var mongoose = require('mongoose');
var proto = mongoose.Mongoose.prototype;

/**
 * Enables 2.x compatibility.
 *
 * require('mongoose').compat = true;
 *
 * @api public
 */

Object.defineProperty(proto, 'compat', {
    set: function (v) {
      this._compat = !! v;
      require('./compat')(this, mongoose);
    }
  , get: function () {
      return !! this._compat;
    }
});

