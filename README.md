# ngtreegrid
Angular Tree Grid

## Installation

```bash
    npm i ngtreegrid
```

## Usage

### Import
Import NgtreegridModule Module in your application module.

```javascript
  import { NbDatepickerModule } from '@nebular/theme';
```

### Data
Format of the data should be like below.

```
  data = [
    { Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 1', Value: '5' },
    { Phase: 'Phase 1', Step: 'Step 1', Task: 'Task 2', Value: '10' },
    { Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 1', Value: '15' },
    { Phase: 'Phase 1', Step: 'Step 2', Task: 'Task 2', Value: '20' },
    { Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 1', Value: '25' },
    { Phase: 'Phase 2', Step: 'Step 1', Task: 'Task 2', Value: '30' },
    { Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 1', Value: '35' },
    { Phase: 'Phase 2', Step: 'Step 2', Task: 'Task 2', Value: '40' }
  ];
```

### Config
Below are configs that can be set

```
  group_by(Mandatory): It's a mandatory field. It is a column key.
  columns(Optional): It is a mapper between column key to the column header that will be displayed in the table. Defaults to all column keys. If provided, only columns specified will be displayed in the table.
  add_class(Optional): Icon class for Plus icon. Defaults to Font Awesome icon.
  minus_class(Optional): Icon class for Minus icon. Defaults to Font Awesome icon.
```

#### Example
```
  config: any = {
    'columns': {
      'Step': 'Step Number',
      'Value': 'Amount'
    },
    'group_by': 'Phase'
  };
```

### Directive

```
  <db-ngtreegrid [data]="data" [config]="config"></db-ngtreegrid>
```

## License
This project is licensed under the MIT license.
