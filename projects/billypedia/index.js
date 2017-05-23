/*global $ _ opspark*/ 
$(document).ready(function() {
    $.getJSON('data.json', function(data) {
            // YOUR CODE BELOW HERE //
            $('.heading').css('color', 'black').css('font-size', '35px');
            
            $('nav').css('font-size', '50px')
                    .css('font-style', 'italic')
                    .css('font-family', 'Verdana')
                    .css('text-align', 'right')
                    .css('text-outline', 'black');
                    
            $('nav').css('border-radius', '10px')
                    .css('margin-bottom', '10px')
                    .css('background-position', 'center');
                    
            $('main').css('border-radius', '10px');
            $('body').css('background-color', 'black');
            
            $('#list-top-rated').css('list-style', 'none');
            $('#section-bio p:last-child').remove();
            
            // Map List of Discography Top Rated
            let topRated = data.discography.topRated;
            let topRatedList = _.map(topRated, function(recording) {
                return $('<ul>')
                    .append($('<li>')
                         .text(recording.title)
                        .addClass('top-rated-list')
                        .attr('art', recording.art));
            });
            
            // Append List of Top Rate Discography to #list-top-rated
            $('#list-top-rated')
                .append(topRatedList)
                .css('padding', 5);
                
            // Top Rated Album Art Container
            $('#header-top-rated')
                .append($('<div>')
                    .attr('id', 'image-container-top-rated')
                    .attr('class', 'image-container'));
                    
            $('#image-container-top-rated')
                .append($('<img>')
                    .attr('src', 'images/album/voice-in-the-night.jpg')
                    .attr('class', 'image')
                    .attr('id', 'image-top-rated'));
                    
            // Top Rated Event Listener
            $('.top-rated-list').on('click', function(event) {
                let elem = $(event.currentTarget);
                $('#image-top-rated').fadeOut(500, function() {
                    $('#image-top-rated')
                        .attr('src', $(elem).attr('art'));
                }).fadeIn(500);
            });
            
            // Sidebar
            $('#sidebar')
                .append($('<section>')
                    .attr('id', 'section-recordings'));
                    
            $('#section-recordings')
                .append($('<header>')
                    .attr('id', 'header-recordings')
                    .attr('class', 'header')
                    .text('General Recordings')
                    .css('font-style', 'italic')
                    .css('padding', 5)
                    .css('font-size', '25px'))
                .append($('<ul>')
                    .attr('id', 'list-recordings'));
                    
            // Recordings
            var recordings = data.discography.recordings;
            let recordingList = _.map(recordings, function(recording) {
                return $('<li>')
                    .addClass('recording')
                    .append($('<div>')
                        .text(recording.title)
                        .addClass('recording-list')
                        .attr('art', recording.art));
            });
            $('#list-recordings').append(recordingList).css('padding', 5);
            
            // Discography Images Container
            $('#header-recordings').append($('<div>').attr('id', 'image-container-recordings')
                .attr('class', 'image-container'));
            $('#image-container-recordings').append($('<img>')
                .attr('src', 'images/album/eastern-rebellion.jpg')
                .attr('class', 'image').attr('id', 'image-recordings'));
                
            // Recordings Event Listener
            $('.recording-list').on('click', function(event) {
                let elem = $(event.currentTarget);
                $('#image-recordings').fadeOut(500, function() {
                    $('#image-recordings').attr('src', elem.attr('art'));
                }).fadeIn(500);
            });
            
           // CSS Stylings
            $('#image-recordings')
                .css('border-style', 'solid')
                .css('border-radius', '10px');
                
            $('#image-top-rated')
                .css('border-style', 'solid')
                .css('border-radius', '10px');
                
            $('#sidebar')
                .css('font-family', 'verdana')
                .css('text-align', 'justified');
                
            $('#header-top-rated')
                .css('font-size', '30px')
                .css('maring-top', '15px');
                
            $('#image-billy')
                .css('border-style', 'solid')
                .css('border-radius', '10px')
                .css('border-color', 'black');
                
            // Fade IN/OUT Random Image for Billy Higgins
            
            let images = data.images.billy;
            let counter = 0;
            
            const clickImage = function(event) {
                counter++;
                let elem = $(event.currentTarget);
                elem.fadeOut(500, function() {
                    $('#image-billy').attr('src', images[counter % 4]);
                }).fadeIn(500);
            };
        $('#image-billy').on('click', clickImage);
            

            // Creates Table for Billy's Rider
            var createTable = function(equipment) {
                var createRow = function(instrument) {
                    var $row = $("<tr>");
                    var $type = $("<td>").text(instrument.type);
                    var $desc = $("<td>").text(instrument.desc)
                        .attr('class', 'instrument-desc');
                    $row.append($type);
                    $row.append($desc);
                    return $row;
                };
                var $table = $("<table>");
                var $rows = equipment.map(createRow);
                $table.append($rows);
                return $table;
            };
            
            // Appends Table to the Sidebar
            $('#sidebar')
                .append($('<section>').attr('id', 'section-rider'));
            createTable(data.rider).appendTo('#section-rider').attr('id', 'table-rider');
            
            // Adds a Header for Table
            $('#section-rider')
                .prepend($('<header>')
                .text("Billy's Rider")
                .css('font-style', 'italic')
                .attr('class', 'header'));
            
            // Adds a Header for Instrument & Description
            $('#table-rider').prepend($('<th>').text('Description'));
            $('#table-rider').prepend($('<th>').text('Instrument'));
            // YOUR CODE ABOVE HERE //
        })
        .fail(function() {
            console.log('getJSON on discography failed!'); });
});

