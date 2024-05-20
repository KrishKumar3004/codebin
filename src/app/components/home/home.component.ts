import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items = [];
  constructor(private dbService: DbService) {

  }
  ngOnInit() {
    this.dbService.getAllSnippets().then((data: any) => {
      this.items = data;
      console.log(this.items);
    })
  }
}
