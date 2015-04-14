/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
define(function() { 
  QUnit.load();
  QUnit.start();
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  /* require your app components
   * for example, if you have /app/modules/doSomething.js, you can
   * require(['modules/doSomething'], function(theModule) {
   *   // test the things
   * });
   */

  test('Hello', function() {
	  expect(1);
    stop();
    require(['main'], function(main) {
      start();
      equal('Hello', main.go());
    });
  });
});
