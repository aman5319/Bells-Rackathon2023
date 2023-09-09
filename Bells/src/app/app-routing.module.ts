import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SyntheticDataComponent } from './synthetic-data/synthetic-data.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'ctgan', component: SyntheticDataComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
