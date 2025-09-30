import { Component } from '@angular/core';

import { SubscribeService } from '../Services/subscribe.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [SidebarComponent,HeroComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  selectedTab: string = 'home';

  //When HOME Link is clicked
  HomeClicked(){
    this.selectedTab = 'home';
  }

  //When Admin Link is clicked
  AdminClicked(){
    this.selectedTab = 'admin';
  }

  constructor(private subService:SubscribeService){}
  OnSubscribe(){
        this.subService.OnSubscribeClicked('yearly');
  }
  
}
