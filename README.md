# Ember-d3 workshop

This workshop illustrates different approaches to creating d3 visualizations within Ember, through two visualizations:

1. A scatter plot of the number of kills by James Bond per James Bond movie
	
This chart illustrates the template-based approach to d3 visualization in Ember: the data points are wrapped into an `{{each}}` helper and each individual data point becomes itself a component, where you can handle data point-level interaction.

2. A bar chart of volume of tweets in time

This chart illustrates how you can still use the classic d3 approach to *joins* and *transitions*.

Both components illustrate the importance of using computed properties in Ember. Also, we see how a well-defined component API enables us to feed our chart components different data without having to change the component code itself, whether that be a different dataset or a change from static data to streaming data.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* On route `/bond` you will see a scatter plot of the number of Bond kills per movie
* On route `/tweets` you will see a bar chart of the volume of tweets for a Twitter profile in function of time

To see the same bar chart being fed streaming data from the Twitter API, you will have to do the following:

* Switch to the `websockets` branch in the project folder (`git checkout websockets`)
* Add a `config.js` file under `/server` where you specify a Twitter app's **API key**, **API secret**, **API token** and **API token secret** like so:

```
// config.js
module.exports = {
	consumer_key: "APP_CONSUMER_KEY",
	consumer_secret: "APP_CONSUMER_SECRET",
	token: "APP_TOKEN",
	token_secret: "APP_TOKEN_SECRET"
};
```

* `ember server`
* Navigate to `localhost:4200`
* You should see an updating chart indicating the current volume of tweets about Justin Bieber

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
* On the `{{each}}` pattern for *static* charts: [stackoverflow.com](http://stackoverflow.com/questions/27493533/d3-transitions-in-ember-when-ember-takes-care-of-data-joins)
