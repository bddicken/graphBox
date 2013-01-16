<!DOCTYPE html>

<html>

<head>
    <title>graphBox</title>

    <!-- CSS -->
    <link rel="styleSheet" width="800" height="500" href="style.css" type="text/css">
    <link rel="styleSheet" width="800" height="500" href="lib/jqueryui/css/smoothness/jquery-ui-1.9.2.custom.min.css" type="text/css">

    <!-- JS LIB -->
    <script type="text/javascript" src="lib/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="lib/jqueryui/js/jquery-ui-1.9.2.custom.min.js"></script>
    <script type="text/javascript" src="lib/jscolor/jscolor.js"></script>
    <script type="text/javascript" src="lib/arbor-v0.92/lib/arbor.js"></script>
    <script type="text/javascript" src="lib/arbor-v0.92/lib/arbor-tween.js"></script>
    <script type="text/javascript" src="lib/arbor-v0.92/src/graphics/graphics.js"></script>
    
    <!-- JS -->
    <script src="js/globals.js"></script>
    <script src="js/main.js"></script>
    <script src="js/onload.js"></script>
    <script src="js/fileParser.js"></script>
</head>

<body>

    <div id="canvasBG">
        <canvas id="viewport"></canvas> 
    </div>

    <div class="top font1" id="sideBar">
        <div class="top" id="logo">Graph<span id="logoBox">Box</span></div>

        <!-- SETTINGS LABEL -->
        <div id="title1" class="top">Visual Settings</div>

        <!-- SLIDER FOR ALTERING NODE SIZE -->
        <span class="top" id="nodeSizeLabel">Node Size</span>
        <span class="top" id="nodeSizeSliderOuter">
            <div id="nodeSizeSlider1"></div>
        </span>
       
        <!-- SLIDER FOR ALTERING EDGE SIZE -->
        <span class="top" id="edgeSizeLabel">Edge Size</span>
        <span class="top" id="edgeSizeSliderOuter">
            <div id="edgeSizeSlider1"></div>
        </span>

        <!-- SELECT BOX FOR EDGE TYPE -->
        <span class="top" id="edgeTypeLabel">Edge Type</span>
        <select id="edgeTypeDrop" class="top" onchange="updateEdgeType();">
            <option class="top" value="line">line</option>
            <option class="top" value="circle">circle</option>
        </select>

        <!-- SELECT BOX FOR NODE TYPE -->
        <span class="top" id="nodeTypeLabel">Node Type</span>
        <select id="nodeTypeDrop" class="top" onchange="updateNodeType();">
            <option class="top" value="circle">circle</option>
            <option class="top" value="rect">rectangle</option>
        </select>

        <!-- COLOR SELECTOR FOR EDGES -->
        <span class="top" id="edgeColorLabel">Edge Color</span> 
        <input class="color top" id="edgeColor" value="#632626" onchange="sys.updateColors();">
        
        <!-- COLOR SELECTOR FOR NODES -->
        <span class="top" id="nodeColorLabel">Node Color</span> 
        <input class="color top" id="nodeColor" value="#9BAEC2" onchange="sys.updateColors();">
        
        <!-- COLOR SELECTOR FOR THE CANVAS BACKGROUND -->
        <span class="top" id="bgColorLabel">Bg Color</span> 
        <input class="color top" id="bgColor" value="#FFFFFF" onchange="sys.updateColors();">

        <!-- SLIDER FOR ALTERING NODE TRANSPARENCY -->
        <span class="top" id="nodeTransLabel">Node Transparency</span>
        <span class="top" id="nodeTransSliderOuter">
            <div id="nodeTransSlider1"></div>
        </span>
       
        <!-- SLIDER FOR ALTERING EDGE TRANSPARENCY -->
        <span class="top" id="edgeTransLabel">Edge Transparency</span>
        <span class="top" id="edgeTransSliderOuter">
            <div id="edgeTransSlider1"></div>
        </span>

        <!-- LAYOUT SETTINGS -->
        <div id="title2" class="top">Layout Settings</div>

        <!-- SLIDER FOR ALTERING NODE REPULSION -->
        <span class="top" id="nodeRepulsionLabel">Node Repulsion</span>
        <span class="top" id="nodeRepulsionSliderOuter">
            <div id="nodeRepulsionSlider1"></div>
        </span>

        <!-- SLIDER FOR ALTERING GRAPH STIFFNESS -->
        <span class="top" id="graphStiffLabel">Stiffness</span>
        <span class="top" id="graphStiffSliderOuter">
            <div id="graphStiffSlider1"></div>
        </span>

        <!-- SLIDER FOR ALTERING GRAPH GRAVITY -->
        <span class="top" id="graphGravLabel">Graph Gravity</span>
        <span id="graphGravBox" class="top"> <input type="checkbox" name="option1" value="Gravity" onclick="gGravity=gGravity?false:true;sys.renderer.updateParams();console.log('gravity: '+gGravity);"> on/off</span>

        <!-- GRAPH DEF LABEL -->
        <div id="title3" class="top">Graph Definition</div>

        <div class="top" id="parseStatus"></div>

        <!-- SELECT BOX FOR GRAPH DEFINITION-->
        <span class="top" id="graphSelLabel">Graph</span>
        <select id="graphSelDrop" class="top" onchange="updateGraphDef();">
            <?php
                //path to directory to scan
                $directory = "graphDefinitions/";
     
                //get all image files with a .graph extension.
                $gNames = glob($directory . "*.graph");
  
                //print each file name
                foreach($gNames as $g)
                {
                    echo '<option value="'.$g.'">'.$g.'</option>';
                }
            ?>
        </select>

        <!-- TEXT AREA FOR GRAPH DEFINITION -->
        <input class="top" id="graphDefLabel" type="submit" value="update graph" onclick="sys.updateGraph();">
        <textarea class="top" id="graphDef">
<?php
    // remember, don't be an @$$
    $graph = file_get_contents('./graphDefinitions/10Clique.graph');
    echo $graph;



?>
        </textarea>

        <!-- SPACER -->
        <div class="top" id="spacer">spacer</div>

    </div>

</body>
</html>

