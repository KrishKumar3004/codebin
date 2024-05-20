import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css'
})
export class CreateBinComponent {

  constructor(private dbService: DbService, private router: Router) {

  }
  title = new FormControl("", [
    Validators.required,
  ])

  code = new FormControl("", [
    Validators.required,
  ])

  createBin = new FormGroup({
    title: this.title,
    code: this.code
  })

  async save() {
    console.log(this.createBin.value);
    await this.dbService.createSnippet(this.createBin.value as Snippet);
    this.router.navigate(['/']);
  }


}
