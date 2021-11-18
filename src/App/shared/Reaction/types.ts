import { IReactionOptions, IReactionPublic } from 'mobx';

export type Options<R> = {
  expression: (reaction: IReactionPublic) => R;
  handler: (current: R, prev: R | undefined, r: IReactionPublic) => void;
  options?: IReactionOptions<any, any>;
};
