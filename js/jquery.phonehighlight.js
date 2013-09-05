(function ( $ ) {
  $.fn.phoneHighlight = function( opts ) {
    var text = $.trim(this.text()),
      words = text.split(" "),
      base = $('<div class="phone-highlight-slider"></div>'),
      highlighted = opts.highlighted || [0, words.length -1],
      coordinates = [],
      max_x, min_x,
      onchange = opts.onchange || false,
      selector1, selector2, selector1_pos, selector2_pos, i, mouseDown = false, mouseX;
    
    positionSelectors = function(base){
      var first_selected = $('.phone-highlight-selected:first');
      
      selector1_pos = first_selected.position().left - 5;
      base.find('div[rel=selector_left]').css({"left": selector1_pos}) ;
      
      var last_selected = $('.phone-highlight-selected:last');
      
      selector2_pos = last_selected.position().left + last_selected.outerWidth() - 5;
      base.find('div[rel=selector_right]').css({"left": selector2_pos});
    }
    
    updateSelection = function(highlighted){
      var index = 0;
      $('.phone-highlight-word').each(function(){
        if (index >= highlighted[0] && index <= highlighted[1]){
          if (!$(this).hasClass("phone-highlight-selected")){
            $(this).addClass("phone-highlight-selected");
          }
        } else {
          $(this).removeClass("phone-highlight-selected");
        }
        
        index++;
      });
    }
    
    getHighlightedText = function(highlighted){
      var index, words = [];
      
      index = 0;
      $('.phone-highlight-word').each(function(){
        if (index >= highlighted[0] && index <= highlighted[1]){
          words.push($(this).text());
        }
        
        index++;
      });
      
      return words.join(" ");
    }
    
    base.insertAfter(this);
    
    for (i=0; i<words.length; i++){
      base.append($('<div class="' + ((i >= highlighted[0] && i <= highlighted[1]) ? "phone-highlight-word phone-highlight-selected" : "phone-highlight-word")  +'">' + words[i] + '</div>'));
    }
    
    this.hide();
    
    base.addClass('phone-highligher');
    base.append($('<div class="phone-highlight-handle" rel="selector_left"></div>'));
    base.append($('<div class="phone-highlight-handle" rel="selector_right"></div>'));
    
    $('.phone-highlight-word').each(function(){
      var x1, x2, coords;
      x1 = $(this).position().left;
      x2 = $(this).position().left + $(this).outerWidth();
      
      coordinates.push([x1, x2]);
    });
    
    var base_offset = base.offset().left; 
    var base_width = base.outerWidth();
    
    positionSelectors(base);
    
    selector1 = base.find('div[rel=selector_left]');
    selector2 = base.find('div[rel=selector_right]');
    
    selector1.bind("mousedown", function(e){
      max_x = coordinates[highlighted[1]][0] - 5;
      mouseDown = 1;
    });
    
    selector2.bind("mousedown", function(e){
      min_x = coordinates[highlighted[0]][1] - 5;
      mouseDown = 2;
    });
    
    $(window).bind("mouseup", function(e) {
      mouseDown = false;
    });
    
    $(document).bind("mousemove", function(e){
      if (mouseDown == 1){
        mouseX = e.pageX - base_offset;
        if (mouseX > - 5 && mouseX < max_x + 5){
          selector1.css({"left": mouseX});
          
          highlight_updated = false;
          
          for (i=0; i < coordinates.length; i++){
            if (mouseX >= coordinates[i][0] - 4 && mouseX <= coordinates[i][1] - 4 && highlighted[0] != i){
              highlighted[0] = i;
              highlight_updated = true;
              break;
            }
          }
          
          if (highlight_updated){
            updateSelection(highlighted);
            if (onchange){
              onchange(getHighlightedText(highlighted));
            }
          }
        }
      } else if (mouseDown == 2){
        mouseX = e.pageX - base_offset;
        
        if (mouseX > min_x - 5 && mouseX < base_width - 5){
          selector2.css({"left": mouseX});
          
          highlight_updated = false;
          
          for (i=coordinates.length-1; i >= 0; i--){
            if (mouseX >= coordinates[i][0] + 4 && mouseX <= coordinates[i][1] + 4 && highlighted[1] != i){
              highlighted[1] = i;
              highlight_updated = true;
              break;
            }
          }
          
          if (highlight_updated){
            updateSelection(highlighted);
            if (onchange){
              onchange(getHighlightedText(highlighted));
            }
          }
        }
      }
    });
    
    return this;
  };  
}( jQuery ));