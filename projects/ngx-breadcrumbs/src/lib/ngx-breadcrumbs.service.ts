import { Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxBreadcrumb } from './ngx-breadcrumb';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NgxBreadcrumbsService {
  private breadcrumbs$: Observable<NgxBreadcrumb[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.breadcrumbs$ = this.router.events.pipe(
      filter( e => e instanceof NavigationEnd),
      distinctUntilChanged(),
      map(e => this.dropCrumb(this.route.root, '', []))
    );
  }

  dropCrumb(route: ActivatedRoute, path: string, crumbs: NgxBreadcrumb[]): NgxBreadcrumb[] {
    if (route.snapshot.data) {
      if (route.snapshot.url.length > 0) {
        path += `${route.snapshot.url}/`;
      }

      crumbs.push({
        data: route.snapshot.data,
        path: path
      })
    }

    if (route.firstChild) {
      return this.dropCrumb(route.firstChild, path, crumbs);
    }
    return crumbs;
  }

  get breadcrumbs(): Observable<NgxBreadcrumb[]> {
    return this.breadcrumbs$;
  }
}
