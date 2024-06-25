// Ashared service will act as a mediator between the two parent components.

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private booleanSource = new BehaviorSubject<boolean>(false);
  currentBoolean = this.booleanSource.asObservable();
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() { }

  changeBoolean(value: boolean) {
    this.booleanSource.next(value);
  }

  setData(data: any) {
    this.dataSubject.next(data);
  }
}