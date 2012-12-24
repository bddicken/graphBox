
/*
 * File parsing object
 */
function FileParser(parseString) 
{
    this.file = parseString + '\n';
    this.error = false;

    this.parseAll = function(){
        var com = null;
        while(com = this.getLine()){
            this.determineCommand(com);
        }
    }

    this.determineCommand = function(command) {
        var cType = command.charAt(0);
        
        // command is adding an edge
        if(cType == 'E'){
            var edgeName = command.substring(1, command.length+1).replace(/\s/g, '');
            var vertices = edgeName.split('<->');
            var didWork = addEdgeCustom(vertices[0], vertices[1]);
            if(!didWork)
                this.error = true;
        } 
        
        // command is adding a vertex
        else if(cType == 'V') {
            var edgeName = command.substring(1, command.length+1).replace(/\s/g, '');
            var didWork = addNodeCustom(edgeName, {degree:0, r:0});
            if(!didWork)
                this.error = true;
        }

        else if(cType == '#') {
            // comment
        }
    }
    
    this.getLine = function() {
        if(this.file.length < 1)
            return null;
        var index = this.file.indexOf('\n');
        var ret = this.file.substring(0, index);
        this.file = this.file.substring(index+1, this.file.length+1);
        return ret;
    }
}

