# javascriptCanReadLocalFiles
Of course javascript can read local files.
Share your hard-earned knowledge here
to save other newbies' some frustration.

## Why This Project?

As a computer science teacher having moderate experiences
in several programming languages
(including OOP and functional ones),
I had great difficulty trying to read a file from
a local directory when I first learned javascript.
Discussions on stackoverflow and elsewhere show that
many javascript newbies have the same frustration.

The most frequently given answer is that
security concerns forbid or at least discourage
reading from a local file.
This does not make sense to many of us.
We are not talking about a visitor to a website
unknowingly executing a javascript program on her/his browser
which tries to read a file from the unfortunate visitor's computer.
We are talking about a javascript program trying to read
data file and/or configuration file located at the same computer
where the program is stored.
If the ability to read files from the same directory were a
security hole, then one might as well say that php, ruby,
and cgi programs all have this hole wide open by default.
This conclusion is absurd, and so is the premise.

Another frequently given answer is that one has to
run a local web server so that a javascript program
can perform ajax call. This answer at least recognizes
the fact that some of us are not interested in writing
a program to run in the public. We may be running it
completely offline just like we run many programs written
in any other programming laugnages.
Yet it would make more sense if the browser defaults
to allow reading local files when an .html file is
opened as file:///... rather than http://localhost/...
and when the javascript file is also local.
Running a web server simply for reading a local file
is way more than a bandaid.
(Well maybe you can say it's a (huge) patch ...)

The truth is, a javascript program _can_ read from local files
with or without a web server, with some caveats.
So those 'you-can-not' answers are plain wrong.
(Maybe the respondents misunderstood the newbies' questions?)
And we loudly disagree with those 'you-should-not' answers
by documenting how to do it in various situations
for the confused javascript newbies.
We hope some day the standardization of this very
basic feature makes this project obsolete.

## The jQuery Solution ##

As with several other confusions regarding javascript,
the simplest answer is not to bother with plain javascript
but use jQuery or some other libraries instead.

jQuery.get() can load a remote file.
Its more specific variant jQuery.getJSON() can load a remote json file.
They can also load a local file if the javascript file
itself is loaded from an html page specified as
"http://localhost/..." .
(The "local web server" solution.)

If the javascript file itself is loaded from
an html page specified as "file:///..."
then jQuery.get() and jQuery.getJSON() won't work in chromium.
However you can solve it by invoking the chromium command
like this: `chromium-browser --allow-file-access-from-files`.
The same is true with `opera --allow-file-access-from-files`.
Unfortunately this is not an option for
browsers on android phones and tablets.

Thankfully the jQuery-firefox combination allows
jQuery.getJSON() to work in the "file:///....html" situation.
However in this situation the jQuery.get() callback
does not work directly. Yet you can call jQuery.get()
to get the data and call window.setTimeout()
to wait for the data to appear.
It's an ugly hack but it works.
If desired, your program can perform a check
`if (window.location.protocol == 'file:') { ... }`
to see if this hack is needed.

The following diagram summarizes the above explanations:
![how to read a local file in javascript](https://ckhung.github.io/a/m/16/readLocal.svg)
