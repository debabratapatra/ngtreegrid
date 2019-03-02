# ngtreegrid
Angular Tree Grid. Simple, Light Weight and dependency free.

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

1. **group_by(Mandatory):** It's a mandatory field. It is a column key.
2. **group_by_header(Optional):** Header for the GroupBy Column.
3. **group_by_width(Optional):** Width of the GroupBy Column.
4. **editable(Optional):** To make the grid editable. This needs to be true to make **columns editable**.
5. **data_loading_text(Optional):** Loading place holder. This will be displayed when data is empty.
6. **expand_class(Optional):** Icon class for Expand icon. Font Awesome class can be given.
5. **collapse_class(Optional):** Icon class for Collapse icon. Font Awesome class can be given.
5. **add_class(Optional):** Icon class for Add icon. Font Awesome class can be given.
5. **edit_class(Optional):** Icon class for Edit icon. Font Awesome class can be given.
5. **delete_class(Optional):** Icon class for Delete icon. Font Awesome class can be given.
5. **save_class(Optional):** Icon class for Save icon. Font Awesome class can be given.
5. **cancel_class(Optional):** Icon class for Cancel icon. Font Awesome class can be given.
6. **columns(Optional):** It is an object. If not provided all keys of the data Array will be used as Column Headers. Please find the description below.
    * **name:** key of the column
    * **header:** Header of the column that will be displayed in the table
    * **width:** Width of the column
    * **hidden:** Show/Hide column. It defaults to false.
    * **sortable:** False to disable sorting of this column. By default columns are sortable.
    * **editable:** To make a specific column editable. By default columns are not editable. dditable option needs to be true at grid level.
    * **renderer:** It is a method which can be used to transform the value before value of the column is rendered. It gets value of the corresponding column and the whole record as arguments. See example below.
    * **group_aggregator:** It is a method which can be used to show data at the parent level for the corresponding column. (See example for better understanding). This field for the parent will be left blank if not provided.

#### Example
```
  configs: any = {      
      'group_by': 'product_type',
      'group_by_header': 'Product Type',
      'group_by_width': '100px',
      'columns': [{
        'header': 'Product Name',
        'name': 'name',
        'sortable': false,
        'renderer': (name, rec) => {
          return '<a href="sd">' + name + '</a>';
        }
      }, {
        'header': 'Price',
        'name': 'price',
        'width': '200px',
        'renderer': (value) => {
          return '$' + value;
        },
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
4. **save:** Event fires when a row is saved.
5. **delete:** Event fires when a row is deleted.
6. **add:** Event fires when a row is added.

## License
This project is licensed under the MIT license.
