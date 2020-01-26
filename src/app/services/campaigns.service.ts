import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(public db:AngularFireDatabase,private firestore: AngularFirestore) { }

  getCampaigns(){
    return this.firestore.collection('campaigns').snapshotChanges();
  }

  createCampaign(name,start_date,end_date,devices,daily_budget,bid){
    let record = {name: name, bid: bid, budget: daily_budget, start_date: start_date, end_date: end_date, devices:devices};
    return this.firestore.collection('campaigns').add(record);
  }

  getCampaignById(recordID) {
    return this.firestore.collection('campaigns').doc(recordID).get();
  }

  updateCampaign(recordID,name,start_date,end_date,devices,daily_budget,bid){
    let record = {name: name, bid: bid, budget: daily_budget, start_date: start_date, end_date: end_date, devices:devices};
    this.firestore.doc('campaigns/' + recordID).update(record);
  }

  deleteCampaign(recordID) {
    this.firestore.doc('campaigns/' + recordID).delete();
  }
}
