import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SubjectBehaviourComponent } from './subject-behaviour/subject-behaviour.component';
import { FormvalidationComponent } from './formvalidation/formvalidation.component';
import { ReactiveformsComponent } from './reactiveforms/reactiveforms.component';
import { ServiceComponent } from './service/service.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { SignalsComponent } from './signals/signals.component';
import { JoinsMapObvComponent } from './joins-map-obv/joins-map-obv.component';
import { InterceptorsComponent } from './interceptors/interceptors.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'subject', component: SubjectBehaviourComponent },
  { path: 'template-form', component: FormvalidationComponent },
  { path: 'reactive-form', component: ReactiveformsComponent },
  { path: 'subservice', component: ServiceComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: 'signal', component: SignalsComponent },
  { path: 'join-map', component: JoinsMapObvComponent },
  { path: 'interceptors', component: InterceptorsComponent },
];
