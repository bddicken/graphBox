/*
 * File parsing object
 */
function FileParser(parseString) 
{
    this.file = parseString + '\n';
    this.error = false;

    this.parseAll = function() {
        var com = this.getLine();
        while(com !== 'F'){
            //console.log(com);
            this.determineCommand(com);
            com = this.getLine();
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
            var vertName = command.substring(1, command.length+1).replace(/\s/g, '');
            var vertContent = vertName.split('~');
            var vertData = null;
            var finalVal = null;

            // check integrity of data
            if(vertContent[1] != undefined)
                eval('vertData = ' + vertContent[1] + ';');
            if(vertData == null){
                this.error = true;
                finalVal = {degree:0, type:'circle'};
            } else {
                finalVal = mergeObjects({degree:0, type:'circle'}, vertData);
            }

            var didWork = addNodeCustom(vertContent[0], finalVal);
            if(!didWork)
                this.error = true;
        }

        else if(cType == '#') {
            // comment
        }
    }
    
    this.getLine = function() {
        if(this.file.length < 1)
            return 'F';
        var index = this.file.indexOf('\n');
        var ret = this.file.substring(0, index);
        this.file = this.file.substring(index+1, this.file.length+1);
        return ret;
    }
}

