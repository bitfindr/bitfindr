import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';
import { OnRunEffects, EffectNotification } from '@ngrx/effects';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

export class BasePageEffects implements OnRunEffects {
  /**
   * triggered by viewCtrl lifecycle hooks
   *
   * @protected
   * @memberof PageEffect
   */
  protected isActive = new BehaviorSubject(false);
  protected active$ = this.isActive.asObservable();

  constructor(pageName: string, app: App) {
    // Currently we only filter by viewCtrl name
    // This might need to be re-worked if we get to a point in the
    // application where we have multiple active instances of the
    // same page in the same nav stack.
    app.viewWillEnter
      .filter(viewCtrl => viewCtrl.name === pageName)
      .subscribe(_ => this.isActive.next(true));

    app.viewWillLeave
      .filter(viewCtrl => viewCtrl.name === pageName)
      .subscribe(_ => this.isActive.next(false));
  }

  /**
   * controls when the effects should run
   * https://github.com/ngrx/platform/blob/master/docs/effects/api.md#controlling-effects
   *
   * @param {Observable<EffectNotification>} resolvedEffects$
   * @returns {Observable<EffectNotification>}
   * @memberof PageEffect
   */
  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    // We only run the effects when the page is active.
    return this.active$
      .filter(active => !!active)
      // Keep them running until the passed observable is exhausetd (complete)
      .exhaustMap(() => resolvedEffects$
        // Once the page is no longer active, complete the observable stream
        // effectivly turning off effects until the page is active again.
        .takeUntil(this.active$
          .filter(active => active === false)
        )
      );
  }
}
