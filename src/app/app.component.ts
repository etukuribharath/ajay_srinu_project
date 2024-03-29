import { Component, ViewEncapsulation, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { filter } from "rxjs/operators";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
  title = "frescon";
  currentRoute = "";
  drawer!: MatDrawer;
  menuList: NavMenuItem[] = [
    {
      name: "Dashboard",
      label: "Dashboard",
      route: "/dashboard",
      icon: "dashboard",
      isActive: true,
    },
    {
      name: "Shipments",
      label: "Shipments",
      route: "/shipments",
      icon: "shipments",
      isActive: false,
    },
    {
      name: "Quotes",
      label: "Quotes",
      route: "/quotes",
      icon: "quotes",
      isActive: false,
    },
    { name: "PO", label: "PO", route: "/po", icon: "po", isActive: false },
    {
      name: "E-Booking",
      label: "E-Booking",
      route: "/ebooking",
      icon: "billing",
      isActive: false,
    },
    {
      name: "Invoice",
      label: "Invoice",
      route: "/invoice",
      icon: "billing",
      isActive: false,
    },
    // {
    //   name: "Insights",
    //   label: "Insights",
    //   route: "/insights",
    //   icon: "insights",
    //   isActive: false,
    // },
    // {
    //   name: "Partners",
    //   label: "Partners",
    //   route: "/partners",
    //   icon: "partners",
    //   isActive: false,
    // },
  ];
  helpMenuList: NavMenuItem[] = [
    {
      name: "Messages",
      label: "Messages",
      route: "/messages",
      icon: "messages",
      isActive: true,
    },
    {
      name: "Library",
      label: "Library",
      route: "/library",
      icon: "library",
      isActive: false,
    },
    {
      name: "Settings",
      label: "Settings",
      route: "/settings",
      icon: "settings",
      isActive: false,
    },
    {
      name: "Support",
      label: "Support",
      route: "/support",
      icon: "support",
      isActive: false,
    },
  ];
  watcher: any;
  gtMd = false;
  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    mediaObserver: MediaObserver
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = this.router.url;
      });
    this.matIconRegistry.addSvgIcon(
      "download",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/download.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "dashboard",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/menu-overview.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "shipments",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/shipments.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "quotes",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/quotes.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "po",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/po.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "billing",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/billing.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "insights",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/insights.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "partners",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/partners.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "messages",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/messages.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "library",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/library.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "settings",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/settings.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "support",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "./../assets/icons/support.svg"
      )
    );
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.gtMd = !["xs", "sm"].includes(change.mqAlias);
    });
  }

  onMenuItemClick(menuItem: NavMenuItem) {
    this.goTo(menuItem.route);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  goTo(routePageName: string, drawer?: MatDrawer) {
    drawer && drawer.close();
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
}
interface NavMenuItem {
  name: string;
  label: string;
  route: string;
  icon: string;
  isActive?: boolean;
  isExpanded?: boolean;
  subMenu?: NavMenuItem[];
}
