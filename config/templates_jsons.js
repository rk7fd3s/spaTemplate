define([
  '{%- moduleName %}',
], function({%- moduleName %}){
  'use strict';
{% constants.forEach(function (constant) { %}
  app.constant('{%- constant.name %}', {%= constant.value %});
{% }); %}
});
