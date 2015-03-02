"use strict";

var MustHave = require('../index'),
    assert = require('assert');

suite('MustHave Methods',function(){

  var mh, obj;

  setup(function(){
    obj = {
      a: 1,
      b: 2
    };
    mh = new MustHave({
      throwOnError: false,
      suppressWarnings: true
    });
  });

  test('Has all elements - hasAll()',function(){
    assert.ok(mh.hasAll(obj,'a','b') === true, 'The object has all of the required elements but hasAll does not return true.');
    assert.ok(mh.hasAll(obj,'a') === true, 'The object has all of the required elements but hasAll does not return true.');
    assert.ok(mh.hasAll(obj,'a','b','c') === false, 'The object does not have all of the required elements but hasAll returns true.');

  });

  test('Has Any - hasAny()',function(){
    assert.ok(mh.hasAny(obj,'b','c','d') === true, 'The object has a required element but hasAny returns false.');
    assert.ok(mh.hasAny(obj,'c','d') === false, 'The object doesn\'t have any required elements but hasAny returns true.');
  });

  test('Has Exactly - hasExactly()',function(){
    assert.ok(mh.hasExactly(obj,'a','b') === true, 'Object has the exact keys but hasExactly returns false.');
    assert.ok(mh.hasExactly(obj,'a','c') == false, 'Object has the right number of elements, but not the same elements. hasExactly incorrectly returned true.');
    assert.ok(mh.hasExactly(obj,'a') === false, 'Object has too many keys, but hasExactly returned true.');
    assert.ok(mh.hasExactly(obj,'a','b','c') === false, 'Object has too few keys, but hasExactly returned true.');
  });

});
