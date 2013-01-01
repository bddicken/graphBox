//
//    main.js
//
//    A project template for using arbor.js
//

// global
var sys;
var gNodeSize = 5;
var gEdgeWidth = 1;
var gEdgeColor = "#ffffff";
var gNodeColor = "#ffffff";
var gNodeType = "circle";
var gEdgeType = "line";
var gBGColor = "#FFFFFF";
var gNodeTrans = 1.0;
var gEdgeTrans = 1.0;

//(function($){
    var Renderer = function(canvas){
        this.edgeType = "drawLineEdge()";
        this.edgeColor = "#fafafa";

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
                var w = $(window).width()-325,
                    h = $(window).height();
                canvas.width = w; canvas.height = h;
                particleSystem.screenSize(w,h);
                ctx.textAlign = 'center';
                that.redraw();
                particleSystem.screenPadding(40);

                // set up some event handlers to allow for node-dragging
                that.initMouseHandling()
            },
            
            redraw:function(){
                ctx.fillStyle = gBGColor;
                ctx.fillRect(0,0, canvas.width, canvas.height);
                
                particleSystem.eachEdge(function(edge, pt1, pt2)
                {
                    ctx.lineWidth = gEdgeWidth;
                    ctx.strokeStyle = gEdgeColor;
                    ctx.beginPath();
                    ctx.globalAlpha=gEdgeTrans;

                    if(gEdgeType == "line") {
                        ctx.moveTo(pt1.x, pt1.y)
                        ctx.lineTo(pt2.x, pt2.y)
                        ctx.stroke()
                    } 
                    else if(gEdgeType == "circle") {
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
                    var sum = 0;
                    var localType = null;

                    ctx.globalAlpha=gNodeTrans;
                   
                    // determine if the color is specified in this node
                    if(node.data.color != undefined) {
                        ctx.fillStyle=node.data.color;
                        ctx.lineStyle=node.data.color;
                        sum += parseInt(node.data.color.substring(1,3), 16);
                        sum += parseInt(node.data.color.substring(3,5), 16);
                        sum += parseInt(node.data.color.substring(5,7), 16);
                    } else {
                        ctx.fillStyle=gNodeColor;
                        ctx.lineStyle=gNodeColor;
                        sum += parseInt(gNodeColor.substring(1,3), 16);
                        sum += parseInt(gNodeColor.substring(3,5), 16);
                        sum += parseInt(gNodeColor.substring(5,7), 16);
                    }

                    // determine if the type is specified in this node
                    if(node.data.type != undefined) {
                        localType = node.data.type;
                    } else {
                        localType = gNodeType;
                    }

                    // node shape type
                    if(localType == 'circle') {
                        ctx.beginPath();
                        ctx.arc(pt.x, pt.y, w, 0, Math.PI*2, true); 
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if(localType == 'rectangle') {
                        ctx.fillRect(pt.x-(w),pt.y-(w),w+w,w+w);
                    }
                    else if(localType == 'none') {
                        // draw nothing
                    }
                    ctx.globalAlpha=1.0;

                    // determine font color
                    var fillColor = "#000000"
                    if(sum < 370)
                        fillColor = "#FFFFFF"

                    ctx.fillStyle=fillColor;
                    ctx.lineStyle=fillColor;
                    ctx.lineWidth=1;
                    ctx.font="12px sans-serif";
                    ctx.fillText(node.name, pt.x, pt.y+6);
                    
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

    $(document).ready(function() {
        sys = arbor.ParticleSystem(1000, 600, 0.8, false, 30, 0.02, 0.6);
        sys.renderer = Renderer("#viewport");
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
    var temp = document.getElementById('edgeTypeDrop').selectedIndex;
    gEdgeType = document.getElementById('edgeTypeDrop').options[temp].innerHTML; 
    console.log(temp + "  :  " + gEdgeType);
    sys.renderer.redraw();
}

function updateNodeType() {
    var temp = document.getElementById('nodeTypeDrop').selectedIndex;
    gNodeType = document.getElementById('nodeTypeDrop').options[temp].innerHTML; 
    console.log(temp + "  :  " + gNodeType);
    sys.renderer.redraw();
}

