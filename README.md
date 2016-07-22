# Yeoman Generator ng-spa

> An extreamly modular yeoman generator based on
> Angular, Scss and Gulp oriented workflow


## Features

- Fully modular angular app structure
- Feature rich gulp file
- Modular sass based styling strucure
- Sub-generators to generate code during development

## Getting started

Assuming you already have node, npm, bower, yeoman and gulp installed


install yeoman, gulp and bower globally
```
npm install -g gulp bower yeoman
```

install ng-spa generator globally
```bash
npm install -g generator-ng-spa
```

to create a new app
```bash
mkdir my-app && cd my-app;
yo ng-spa;
```


## Concepts

- **Everything is a module**

Your main app is a module, `src/js/modules/<your-app>/_module.js`. Here you can make configuration changes, include modue dependencies, and even define controllers and directives. But its not a good practice to define everything in a single module. To seperate concerns we'll be creating different modules to different tasks.

- **Pages module**

This is where the pages module comes on. You will have all your route pages in the `<your-app>.pages` moodule. An index page will be create by defaulr.

- **Sub generators**

There are several sub generators included to ease the workflow

`yo ng-spa:momdule` - creates a module and adds it to the dependency list of the main app module

`yo ng-spa:page` - create pages and indlude it in to main modules routes.

`yo ng-spa:directive` - creates a directive in a specified module and adds an associated template or partial file

`yo ng-spa:controller` - creates a controller in a specified module

`yo ng-spa:service` - creates a specified type of service in a specified module

[more on sub-generators](#sub-generators)

- **Templates vs partials**

The workflow support two types of template files

`*.tpl.html` : compiles with the javascript files and are added to the ngTemplatecache

`*.partial.html` : get copied to app/partials folder which is asynchronously loaded by the app

`.tpl.html` files are more suited to be used with directives and `.partial.html` are more suited for routed pages where 
the template will be asynchronously loaded when a user visits a page.

- **Modular sass structure**

Sass is modular too. we have four main sass folders. variables, atoms, pages, modules. which are included in styles.scss in that order. Each folder contains an _index.scss file which encapsulate its sibling files.

_variables_: All varuiable declarations

_atoms_: All atomic declarations like typography, button, input styles

_pages_: All styles relating to page layouts or specific to pages

_modules_: Modular sass components

on `_bootstrap_custom.scss` file you can include or remove any bootstrap modules that you want.

include your sass modules in the `/sass/modules` folder and import them in the `/modules/_index.scss` file.







## Folder structure

#### Angular
##### main app module

- router file
- config and run files for main app module
- bootstrap anfular app
- index.html file for the app

```
|+src
|  |-index.html
|  |+js
|  |  |+modules
|  |  |  |+app
|  |  |  |  |-config.js
|  |  |  |  |-routes.js
|  |  |  |  |-run.js
|  |  |  |  |-_module.js
```

##### pages module

- index page
- index page partial file
- update main app router with index page


```
|+src
|  |+js
|  |  |+modules
|  |  |  |+pages
|  |  |  |  |+index
|  |  |  |  |  |-index.ctrl.js
|  |  |  |  |  |-index.partial.html
|  |  |  |  |-_module.js
```



#### Sass
- mian styles.scss file
- bootstrap config file
- modlar sass file structure

```
|+src
|  |+sass
|  |  |+atoms
|  |  |  |-_index.scss
|  |  |+modules
|  |  |  |-_index.scss
|  |  |+pages
|  |  |  |-_index.scss
|  |  |+styles.scss
|  |  |+variables
|  |  |  |-_buttons.scss
|  |  |  |-_colours.scss
|  |  |  |-_index.scss
|  |  |  |-_spacing.scss
|  |  |  |-_typography.scss
|  |  |  |-_variables.scss
|  |  |-_bootstrap_custom.scss
```


#### Other configuration files


```

|-.bowerrc
|-.env
|-.gitignore
|-.jshintrc
|-.yo-rc.json
|-appconfig.json
|-bower.json
|-gulpfile.js
|-jsconfig.json
|-package.json

```


#### The app folder

The app will be built in to the 'app' folder when `gulp` is run, Gulp runs automatically the first time you run `yo ng-spa`


## Sub generators


run `yo ng-spa:<sub-generator> --help` to get help on sub-generator


#### module

```bash
yo ng-spa:module --name=mymodule
```

Generates a module with the given name and adds it to main app modules dependencies

```
|+src
|  |+js
|  |  |+modules
|  |  |  |+mymodule
|  |  |  |  |-_module.js
```

#### page



```bash
yo ng-spa:page --name=product.view
```

**optional**
`--url=<spa_url>`: defines the url to be added to the routes entry.

Generates a page in the `pages` module and adds the page and the url to main app's routes.js file.
while the name `product` will add the page in `src/modules/pages/products/` folder, `products.view` will add the
controller and the partial file in `src/modules/pages/products/view` folder. This makes it easier to
organize large SPAs.


#### directive


```bash
yo ng-spa:directive --name=fancy
```

**optional**

`--module=<module name>`: adds the directive to specified module, or user will be prompted with a 
module list to select one.

`--path=<module name>`: path of the directive relative to the module

`--template`: a flag to include a .tpl.html file with the directive
`--html`: a flag to include a .partial.html file with the directive


#### controller


```bash
yo ng-spa:controller --name=product
```

**optional opions**

`--module=<module name>`: adds the controller to specified module, or user will be prompted with a 
module list to select one.

`--path=<module name>`: path of the controller relative to the module




#### controller


```bash
yo ng-spa:service --name=api
```

**optional**

`--type=[factory, service, provider]`: the type of service template to use. default: factory

`--module=<module name>`: adds the service to specified module, or user will be prompted with a 
module list to select one.

`--path=<module name>`: path of the service relative to the module




## Troubleshooting

update yeoman
```bash
npm -g update yo
```


## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

or

use <https://github.com/pulasthibandara/generator-ng-spa/issues> report any
issues or suggessions