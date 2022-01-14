import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

// ANGULARFIRE
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HotToastModule } from '@ngneat/hot-toast';

const AngularFire = [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideFunctions(() => getFunctions()),
  providePerformance(() => getPerformance()),
  provideRemoteConfig(() => getRemoteConfig()),
  provideStorage(() => getStorage()),
];

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, ...AngularFire, HotToastModule.forRoot()],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
