import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import {CustomSerializer} from './reducers/router.reducer';
import {effects, reducers} from './index';


@NgModule({
  imports: [
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer})
  ]
})
export class AppStoreModule {}
