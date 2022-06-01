import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchBarControl = new FormControl();
  public suggestions: string[] = [];
  public filteredSuggestions?: Observable<string[]>;

  constructor(private searchService: SearchService) {}

  async ngOnInit() {
    this.searchService
      .getJsonData()
      .subscribe((suggestions) => (this.suggestions = suggestions));

    this.filteredSuggestions = this.searchBarControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  public searchButtonHandler(searchValue: string) {
    if (searchValue)
      window.open(`https://www.google.pl/search?q=${searchValue}`, '_blank');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(filterValue)
    );
  }
}
