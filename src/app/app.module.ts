import { BrowserModule } from '@angular/platform-browser';
import { Component, Input, NgModule, ViewContainerRef, ViewRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span>{{ name }} # {{ sessionId }}</span>
    <ul>
      <li *ngFor="let chapter of chapters">
        <app-chapter
          [id]="chapter.id"
          [name]="chapter.name"
          [isRated]="chapter.isRated"
        ></app-chapter>
      </li>
    </ul>
  `,
})
export class AppComponent {
  name = 'ExerciceBook';
  sessionId = 1;

  chapters = [
    { id: 1, name: 'Chapter 1', isRated: false },
    { id: 2, name: 'Chapter 2', isRated: true },
    { id: 3, name: 'Chapter 3', isRated: false },
  ];

  // Can't get $0.__ngContext__ on all DOM element starting v14
  constructor(public viewRef: ViewContainerRef) {}

  ngDoCheck(){
    console.log(this.viewRef as any)
  }
}

@Component({
  selector: 'app-chapter',
  template: `
    <div>{{ 'Chapter #' + id }}</div>
    <div *ngIf="isRated else notRated" [style.color]="isRated ? 'red' : '' ">{{ name }}</div>

    <ng-template #notRated>
      <div>{{ name }}</div>
    </ng-template>
  `,
})
export class ChapterComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() isRated = false;
}

@NgModule({
  declarations: [
    AppComponent,
    ChapterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
