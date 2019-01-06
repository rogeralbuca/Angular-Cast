import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../person.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  private person: Person = new Person();

  private persons: Array<Person> = [];

  private errorMessage: string;

  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  save(): void {
    this.personService.save(this.person).subscribe(response => {
      this.findAll();
      alert(response.message);
    },
    (erro) => {
      alert(erro);
    });
  }

  findAll(): void {
    this.personService.findAll().subscribe((data: Array<Person>) => { this.persons = data; },
    error => this.errorMessage = error.message);
  }

}
