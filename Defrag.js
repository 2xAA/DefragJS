var Defrag = function(container, fragments, auto, callback) {
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.defrag-blocks{font-size:0}.defrag-block{background:#00fdff;border:1px solid #000;display:inline-block;height:7px;margin:0 1px 1px 0;width:5px}.defrag-block.moved{background:#fff;border-color:#fff}.defrag-block.inprogress{background:#ff2101}.defrag-block.done{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVQIHWNg0P//n+H///+MIILBgIEBAFNLCFkekQ5uAAAAAElFTkSuQmCC)}';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	var blocks = container,
		nextBlock = 0,
		currentBlock = 0,
		finished = false,
		started = false,
        smallRunToGo = 0,
        smallRunDone = 0;
    
    blocks.classList.add('defrag-blocks');
	
	for (var i = 0; i < fragments; i++) {
	    var block = document.createElement('div');
	    block.classList.add('defrag-block');
	    blocks.appendChild(block);
	}
	
	function defragGo() {
	    var blocksToDefrag = getRandomInt(2, 40);
	    if((nextBlock + blocksToDefrag) > fragments) {
	        blocksToDefrag = fragments - nextBlock;
	        finished = true;
	    }
        if(getRandomInt(0,100) > 80) {
            smallRunToGo = blocksToDefrag;
            smallRunDone = 0;
            smallRun();
        } else {
    	    for (var i = nextBlock; i < nextBlock + blocksToDefrag; i++) {
	            var block = document.getElementsByClassName('defrag-block')[i];
	            block.classList.add('moved');
    	    }
	        setTimeout(progress, getRandomInt(10, 1500));
        }
        
        function smallRun() {            
            if(smallRunToGo > smallRunDone) {
                var block = document.getElementsByClassName('defrag-block')[nextBlock];
                block.classList.add('moved');
                
                setTimeout(function() {
                    block.classList.remove('moved');
                    block.classList.add('inprogress');
                    
                    setTimeout(function() {
                        
                        block.classList.remove('inprogress');
                        block.classList.add('done');
                        
                        nextBlock++;
                        smallRunDone++;
                        smallRun();
                        
                    }, getRandomInt(30, 100));                  
                }, getRandomInt(20, 90));
            } else {
                defragGo();
            }
        }
	
	    function progress() {
	        for (var i = nextBlock; i < nextBlock + blocksToDefrag; i++) {
	            var block = document.getElementsByClassName('defrag-block')[i];
	            block.classList.remove('moved');
	            block.classList.add('inprogress');
	        }
	        setTimeout(done, getRandomInt(500, 3000));
	    }
	
	    function done() {
	        for (var i = nextBlock; i < nextBlock + blocksToDefrag; i++) {
	            var block = document.getElementsByClassName('defrag-block')[i];
	            block.classList.remove('inprogress');
	            block.classList.add('done');
	        }
	
	        if(!finished) {
	            nextBlock += blocksToDefrag;
	            defragGo();
	        } else {
	            if(typeof callback == 'function') callback();
	        }
	    }
	}
	
	if(auto) {
		started = true;
		setTimeout(defragGo, getRandomInt(0, 1000));
	}
	
	this.start = function() {
		defragGo();
	}
}
