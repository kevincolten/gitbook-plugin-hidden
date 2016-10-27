var marked = require('marked');
var fs = require('fs');
var recursive = require('recursive-readdir-synchronous');
var path = require('path');

module.exports = {
  blocks: {
    hidden: {
      process: function(block) {
        if (process.env.NODE_ENV === this.config.get('pluginsConfig')['hidden']['env'] || 'production') {
          return '<?php if (in_array($_SERVER["REMOTE_USER"], ["' + (this.config.get('pluginsConfig')['hidden']['usernames'] || []).join('", "') + '"])) { ?>' + marked(block.body) + '<?php } ?>';
        } else {
          return '<div><em>HIDDEN</em><br>' + marked(block.body) + '<br><em>HIDDEN</em></div>';
        }
      }
    }
  },
  hooks: {
    finish: function() {
      if (process.env.NODE_ENV === this.config.get('pluginsConfig')['hidden']['env'] || 'production') {
        var files = recursive(path.join(process.cwd(), this.config.get('pluginsConfig')['hidden']['path'] || '_book'), ['!*.html']);
        files.forEach(function(file) {
          fs.renameSync(file, file.slice(0, file.length - 4) + 'php');
        });
      }
    }
  }
};
