class EventSystem {
  constructor(dis) {
    this.funcs = {}
    this.classBound = dis
  }
  on(eventName, func) {
    if(!this.funcs[eventName]) this.funcs[eventName] = []
    this.funcs[eventName].push(func)
  }
  emit(eventName) {
    if(!this.funcs[eventName]) this.funcs[eventName] = []
    for(let eventFuncIdx in this.funcs[eventName]) this.funcs[eventName][eventFuncIdx](this.classBound)
  }
}