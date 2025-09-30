import { Component } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { SubscribeService } from '../Services/subscribe.service';
import { HomeComponent } from '../home/home.component';
import { FormvalidationComponent } from '../formvalidation/formvalidation.component';
import { ReactiveformsComponent } from '../reactiveforms/reactiveforms.component';
import { SignalsComponent } from '../signals/signals.component';
import { RxjsComponent } from '../rxjs/rxjs.component';
import { ServiceComponent } from '../service/service.component';
import { SubjectBehaviourComponent } from '../subject-behaviour/subject-behaviour.component';
import { JoinsMapObvComponent } from '../joins-map-obv/joins-map-obv.component';
import { AdminComponent } from '../admin/admin.component';
import { UnsubscribeComponent } from '../unsubscribe/unsubscribe.component';
import { InterceptorsComponent } from '../interceptors/interceptors.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    // NgSwitch,
    CommonModule,
    // HomeComponent,
    // AdminComponent,
    // FormvalidationComponent,
    // ReactiveformsComponent,
    // SignalsComponent,
    // RxjsComponent,
    // ServiceComponent,
    // SubjectBehaviourComponent,
    // JoinsMapObvComponent,
    // UnsubscribeComponent,
    // InterceptorsComponent,
    RouterLink,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [SubscribeService],
})
export class HeaderComponent {
  selectedTab: string = 'home';

  interceptorClicked(){
    this.selectedTab = 'interceptor';
  }

  //when HOME link is clicked
  HomeClicked() {
    this.selectedTab = 'home';
  }

  //when admin link is called
  AdminClicked() {
    this.selectedTab = 'admin';
  }

  FormValidationClicked() {
    this.selectedTab = 'formv';
  }

  reactiveFormClicked() {
    this.selectedTab = 'reactive';
  }

  signalClicked() {
    this.selectedTab = 'signals';
  }

  rxjsClicked() {
    this.selectedTab = 'rxjs';
  }

  ServiceClicked() {
    this.selectedTab = 'service';
  }

  subjectClicked() {
    this.selectedTab = 'subjectBehaviour';
  }

  mapjoinClicked() {
    this.selectedTab = 'join-map';
  }

  unsubscribeClicked(){
    this.selectedTab = 'unsubscribe';
  }

  constructor(private subService: SubscribeService) {}
  OnSubscribe() {
    this.subService.OnSubscribeClicked('monthly');
  }
}
