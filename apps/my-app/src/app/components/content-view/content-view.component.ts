import { Component, Input } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-content-view',
  standalone: false,
  template: `
    <div>
      <h4>Files</h4>
      <div *ngIf="filesOnly.length; else empty">
        <table class="table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let file of filesOnly">
              <td>{{ file.name }}</td>
              <td>
                <button class="btn btn-primary btn-sm" (click)="downloadFile(file)">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #empty>No files in this folder.</ng-template>
    </div>
  `
})
export class ContentViewComponent {
  @Input() contents: FileItem[] | null = [];

  get filesOnly(): FileItem[] {
    return this.contents?.filter(item => item.type === 'file') ?? [];
  }

  downloadFile(file: FileItem) {
    window.open(`http://localhost:3001/files/${file.id}/download`, '_blank');
  }
}
