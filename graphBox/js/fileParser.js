/*
 * File parsing object
 */
function FileParser(parseString) 
{
    this.file = parseString + '\n';
    this.error = false;
    this.errorMessage = "Errors found on line(s)";
    this.okMessage = "No errors found";
    this.line = 1;

    this.parseAll = function() {

        var lines = parseString.split("\n").length;  

        var com = this.getLine();
        while(com !== 'F'){
            //console.log(com);
            this.determineCommand(com);
            com = this.getLine();
            this.line++;
        }

        var pAlert = document.getElementById('parseStatus');
        
        
        if(this.error || this.line < lines) {
            pAlert.style.color = "rgb(150, 20, 20)";
            pAlert.innerHTML = this.errorMessage;
        } else  {
            pAlert.style.color = "rgb(120, 220, 120)";
            pAlert.innerHTML = this.okMessage;
        }
    }

    this.determineCommand = function(command) {
        var cType = command.charAt(0);
        
        // command is adding an edge
        if(cType == 'E'){
            var edgeName = command.substring(1, command.length+1).replace(/\s/g, '');
            var vertices = edgeName.split('<->');

            // missing node name check
            if(!(vertices.length == 2)) {
                this.error = true;
                console.log('missing node name');
                this.errorMessage = this.errorMessage.concat(', ' + this.line);
                return;
            }

            var didWork = addEdgeCustom(vertices[0], vertices[1]);
        } 
        
        // command is adding a vertex
        else if(cType == 'V') {
            try {
                var vertName = command.substring(1, command.length+1).replace(/\s/g, '');
                var vertContent = vertName.split('~');
                var vertData = null;
                var finalVal = null;

                eval('vertData = ' + vertContent[1] + ';');

                if(vertData == null) {
                    this.error = true;
                    console.log('no vertex name');
                    this.errorMessage = this.errorMessage.concat(', ' + this.line);
                    return;
                }

                if(vertContent.length == 1) {
                    var didWork = addNodeCustom(vertContent[0], {degree:0});
                }
                else if(vertContent.length == 2) {
                    // check integrity of data
                    if(vertContent[1] != undefined)
                        eval('vertData = ' + vertContent[1] + ';');
                    if(vertData == null){
                        finalVal = {degree:0};
                    } else {
                        finalVal = mergeObjects({degree:0}, vertData);
                    }
                    var didWork = addNodeCustom(vertContent[0], finalVal);
                }
                else {
                    this.error = true;
                    console.log('no vertex name');
                    this.errorMessage = this.errorMessage.concat(', ' + this.line);
                    return;
                }
            } catch(err) {
                this.error = true;
                console.log('erroe: ' + err.message);
                this.errorMessage = this.errorMessage.concat(', ' + this.line);
                return;
            }
        }

        else if(cType == '#') {
            // comment
        }

        else if(cType == '\n' || 
                cType == ' '  ||
                cType == ''  ||
                cType == '\t' || 
                cType == '\s') {
            // white space
        }

        else {
            this.error = true;
            console.log('other error >>>' + cType + '<<< :' + command);
            this.errorMessage.concat(', ' + this.line);
            return;
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

