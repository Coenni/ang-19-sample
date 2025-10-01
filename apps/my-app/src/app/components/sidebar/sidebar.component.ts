import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-sidebar',
  template: `
    <ul class="sidebar-list">
      <ng-container *ngFor="let folder of folders">
        <li (click)="toggleFolder(folder, $event)">
          <i 
            class="bi"
            [ngClass]="{
              'bi-folder2-open': isOpen(folder),
              'bi-folder2': !isOpen(folder),
              'folder-icon': true
            }"
          ></i>
          <span (click)="selectFolder(folder, $event)">{{ folder.name }}</span>
        </li>
        <ul *ngIf="folder.children?.length && isOpen(folder)">
          <li *ngFor="let sub of folder.children" (click)="selectFolder(sub, $event)">
            <i class="bi bi-folder2 folder-icon"></i>
            <span>{{ sub.name }}</span>
          </li>
        </ul>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() folders: FileItem[] | null = [];
  @Input() selectedId: string | null = null;
  @Output() folderSelected = new EventEmitter<string>();

  openFolders = new Set<string>();

  toggleFolder(folder: FileItem, event: Event) {
    event.stopPropagation();
    if (this.isOpen(folder)) {
      this.openFolders.delete(folder.id);
    } else {
      this.openFolders.add(folder.id);
    }
  }

  isOpen(folder: FileItem): boolean {
    return this.openFolders.has(folder.id);
  }

  selectFolder(folder: FileItem, event: Event) {
    event.stopPropagation();
    this.folderSelected.emit(folder.id);
  }
}