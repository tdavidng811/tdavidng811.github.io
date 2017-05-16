/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //
        $('#section-bio').css('font-family', 'verdana').css('font-style', 'italic');
        $('#section-quotes').css('background-color', 'white').css('border-radius', '4px').css('font-style', 'italic');
        // uncomment this to inspect all available data; delete when done //
        //console.log(data);
        
        // EXAMPLE: Looping over top rated recordings; replace with your code //
        let topRated = data.discography.topRated;
        let $topRated = $('#list-top-rated');
        
        
        _.map(topRated, function(recording) {
            let $list = $('<li>');
            $topRated.append($list.text(recording.title));
        });
        
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});


