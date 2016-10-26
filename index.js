var marked = require('marked');

module.exports = {
  book: {
    assets: "./book",
    js: [
      "plugin.js"
    ]
  },
  blocks: {
    hidden: {
      process: function(block) {
        return '<?php if (in_array($_SERVER["REMOTE_USER"], ["' + this.config.get('pluginsConfig')['hidden']['usernames'].join('", "') + '"])) { ?>' + marked(block.body) + '<?php } ?>';
      }
    }
  }
};
