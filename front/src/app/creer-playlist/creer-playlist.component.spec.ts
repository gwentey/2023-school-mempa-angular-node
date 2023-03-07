import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPlaylistComponent } from './creer-playlist.component';

describe('CreerPlaylistComponent', () => {
  let component: CreerPlaylistComponent;
  let fixture: ComponentFixture<CreerPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
