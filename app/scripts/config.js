require.config({
  baseUrl: 'scripts',
  paths: {
    components: '../../bower_components',
    qunit: '../../bower_components/qunit/qunit/qunit',
    requirejs: '../../bower_components/requirejs/require',
  },
  packages: [

  ]
});


if (!window.requireTestMode) {
  require(['main'], function(){ });
} else {
  require.config({
	  baseUrl: '../app/scripts',
      deps: ['scripts/tests.js']
  });
}
