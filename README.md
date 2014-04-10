IDMaps
======

Creating Maps with InDesign and Basil.js  

##Usage  

[Download](http://basiljs.ch/download/) and [install](http://basiljs.ch/tutorials/installation-and-getting-started/) [Basil.js](http://basiljs.ch)  

If you don't want to develop just grab the latest version from the /dist folder and run the scripts.  



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