import { State } from './../../../models/state.model';
import { Store } from '@ngrx/store';
import { Recipe } from 'contenta-angular-service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.component.html',
  styleUrls: ['./map-home.component.scss']
})
export class MapHomeComponent implements OnInit {
  promotedRecipes: Observable<Array<Recipe>>;

  constructor(private store: Store<State>) {
    // this.promotedRecipes = store.select('app', 'promoted');
  }

  ngOnInit() {
  }

}
