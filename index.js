const user = {
  name: 'tarun',
  city: 'makrana',
};

function print(state, city) {
  console.log(this.name, this.city, state, city);
}

//call polyfill
Function.prototype.call_polyfill = function (obj, ...args) {
  let currentContext = obj;
  let key = Math.random();
  while (currentContext[key]) {
    key = Math.random();
  }
  currentContext[key] = this;
  const result = currentContext[key](...args);
  delete currentContext[key];
  return result;
};
print.call_polyfill(user, 'rajasthan', 'india');

//apply polyfill
Function.prototype.apply_polyfill = function (obj, args) {
  let currentContext = obj;
  let key = Math.random();
  while (currentContext[key]) {
    key = Math.random();
  }
  currentContext[key] = this;
  const result = currentContext[key](...args);
  delete currentContext[key];
  return result;
};
print.apply_polyfill(user, ['rajasthan', 'india']);

//bind polyfill
Function.prototype.binder = function (obj, ...args_1) {
  let ref = this;
  return function (...args_2) {
    ref.apply(obj, [...args_1, ...args_2]);
  };
};

print.binder(user, 'rajasthan')('india');

//map polyfill
Array.prototype.mapper = function (callback) {
  let result = [];
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
};

let arr = [1, 2, 3, 4, 5];
console.log(arr.mapper((val) => val * 2));

//filter polyfill
Array.prototype.filter_array = function (callback) {
  let result = [];
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
};
console.log(arr.filter_array((val) => val === 2));

//reduce polyfill
Array.prototype.reduce_array = function (callback, initailValue) {
  let result = [];
  let arr = this;
  let accumalator = initailValue ? initailValue : arr[0];
  for (let i = initailValue ? 0 : 1; i < arr.length; i++) {
    accumalator = callback(accumalator, arr[i], i, arr);
  }
  return accumalator;
};
console.log(arr.reduce_array((acc, val) => acc + val, 0));
