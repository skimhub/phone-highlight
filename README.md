phone-highlight
===============

iPhone like text highlight plugin for jQuery


## Live demo

http://jsfiddle.net/2XLBr/


## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

    <script src="/path/to/jquery.phonehighlight.js"></script>
    
You should also include the default stylesheet

    <link href="/path/to/style.css" rel="stylesheet" type="text/css" media="screen" />

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.


## Usage

Default use case

    <script>
      jQuery('selector').phoneHighlight();
    </script>
    
Pre selected words (will pre-select the words between the 2nd and the 3rd words)

    <script>
      jQuery('selector').phoneHighlight({
        highlighted: [1,2]
      });
    </script>
    
Callback

    <script>
      jQuery('selector').phoneHighlight({
        onchange: function(text){
          console.log(text);
        }
      });
    </script>


