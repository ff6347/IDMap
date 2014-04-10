IDMaps
======

Creating Maps with InDesign and Basil.js  
This is early draft. not ready for usage. If you still want to give it a try...

##Usage  

[Download](http://basiljs.ch/download/) and [install](http://basiljs.ch/tutorials/installation-and-getting-started/) [Basil.js](http://basiljs.ch)  

If you don't want to develop just grab the latest version from the /dist folder, place it in your basiljs user folder and run the scripts.  

##Development

###Setup Mac OSX  

[Download](http://basiljs.ch/download/) and [install](http://basiljs.ch/tutorials/installation-and-getting-started/) [Basil.js](http://basiljs.ch)  

Open Terminal  

Install [node.js](http://nodejs.org) via [homebrew](http://brew.sh)  

    brew install node  

Install the [Grunt](http://gruntjs.com) command line interface with [npm](https://www.npmjs.org) globaly  

    npm install -g grunt-cli  

Clone the repo with git (you use [git](http://git-scm.com) right?) and `cd` into it  

    cd /Users/$USER/Documents/basiljs/user
    git clone git@github.com:fabiantheblind/IDMaps.git && cd IDMaps  

Initialize all submodules and then update  

    git submodule init && git submodule update  

Now install all node modules  

    npm install  

If you want to build run

    grunt build-dist  

If you want to code on it use the default grunt function. It watches for changes and builds always a new version. So just run:

    grunt



###Setup Win  

tbd


[Download](http://basiljs.ch/download/) and [install](http://basiljs.ch/tutorials/installation-and-getting-started/) [Basil.js](http://basiljs.ch)  

install [node.js](http://nodejs.org)   

install [Grunt](http://gruntjs.com)  

clone repo  

clone submodules  

run grunt build-dist  

or  

run grunt  

sorry for now this is all I can say. Will try to test it on a windows computer.  


-----------

##License  

Copyright (c)  2014 Fabian "fabiantheblind" Morón Zirfas  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

see also [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

