import { Component, OnInit } from '@angular/core';
import { Cases } from '../cases';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.scss']
})
export class EditCasesComponent implements OnInit {

  casesForm: FormGroup;
  name = '';
  gender = '';
  age: number = null;
  address = '';
  city = '';
  country = '';
  status = '';
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  matcher = new MyErrorStateMatcher();
  isLoadingResults = true;

  caseid : any

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.casesForm = this.formBuilder.group({
      _id: [null, Validators.required],
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      status: [null, Validators.required]
    });

    this.getCasesDetails(this.route.snapshot.params.id);
  }

  getCasesDetails(id: string) {
    this.api.getCasesById(id)
      .subscribe((data: Cases) => {
        this.casesForm.setValue({
          _id: data._id,
          name: data.name,
          gender: data.gender,
          age: data.age,
          address: data.address,
          city: data.city,
          country: data.country,
          status: data.status,
        })
        this.caseid = data._id
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCases(this.caseid ,this.casesForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        let message = "Case is Successfully Edited!!"
        let action = "Okay"
        this.router.navigate(['/cases-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


}

