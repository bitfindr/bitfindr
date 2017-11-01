import 'jest-preset-angular';

// RxJS monkey-patches imported here
// So they are available throughout all spec files
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/take';

import './jest-global-mocks';
