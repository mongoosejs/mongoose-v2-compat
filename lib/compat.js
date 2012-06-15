
// enable 2.x backwards compatibility

module.exports = exports = function (instance, mongoose) {
  var compat = instance.compat;
  var Query = mongoose.Query;
  var Document = mongoose.Document;
  var MArray = mongoose.Types.Array;

  // add aliases
  var methods = ('or nor gt gte lt lte ne in nin all regex '
              +  'size maxDistance mod near exists elemMatch '
              +  'within box center centerSphere slice').split(' ');

  if (compat) {
    methods.forEach(function assign (method) {
      Query.prototype['$' + method] = Query.prototype[method];
    })

    Query.prototype.run = Query.prototype.exec;
    Query.prototype.notEqualTo = Query.prototype.ne;
    Query.prototype.wherein = Query.prototype.within;
    Query.prototype.fields = Query.prototype.select;

    Query.prototype.asc = makeSort(1);
    Query.prototype.desc = makeSort(-1);

    instance.createSetConnection = instance.createConnection;
    instance.connectSet = instance.connect;

    // gone methods
    Query.prototype.only = notExists('only', 'Query#select');
    Query.prototype.exclude = notExists('exclude', 'Query#select');
    Query.prototype.each = notExists('each', 'Query#stream');

    Document.prototype.commit = Document.prototype.markModified;

    MArray.prototype.$push = MArray.prototype.push;
    MArray.prototype.$pushAll = MArray.prototype.push;
    MArray.prototype.$pull = MArray.prototype.pull;
    MArray.prototype.$pullAll = MArray.prototype.pull;
    MArray.prototype.$unshift = MArray.prototype.unshift;
    MArray.prototype.$addToSet = MArray.prototype.addToSet;

  } else {
    methods.forEach(function assign (method) {
      delete Query.prototype['$' + method];
    })

    delete Query.prototype.run;
    delete Query.prototype.notEqualTo;
    delete Query.prototype.wherein;
    delete Query.prototype.fields;
    delete Query.prototype.asc;
    delete Query.prototype.desc;
    delete Query.prototype.only;
    delete Query.prototype.exclude;
    delete Query.prototype.each;

    delete instance.createSetConnection;
    delete instance.connectSet;

    delete Document.prototype.commit;

    delete MArray.prototype.$push;
    delete MArray.prototype.$pushAll;
    delete MArray.prototype.$pull;
    delete MArray.prototype.$pullAll;
    delete MArray.prototype.$unshift;
    delete MArray.prototype.$addToSet;
  }
}


/**
 * @ignore
 */

function makeSort (dir) {
  return function () {
    var sort = this.options.sort || (this.options.sort = []);
    for (var i = 0, len = arguments.length; i < len; ++i) {
      sort.push([arguments[i], dir]);
    }
    return this;
  }
}

/**
 * @ignore
 */

function notExists (name, suggestion) {
  return function () {
    throw new Error('Query#' + name + ' has been removed. '
                  + 'Use ' + suggestion + ' instead.');
  }
}

