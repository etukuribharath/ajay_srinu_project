import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";
import { first } from "rxjs/internal/operators";

@Injectable({ providedIn: "root" })
export class ShipmentService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {}

  getShipmentDetails(refreshToken?: string, status?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url;
    if (status != "") {
      // url=`${environment.apiUrl}/getdashboardshipment?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}`
      url = `${environment.apiUrl}/getshipmentupdates?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}`;
    } else {
      url = `${environment.apiUrl}/getshipmentupdates?user_token=${jwtToken}&sauth_token=${refreshToken}&status=`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        this.authenticationService
          .refreshToken()
          .pipe(first())
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
        return response;
      })
    );
  }
  getShipmentUpdatesFilter(refreshToken?: string, status?: string) {
    const jwtToken = this.localStorageService.getItem("jwtToken");
    let url;
    if (status != "") {
      // url=`${environment.apiUrl}/getdashboardshipment?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}`
      url = `${environment.apiUrl}/getshipmentupdates_filter?user_token=${jwtToken}&sauth_token=${refreshToken}&status=${status}`;
    } else {
      url = `${environment.apiUrl}/getshipmentupdates_filter?user_token=${jwtToken}&sauth_token=${refreshToken}&status=`;
    }
    return this.http.get<any>(url).pipe(
      map((response: Response) => {
        this.authenticationService
          .refreshToken()
          .pipe(first())
          .subscribe({
            next: () => {},
            error: (error) => {},
          });
        return response;
      })
    );
  }
}
