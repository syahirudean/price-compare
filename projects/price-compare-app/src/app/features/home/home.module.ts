import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { PriceListComponent } from './products/product/price-list/price-list.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, ProductComponent, PriceListComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
