Hide content based on basic authorization
==============

This plugin is meant to be used on a PHP enabled server.

First you need a `.htaccess` in your root directory. In it, we'll:
1. Enable Basic Auth
1. Point to our password file
1. Tell it to read all `.html` and `.htm` files as PHP

```
AuthType Basic
AuthName "SomeNameAuth"
AuthUserFile /path/to/.htpasswd
Require valid-user
AddType application/x-httpd-php .html .htm
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

You can set the usernames using the plugins configuration in the book.json:

```json
{
  "plugins": ["hidden"],
  "pluginsConfig": {
    "hidden": {
      "usernames": ["user1", "user2"]
    }
  }
}
```

Now in your markdown, you can have hidden blocks like so:

```markdown
{% hidden %}
### This will be hidden except for appropriate users
{% endhidden %}
```
