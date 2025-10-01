import { Component, Input, OnChanges } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-content-view',
  template: `
    <div>
      <h4>Files</h4>
      <div *ngIf="filesOnly.length; else empty">
        <div class="mb-2" *ngIf="anySelected">
          <button class="btn btn-success btn-sm" (click)="downloadAll()">Download All</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  [checked]="allSelected"
                  [indeterminate]="someSelected"
                  (change)="toggleSelectAll($event)"
                />
              </th>
              <th>Document Name</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let file of filesOnly; let i = index">
              <td>
                <input type="checkbox" [(ngModel)]="selected[i]" />
              </td>
              <td>{{ file.name }}</td>
              <td>{{ file.size || '-' }}</td>
              <td>{{ file.uploaded ? (file.uploaded | date:'medium') : '-' }}</td>
              <td>
                <button class="btn btn-primary btn-sm" (click)="downloadFile(file)">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #empty>No files in this folder.</ng-template>
    </div>
  `,
  styles: [`
    .table th, .table td { vertical-align: middle; }
  `]
})
export class ContentViewComponent implements OnChanges {
  @Input() contents: FileItem[] | null = [];
  selected: boolean[] = [];

  get filesOnly(): FileItem[] {
    return this.contents?.filter(item => item.type === 'file') ?? [];
  }

  ngOnChanges() {
    this.selected = this.filesOnly.map(() => false);
  }

  get allSelected(): boolean {
    return this.selected.length > 0 && this.selected.every(Boolean);
  }
  get someSelected(): boolean {
    return this.selected.some(Boolean) && !this.allSelected;
  }
  get anySelected(): boolean {
    return this.selected.some(Boolean);
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected = this.filesOnly.map(() => checked);
  }
  downloadFile(file: FileItem) {
    window.open(`http://localhost:3001/files/${file.id}/download`, '_blank');
  }
  downloadAll() {
    this.filesOnly.forEach((file, idx) => {
      if (this.selected[idx]) {
        this.downloadFile(file);
      }
    });
  }
}