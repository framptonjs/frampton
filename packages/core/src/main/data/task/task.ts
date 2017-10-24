import {
  curry,
  immediate,
  isEqual,
  noop,
  ofValue,
  Curried2Result
} from '../../utils';
import {
  log,
  error,
  warn
} from '../../logging';
import { Signal } from '../signal';
import { ValueSink, ValueMapping, ValuePredicate } from '../types';


export interface TaskSinks<E,V,P> {
  reject: ValueSink<E>;
  resolve: ValueSink<V>;
  progress?: ValueSink<P>;
}


export interface TaskComputation<E,V,P> {
  (sinks: TaskSinks<E,V,P>): void;
}


export type Effect<T> =
  Task<never,T,never>;


/**
 * @name Task
 * @class
 */
export class Task<E,V,P> {
  _fn: TaskComputation<E,V,P>;

  /**
   * Method for creating new Tasks. This method should be used instead of calling the Task
   * constructor directly.
   *
   * @name create
   * @method
   * @memberof Frampton.Data.Task
   * @param {Function} computation - The function the Task should execute
   * @returns {Frampton.Data.Task}
   */
  static create<E,V,P>(computation: TaskComputation<E,V,P>): Task<E,V,P> {
    return new Task(computation);
  }

  /**
   * Method for creating new Tasks that run syncronously
   *
   * @name sync
   * @method
   * @memberof Frampton.Data.Task
   * @param {Function} computation - The function the Task should execute
   * @returns {Frampton.Data.Task}
   */
  static sync<E,V,P>(computation: TaskComputation<E,V,P>): Task<E,V,P> {
    return new SyncTask(computation);
  }

  /**
   * execute :: Signal Task x a -> Signal a -> ()
   *
   * Takes a Signal of Tasks to execute and a function to call with the resolve values
   * of those Tasks. Progress and reject values are ignored (logged to the console in dev mode).
   * It is suggested to use Tasks that have their reject and progress values mapped to reslove
   * values using the recover and progress methods on the Task prototype.
   *
   * @name execute
   * @memberof Frampton.Task
   * @static
   * @param {Frampton.Signals.Signal} tasks - Signal of Tasks to execute
   * @param {Function} onValue - A function to pass the resolve values to
   */
  static execute<T>(effects: Signal<Effect<T>>, onValue: (val: T) => void): void {
    effects.onValue((effect: Effect<T>): void => {
      effect.run({
        reject(err: never): void {
          warn('Error running task: ', err);
        },
        resolve(val: T): void {
          onValue(val);
        }
      });
    });
  }

  /**
   * when :: [Task x a] -> Task x [a]
   *
   * Creates a Task that waits for each of the given Tasks to resolve before it resolves.
   * When it does resolve, it resolves with an Array containing the resolved values of each
   * of its parent Tasks. The Array contains the resolve values in the same order as the
   * order that the parent Tasks were passed in.
   *
   * @name when
   * @method
   * @memberof Frampton.Data.Task
   * @param {Frampton.Data.Task[]} tasks - The Tasks to wait for
   * @returns {Frampton.Data.Task}
   */
  static when<T>(...tasks: Array<Task<any, T, any>>): Task<void,Array<T>,void> {
    return new Task((sinks: TaskSinks<void,Array<T>,void>): void => {
      const valueArray: Array<T> = new Array(tasks.length);
      const len: number = tasks.length;
      var idx: number = 0;
      var count: number = 0;

      tasks.forEach((task) => {
        const index: number = idx++;
        task.run({
          reject(err: any): void {
            error(err);
            count = count + 1;
            valueArray[index] = null;
            if (count === len) {
              sinks.resolve(valueArray);
            }
          },
          resolve(val: T): void {
            count = count + 1;
            valueArray[index] = val;
            if (count === len) {
              sinks.resolve(valueArray);
            }
          },
          progress(prog: any): void {
            log('Progress: ', prog);
          }
        });
      });
    });
  }

  /**
   * sequence :: [Task x a] -> Task x a
   *
   * Creates a Task that runs the given Tasks in the order they are passed in. The new
   * Task will resolve when all of its parent Tasks have resolved. The resolve value of
   * the new Task is the resolve value of the last of its parents Tasks. The resolve
   * values for all other Tasks are discarded.
   *
   * @name sequence
   * @method
   * @memberof Frampton.Data.Task
   * @param {Frampton.Data.Task[]} tasks - The Tasks to wait for
   * @returns {Frampton.Data.Task}
   */
  static sequence<E,V,P>(...tasks: Array<Task<any, any, any>>): Task<E,V,P> {
    return tasks.reduce((acc: any, next: any): any => {
      return acc.concat(next);
    });
  }

  /**
   * batch :: [Task x a] -> Task x a
   *
   * Run a group of tasks that all use the same sinks
   *
   * @name batch
   * @method
   * @memberof Frampton.Data.Task
   * @param {Frampton.Data.Task[]} tasks - The Tasks to wait for
   * @returns {Frampton.Data.Task}
   */
  static batch<E,V,P>(...tasks: Array<Task<E,V,P>>): Task<E,V,P> {
    return Task.create((sinks) => {
      const len = tasks.length;
      for (let i = 0; i < len; i++) {
        tasks[i].run(sinks);
      }
    });
  }

  /**
   * never :: Task x a
   *
   * Creates a Task that never resolves.
   *
   * @name never
   * @method
   * @memberof Frampton.Data.Task
   * @returns {Frampton.Data.Task}
   */
  static never(): Task<any,any,any> {
    return new Task(() => {});
  }

  /**
   * @name delay
   * @method
   * @memberof Frampton.Data.Task
   * @param {Number} time - Miliseconds to delay function
   * @param {Function} fn - Function to delay
   * @returns {Frampton.Data.Task}
   */
  static delay = curry(function delay<T>(time: number, val: T): Task<any,T,any> {
    return Task.create((sinks) => {
      setTimeout(() => {
        sinks.resolve(val);
      }, time);
    });
  });

  /**
   * fail :: x -> Task x a
   *
   * Creates a Task that always fails with the given value.
   *
   * @name fail
   * @method
   * @memberof Frampton.Data.Task
   * @param {*} err - Value used as the return value of the reject branch.
   * @returns {Frampton.Data.Task}
   */
  static fail<T>(err: T): Task<T,any,any> {
    return new Task((sinks) => sinks.reject(err));
  }

  /**
   * succeed :: a -> Task x a
   *
   * Creates a Task that always succeeds with the given value.
   *
   * @name succeed
   * @method
   * @memberof Frampton.Data.Task
   * @param {*} val - Value used as the return value of the resolve branch.
   * @returns {Frampton.Data.Task}
   */
  static succeed<T>(val: T): Task<any,T,any> {
    return new Task((sinks) => sinks.resolve(val));
  }

  constructor(computation: TaskComputation<E,V,P>) {
    this._fn = computation;
  }

  /**
   * Takes a hash of functions to call based on the resolution of the Task and runs the computation
   * contained within this Task.
   *
   * The sinks object should be of the form:
   * {
   *   reject : (err) => {},
   *   resolve : (val) => {},
   *   progress : (prog) => {}
   * }
   *
   * Each function is used by the contained computation to update us on the state of the running
   * computation.
   *
   * @name run
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Object} sinks
   * @param {Function} sinks.reject - The function to call on failure.
   * @param {Function} sinks.resolve - The function to call on success.
   * @param {Function} sinks.progress - The function to call on progress.
   */
  run(sinks: TaskSinks<E,V,P>): void {
    immediate(() => {
      try {
        this._fn(sinks);
      } catch(e) {
        sinks.reject(e);
      }
    });
  }

  /**
   * of(return) :: a -> Success a
   *
   * Returns a Task that always resolves with the given value.
   *
   * @name of
   * @method
   * @memberof Frampton.Data.Task#
   * @param {*} val - Value to resolve task with
   * @returns {Frampton.Data.Task}
   */
  of<T>(val: T): Task<never,T,never> {
    return new Task<never,T,never>((sinks: TaskSinks<never,T,never>): void => {
      sinks.resolve(val);
    });
  }

  /**
   * join :: Task x (Task x a) -> Task x a
   *
   * Takes a nested Task and removes one level of nesting.
   *
   * @name join
   * @method
   * @memberof Frampton.Data.Task#
   * @returns {Frampton.Data.Task}
   */
  join<B>(this: Task<E,Task<E,B,P>,P>): Task<E,B,P> {
    const source = this;
    return new Task<E,B,P>((sinks: TaskSinks<E,B,P>) => {
      source.run({
        reject: sinks.reject,
        resolve(val: Task<E,B,P>): void {
          val.run(sinks);
        },
        progress: noop
      });
    });
  }

  /**
   * concat(>>) :: Task x a -> Task x b -> Task x b
   *
   * Runs one task after another, discarding the return value of the first.
   *
   * @name concat
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Frampton.Data.Task} task - Task to run after this task
   * @returns {Frampton.Data.Task}
   */
  concat<B>(task: Task<E,B,P>): Task<E,B,P> {
    const source = this;
    return new Task<E,B,P>((sinks: TaskSinks<E,B,P>) => {
      source.run({
        reject: sinks.reject,
        resolve(val: V): void {
          task.run(sinks);
        },
        progress: noop
      });
    });
  }

  /**
   * chain(>>=) :: Task x a -> (a -> Task x b) -> Task x b
   *
   * Maps the return value of one Task to another Task, chaining two Tasks together.
   *
   * @name chain
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} mapping - Function to map the return value of this Task to another Task.
   * @returns {Frampton.Data.Task}
   */
  chain<B>(mapping: (val: V) => Task<E,B,P>): Task<E,B,P> {
    return this.map(mapping).join();
  }

  /**
   * ap(<*>) :: Task x (a -> b) -> Task x a -> Task x b
   *
   * @name ap
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Frampton.Data.Task} task
   * @returns {Frampton.Data.Task}
   */
  ap<A,B>(this: Task<E,(a: A) => B,P>, task: Task<E,A,P>): Task<E,B,P> {
    return this.chain((fn) => {
      return task.map(fn);
    });
  }

  /**
   * recover :: Task x a -> (x -> b) -> Task x b
   *
   * Used to map a reject to a resolve.
   *
   * @name recover
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} mapping
   * @returns {Frampton.Data.Task}
   */
  recover(mapping: ValueMapping<E,V>): Task<never,V,P> {
    const source = this;
    const mappingFn: (val: E) => V =
      (typeof mapping === 'function') ?
        mapping :
        ofValue(mapping);

    return new Task((sinks: TaskSinks<E,V,P>) => {
      source.run({
        reject(err: E): void {
          sinks.resolve(mappingFn(err));
        },
        resolve: sinks.resolve,
        progress: sinks.progress
      });
    });
  }

  /**
   * default :: Task x a -> b -> Task x b
   *
   * Returns the given value as a resolve in case of a reject.
   *
   * @name default
   * @method
   * @memberof Frampton.Data.Task#
   * @param {*} val - A value to map errors to
   * @returns {Frampton.Data.Task}
   */
  default(val: V): Task<never,V,P> {
    return this.recover(() => val);
  }

  /**
   * progress :: Task x a -> (a -> b) -> Task x b
   *
   * Maps progress branch to resolution branch
   *
   * @name progress
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} mapping
   * @returns {Frampton.Data.Task}
   */
  progress(mapping: ValueMapping<P,V>): Task<E,V,never> {
    const source = this;
    const mappingFn: (val: P) => V =
      (typeof mapping === 'function') ?
        mapping :
        ofValue(mapping);

    return new Task((sinks: TaskSinks<E,V,P>) => {
      source.run({
        reject: sinks.reject,
        resolve: sinks.resolve,
        progress(val: P): void {
          sinks.resolve(mappingFn(val));
        }
      });
    });
  }

  /**
   * map :: Task x a -> (a -> b) -> Task x b
   *
   * @name map
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} mapping
   * @returns {Frampton.Data.Task}
   */
  map<B>(mapping: ValueMapping<V,B>): Task<E,B,P> {
    const source = this;
    const mappingFn: (val: V) => B =
      (typeof mapping === 'function') ?
        mapping :
        ofValue(mapping);

    return new Task((sinks: TaskSinks<E,B,P>) => {
      source.run({
        reject: sinks.reject,
        resolve(val: V): void {
          sinks.resolve(mappingFn(val));
        },
        progress: sinks.progress
      });
    });
  }

  /**
   * success :: Task x a -> (a -> b) -> Task x b
   *
   * A symantic alias for Task.prototype.map
   *
   * @name success
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} mapping - The function to map the resolve value.
   * @returns {Frampton.Data.Task}
   */
  success<B>(mapping: ValueMapping<V,B>) {
    return this.map(mapping);
  }

  /**
   * filter :: Task x a -> (a -> b) -> Task x b
   *
   * @name filter
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} predicate - The function to filter the resolve value.
   * @returns {Frampton.Data.Task}
   */
  filter(predicate: ValuePredicate<V>): Task<E,V,P> {
    const source = this;
    const filterFn: (val: V) => boolean =
      (typeof predicate === 'function') ?
        predicate :
        isEqual(predicate);

    return new Task((sinks: TaskSinks<E,V,P>) => {
      source.run({
        reject: sinks.reject,
        resolve(val: V): void {
          if (filterFn(val)) {
            sinks.resolve(val);
          } else {
            sinks.reject(null);
          }
        },
        progress: sinks.progress
      });
    });
  }

  /**
   * validate :: Task x a -> (a -> b) -> Task x b
   *
   * A symantic alias for filter. Used to validate the return value of a Task. It the given
   * predicate returns false a resolve is turned into a reject.
   *
   * @name validate
   * @method
   * @memberof Frampton.Data.Task#
   * @param {Function} predicate - The function to validate the resolve value.
   * @returns {Frampton.Data.Task}
   */
  validate(predicate: ValuePredicate<V>): Task<E,V,P> {
    return this.filter(predicate);
  }
}


/**
 * @name SyncTask
 * @class
 * @extends Frampton.Data.Task
 */
export class SyncTask<E,V,P> extends Task<E,V,P> {

  static create<E,V,P>(computation: TaskComputation<E,V,P>) {
    return new SyncTask<E,V,P>(computation);
  }

  constructor(computation: TaskComputation<E,V,P>) {
    super(computation);
  }

  /**
   * Takes a hash of functions to call based on the resolution of the Task and runs the computation
   * contained within this Task.
   *
   * The sinks object should be of the form:
   * {
   *   reject : (err) => {},
   *   resolve : (val) => {},
   *   progress : (prog) => {}
   * }
   *
   * Each function is used by the contained computation to update us on the state of the running
   * computation.
   *
   * @name run
   * @method
   * @memberof Frampton.Data.SyncTask#
   * @param {Object} sinks
   * @param {Function} sinks.reject - The function to call on failure.
   * @param {Function} sinks.resolve - The function to call on success.
   * @param {Function} sinks.progress - The function to call on progress.
   */
  run(sinks: TaskSinks<E,V,P>) {
    try {
      this._fn(sinks);
    } catch(e) {
      sinks.reject(e);
    }
  }
}