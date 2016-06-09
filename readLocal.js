/* global $, window, document, console */

$(document).ready(function (){
    // data files are taken from:
    // https://raw.githubusercontent.com/g0v/potluckmap/master/data/shop-gift.csv
    // https://raw.githubusercontent.com/g0v/potluckmap/master/data/shop-gift.geojson
    var p = {};	// promise

    $.getJSON('shop-gift.geojson', null, function (x) {
	logCompletion('getJSON', x);
    });
    p.csv = $.get('shop-gift.csv', null, function (x) {
	logCompletion('get(csv)', x);
    });
    p.json = $.get('shop-gift.geojson', null, function (x) {
	logCompletion('get(json)', x);
    });
    logCompletion('init', p.csv, p.json);

    window.setTimeout(function () {
	logCompletion('setTimeout', p.csv, p.json);
	$('#pre_display').text('[a csv file]\n' + p.csv.responseText
	    + '\n[a geojson file]\n' + p.json.responseText);
    }, 200);
    $.when(p.csv, p.json).done(function (a, b) {
	logCompletion('setTimeout', a, b);
    });
});

function logCompletion() {
    var name = arguments[0];
    for (var i=1; i<arguments.length; ++i) {
	console.log('## ' + name + ' ## ' + JSON.stringify(arguments[i]));
    }
}

