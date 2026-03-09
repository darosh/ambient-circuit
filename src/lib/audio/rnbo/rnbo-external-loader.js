function e() {}
(e.prototype = Object.create(null)).constructor = e;
e.prototype.setEngineAndPatcher = function () {};
e.prototype.initialize = function () {};
e.prototype.getNumParameters = function () {
  return 0;
};
e.prototype.setParameterValue = function () {};
e.prototype.prepareToProcess = function () {};
e.prototype.process = function () {};
export default {
  ExternalLoaderFactory: function () {
    console.log("WARNING: Externals are not yet supported in Javascript");
    return new e();
  }
};