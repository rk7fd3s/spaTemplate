'use strict';

define([
  'app',
], function(app){
  'use strict';
  app.controller('sandboxNgRepeatCtrl', function($scope, SandBoxItemModel) {
    $scope.sandbox.subTitle = 'ngRepeat';

    $scope.items = [
      new SandBoxItemModel({dispNm: '鴇色', kanaNm: 'ときいろ', rgb: 'FA9CB8'}),
      new SandBoxItemModel({dispNm: '紅緋', kanaNm: 'べにひ', rgb: 'EF4644'}),
      new SandBoxItemModel({dispNm: '柿色', kanaNm: 'かきいろ', rgb: 'DB5C35'}),
      new SandBoxItemModel({dispNm: '柑子色', kanaNm: 'こうじいろ', rgb: 'FAA55C'}),
      new SandBoxItemModel({dispNm: '砂色', kanaNm: 'すないろ', rgb: 'C5B69E'}),
      new SandBoxItemModel({dispNm: '若草色', kanaNm: 'わかくさいろ', rgb: 'AAB300'}),
      new SandBoxItemModel({dispNm: '青竹色', kanaNm: 'あおたけいろ', rgb: '6AA89D'}),
      new SandBoxItemModel({dispNm: '勿忘草色', kanaNm: 'わすれなぐさいろ', rgb: '89ACD7'}),
      new SandBoxItemModel({dispNm: '桔梗色', kanaNm: 'ききょういろ', rgb: '4347A2'}),
      new SandBoxItemModel({dispNm: '牡丹色', kanaNm: 'ぼたんいろ', rgb: 'C94093'}),
      new SandBoxItemModel({dispNm: '象牙色', kanaNm: 'ぞうげいろ', rgb: 'DED2BF'})
    ];
  });
});
