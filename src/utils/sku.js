// 笛卡尔积排列算法
// 将
// ( [{v:'绿'}, {v: '红'}], [{v:'l'},{v:'xl'}] )
// 转换为
// [ [{v:'绿'}, {v: 'l'}], [{v:'绿'},{v:'xl'}], ... ]
export function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
          b.forEach(function (b) {
              ret.push(a.concat([b]));
          });
      });
      return ret;
  }, [
      []
  ]);
}