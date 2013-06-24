jQuery scrollPopin
===========

A simple way to display popins on your project.

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
don't forget to include the latest version of jQuery and the plugin :

```html
<!-- Import jQuery 1.9.1-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.9.1.min.js"><\/script>')</script>

<!-- Import ScrollPopin -->
<script src="js/jquery-scrollpopin.js"></script>
```

then initialize the plugin like this :

```javascript
$('#trigger').scrollpopin('#popin');
```

That's it ! 
Then all you have to do is add some CSS.

A new fullsize div with the id "popin-mask" is created at the end of the body tag.
The popin element is placed inside that div.

Here are some base styles you can use :

```css
html, body{
	height: 100%;
	position: relative;
	width: 100%;
}
#popin-mask{
	background-color: rgba(0,0,0,.5);
}
#popin{
	background-color: #fff;
	color: #000;
	padding: 20px;
	width: 500px;
}
```

Other usages
-------------

You can pass a javascript element instead of a selector :

```javascript
var popin = [document.getElementById('popin')];
$('#trigger').scrollpopin(popin);
```

You can even use a string containing your html as your popin :

```javascript
var popin = '<div id="popin"><p>Just another popin</p></div>';
$('#trigger').scrollpopin(popin);
```


Parameters
-------------

A few options are available if you need them :

```javascript
$('#trigger').scrollpopin('#popin', {
	position: 'middle',
	close: '.close',
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
    <td>position</td><td>string</td><td>'middle'</td><td>Vertical position. Possible values : 'middle', 'top'</td>
  </tr>
  <tr>
    <td>close</td><td>selector</td><td>'.close'</td><td>Selector for the element(s) closing the popin on click (elements must be inside the popin element).</td>
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