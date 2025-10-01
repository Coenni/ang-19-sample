import { Component, Input } from '@angular/core';
import { FileItem } from '../../models/folder.model';

@Component({
  selector: 'app-content-view',
  standalone: false,
  template: `
    <div>
      <h4>Contents</h4>
      <div *ngIf="contents?.length; else empty">
        <div class="row">
          <div *ngFor="let item of contents" class="col-md-4 mb-2">
            <div class="card">
              <div class="card-body">
                <i [class]="'bi ' + (item.type === 'folder' ? 'bi-folder' : 'bi-file-earmark')"></i>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ng-template #empty>No items in this folder.</ng-template>
    </div>
  `
})
export class ContentViewComponent {
  @Input() contents: FileItem[] | null = [];
}
