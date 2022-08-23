import { Subject } from "rxjs";

const cartChanged = new Subject();

export const cartSumService = {
  sendCartSum: (newCartSum) => cartChanged.next(newCartSum),
  getCartSum: () => cartChanged.asObservable()
}