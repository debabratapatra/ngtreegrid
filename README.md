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
Below are configs that can be set

1. **group_by(Mandatory):** It's a mandatory field. It is a column key.
2. **group_by_header(Optional):** Header for the GroupBy Column.
3. **group_by_width(Optional):** Width of the GroupBy Column.
4. **add_class(Optional):** Icon class for Plus icon. Font Awesome class can be given.
5. **minus_class(Optional):** Icon class for Minus icon. Font Awesome class can be given.
6. **columns(Optional):** It is an object. If not provided all keys of the data Array will be used as Column Headers. Please find the description below.
    * **name:** key of the column
    * **header:** Header of the column that will be displayed in the table
    * **width:** Width of the column
    * **sortable:** False to disable sorting of this column. By default columns are sortable.
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

## License
This project is licensed under the MIT license.
