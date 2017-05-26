/*global $ _ opspark*/ 
$(document).ready(function () {
  // ALL YOUR CODE GOES BELOW HERE //
  $.getJSON('data/product.json', function(data) {
          
  }).success(function(data) {
    function makeProductContainer (product) {
      return $('<div>')
                      .on('click', function(event) {
                      let specsUl = $('<ul>').addClass('specs');
                      _.each(product.specs, function(e, i, c) {
                          specsUl.append($('<li>').text(e));
                      });
                      if(product.specs.length > 0) {
                          specsUl.prepend($('<h2>').text('Specs'));
                      }
                      let colorUl = $('<ul>').addClass('colors')
                                             .append($('<h2>').text('Colors'));
                      _.each(product.availableColors, function(e,i,c) {
                              colorUl.append($('<li>').text(e));
                      });
                      $('main').append($('<div>')
                                                .append($('<div>').addClass('col-sm-4')
                                                                  .append($('<img>')
                                                                                    .attr('src', 'img/product/' + product.image),
                                                                  $('<p>').addClass('stock').html(`LEFT IN STOCK!!  <span>${product.stock}!</span>`)))
                                                .append($('<div>').addClass('col-sm-8').append(colorUl).append(specsUl))
                                  
                                                .attr('id', 'pop-up')
                                                .addClass('row')
                                                                .on('click', function(e) {
                                                                       $('#pop-up').remove();
                                                                 })
                                                .fadeIn());
                                  
                        })
                      
                      .addClass('product-container')
                      .append($('<img>')
                                        .attr('src', 'img/product/thumbs/' + product.image))
                      .append($('<p>')
                                      .html(`${product.desc}  <span class = 'prices'>$${product.price}</span>`));
    }
    _.each(data, function(e, i, c) {
      $('main')
              .append(makeProductContainer(e));
    });
    
    var filteredBySelect;
    $('#searchby-input').on('keyup', function(event) {
        if (event.key === 'Enter') {
            var typed = String($(this).val());
            $('main').empty();
        if(filteredBySelect !== undefined) {
            typed = filteredBySelect.attr('data-filtered') + " " + typed;
        }
        let filtered = filterProducts(typed);
        _.each(filtered, function(e, i, c) {
              $('main')
                      .append(makeProductContainer(e));
        });
        if (filtered.length === 0) {
            $('main')
                    .append($('<div>')  
                                      .addClass('product-container')
                                .append($('<h2>').text('No Results Found!')));
    }
      }
    });
    
    var filterProducts = function(input) {
      var array = data;
      array = _.filter(array, function(e, i, c) {
        return check(e, input);
      });
      return array;
    };
    
    function check(product, query) {
      if (typeof product === 'string') {
        query = query.toLowerCase().split(' ');
        product = product.toLowerCase();
       return  _.every(query, function(e, i, c) {
         return product.includes(e);
       });

      } 
      else if (_.isPlainObject(product)) {
        return _.some(product, function(e, i, c) {
          return check(e, query);
        });
      }
        return false;
      
    }
    

    
    function lis(data) {
    return _.reduce(data, function(prev, cur, i) {
        if(!prev.includes(cur.type)) {
        return prev.concat(cur.type);
      } else {
        return prev;
      }
    }, [])
    
    }
    let typesLi = lis(data);
    _.each(typesLi, function(e, i, c) {
        $('#filtered-by').append($('<li>')
                                          .text(e)
                                          .attr('data-filtered', e));
    });
        
        
    $('#search-by').on('click', function(event) {
        $('#filtered-by').slideToggle('fast');
    });
    
    
    var ul = $('#filtered-by').children();
    _.each(ul, function(e, i, c) {
        $(e).on('click', function(event) {
            
            //$('#searchby-input').val('');
            
            filteredBySelect = $(this);
            $('main').empty();
            let typed = $(this).attr('data-filtered');
            
            if($('#searchby-input').val().length > 0) {
              typed = $('#searchby-input').val() + ' ' + typed;
            }
            
            
            let filtered = filterProducts(typed);
            _.each(filtered, function(e, i, c) {
                $('main')
                        .append(makeProductContainer(e));
            });
            if (filtered.length === 0) {
               $('main')
                       .append($('<div>').addClass('product-container')
                                         .append($('<h2>').text('No Results Found!')));
            }
        
      })
    })
    
    $('#search-by').on('click', function(e) {
      filteredBySelect = undefined;
    })
  });         
  // ALL YOUR CODE GOES ABOVE HERE //
  
});