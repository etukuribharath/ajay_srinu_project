import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../_services/dashboard.service';
import { Subscription } from 'rxjs/index';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
@Component({
  selector: 'app-quotationcard',
  templateUrl: './quotationcard.component.html',
  styleUrls: ['./quotationcard.component.scss']
})
export class QuotationcardComponent implements OnInit {
  data = [];
  error: any;
  loading = true;
  subscription: Subscription | undefined;
  test_checkbox: boolean = true;
  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getDashboardQuotation();
  }
  getDashboardQuotation(value?: string) {
    let status = '';
    if (value == 'Review Quote') {
      status = 'REVIEW_QUOTES';
    } else if (value == 'Approved Quote') {
      status = 'APPROVED_QUOTES';
    } else if (value == 'Enquiry') {
      status = 'ENQUIRY';
    }
    this.authenticationService
      .refreshToken()
      .pipe(
        switchMap((userData) => {
          return this.dashboardService.getDashboardQuotation(
            userData.Token,
            status
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.Quotation;
        this.loading = false;
        console.log('Quotation response', response.Quotation);
      });
  }
  onValChange(event:any): any {
    console.log(event);
  }

  rowClick(): any {
    console.log('Row click');
  }

}