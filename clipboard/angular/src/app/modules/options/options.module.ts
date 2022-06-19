import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './pages/options/options.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [OptionsComponent],
  imports: [CommonModule, OptionsRoutingModule, NzButtonModule, NzLayoutModule, NzTreeModule, NzTreeViewModule, NzIconModule]
})
export class OptionsModule {

}
