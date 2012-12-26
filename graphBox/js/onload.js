var fp = null;

window.onload = function()
{
    $( "#edgeSizeSlider1" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 15,
        min: 1,
        slide: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        },
        start: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
        },
        stop: 
        function() {
            var size = $( "#edgeSizeSlider1" ).slider( "option", "value" );
            gEdgeWidth = size;
            sys.renderer.redraw();
        } 
    });
    $( "#nodeSizeSlider1" ).slider({ 
        animate: "fast", 
        step: 1,
        max: 40,
        min: 5,
        slide: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        }, 
        start: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
        },
        stop: 
        function() {
            var size = $( "#nodeSizeSlider1" ).slider( "option", "value" );
            gNodeSize = size;
            sys.renderer.redraw();
        } 
    });

    updateGraph();
    updateColors();
}

var clearEdges = function(edge, pt1, pt2) {
    sys.pruneEdge(edge);
}

var clearNodes = function(node, pt) {
    sys.pruneNode(node);
}

function updateGraph() {
    sys.eachEdge(clearEdges);
    sys.eachNode(clearNodes);

    var gd = document.getElementById("graphDef").value;
    fp = new FileParser(gd);
    fp.parseAll();
}

function updateColors() {
    gNodeColor = document.getElementById('nodeColor').style.backgroundColor;
    gEdgeColor = document.getElementById('edgeColor').style.backgroundColor;
    sys.renderer.redraw();
}

