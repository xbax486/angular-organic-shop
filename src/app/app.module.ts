/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "angularfire2";
import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from "./core/components/login/login.component";
import { ProductsComponent } from "./shopping/components/products/products.component";

/* Guards */
import { AuthGuard } from "./shared/guards/auth/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: LoginComponent
      },
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
