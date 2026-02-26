import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DonationRequest, DonationResponse } from '../../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private apiUrl = `${environment.apiUrl}donation`;
  private http = inject(HttpClient);

  createDonation(payload: DonationRequest){
    return this.http.post<DonationResponse>(this.apiUrl, payload);
  }
}
