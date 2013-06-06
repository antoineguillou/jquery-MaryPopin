jQuery scrollPopin
===========

A simple way to display popins

```javascript
$('#trigger-1').scrollpopin('#popin-1');

var pop2 = [document.getElementById('popin-2')];
$('#trigger-2').scrollpopin(pop2, {
	position: 'top',
	close: '.close-popin',
	maskClick: false
});

$('#trigger-3').click(function(e){
	e.preventDefault();
	e.stopPropagation();
	$('#trigger-1').scrollpopin('open');
});

$('#trigger-4').scrollpopin('#popin-1');

var popin = '<div id="popin-3"></div>';
$('#trigger-5').scrollpopin(popin);
```