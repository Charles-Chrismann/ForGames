import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListByGameComponent } from './topic-list-by-game.component';

describe('TopicListByGameComponent', () => {
  let component: TopicListByGameComponent;
  let fixture: ComponentFixture<TopicListByGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicListByGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListByGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
