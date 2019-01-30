[![CircleCI](https://circleci.com/gh/arcmedia/ngx-treeview.svg?style=svg)](https://circleci.com/gh/arcmedia/ngx-treeview)
# arcm-ngx-treeview

An Angular treeview component with checkbox

## Dependencies

* [Angular](https://angular.io)
* [Lodash](https://lodash.com)
* [Bootstrap 4](https://getbootstrap.com)
* [Font Awesome 4](http://fontawesome.io)

This component is currently supporting Bootstrap 4. If you are using Bootstrap 4 alpha 6, please downgrade to the older version 1.0.10.

You can customize CSS yourself to break down dependencies to Bootstrap & Font Awesome.

## Features

* Unlimited tree level
* State: disabled / collapse, expand
* Filtering
* Internationalization (i18n) support
* Template
* Checkbox with tri-state

## Installation

After install the above dependencies, install `ngx-treeview` via:
```shell
npm install ngx-treeview --save
```
Once installed you need to import our main module in your application module:
```js
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [TreeviewModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

#### Treeview:
```html
<ngx-treeview
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)"
    (filterChange)="onFilterChange($event)">
</ngx-treeview>
```

#### Treeview with dropdown:
```html
<ngx-dropdown-treeview
    [buttonClass]="buttonClass"
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)"
    (filterChange)="onFilterChange($event)">
</ngx-dropdown-treeview>
```

 `config` is optional. This is the default configuration:
 ```js
 {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500
}
```
You can change default configuration easily because TreeviewConfig is injectable.

#### Pipe `ngxTreeview`:
To map your JSON objects to TreeItem objects.
```html
<ngx-dropdown-treeview
    [config]="config"
    [items]="items | ngxTreeview:'textField'"
    (selectedChange)="onSelectedChange($event)">
</ngx-dropdown-treeview>
```

#### Create a TreeviewItem:
 ```js
 const itCategory = new TreeviewItem({
    text: 'IT', value: 9, children: [
        {
            text: 'Programming', value: 91, children: [{
                text: 'Frontend', value: 911, children: [
                    { text: 'Angular 1', value: 9111 },
                    { text: 'Angular 2', value: 9112 },
                    { text: 'ReactJS', value: 9113 }
                ]
            }, {
                text: 'Backend', value: 912, children: [
                    { text: 'C#', value: 9121 },
                    { text: 'Java', value: 9122 },
                    { text: 'Python', value: 9123, checked: false }
                ]
            }]
        },
        {
            text: 'Networking', value: 92, children: [
                { text: 'Internet', value: 921 },
                { text: 'Security', value: 922 }
            ]
        }
    ]
});
```
#### TreeviewEventParser:
Extract data from list of checked TreeviewItem and send it in parameter of event selectedChange. Some built-in TreeviewEventParser:
* DefaultTreeviewEventParser: return values of checked items.
* OrderDownlineTreeviewEventParser: return list of checked items in checked order with their ancestors. Note that: value of a leaf must be different from value of other leaves.

#### Templating:
See example 4 & 5.

## Contributing

I am very appreciate for your ideas, proposals and found bugs which you can leave in github issues. Thanks in advance!
