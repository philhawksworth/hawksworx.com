---
title: Using Quicksilver to control Last.fm
date: 2009-08-07T00:00:00Z
publishdate: 2009-08-07T00:00:00Z
draft: false
description: Experimenting with ways to control playback from Last.FM with Quicksilver
tags:
- osx
- tips
---

For a while, I've been using handy <a href="http://docs.blacktree.com/quicksilver/what_is_quicksilver">Quicksilver</a> triggers to control iTunes. I like not needing to switch my attention from what I'm working on, in order to skip a track, pause the playback, set a rating or whatever.  You can find out <a href="http://leafraker.com/2007/09/17/how-to-create-a-quicksilver-trigger/">how to create a trigger</a> from one of the many great Quicksilver tutorials out on the Web.

<img src="/images/quicksilver_lastfm.jpg" alt="">

<!--more-->

<p>
    At the moment though, I find myself listening to <a href="http://last.fm" rel="org fn url">Last.fm</a> more and more, and have been looking for a similar way to control the Last.fm application. I couldn't find a plugin for Quicksilver to achieve this so I set about writing an Applescript which I could trigger with Quicksilver.  I'm not much of an Applescript whizz, but I managed to put the following script together to skip the track currently playing in the Last.fm application:
</p>

```
tell application "Last.fm" to activate
tell application "System Events"
        tell process "Last.fm"
                click menu item "Skip" of menu "Controls" of menu bar 1
        end tell
end tell
```

<p>
    After saving this in a suitable location (I have a Utils folder where I keep lots of scripts and utilities), I set a Quicksilver trigger to run the script. Simple!  Happy with the result, I created similar scripts for some other controls like love, ban, play and stop and assigned them all keyboard triggers.
</p>
<p>
     My only wish was that I could do this without giving Last.fm focus. Generally this is fine for my because I have it running in a second display, so it doesn't steal my attention, but it would be nice if I could get Applescript to execute the command without activating the application. I'd welcome suggestions from anyone with more Applescript fu than me.
</p>
