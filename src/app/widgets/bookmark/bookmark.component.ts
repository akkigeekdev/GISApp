import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent, MatChipSelectionChange} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Globals } from "../../globals";

export interface BookMark {
  name: string;
  extent: any
}

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private global:Globals
  ) { }

  bookmarks: BookMark[];

  ngOnInit() { 
    this.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  }

  chipClicked(extent){
    this.global.map.getView().fit(extent, {
      size:this.global.map.getSize(),
      constrainResolution: false
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      //if already exist
      let isExist = this.bookmarks.find(a=>a.name == value);
      if(!isExist){
        this.bookmarks.push({
          name: value.trim(), 
          extent: this.global.map.getView().calculateExtent(this.global.map.getSize())
        });
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(bookmark: BookMark): void {
    const index = this.bookmarks.indexOf(bookmark);

    if (index >= 0) {
      this.bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    }
  }

}