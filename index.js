var chalk = require('chalk');

var obj = function (cfg) {

  cfg = cfg || {
    throwOnError: true
  };

  var log = cfg.throwOnError ? console.error : console.log;

  Object.defineProperties(this, {

    throwOnError: {
      enumerable: false,
      writable: true,
      configurable: false,
      value: cfg.hasOwnProperty('throwOnError') ? cfg.throwOnError : true
    },

    args: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function (a) {
        var args = Array.prototype.slice.call(a);
        var obj = args.shift();
        return {
          obj: obj,
          args: args
        };
      }
    },

    missing: {
      enumerable: true,
      writable: true,
      configurable: false,
      value: []
    },

    missingList: {
      enumerable: false,
      get: function(){
        return this.missing.join(', ');
      }
    },

    // Has all elements
    hasAll: {
      enumberable: true,
      writable: false,
      configurable: false,
      value: function () {
        var a = this.args(arguments), me = this;

        var o = Object.keys(a.obj);
        this.missing = a.args.filter(function(el){
          return o.indexOf(el) < 0;
        });

        var ok = this.missing.length === 0;
        !ok && this.throwOnError && (log(chalk.red.bold('Missing '+this.missingList)));

        return ok;
      }
    },

    // Has any of the elements
    hasAny: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(){
        var a = this.args(arguments), me = this;

        this.missing = [];

        for (var i=0; i<a.args.length; i++){
          if (a.obj.hasOwnProperty(a.args[i])){
            return true;
          }
        }

        return false;
      }
    },

    hasExactly: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: function(){
        var a = this.args(arguments), me = this;
        this.missing = [];

        var objargs = Object.keys(a.obj);

        if (objargs.length !== a.args.length){
          return false;
        }

        return objargs.filter(function(el){
          return a.args.indexOf(el) < 0;
        }).length === 0;
      }
    }

  });
}

module.exports = obj;
