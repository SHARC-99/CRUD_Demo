import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms"
import { EmployeeModel } from './employee-dashboard.model';
import {ApiService} from "../shared/api.service";                 

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeemodelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  componentName = "employee-dashboard";
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      name:[""],
      email:[""],
      emp_no:[""],
      department:[""]
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeedetails()
  {
    this.employeemodelObj.name= this.formValue.value.name;
    this.employeemodelObj.email= this.formValue.value.email;
    this.employeemodelObj.emp_no= this.formValue.value.emp_no;
    this.employeemodelObj.department= this.formValue.value.department;

    this.api.postEmployee(this.employeemodelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },err=>{
      alert("Something went wrong")
    })
  }

  getAllEmployee(){
    this.api.getEmployee(this)
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmploye(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee()
    })
  }

  onEdit(row: any){

    this.showAdd=false;
    this.showUpdate=true;

    this.employeemodelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['emp_no'].setValue(row.emp_no);
    this.formValue.controls['department'].setValue(row.department);
  }

  editEmployeeDetails(){
    this.employeemodelObj.name= this.formValue.value.name;
    this.employeemodelObj.email= this.formValue.value.email;
    this.employeemodelObj.emp_no= this.formValue.value.emp_no;
    this.employeemodelObj.department= this.formValue.value.department;

    this.api.updateEmployee(this.employeemodelObj, this.employeemodelObj.id)
    .subscribe(res=>{
      alert("Employee Details Updated");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
