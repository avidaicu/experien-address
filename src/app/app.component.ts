import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from  '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { AddressService } from "./address.service";
import { Address } from "./address";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private addressService: AddressService) {
    this.createContactForm();
  }

  // Getter method to access formcontrols
  get countryName() {
    return this.contactForm.get('countryName');
  }

  country;

  // Countries Names
  Country: any = [
    {name: 'Australia', country_iso: "AUS"}, 
    {name: 'India', country_iso: "IND"}, 
    {name: 'UK', country_iso: "GBR"}, 
    {name: 'US', country_iso: "USA"}
  ]

  // addresses: Address[] = [];
  // options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  createContactForm(){
    this.contactForm = this.formBuilder.group({
      countryName: ['', [Validators.required]],
      addressLookup: [''], 
      addressLine1: [''],  
      addressLine2: [''],
      addressLine3: [''],
      city: [''],
      state: [''],
      postcode: [''],
      country: ['']
    });
  }

  ngOnInit() {

    // this.filteredOptions = this.contactForm.get('addressLookup').valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

    this.contactForm.get('addressLookup').valueChanges
    .pipe(
      debounceTime(2000)
    )
    .subscribe(res => this.experienFunc(res));
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  // Choose country using select dropdown
  changeCountry(countryName) {
    this.country = countryName;
    this.countryName.setValue(countryName)
  }

  experienFunc(query) {
    console.log(query);
    console.log('this.country', this.country);

    const experienObj = {
      query: query,
      country_iso: this.country
    };

    this.addressService.getAddresses(experienObj)
    .subscribe(res => res);
  }

  onSubmit() {
      console.log('Your form data : ', this.contactForm.value );
  }
}
