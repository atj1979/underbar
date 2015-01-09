(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length || n < 0) {n=array.length;}
    return n === undefined ? array[(array.length-1)] : array.slice(array.length-n, array.length)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // use regular array loop if the collection is an array
    if (collection.length !== undefined){
      for (var i =0; i<collection.length; i++){
        collection[i]=iterator(collection[i], i, collection);
      }
    } else {
    // Use for-in loop in case of object
      for (var key in collection){
        collection[key] = iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filteredCollection=[];
    for (var i = 0; i<collection.length; i++){
      //if pass the test, add element to a temporary array
      if (test(collection[i])) {
        filteredCollection.push(collection[i]);
      }
    }
   

    return filteredCollection;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    //var rejectCollection= _.filter(collection, function (){!test;});;
    var rejectCollection = _.filter(collection, function(x){
      // invert the test results
      return !test(x);
    });
    return rejectCollection;
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    //first, we copy the array, I like to do that with data
    var workArray = array.slice();
    // the results go here
    var result = [];
    //as long as there are elements of the working array, do the while loop
    while (workArray.length >0){
      //we set the first value to be the uniqueValue 
      var uniqueValue = workArray[0];
      //set send the unique value in here then get rid of all instances of the unique value in our working array
      result.push(uniqueValue);
      // we set 'i' here at length of the array, so that we can go from back to front.  
      //if we were to go from front to back, it would skip values because the indexes change for each removed item
      //but if we go down, we ensure that we never skip, any item index evaluated would always be greater than 'i'
      var i = workArray.length;
      while (i>=0){
        //remove the matched values and reduce the overall array size
        if(uniqueValue === workArray[i]){
          workArray.splice(i,1);
        }
        i--;
      }
    }    
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var workArray = [];
    workArray = collection.slice();
    _.each(workArray,iterator);
    return workArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //I figured out the the solution for the array first because I think arrays are easier to manipulate.
    //why don't we just make any object into an array that we already have a solution for?

    //make a workArray so that we can do anything we want with that array with fear of changing the original data.
    var workArray = [];
    if (collection.length === undefined){
      for (var key in collection){
        workArray.push(collection[key]);
      }
    } else {
      workArray = collection.slice(accumulator);
    }

    if (accumulator === undefined) { 
      var result = workArray.shift(workArray);
    } else {
      var result = 0;
    }
    for (var i = 0; i<workArray.length; i++) {
      result = iterator(result, workArray[i]);
    }    



    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //evaluate the entire collectioin here to see if it has any data
    if (Object.getOwnPropertyNames(collection) === 0 || collection.length ===0){
      return true;
    }
    // look for any holes in the collection and make them false
    _.each(collection, function (x){if (x === undefined){return false;} else {return x;}});
    // if an iterator has been supplied run everything through the iterator
    if (iterator !== undefined) {
      _.each(collection, iterator);
    }
    // change our entire collection to true false so that reduce can work
    _.each(collection, function (x){return x ? true : false;})
    // simple multiplication of true false to produce a single result in reduce
    var temp = _.reduce(collection,function (result, x){return result * x;});
    // change our 1 or 0 into true false
    return temp ? true : false; 
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // run everything through the iterator if there is one
    if (iterator !==undefined) {
      _.each(collection, iterator);
    }
    _.each(collection, function (x){return x ? true : false;})

    //add them all up to get a result
    var temp = _.reduce(collection, function (x, y){return x + y;})
    return temp>0 ? true : false;
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //Get the total number of arguments, probably not strictly needed.
    var argLength = arguments.length;
    //If there is more than one object inserted, start the process, 
    //otherwise just return the one object
    if (argLength > 1) {
      //Work out way through the argument array
      for (var i = 1; i < argLength; i++){
        //Cycle through the key values in the source object
        for (var key in arguments[i]){
          //Make a new key value in the destination object or 
          //overwrite the data of an existing key
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //I probably don't really need this var declaration here, but I like it.
    var argLength = arguments.length;
    //If there is more than one object inserted, start the process, 
    //otherwise just return the one object
    if (argLength > 1) {
      //work our way through the argument array
      for (var i = 1; i < argLength; i++){
        //cycle through the key values in the source object
        for (var key in arguments[i]){
          //if there isn't already a key name in the destination object, 
          //make a new key in the destination object
          if (!arguments[0].hasOwnProperty(key)){
            arguments[0][key] = arguments[i][key];
          }
        }
      }
    }
    return arguments[0];
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //create a simple unique way to locate the stored data
    var temp = Array.prototype.slice(arguments);
    temp=temp.toString();
    
    var store = function(){
      //if there's an answer to give, give it, else evaluate the function and arguments
      //and store the answer
      if (_.memoize[temp] !== undefined){ 
        return _.memoize[temp];
      } else {
        _.memoize[temp]=func.apply(this, arguments);
        return _.memoize[temp];
      }
    }
    // return a function to create a scope chain to remember results i.e. closure
    return store;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  // _.delay = function(func, wait) {
  //   args = arguments.slice();
  // };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
