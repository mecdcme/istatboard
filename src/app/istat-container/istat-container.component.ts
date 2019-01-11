import { Component, OnDestroy } from '@angular/core';
import { navItems } from './../_nav';


@Component({
  selector: 'app-istat-container',
  templateUrl: './istat-container.component.html',
  styleUrls: ['./istat-container.component.css']
})
export class IstatContainerComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor() {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
