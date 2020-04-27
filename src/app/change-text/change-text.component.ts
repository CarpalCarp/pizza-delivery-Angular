import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'change-text',
  templateUrl: './change-text.component.html',
  styleUrls: ['./change-text.component.css']
})
export class ChangeTextComponent implements OnInit {
  fontType: string;
  fontSize: string;

  fonts = [
    { id: 1, name: "Helvetica" },
    { id: 2, name: "Cursive" },
    { id: 3, name: "Arial-Bold" },
    { id: 4, name: "Monospace-Bold" },
    { id: 5, name: "Impact-Bold" }
  ]

  sizes = [
    { id: 1, name: "16" },
    { id: 2, name: "18" },
    { id: 3, name: "20" },
    { id: 4, name: "22" },
    { id: 5, name: "24" }
  ]

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.sharedMessage.subscribe(message => this.fontType = message);
    this.sharedService.sharedFontSizes.subscribe(message => this.fontSize = message);
  }

  getFont(font: string) {
    this.sharedService.nextMessage(font);
  }

  getFontSize(size: string) {
    this.sharedService.getFontSize(size);
  }
}
