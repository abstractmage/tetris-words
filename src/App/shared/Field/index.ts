import { action, makeObservable, observable } from 'mobx';
import Q from 'q';
import { Nullable } from 'src/App/types';

export class Field<T> {
  value: T;

  private waitDeferred: Nullable<Q.Deferred<void>> = null;

  constructor(value: T) {
    this.makeObservable();
    this.value = value;
  }

  setValue(value: T) {
    this.value = value;
    this.waitDeferred?.resolve();
    return value;
  }

  async waitChange() {
    this.waitDeferred = Q.defer();
    await this.waitDeferred.promise;
  }

  private makeObservable() {
    makeObservable(this, {
      value: observable,
      setValue: action.bound,
    });
  }
}
