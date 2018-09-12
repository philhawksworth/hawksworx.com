---
title: Opening a Finder window from the Terminal
date: 2007-11-04T00:00:00Z
publishdate: 2007-11-04T00:00:00Z
draft: false
description: A tip for more easily moving between the terminal and the Finder in OSX
tags:
- osx
- tips
---

I stumbled upon a simple method for opening a Finder window at your current Terminal session location recently.  Since it is something that I have a regular need for, I thought that there might be other Mac users out there who might also find this useful from time to time.

<!--more-->

<p>To set things up so that it is easy to use whenever you need it, you just need to follow these two steps:</p>
<p>First, using your <a href="http://www.macromates.com">preferred text editor</a> create a file which contains this command:</p>

```
!/bin/bash
open /System/Library/CoreServices/Finder.app $PWD
```

<p>You should name this file with whatever you want to use to call it later.  I named it <code>fndr</code>.</p>
<p>Second, you should place this somewhere that is visible on your path. I collect any little utility scripts like this together in a directory called <code>Utils</code> which I added to my path to make all of its contents easily accessible.</p>
<p>Now you can simply type <code>fndr</code> in your Terminal window to open a Finder at your present directory.</p>
<p>If you need help adding something to your path, I recommend creating a file in your home directory (it may even already exist) called <code>.bash_profile</code>.  This file gets invoked whenever you enter the Terminal environment. </p>
<p>Add an item to your path by entering a line something like this to your <code>.bash_profile</code> file:</p>

```
export PATH='$PATH:/Users/PhilH/Utils'
```

<p>I'm always on the look out for bits and pieces like this to help make my life easier in Mac OSX.  Not that I think that things are difficult in this excellent OS, but there is always room for shortcuts to speed up common tasks. If you have any little gems that might be useful to the Mac OSX world, it would be great if you could post them in the comments. Thanks!</p>
<h3>Update:</h3>

<p>This can simple be done with a single command already as it turns out. Just use this:</p>

```
open .
```

