import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {
  codesnippet = {
    title: "",
    code: ""
  };
  constructor(private dbService: DbService, private route: ActivatedRoute) { }
  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippet(docId!).then((data: any) => {

      this.codesnippet = data;
    })
  }
}
