
# ngtreegrid
Angular 7 Multi level Tree Grid. Simple, Light Weight and dependency free. Basically it groups data by a field or multiple fields. For hierarchical data (where there is a Parent-Child relationship), check out this 
<a href="https://github.com/debabratapatra/angular-tree-grid">Package</a>.

## Demo

Click <a href="https://ng-tree-grid.stackblitz.io/" target="_blank">here</a> for demo. This readme is the documentation. Visit my <a href="https://debabratapatra.github.io" target="_blank">Website</a> to know other packages.
<div>
<img src="https://debabratapatra.github.io/resources/images/cards/ngtreegrid.png" alt="Angular Tree Grid" />    
</div>

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
#### Grid Configurations
| Field  |Type   |Default |  Description |
|---|---|---|---|
| *group_by  | string/Array  |  n/a | t's a mandatory field. It is a column key. It can be an array of columns for multilevel group_by.  |
|  group_by_header |  string/Array | n/a  | Header for the GroupBy Column. It can be an array of Column Headers.  |
|  group_by_width |  string/Array | 'auto' |  Width of the GroupBy Column. It can be an array of GroupBy Column widths.|
|  action_column_width |  string | 50px  |  Width of the Action Column.|
|  data_loading_text |  string | 'Loading...'  |  Loading place holder. This will be displayed when data is empty. |
|  filter |  boolean | false  |  It enables filter toolbar. Filter is customizable at column level. |
|  multi_select |  boolean | false  |  It enables checkbox selection. |
|  row_class_function |  Function | n/a  |  Callback function for row class. A custom class can be returned which will be added to the row. |
|  row_edit_function |  Function | n/a  |  Callback function for edit feature. Based on the return type(Boolean) of this function, edit can be enabled/disabled for a specific row. See <a href="https://ng-tree-grid.stackblitz.io/cond_row_edit">example</a> for more information. |
|  row_delete_function |  Function | n/a  |  Callback function for delete feature. Based on the return type(Boolean) of this function, delete can be enabled/disabled for a specific row. See <a href="https://ng-tree-grid.stackblitz.io/cond_row_edit">example</a> for more information. |
| actions  | Object  |  n/a | Settings for Action column. See Below  |
| css  | Object  |  n/a | Css class for icons. See Below  |
| columns  | Object  |  n/a | It is an Array. If not provided all keys of the data Array will be used as Column Headers. Please find the description below  |
##### actions
| Field  |Type   |Default |  Description |
|---|---|---|---|
| add  | boolean  |  false | It enables add feature.  |
| edit  | boolean  |  false | It enables edit feature.  |
| delete  | boolean  |  false | It enables delete feature.  |
| resolve_add  | boolean  |  false | Manually resolve add(after making call to server). It defaults to false. See <a href="https://ng-tree-grid.stackblitz.io/resolve_row_add">example</a> for more information.  |
| resolve_edit  | boolean  |  false | Manually resolve edit.  |
| resolve_delete  | boolean  |  false | Manually resolve delete feature.  |
##### css
| Field  |Type   |Default |  Description |
|---|---|---|---|
| expand_class  | string  |  plus | Icon class for Expand icon. Font Awesome class can be given.  |
| collapse_class  | string  |  minus | Icon class for Collapse icon. Font Awesome class can be given.  |
| add_class  | string  |  plus | Icon class for Add icon. Font Awesome class can be given.  |
| edit_class  | string  |  edit | Icon class for Edit icon. Font Awesome class can be given.  |
| delete_class  | string  |  delete | Icon class for Delete icon. Font Awesome class can be given.  |
| save_class  | string  |  save | Icon class for Save icon. Font Awesome class can be given.  |
| cancel_class  | string  |  cancel | Icon class for Cancel icon. Font Awesome class can be given.  |
| row_selection_class  | string  |  n/a | CSS Class for selected row.  |
| header_class  | string  |  n/a | CSS Class for header.  |
| parent_class  | string  |  n/a | Class for parent(group by) row.  |
##### columns
| Field  |Type   |Default |  Description |
|---|---|---|---|
| name  | string  |  n/a | key of the column.  |
| header  | string  |  n/a | Header of the column that will be displayed in the table.  |
| width  | string  |  n/a | Width of the column with unit(px/rem).  |
| hidden  | boolean  |  false | Show/Hide column.  |
| filter  | boolean  |  true | Enable/Disable filter.  |
| editable  | boolean  |  false | To make a specific column editable. By default columns are not editable. edit option needs to be true at **grid** level.  |
| sortable  | boolean  |  false | To make a specific column sortable.  |
| renderer  | Function  |  n/a | It is a method to render customized value for the column. See this <a href="https://ng-tree-grid.stackblitz.io/basic_tree_grid">Example</a>.  |
| group_aggregator  | Function  |  n/a | It is a method which can be used to show data at the parent level for the corresponding column. (See  <a href="https://ng-tree-grid.stackblitz.io/">Example</a>. for better understanding). This field for the parent will be left blank if not provided.  |
| type  | string  |  '' | Set to 'custom' to have custom component for the column. Otherwise leave blank.  |
| component  | Object  |  n/a | Custom View Component. Mandatory if type is custom.See this <a href="https://ng-tree-grid.stackblitz.io/custom_view_component">Example</a>.|
| editor  | Object  |  n/a | Custom Editor Component. If given custom editor component will be used instead of default editor. See this <a href="https://ng-tree-grid.stackblitz.io/custom_edit_component">Example</a>.  |
| onComponentInit  | Function  |  n/a | Callback function for the column on component init.  |

#### Basic Example
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

### HTML
Add below node to your html.
```
  <db-ngtreegrid [data]="products" [configs]="configs"></db-ngtreegrid>
```
### Events

| Event  |Arguments   | Description |
|---|---|---|
| expand  | **row_data:** Expanded Row | Event fires when parent is expanded.  |
| collapse  | **row_data:** Collapsed Row | Event fires when parent is collapsed.  |
| cellclick  | **event** Consist of: <ul><li> **row:** Selected Row </li><li> **column:** Selected Column</li></ul> | Event fires when a child cell is clicked.  |
| rowselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is selected.  |
| rowdeselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deselected.  |
| rowselectall  | **event:** Event Object | Event fires when select-all checkbox is checked.  |
| rowdeselectall  | **event:** Event Object | Event fires when select-all checkbox is unchecked.  |
| rowsave  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is saved.  |
| rowdelete  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deleted.  |
| rowadd  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is added.  |


## Can I hire you guys?
Yes. Please contact us at <a href="mailto:debabratapatra12@gmail.com">debabratapatra12@gmail.com</a>. We will be happy to work with you!

## License
This project is licensed under the MIT license.
