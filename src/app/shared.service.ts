import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //
  private fontType = new BehaviorSubject('');
  private fontSize = new BehaviorSubject('none');
  sharedMessage = this.fontType.asObservable();
  sharedFontSizes = this.fontSize.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.fontType.next(message);
  }

  getFontSize(message: string) {
    this.fontSize.next(message);
  }
}
