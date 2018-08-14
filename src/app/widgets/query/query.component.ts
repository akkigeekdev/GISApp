import { Component, OnInit } from '@angular/core';


export interface select {
  value: string;
  label: string;
}


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  constructor() { }

  layers:select[] = [  ]
  fields:select[] = [   ]

  ngOnInit() {
  }

}
