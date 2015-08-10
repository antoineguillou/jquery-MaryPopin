jQuery Mary Popin
===========

![alt tag](https://raw.github.com/antoineguillou/jquery-MaryPopin/master/marypopin.gif)

A simple way to display popins on your project.

[Demo (sorry about the aweful css)](https://rawgithub.com/antoineguillou/jquery-MaryPopin/master/demo.html).

Default usage
-------------

All you need is a trigger :

```html
<a href="#" id="trigger">click to open popin</a>
```

and an element you want to use as your popin :

```html
<div id="popin">
	<p>Hello World !</p>
</div>
```

don't forget to include a recent version of jQuery and the plugin :

```html
<!-- Import jQuery 1.11.3-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.11.3.min.js"><\/script>')</script>

<!-- Import Mary Popin -->
<script src="js/jquery-mary-popin.js"></script>
```

then initialize the plugin like this :

```javascript
$('#popin').marypopin();
```

That's it!

All you have to do is add some CSS.

A new fullsize div with the id "marypopin-mask" is created at the end of the body tag.
The popin element is placed inside that div.

Medthods
-------------

You can add a selector when you initialize the popin :

```javascript
$('#popin').marypopin('#trigger');
```

or a jquery object

```javascript
var button = $('#trigger');
$('#popin').marypopin(button);
```

Clicking on the element with the 'trigger' ID would open the popin.

There are a few other things you can do, like open a popin from anywhere in your page :

```javascript
$('#trigger').click(function(e){
	e.preventDefault();
	$('#popin').marypopin('open');
});
```

... close it :

```javascript
$('#some-other-link').click(function(e){
	e.preventDefault();
	$('#popin').marypopin('close');
});
```

... or recalculate it's vartical position (this can be useful if you need to change the popin's content while it's open) :

```javascript
$('#popin').marypopin('positionPopin');
```



Other usages
-------------

You can pass a javascript object instead of a selector :

```javascript
var popin = document.getElementById('popin');
$(popin).marypopin();
```

You can even use a string containing your html as your popin :

```javascript
var popin = '<div id="popin"><p>Just another popin</p></div>';
$(popin).marypopin();
```

Parameters
-------------

A few options are available if you need them :

```javascript
$('#popin').marypopin({
	triggers: '#trigger',
	closeSelector: '.close',
	position: 'middle',
	speed: 300,
	maskClick: true,
	beforeOpen: function(){},
	afterOpen: function(){},
	beforeClose: function(){},
	afterClose: function(){}
});
```

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Default</th><th>Description</th>
  </tr>
  <tr>
    <td>triggers</td><td>selector or jquery object</td><td>undefined</td><td>The elements that will trigger the popin.</td>
  </tr>
  <tr>
    <td>position</td><td>string</td><td>'middle'</td><td>Vertical position. Possible values : 'middle', 'top'</td>
  </tr>
  <tr>
    <td>closeSelector</td><td>selector</td><td>'.close'</td><td>Selector for the element(s) closing the popin on click (elements must be inside the popin element).</td>
  </tr>
  <tr>
    <td>speed</td><td>number</td><td>300</td><td>Fade in / out speed in milliseconds.</td>
  </tr>
  <tr>
    <td>maskClick</td><td>bool</td><td>true</td><td>Set to true to allow popin closing when clicking outside of it</td>
  </tr>
  <tr>
    <td>beforeOpen</td><td>function</td><td>undefined</td><td>A function to execute before opening the popin.</td>
  </tr>
  <tr>
    <td>afterOpen</td><td>function</td><td>undefined</td><td>A function to execute after opening the popin.</td>
  </tr>
  <tr>
    <td>beforeClose</td><td>function</td><td>undefined</td><td>A function to execute before closing the popin.</td>
  </tr>
  <tr>
    <td>afterClose</td><td>function</td><td>undefined</td><td>A function to execute after closing the popin.</td>
  </tr>
</table>

Warning
-------------

If you have fixed elements on you page that move a few pixels when opening the popin, you will need to add the "marypopin-fixed" class to these elements to prevent this.

More stuff
-------------

You might need to know what element triggered the popin in one of the functions, here's an example where we want to add a class to the trigger when the popin is opened :

```javascript
$('#popin').marypopin({
	beforeOpen: function(popin, trigger){
		$(trigger).addClass('clicked');
	}
});
```
It can be useful if you need to load content inside the popin...