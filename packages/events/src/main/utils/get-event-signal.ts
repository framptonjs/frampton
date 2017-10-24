import { Signal } from '@frampton/core';
import { addListener } from './event-dispatcher';


export default function get_event_signal<T>(name: string, target: any): Signal<T> {
  const parts: Array<string> =
    name.split(' ').filter((val: string) => val !== '');

  const len: number =
    parts.length;

  const sigs: Array<Signal<T>> =
    [];

  for (let i = 0; i < len; i++) {
    const sig: Signal<T> =
      Signal.create<T>();

    addListener(parts[i], target, Signal.push(sig));

    sigs.push(sig);
  }

  return Signal.merge(...sigs);
}
