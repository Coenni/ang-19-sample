import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FileItem } from './models/folder.model';
import { selectFolders, selectSelectedFolderId, selectSelectedFolderContents } from './store/document.selectors';
import { loadFolders, selectFolder } from './store/document.actions';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div *ngIf="loading" class="spinner-backdrop">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <app-sidebar
            [folders]="folders$ | async"
            [selectedId]="selectedId$ | async"
            (folderSelected)="onFolderSelected($event)"
          >
          </app-sidebar>
        </div>
        <div class="col-9 position-relative">
          <app-content-view [contents]="contents$ | async"></app-content-view>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  folders$: Observable<FileItem[]>;
  selectedId$: Observable<string | null>;
  contents$: Observable<FileItem[]>;

  loading = true;

  constructor(private store: Store) {
    this.folders$ = this.store.select(selectFolders);
    this.selectedId$ = this.store.select(selectSelectedFolderId);
    this.contents$ = this.store.select(selectSelectedFolderContents);

  }

  ngOnInit() {
    this.loading = true;

    this.store.dispatch(loadFolders());
    setTimeout(() => {
      this.loading = false
    }, 4000);
  }

  onFolderSelected(folderId: string | null) {
    this.store.dispatch(selectFolder({ folderId }));
  }
}
