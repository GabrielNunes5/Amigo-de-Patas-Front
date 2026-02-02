import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  private apiUrl = `${environment.apiUrl}voluntarios`;
}
