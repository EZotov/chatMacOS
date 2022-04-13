import { Component, HostListener, ViewChild } from '@angular/core';

@Component(
  {
    selector : 'menu-container',
    templateUrl : './menu-container.component.html',
    styleUrls : ['./menu-container.component.scss']
  }
)

export class MenuComponent {
  listSelectorOpened : boolean = false;

  selectedList : string = 'Nomad List';

  list : string[] = ['Nomad List', 'Project List'];

  @ViewChild('dropDown')
  element : any;


  @HostListener('document:click', ['$event'])
	onClick(event: Event) {
		if (!this.element.nativeElement.contains(event.target) && this.listSelectorOpened === true) {
			this.listSelectorOpened = false;
		}
	}

  onClickSelectList() : void {
    this.listSelectorOpened = !this.listSelectorOpened;
  }

  onClickSelectingItem(item : string) : void {
    this.selectedList = item;
    this.listSelectorOpened = false;
  }

  public get dropdownClasses() {
    if (this.listSelectorOpened) {
      return ['dropdown', 'dropdown_opened'];
    }
    else {
      return ['dropdown'];
    }
  }
}
