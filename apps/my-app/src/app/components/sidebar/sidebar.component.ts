import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  template: `
    <ul class="sidebar-list">
      <ng-container *ngFor="let folder of folders">
        <li (click)="toggleFolder(folder, $event)">
          <i
            *ngIf="folder.name.indexOf('.') < 0"
            class="bi"
            [ngClass]="{
              'bi-folder2-open': isOpen(folder),
              'bi-folder-fill': !isOpen(folder),
              'folder-icon': true
            }"
          ></i>
          <i
            *ngIf="folder.name.indexOf('.') > 0"
            class="bi"
            [ngClass]="{
              'bi-file-pdf-fill': folder.name.endsWith('pdf'),
              'bi-file-text-fill': folder.name.endsWith('txt'),
              'bi-file-image-fill': folder.name.endsWith('jpg'),
              'folder-icon': true
            }"
          ></i>
          <span (click)="selectFolder(folder, $event)">{{ folder.name }}</span>
        </li>
        <ul *ngIf="folder.children?.length && isOpen(folder)">
          <li
            *ngFor="let sub of folder.children"
            (click)="selectFolder(sub, $event)"
          >
            <i
              *ngIf="sub.name.indexOf('.') < 0"
              class="bi"
              [ngClass]="{
              'bi-folder2-open': isOpen(sub),
              'bi-folder-fill': !isOpen(sub),
              'folder-icon': true
            }"
            ></i>
            <i
              *ngIf="sub.name.indexOf('.') > 0"
              class="bi"
              [ngClass]="{
              'bi-file-pdf-fill': sub.name.endsWith('pdf'),
              'bi-file-text-fill': sub.name.endsWith('txt'),
              'bi-file-image-fill': sub.name.endsWith('jpg'),
              'folder-icon': true
            }"
            ></i>

            <span>{{ sub.name }}</span>
          </li>
        </ul>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() folders: FileItem[] | null = [];
  @Input() selectedId: string | null = null;
  @Output() folderSelected = new EventEmitter<string|null>();

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
