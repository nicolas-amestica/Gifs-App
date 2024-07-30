import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gidsService: GifsService) { }

  get tags() {
    return this.gidsService.tagsHistory;
  }

  searchTag(tag: string): void {
    this.gidsService.searchTag(tag);
  }


}
