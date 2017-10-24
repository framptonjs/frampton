import { Signal } from './signal';
import { curry, isPromise, Curried2Result } from '../../utils';


export interface UpdateNode<T> {
  signal: Signal<T>;
  value: T;
}


export type SignalGraph =
  Array<Signal<any>>;


export type UpdateQueue =
  Array<UpdateNode<any>>;


// STATE
var signalGraph: SignalGraph = [];
var updateQueue: UpdateQueue = [];
var updateInProgress = false;


// Removing duplicates from right->left ensures all of a node's dependencies have
// been updated before the node is updated.
function removeDuplicatesWeigthed(graph: SignalGraph): SignalGraph {
  const temp: SignalGraph = [];

  for (let i = (graph.length - 1); i >= 0; i--) {
    if (temp.indexOf(graph[i]) === -1) {
      temp.unshift(graph[i]);
    }
  }

  return temp;
}


function addChildren<T>(graph: SignalGraph, child: Signal<T>): void {
  const len = child.children.length;

  for (let i = 0; i < len; i++) {
    graph.push(child.children[i]);
  }

  for (let i=0;i<len;i++) {
    addChildren(graph, child.children[i]);
  }
}


// Build the initial graph by queuing children breadth first
function buildRawGraph<T>(sig: Signal<T>): SignalGraph {
  const graph: SignalGraph = [];
  addChildren(graph, sig);
  return graph;
}


function buildSignalGraph<T>(sig: Signal<T>): SignalGraph {
  return removeDuplicatesWeigthed(buildRawGraph(sig));
}


function finishUpdate<T>(): void {
  const len = signalGraph.length;
  let sig: Signal<T> = null;

  for (let i = 0; i < len; i++) {
    sig = signalGraph[i];
    sig._lastUpdater = null;
    sig._isQueued = false;
  }

  signalGraph.length = 0;
}


function runUpdate<T>(): void {
  const numberOfNodes = signalGraph.length;
  let node: Signal<T> = null;

  updateInProgress = true;

  for (let i = 0; i < numberOfNodes; i++) {
    node = signalGraph[i];
    if (node._isQueued) {
      node._update(node, push(node));
    }
  }

  finishUpdate();

  updateInProgress = false;
}


function markChildren<T>(sig: Signal<T>): void {
  const len = sig.children.length;
  let child: Signal<any> = null;

  for (let i = 0; i < len; i++) {
    child = sig.children[i];
    child._lastUpdater = sig;
    child._isQueued = true;
  }
}


function notInGraph<T>(sig: Signal<T>): boolean {
  return (signalGraph.indexOf(sig) === -1);
}


function scheduleUpdate<T>(sig: Signal<T>, val: T): void {
  updateQueue.push({
    signal: sig,
    value: val
  });
}


function checkUpdateQueue<T>() {
  var update: UpdateNode<T>;
  if (updateQueue.length > 0) {
    update = updateQueue.shift();
    updateValue(update.signal, update.value);
  }
}


function updateValue<T>(sig: Signal<T>, val: T): void {
  if (isPromise(val)) {
    (<any>val).then(push(sig));
  } else {
    sig._value = val;
    sig.hasValue = true;
    markChildren(sig);
    if (!updateInProgress) {
      signalGraph = buildSignalGraph(sig);
      runUpdate();
      checkUpdateQueue();
    } else if (notInGraph(sig)) {
      scheduleUpdate(sig, val);
    }
  }
}


export const push = curry(<T>(sig: Signal<T>, val: T): void => {
  updateValue(sig, val);
});