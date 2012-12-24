//
//    main.js
//
//    A project template for using arbor.js
//

// global
var sys;
var gNodeSize = 2;
var gEdgeWidth = 1;
var gNodeType = "line";

//(function($){
    var Renderer = function(canvas){
        this.edgeType = "drawLineEdge()";
        //this.edgeWidth = 1;
        this.edgeColor = "#fafafa";

        //this.nodeType = "line";
        //this.nodeSize = 8;
        this.nodeDynamicSize = false;
        this.nodeColor = "#5d5d5d"

        var canvas = $(canvas).get(0);
        var ctx = canvas.getContext("2d");
        var particleSystem;
        var colorInc = true;

        var that = {
            init:function(system)
            {
                particleSystem = system;
                var w = $(window).width()-250,
                    h = $(window).height();
                canvas.width = w; canvas.height = h;
                particleSystem.screenSize(w,h);
                that.redraw();
                particleSystem.screenPadding(40);
                
                // set up some event handlers to allow for node-dragging
                that.initMouseHandling()
            },
            
            redraw:function(){
                ctx.fillStyle = "white";
                ctx.fillRect(0,0, canvas.width, canvas.height);
                
                particleSystem.eachEdge(function(edge, pt1, pt2)
                {
                    ctx.lineWidth = gEdgeWidth;
                    ctx.strokeStyle = "rgba(100,0,0, .333)";
                    ctx.beginPath();
                    if(gNodeType == "line") {
                        ctx.moveTo(pt1.x, pt1.y)
                        ctx.lineTo(pt2.x, pt2.y)
                        ctx.stroke()
                    } 
                    else if(gNodeType = "circle") {
                        var distance = Math.sqrt( Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2) );
                        var halfx = Math.min(pt1.x, pt2.x) + Math.abs(pt1.x - pt2.x, 2)/2 ;
                        var halfy = Math.min(pt1.y, pt2.y) + Math.abs(pt1.y - pt2.y, 2)/2 ;
                        ctx.arc(halfx, halfy, distance/2, 0, Math.PI*2, true); // draw arc
                        //ctx.arc(halfx, halfy, 1, 0, 2 * Math.PI, true); //draw point
                        //ctx.closePath();
                        ctx.stroke();
                    }
                })

                particleSystem.eachNode(function(node, pt)
                {
                    var w = ((node.data.degree)*3)+gNodeSize;
                    
                    /*
                    if(colorInc === true) {
                        node.data.r = (node.data.r+1);
                        if(node.data.r > 200 )
                            colorInc = false;
                    } else {
                        node.data.r = (node.data.r-1);
                        if(node.data.r < 5 )
                            colorInc = true;
                    }
                    */

                    //console.log(colorInc);

                    ctx.fillStyle="rgba("+node.data.r+", 50, 50, 0.7)";
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, w, 0, Math.PI*2, true); 
                    ctx.closePath();
                    ctx.fill();

                    ctx.lineWidth=1;
                    ctx.fillStyle="#ffffff";
                    ctx.lineStyle="#ffff00";
                    ctx.font="12px sans-serif";
                    ctx.fillText(node.name, pt.x-w+4, pt.y+w/2);
                    
                })
            },
            
            initMouseHandling:function(){
                var dragged = null;

                // set up a handler object that will initially listen for mousedowns then
                // for moves and mouseups while dragging
                var handler = {
                    clicked:function(e){
                        var pos = $(canvas).offset();
                        _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
                        dragged = particleSystem.nearest(_mouseP);

                        if (dragged && dragged.node !== null){
                            // while we're dragging, don't let physics move the node
                            dragged.node.fixed = true
                        }

                        $(canvas).bind('mousemove', handler.dragged);
                        $(window).bind('mouseup', handler.dropped);

                        return false;
                    },
                    dragged:function(e){
                        var pos = $(canvas).offset();
                        var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

                        if (dragged && dragged.node !== null){
                            var p = particleSystem.fromScreen(s)
                            dragged.node.p = p
                        }

                        return false
                    },

                    dropped:function(e){
                        if (dragged===null || dragged.node===undefined) return
                        if (dragged.node !== null) dragged.node.fixed = false
                        dragged.node.tempMass = 1000
                        dragged = null
                        $(canvas).unbind('mousemove', handler.dragged)
                        $(window).unbind('mouseup', handler.dropped)
                        _mouseP = null
                        return false
                    }
                }
                
                // start listening
                $(canvas).mousedown(handler.clicked);
            },
        }
        return that
    }        

    $(document).ready(function()
    {
        this.addDeg = function(nodeStr) {
            var tempN = sys.getNode(nodeStr);
            tempN.data.degree++;
        }

        sys = arbor.ParticleSystem(1000, 600, 0.8, false, 30, 0.02, 0.6);
        sys.renderer = Renderer("#viewport");
        var numNodes = 50;
        var nIter = 1;

        /*
        addNodeCustom("v0",{degree:0, r:0});
        while(nIter < numNodes) {
            var nodeName = 'v'+nIter;
            addNodeCustom(nodeName, { degree:0, r:0});
            addEdgeCustom("v"+(nIter-1),"v"+nIter,"edge");
            ++nIter;
        }
        
        var edgeIter = 0;
        while(edgeIter++ < numNodes){
            var rand1 = Math.floor(Math.random()*numNodes);
            var rand2 = Math.floor(Math.random()*numNodes);
            addEdgeCustom("v"+rand1,"v"+rand2,"edge");
        }
        */

    })
//})(this.jQuery)

/**
 * a custom function to add a node
 */
function addNodeCustom(name, data) {
    sys.addNode(name, data);
    var tempN = sys.getNode(name);
    tempN.data.degree++;
    return tempN;
}

/**
 * a custom function to add an edge
 */
function addEdgeCustom(name1, name2) {
    sys.addEdge(name1, name2);
    var tempN1 = sys.getNode(name1);
    tempN1.data.degree++;
    var tempN2 = sys.getNode(name2);
    tempN2.data.degree++;
}

function updateEdgeType() {
    var temp = document.getElementById('edgeType').selectedIndex;
    gNodeType = document.getElementById('edgeType').options[temp].innerHTML; 
    console.log(temp + "  :  " + gNodeType)
}

