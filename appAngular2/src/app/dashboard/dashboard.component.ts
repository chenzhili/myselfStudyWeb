import {Component, OnInit, OnChanges,Input} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnChanges {
  hero = 1;
  constructor() { }
  addDom(){
    document.getElementsByTagName("p")[0].innerHTML = `<a>增加a标签${this.hero}</a>`;
  }
  ngOnInit() {
    console.log("init"+"是否先出现");
  }
  ngOnChanges(){
    console.log("change"+"是否先出现");
  }

}
