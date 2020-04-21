import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit , AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }

}
