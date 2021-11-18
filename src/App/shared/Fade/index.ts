import { makeAutoObservable } from 'mobx';
import EventEmitter from 'events';
import Q from 'q';
import { EventType, EventTypeMap, Options } from './types';
import { Nullable } from 'src/App/types';
import { ShowingEndHandler } from 'src/App/components/Fade/types';

export class Fade {
  duration: number;

  shown: boolean;

  shownAnimating = false;

  onShowingEnd!: Nullable<ShowingEndHandler>;

  private deferred: Nullable<Q.Deferred<void>> = null;

  private events: EventEmitter;

  constructor(options?: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.events = new EventEmitter();
    this.shown = options?.shown ?? true;
    this.duration = options?.duration ?? 500;
    this.setShowingEndHandler(options?.onShowingEnd ?? null);
  }

  on<T extends EventType>(eventType: T, handler: EventTypeMap[T]) {
    this.events.on(eventType, handler);
  }

  once<T extends EventType>(eventType: T, handler: EventTypeMap[T]) {
    this.events.on(eventType, handler);
  }

  off<T extends EventType>(eventType: T, handler: EventTypeMap[T]) {
    this.events.off(eventType, handler);
  }

  removeAllListeners<T extends EventType>(eventType?: T) {
    this.events.removeAllListeners(eventType);
  }

  setShowingEndHandler(showingEndHandler: Nullable<ShowingEndHandler>) {
    this.onShowingEnd = showingEndHandler;
  }

  startShownAnimating() {
    this.shownAnimating = true;
  }

  finishShownAnimating() {
    this.shownAnimating = false;
    this.deferred?.resolve();
    this.deferred = null;
    this.onShowingEnd?.(this.shown);
    this.events.emit('showing-end', this.shown);
  }

  startShowing() {
    if (this.shown) {
      this.onShowingEnd?.(this.shown);
      return;
    }

    this.shown = true;
    this.startShownAnimating();
    this.deferred = Q.defer();

    if (this.duration === 0) this.finishShownAnimating();
  }

  startHiding() {
    if (!this.shown) {
      this.onShowingEnd?.(this.shown);
      return;
    }

    this.shown = false;
    this.startShownAnimating();
    this.deferred = Q.defer();

    if (this.duration === 0) this.finishShownAnimating();
  }

  setShown(value: boolean) {
    if (value) {
      this.startShowing();
    } else {
      this.startHiding();
    }
  }

  async show() {
    if (this.shown) return;

    this.startShowing();

    await this.deferred?.promise;
  }

  async hide() {
    if (!this.shown) return;

    this.startHiding();

    await this.deferred?.promise;
  }

  setDuration(value: number) {
    this.duration = value;
  }

  showInstantly() {
    const prevDuration = this.duration;
    this.setDuration(0);
    this.show();
    Promise.resolve().then(() => this.setDuration(prevDuration));
  }

  hideInstantly() {
    const prevDuration = this.duration;
    this.setDuration(0);
    this.hide();
    Promise.resolve().then(() => this.setDuration(prevDuration));
  }

  async waitShowing() {
    await this.deferred?.promise;
  }
}