import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaigns: any[];

  constructor(private cam:CampaignsService) {     
   
  }

  delCamp(id:any){
    (confirm("Are you sure you want to delete this record?")? this.cam.deleteCampaign(id) : ""); 
  }

  ngOnInit() {
    this.cam.getCampaigns().subscribe(data => {
      this.campaigns = data.map(e => {
        const devices = e.payload.doc.data()['devices'];
        var d_final = '';
        devices.forEach((x,index) => {
          (index > 0)?d_final += ', ':"";
          d_final += x.name;
        });
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          start_date: e.payload.doc.data()['start_date'],
          end_date: e.payload.doc.data()['end_date'],
          devices: d_final,
          bid: e.payload.doc.data()['bid'],
          budget: e.payload.doc.data()['budget']
        };
      })
    });
  }

}
