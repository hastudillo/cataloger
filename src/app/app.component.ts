import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string = 'Cataloger';
  links = [
    {
      label: 'Books',
      slug: '/books',
    },
    {
      label: 'Magazines',
      slug: '/magazines',
    }];
  activeLink = '';

  constructor(private location: Location) {}

  ngOnInit() {
    const currentPath = this.location.path()
    if (this.links.map(link => link.slug).includes(this.location.path())) {
      this.activeLink = currentPath;
    } else {
      this.activeLink = this.links[0].slug;
    }
  }
}
