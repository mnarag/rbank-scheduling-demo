import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url = 'http://localhost:8080/api/schedule';

  constructor(private httpClient: HttpClient) { }

  createSchedule(projectPlan: any): Observable<any> {
    return this.httpClient.post<any>(this.url, projectPlan);
  }
}
