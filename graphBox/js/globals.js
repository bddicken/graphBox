/**
 * @description
 * globals.js contains all of the globally accessible variables for graphBox.
 *
 * @author Benjamin Dicken (bddicken@gmail.com)
 */

/*
 * sys is the arbor graph object
 */
var sys;

/*
 * These are a collection of global parameters for vertices in the graph.
 * Changing these will change how the nodes are displayed.
 */
var gNodeSize = 10;
var gNodeColor = "#ffffff";
var gNodeType = "circle";
var gNodeTrans = 1.0;

/*
 * These are a collection of global parameters for edges in the graph.
 * Changing these will change how the edges are displayed.
 */
var gEdgeTrans = 1.0;
var gEdgeType = "line";
var gEdgeWidth = 1;
var gEdgeColor = "#ffffff";

/*
 * Defines the background color of the canvas element that displays the graph.
 */
var gBGColor = "#FFFFFF";

/*
 * FileParsing object to parse the graph definition string.
 */
var fp = null;
