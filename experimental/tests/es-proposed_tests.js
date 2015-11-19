module("Not Yet Approved");

test("Proposed Number extras", function () {
  // Number.compare
  assertTrue("'compare' in Number");
  assertEqual("typeof Number.compare", 'function');
  assertEqual("Number.compare(0, 0)", 0);
  assertEqual("Number.compare(1, 0)", 1);
  assertEqual("Number.compare(0, 1)", -1);
  assertEqual("Number.compare(0, 0, 1)", 0);
  assertEqual("Number.compare(1, 0, 1)", 0);
  assertEqual("Number.compare(0, 1, 1)", 0);
});

test("Proposed Array extras", function () {
  assertTrue("'pushAll' in Array.prototype");
  assertEqual("typeof Array.prototype.pushAll", 'function');
  var a;
  a = []; a.pushAll([]); deepEqual(a, []);
  a = [1,2]; a.pushAll([]); deepEqual(a, [1,2]);
  a = []; a.pushAll([1,2]); deepEqual(a, [1,2]);
  a = [1,2]; a.pushAll([1,2]); deepEqual(a, [1,2,1,2]);

  assertTrue("'includes' in Array.prototype");
  assertEqual("typeof Array.prototype.includes", 'function');
  assertTrue("[1,2,3].includes(1)");
  assertFalse("[1,2,3].includes(0)");
  assertTrue("[1,NaN,3].includes(NaN)");
  assertFalse("[1,2,3].includes(NaN)");
  assertTrue("[1,-0,3].includes(-0)");
  assertFalse("[1,-0,3].includes(0)");
  assertFalse("[1,[],3].includes([])");
  assertFalse("[1,{},3].includes({})");
  assertFalse("[1,2,3].includes(Math)");
  assertTrue("[1,Math,3].includes(Math)");
  assertFalse("[1,2,3].includes(undefined)");
  assertTrue("[1,undefined,3].includes(undefined)");
  assertFalse("[1,2,3].includes(null)");
  assertTrue("[1,null,3].includes(null)");

  assertTrue("[1,2,3].includes(3, 2)");
  assertFalse("[1,2,3].includes(2, 2)");
});

test("Proposed Object Extras", function() {
  d = Object.create(null);
  d['a'] = 1;
  d['b'] = 2;

  assertTrue("Array.isArray(Object.keys(d))");
  assertTrue("Array.isArray(Object.values(d))");
  assertTrue("Array.isArray(Object.entries(d))");

  deepEqual(Object.keys(d), ['a', 'b']);
  deepEqual(Object.values(d), [1, 2]);
  deepEqual(Object.entries(d), [['a', 1], ['b', 2]]);

  deepEqual(Object.getOwnPropertyDescriptors(d),
            {a: {configurable: true,
                 enumerable: true,
                 writable: true,
                 value: 1
                },
             b: {configurable: true,
                 enumerable: true,
                 writable: true,
                 value: 2
                }
             });

  deepEqual(Object.values({a: 1, get b(){delete this.c; return 2}, c: 3}), [1,2]);
  deepEqual(Object.entries({a: 1, get b(){delete this.c; return 2}, c: 3}), [['a',1],['b',2]]);

  delete d;
});

test("Proposed String Extras", function() {
  assertEqual("'a'.at(0)", 'a');
  assertEqual("'a'.at(-1)", '');
  assertEqual("'a'.at(2)", '');
  assertEqual("'\uD800\uDC00'.at(0)", '\uD800\uDC00');
  assertEqual("'\uD800'.at(0)", '\uD800');
  assertEqual("'\uDC00'.at(0)", '\uDC00');
  assertEqual("'\uD800\uDC00'.at(1)", '\uDC00');

  assertEqual("'a'.padStart()", 'a');
  assertEqual("'a'.padStart(1)", 'a');
  assertEqual("'a'.padStart(2)", ' a');
  assertEqual("'a'.padStart(2, '_')", '_a');
  assertEqual("'a'.padStart(3, '_')", '__a');
  assertEqual("'a'.padStart(2, '[]')", '[a');

  assertEqual("'a'.padEnd()", 'a');
  assertEqual("'a'.padEnd(1)", 'a');
  assertEqual("'a'.padEnd(2)", 'a ');
  assertEqual("'a'.padEnd(2, '_')", 'a_');
  assertEqual("'a'.padEnd(3, '__')", 'a__');
  assertEqual("'a'.padEnd(2, '[]')", 'a[');

  equal(''.trimStart(), '');
  equal('a'.trimStart(), 'a');
  equal(' \t\r\n\u00A0a \t\r\n\u00A0'.trimStart(), 'a \t\r\n\u00A0');
  equal(' \t\r\n\u00A0 \t\r\n\u00A0'.trimStart(), '');
  equal(''.trimEnd(), '');
  equal('a'.trimEnd(), 'a');
  equal(' \t\r\n\u00A0a \t\r\n\u00A0'.trimEnd(), ' \t\r\n\u00A0a');
  equal(' \t\r\n\u00A0 \t\r\n\u00A0'.trimEnd(), '');

  // Annex B versions
  equal(''.trimLeft(), '');
  equal('a'.trimLeft(), 'a');
  equal(' \t\r\n\u00A0a \t\r\n\u00A0'.trimLeft(), 'a \t\r\n\u00A0');
  equal(' \t\r\n\u00A0 \t\r\n\u00A0'.trimLeft(), '');
  equal(''.trimRight(), '');
  equal('a'.trimRight(), 'a');
  equal(' \t\r\n\u00A0a \t\r\n\u00A0'.trimRight(), ' \t\r\n\u00A0a');
  equal(' \t\r\n\u00A0 \t\r\n\u00A0'.trimRight(), '');
});

test("Proposed Math Extras", function() {
  assertEqual("Math.denormz(0)", 0);
  assertEqual("Math.denormz(-0)", -0);
  assertEqual("Math.denormz(1)", 1);
  assertEqual("Math.denormz(-1)", -1);
  assertEqual("Math.denormz(Math.pow(2,-126))", Math.pow(2,-126));
  assertEqual("Math.denormz(Math.pow(2,-127))", Math.pow(2,-127));
  assertEqual("Math.denormz(Math.pow(2,-1022))", Math.pow(2,-1022));
  assertEqual("Math.denormz(Math.pow(2,-1023))", 0);
  assertEqual("Math.denormz(Number.MIN_VALUE)", 0);
  assertEqual("Math.denormz(-Math.pow(2,-126))", -Math.pow(2,-126));
  assertEqual("Math.denormz(-Math.pow(2,-127))", -Math.pow(2,-127));
  assertEqual("Math.denormz(-Math.pow(2,-1022))", -Math.pow(2,-1022));
  assertEqual("Math.denormz(-Math.pow(2,-1023))", -0);
  assertEqual("Math.denormz(-Number.MIN_VALUE)", -0);

  assertEqual("Math.fdenormz(0)", 0);
  assertEqual("Math.fdenormz(-0)", -0);
  assertEqual("Math.fdenormz(1)", 1);
  assertEqual("Math.fdenormz(-1)", -1);
  assertEqual("Math.fdenormz(Math.pow(2,-126))", Math.pow(2,-126));
  assertEqual("Math.fdenormz(Math.pow(2,-127))", 0);
  assertEqual("Math.fdenormz(Math.pow(2,-1022))", 0);
  assertEqual("Math.fdenormz(Math.pow(2,-1023))", 0);
  assertEqual("Math.fdenormz(Number.MIN_VALUE)", 0);
  assertEqual("Math.fdenormz(-Math.pow(2,-126))", -Math.pow(2,-126));
  assertEqual("Math.fdenormz(-Math.pow(2,-127))", -0);
  assertEqual("Math.fdenormz(-Math.pow(2,-1022))", -0);
  assertEqual("Math.fdenormz(-Math.pow(2,-1023))", -0);
  assertEqual("Math.fdenormz(-Number.MIN_VALUE)", -0);
});

test("String.prototype.matchAll", function() {
  function matchAllTest(string, regex, expected) {
    var results = [];
    for (var iter = string.matchAll(regex), step = iter.next(); !step.done; step = iter.next()) {
      results.push(step.value[0]);
    }
    deepEqual(results, expected);
  }

  matchAllTest('banana CAKE', /a./, ['an', 'an', 'a ']);
  matchAllTest('banana CAKE', /a./g, ['an', 'an', 'a ']);
  matchAllTest('banana CAKE', /A./, ['AK']);
  matchAllTest('banana CAKE', /A./g, ['AK']);
  matchAllTest('banana CAKE', /a./i, ['an', 'an', 'a ', 'AK']);
  matchAllTest('banana CAKE', /a./ig, ['an', 'an', 'a ', 'AK']);

  throws(function() { 'abc'.matchAll({}); }, TypeError);
});
