var chalk = require('chalk');

var obj = function (cfg) {

  cfg = cfg || {
    throwOnError: true,
    suppressWarnings: false
  };

  var log = cfg.throwOnError ? console.warn : console.log;

  Object.defineProperties(this, {

    throwOnError: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: cfg.hasOwnProperty('throwOnError') ? cfg.throwOnError : true
    },

    suppressWarnings: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: cfg.hasOwnProperty('suppressWarnings') ? cfg.suppressWarnings : false
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

        if (this.missing.length > 0){
          !this.suppressWarnings && (log(chalk.red.bold('Missing '+this.missingList)));
          if (this.throwOnError){
            throw new Error('Missing '+this.missingList);
          }
          return false;
        }

        return true;
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
