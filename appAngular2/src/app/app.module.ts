import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
/*import { RouterModule} from '@angular/router';*/

import { AppComponent } from './app.component';
import { FormModuleComponent } from './form-module/form-module.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

//引入路由模块
import { AppRouterModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FormModuleComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule
    /*RouterModule.forRoot([
      {
        path:'Dashboard',
        component:DashboardComponent
      },
      {
        path:'Heroes',
        component:HeroesComponent
      },{
        path:'',
        redirectTo:'/Dashboard',
        pathMatch:'full'
      }
    ])*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
