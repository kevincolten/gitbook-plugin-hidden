Hide content based on basic authorization
==============

This plugin is meant to be used on a PHP enabled server.

First you need a `.htaccess` in your root directory.
```
# Enable Basic Auth
AuthType Basic
AuthName "SomeDescription"

# Point to our password file
AuthUserFile /path/to/.htpasswd
Require valid-user

# Redirect all `*.html` to `*.php`
RewriteEngine On
RewriteRule ^(.*)\.html$ $1.php [L]
```
Then in a `.htpasswd` file, you can enter username/password pairs. Passwords are hashed using the MD5 algorithm. You can generate a password with
```
$ htpasswd /path/to/.htpasswd user1
```
or use [this website](http://www.htaccesstools.com/htpasswd-generator/)

Here is an example `.htpasswd`
```
user1:$apr1$OS3sZCvx$KRmhPMpZ9bYs4INph8s6w.
user2:$apr1$3Vfr8Z9d$UeKjYDdJK2XFQRUPw7h9T.
```

You can set the usernames using the plugins configuration in the `book.json`:

```json
{
  "plugins": ["hidden"],
  "pluginsConfig": {
    "hidden": {
      "usernames": ["user1", "user2"],
      "path": "_book",
      "env": "production"
    }
  }
}
```

`usernames`: is an array of authorized users

`path`: is the path to your generated html GitBook (default: `_book`)

`env`: `NODE_ENV` value you want this plugin to be fully executed in. Useful for local development as this plugin breaks functionality of `gitbook serve`

Now in your markdown, you can have hidden blocks:

```markdown
{% hidden %}
### This will be hidden except for authorized users
{% endhidden %}
```
