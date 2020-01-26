import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router"



@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CampaignsCreateComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  edit_mode = false;
  items: any;
  daily_budget: Number;
  bid: Number;
  name: String;
  start_date: any;
  end_date: any;
  month_names:any;
  start_date_display: String;
  end_date_display: String;
  devices: any;
  id: string;
  

  constructor(private _formBuilder: FormBuilder, private cam:CampaignsService, private _Activatedroute:ActivatedRoute, private router: Router) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.items = [
      {id: 1, name: 'Tablet'},
      {id: 2, name: 'Desktop'},
      {id: 3, name: 'Mobile'}
    ];
    this.month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    if(this.id != '1'){
      this.GetCampaign(this.id);
      this.edit_mode = true;
    }else{
      this.edit_mode = false;
      
    }
    
  }

  changeDateFilter(selector,value){
    if(typeof value === 'object' && value !== null){
      let month = this.month_names[value.month - 1];
      let year = value.year;
      let day = value.day;
      let final = month + ' ' + day + ', ' + year;
      if(selector == 'start'){
        this.start_date_display = final;
      }else{
        this.end_date_display = final;
      }   
    }
  }

  createNewCampain(){
    this.cam.createCampaign(this.name,this.start_date,this.end_date,this.devices,this.daily_budget,this.bid);
    this.router.navigate(['/main/campaigns']);
  }

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      bidCtrl: ['', [Validators.required,this.BidValidator]],
      dailyBudgetCtrl: ['', Validators.required],
      startDateCtrl: ['', Validators.required],
      endDateCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  BidValidator(control: FormControl) {
    if(typeof(control.parent) != 'undefined'){
      if(typeof(control.parent.value.dailyBudgetCtrl) != 'undefined'){
        let budg_val = control.parent.value.dailyBudgetCtrl;
        let bid = control.value;
        if( bid ){
          if( bid > (budg_val / 10) ){
            return {bid: 'not bid'};
          }
        }
      }
    }   
    return null;
  }

  GetCampaign(recordRow){
    this.cam.getCampaignById(recordRow).subscribe(data => {
    this.name = data.data().name;
    this.bid = data.data().bid;
    this.start_date = data.data().start_date;
    this.end_date = data.data().end_date;
    this.devices = data.data().devices;
    this.daily_budget = data.data().budget;
    });
  }

  updateCampaign(){
    this.cam.updateCampaign(this.id,this.name,this.start_date,this.end_date,this.devices,this.daily_budget,this.bid);
    this.router.navigate(['/main/campaigns']);
  }

}
