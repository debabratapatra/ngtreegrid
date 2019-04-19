
# ngtreegrid
Angular 7 Multi level Tree Grid. Simple, Light Weight and dependency free.

## Demo

Click <a href="https://ng-tree-grid.stackblitz.io/" target="_blank">here</a> for demo.

## Installation

```bash
    npm i ngtreegrid
```

## Usage

### Import
Import NgtreegridModule Module in your application module.

```javascript
  import { NgtreegridModule } from 'ngtreegrid';
```

Add it to your imports array.

```javascript
    @NgModule({
      imports: [
        NgtreegridModule
      ]
    })
```

### Data
Format of the data should be like below.

```
  products: any[] = [
      { product_type: 'Book', name: 'Angular', price: 90 },
      { product_type: 'Book', name: 'Python', price: 70 },
      { product_type: 'Book', name: 'PHP', price: 80 },
      { product_type: 'Book', name: 'Java', price: 50 },
      { product_type: 'Electronic', name: 'Mouse', price: 50 },
      { product_type: 'Electronic', name: 'Earphone', price: 20 },
      { product_type: 'Electronic', name: 'Speaker', price: 45 },
      { product_type: 'Electronic', name: 'Hard Drive', price: 55 }
];
```

### Configs

1. **group_by(Mandatory):** It's a mandatory field. It is a column key. It can be an array of columns for multilevel group_by.
2. **group_by_header(Optional):** Header for the GroupBy Column. It can be an array of Column Headers.
3. **group_by_width(Optional):** Width of the GroupBy Column.
4. **data_loading_text(Optional):** Loading place holder. This will be displayed when data is empty.
5. **row_class_function(Optional):** Callback function for row class. A custom class can be returned which will be added to the row.
6. **row_edit_function(Optional):** Callback function for edit feature. Based on the return type(Boolean) of this function, edit can be enabled/disabled for a specific row. See <a href="https://ng-tree-grid.stackblitz.io/cond_row_edit">example</a> for more information.
7. **row_delete_function(Optional):** Callback function for delete feature. Based on the return type(Boolean) of this function, delete can be enabled/disabled for a specific row. See <a href="https://ng-tree-grid.stackblitz.io/cond_row_edit">example</a> for more information.
8. **actions(Optional):** Action column.
     * **add:** Boolean for add feature. It defaults to false.
     * **edit:** Boolean for edit feature. It defaults to false.
     * **delete:** Boolean for delete feature. It defaults to false.
     * **resolve_add:** Manually resolve add(after making call to server). It defaults to false. See <a href="https://ng-tree-grid.stackblitz.io/resolve_row_add">example</a> for more information.
     * **resolve_edit:** Manually resolve edit. It defaults to false.
     * **resolve_delete:** Manually resolve delete feature. It defaults to false.
5. **css(Optional):** Css class for icons
    * **expand_class(Optional):** Icon class for Expand icon. Font Awesome class can be given.
    * **collapse_class(Optional):** Icon class for Collapse icon. Font Awesome class can be given.
    * **add_class(Optional):** Icon class for Add icon. Font Awesome class can be given.
    * **edit_class(Optional):** Icon class for Edit icon. Font Awesome class can be given.
    * **delete_class(Optional):** Icon class for Delete icon. Font Awesome class can be given.
    * **save_class(Optional):** Icon class for Save icon. Font Awesome class can be given.
    * **cancel_class(Optional):** Icon class for Cancel icon. Font Awesome class can be given.
6. **columns(Optional):** It is an object. If not provided all keys of the data Array will be used as Column Headers. Please find the description below.
    * **name:** key of the column
    * **header:** Header of the column that will be displayed in the table
    * **width:** Width of the column
    * **hidden:** Show/Hide column. It defaults to false.
    * **sortable:** False to disable sorting of this column. By default columns are sortable.
    * **editable:** To make a specific column editable. By default columns are not editable. edit option needs to be true at grid level.
    * **renderer:** It is a method to render customized value for the column. See this <a href="https://ng-tree-grid.stackblitz.io/basic_tree_grid">Example</a>.
    * **group_aggregator:** It is a method which can be used to show data at the parent level for the corresponding column. (See example for better understanding). This field for the parent will be left blank if not provided.
    * **type:** Set to 'custom' to have custom component for the column. Otherwise leave blank.
    * **component:** Custome View Component. Mandatory if type is custom.
    * **editor:** Custome Editor Component. If given custom editor component will be used instead of default editor. See exampole.
    * **onComponentInit:** Callback function for the column on component init.

#### Example
```
  configs: any = {      
      'group_by': 'product_type',
      'group_by_header': 'Product Type',
      'group_by_width': '100px',
      'columns': [{
        'header': 'Product Name',
        'name': 'name',
        'sortable': false
      }, {
        'header': 'Price',
        'name': 'price',
        'width': '200px',
        'group_aggregator': (array) => {
          const prices = array.map((item) => item.price);
          return '$' + prices.reduce((acc, item) => acc + item);
        }
      }]
};
```

### Directive
Add below directive to your html.
```
  <db-ngtreegrid [data]="products" [configs]="configs"></db-ngtreegrid>
```
### Events

1. **expand:** Event fires when parent is expanded.
2. **collapse:** Event fires when parent is collapsed.
3. **cellclick:** Event fires when a child cell is clicked.
3. **rowselect:** Event fires when a row is selected.
4. **rowsave:** Event fires when a row is saved.
5. **rowdelete:** Event fires when a row is deleted.
6. **rowadd:** Event fires when a row is added.

## License
This project is licensed under the MIT license.
