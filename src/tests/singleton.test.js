function myStuff(a) {
  return { a: a * 4 }
}

var Singleton = (function (myStuff) {
  var instance = {}
  function createInstance(a) {
    return myStuff(a)
  }

  return {
    getInstance: function (a) {
      console.log(...arguments)
      console.log(Object.keys(instance).includes(a.toString()))
      if (!Object.keys(instance).includes(a.toString())) {
        instance[`${a}`] = createInstance(a)
        return instance[`${a}`]
      }
      console.log(`Already created an instance with prop ${a}`)
      return instance[`${a}`]
    },
  }
})(myStuff)

//tricky part is how to determine if the params are the same

function run() {
  var instance1 = Singleton.getInstance(1)
  var instance2 = Singleton.getInstance(2)
  var instance3 = Singleton.getInstance(1)

  console.log("Same instance? " + (instance1 === instance2))
  console.log("Same instance? " + (instance1 === instance3))
  console.log(instance1, instance2, instance3)
}

run()
