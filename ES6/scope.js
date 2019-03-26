const f1 = function() {
  var l = 0;
  setTimeout(function() {
    console.log('【f1】' + l);
    l++;
    console.log('【f1】' + l);
  }, 2000);
};

const f2 = function() {
  var l = 0;
  setTimeout(() => {
    console.log('【f2】' + l);
    l++;
    console.log('【f2】' + l);
  }, 3000);
};

const f3 = function() {
  var o = {a:1, b:2};
  o.a = 2;
  const promote = function() {
    o.a++;
  };
  const f = function() {
    console.log('【f3】' + o.a);
    o.a = 3;
    console.log('【f3】' + o.a);
    setTimeout(() => {
      console.log('【f3】' + o.a);
      o.a = 4;
      console.log('【f3】' + o.a);
      promote();
    }, 1000);
  }
  setTimeout(f, 1000);
};

/*
f1();
f1();
f1();
f2();
f2();
f2();
*/
f3();
f3();
f3();