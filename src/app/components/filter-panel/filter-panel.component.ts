import { DepartmentsService } from './../../services/departments.service';
import { IDepartment } from './../../models/IDepartment';
import { ALL_COUNTRIES, ALL_DEPARTMENTS } from './../../Constants';
import { ICountry } from './../../models/ICountry';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  countryOptions: ICountry[] = [];
  departmentOptions: IDepartment[] = [];

  countryFilter: ICountry;
  departmentFilter: IDepartment;

  @Output() countryFilterOut: EventEmitter<ICountry> = new EventEmitter();
  @Output() departmentFilterOut: EventEmitter<IDepartment> = new EventEmitter();

  constructor(
    private countriesService: CountriesService,
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit() {

    //Feed the Countries Source with values from PostList
    this.countriesService.initializeCountrySource();

    //Feed the Departments Source with values from PostList
    this.departmentsService.initializeDepartmentSource();

    // Populate countries selectbox
    this.setCountriesSelectBoxOptions();

    // Populate departments selectbox
    this.setDepartmentsSelectBoxOptions();
  }

  setCountriesSelectBoxOptions() {
    this.countriesService.countriesReference.subscribe(countries => {
      //First clear array
      this.countryOptions = [];

      //insert title first "All"
      this.countryOptions.push({ code: ALL_COUNTRIES.CODE, name: ALL_COUNTRIES.NAME } as ICountry);

      //insert list of countries
      this.countryOptions = this.countryOptions.concat(countries);

      this.countryFilter = this.countryOptions[0];
    });
  }

  setDepartmentsSelectBoxOptions() {
    this.departmentsService.departmentsReference.subscribe(departments => {
      //First clear array
      this.departmentOptions = [];

      //insert title first "All"
      this.departmentOptions.push({ id: ALL_DEPARTMENTS.ID, name: ALL_DEPARTMENTS.NAME } as IDepartment);

      //insert list of Departments
      this.departmentOptions = this.departmentOptions.concat(departments);

      this.departmentFilter = this.departmentOptions[0];
    });
  }

  onCountryChange() {
    this.countryFilterOut.emit(this.countryFilter);
  }

  onDepartmentChange() {
    this.departmentFilterOut.emit(this.departmentFilter);
  }
}