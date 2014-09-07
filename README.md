DefragJS
========

A vapourware defragger for JavaScript.

Usage
-----

To use DefragJS you need to supply some arguments:
* An element reference to use
* An integer of the number of fragments to defragment
* A boolean to allow or prevent autostarting
* A callback function for the finalé

```JavaScript
var defrag = new Defrag(document.getElementById('blocks'), 1000, true, function() { alert('All done!') });
```

If you choose not to autostart you can start DefragJS like so:
```JavaScript
var defrag.start();
```

It's not a very accurate representation of the Windows Defragmenter, but hopefully I'll update this and make it more realistic someday.

Have fun!
