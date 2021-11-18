import { IReactionDisposer, IReactionOptions, IReactionPublic, reaction } from 'mobx';
import { Nullable } from 'src/App/types';
import { Options } from './types';

export class Reaction<R> {
  private disposer: Nullable<IReactionDisposer> = null;

  private expression: (reaction: IReactionPublic) => R;

  private handler: (current: R, prev: R | undefined, reaction: IReactionPublic) => void;

  private options?: IReactionOptions<any, any>;

  constructor({ expression, handler, options }: Options<R>) {
    this.expression = expression;
    this.handler = handler;
    this.options = options;
    this.handle = this.handle.bind(this);
  }

  init() {
    this.disposer = reaction(this.expression, this.handle, this.options);
  }

  dispose() {
    this.disposer?.();
    this.disposer = null;
  }

  private handle(current: R, prev: R | undefined, _reaction: IReactionPublic) {
    try {
      this.handler(current, prev, _reaction);
    } catch (err) {
      // @ts-ignore
      window.dispatchEvent(new ErrorEvent('error', err));
      throw err;
    }
  }
}
