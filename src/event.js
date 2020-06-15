/**
 * 实现了一个简单的 event bus
 */
const Event = {
  eventList: {},
  // 绑定
  on(eventName, callback) {
    if (typeof callback !== "function") return;
    if (this.hasEvent(eventName)) {
      this.eventList[eventName].push(callback);
    } else {
      this.eventList[eventName] = [callback];
    }
  },
  // 解绑
  off(eventName, callback) {
    if (this.hasEvent(eventName)) {
      const index = this.eventList[eventName].indexOf(callback);
      if (index !== -1) {
        this.eventList[eventName].splice(index, 1);
      }
    }
  },
  // 触发事件
  emit(eventName, arg) {
    if (this.hasEvent(eventName)) {
      this.eventList[eventName].forEach((cb) => {
        cb(arg);
      });
    }
  },
  hasEvent(eventName) {
    return this.eventList.hasOwnProperty(eventName);
  },
};

export default Event;
