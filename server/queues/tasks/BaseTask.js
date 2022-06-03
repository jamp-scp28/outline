"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TaskPriority = void 0;

var _ = require("../");

let TaskPriority;
exports.TaskPriority = TaskPriority;

(function (TaskPriority) {
  TaskPriority[TaskPriority["Background"] = 40] = "Background";
  TaskPriority[TaskPriority["Low"] = 30] = "Low";
  TaskPriority[TaskPriority["Normal"] = 20] = "Normal";
  TaskPriority[TaskPriority["High"] = 10] = "High";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));

class BaseTask {
  /**
   * Schedule this task type to be processed asyncronously by a worker.
   *
   * @param props Properties to be used by the task
   * @returns A promise that resolves once the job is placed on the task queue
   */
  static schedule(props, options) {
    // @ts-expect-error cannot create an instance of an abstract class, we wont
    const task = new this();
    return _.taskQueue.add({
      name: this.name,
      props
    }, { ...options,
      ...task.options
    });
  }
  /**
   * Execute the task.
   *
   * @param props Properties to be used by the task
   * @returns A promise that resolves once the task has completed.
   */


  /**
   * Job options such as priority and retry strategy, as defined by Bull.
   */
  get options() {
    return {
      priority: TaskPriority.Normal,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 60 * 1000
      }
    };
  }

}

exports.default = BaseTask;