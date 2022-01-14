import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ComponentCanDeactivate } from '../components/component-can-deactivate';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      return confirm(
        'You have unsaved changes! If you leave, your changes will be lost.'
      );
    }
    return true;
    // Check
  }
}
