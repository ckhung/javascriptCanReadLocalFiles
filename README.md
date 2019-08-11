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
Sometimes we are not even talking about web servers.
We are talking about opening a local html file in the browser
(resulting in this kind of URL: `file:///...html`)
and executing a local javascript that needs to read
a data file, where the .html, the .js, and the data file
are all in the same directory, and where the computer
may even be off the Internet or any local network.
If the ability to read files in such situations is a
security hole, then one might as well say that
the user's ability to open the browser is security hole,
or that the availability of the computer power switch
is a security hole. This is completely absurd.

Another frequently given answer is that one has to
run a local web server so that a javascript program
can perform ajax call. This answer at least recognizes
the fact that some of us are not interested in writing
a program to run in the public. We may be running it
completely offline just like we run many programs written
in any other programming laugnages.
Yet it would make more sense if the browser defaults
to allow reading local files when an .html file is
opened as `file:///...` as opposed to
the potentially dangerous `http://...`
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

If you use chromium to open a local html page
which in turn loads a local javascript file as "file:///...",
then jQuery.get() and jQuery.getJSON() won't work.
However you can solve it by invoking the chromium command
like this: `chromium-browser --allow-file-access-from-files`.
The same is true with `opera --allow-file-access-from-files`.
Unfortunately this is not an option for
browsers on android phones and tablets.

If you use firefox to open a local html page
which in turn loads a local javascript file as "file:///...",
then you need to [set security.fileuri.strict\_origin\_policy to False](http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/) in firefox's about:config.
After that, jQuery.getJSON() works.
However in this situation the jQuery.get() callback
does not work directly. Yet you can call jQuery.get()
to get the data and call window.setTimeout()
to wait for the data to appear.
It's an ugly hack but it works.
If desired, your program can perform a check
`if (window.location.protocol == 'file:') { ... }`
to see if this hack is needed.

Using jQuery.getJSON() to read a local file
may cause firefox to cough up an error message
in the console reading "XML Parsing Error:
not well-formed Location: file:///..." .
This can be fixed by calling overrideMimeType().
See [this QA](https://stackoverflow.com/questions/2618959/not-well-formed-warning-when-loading-client-side-json-in-firefox-via-jquery-aj)
for details.

The following diagram summarizes the above explanations:
![how to read a local file in javascript](https://ckhung.github.io/a/m/16/readLocal.svg)
