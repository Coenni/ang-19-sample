import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-sidebar',
  template: `
    <ul class="list-group">
      <ng-container *ngFor="let folder of folders">
        <li class="list-group-item"
            [class.active]="folder.id === selectedId"
            (click)="selectFolder(folder)">
          <i class="bi bi-folder"></i> {{ folder.name }}
        </li>
        <ul *ngIf="folder.children?.length">
          <li *ngFor="let sub of folder.children"
              class="list-group-item"
              (click)="selectFolder(sub)">
            <i class="bi bi-folder"></i> {{ sub.name }}
          </li>
        </ul>
      </ng-container>
    </ul>
  `
})
export class SidebarComponent {
  @Input() folders: FileItem[] = [];
  @Input() selectedId: string | null = null;
  @Output() folderSelected = new EventEmitter<string>();
  selectFolder(folder: FileItem) {
    this.folderSelected.emit(folder.id);
  }
}
