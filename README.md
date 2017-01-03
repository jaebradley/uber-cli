# Uber CLI
[![Coverage Status](https://coveralls.io/repos/github/jaebradley/uber-cli/badge.svg?branch=master)](https://coveralls.io/github/jaebradley/uber-cli?branch=master)
[![Build Status](https://travis-ci.org/jaebradley/uber-cli.svg?branch=master)](https://travis-ci.org/jaebradley/uber-cli)
[![npm version](https://badge.fury.io/js/uber-cli.svg)](https://badge.fury.io/js/uber-cli)

## Introduction
Clearly, I'm a lazy person (just look at what this tool does - it helps me
figure out if I should order *a car to pick me up and drive me to where I want to go*).

That being said, as a lazy person it pains me everytime open my phone,
open the Uber app, type my destination, and see the estimated price, only for
my inner, responsible, cost-cutting, fiduciary-self to end up taking the bus
all the way home.

I think we can all agree that it would be much more efficient to simply be disappointed
before I open my phone at all.

## Install via NPM
```
npm install uber-cli -g
```

## Usage

### Get Time-To-Pickup Estimates
```
uber time 'pickup address here'
```
![alt_text](http://imgur.com/9k16YDl.png)

### Get Price Estimates
```
uber price -s 'start address' -e 'end address'
```
![alt_text](http://imgur.com/2QLJCSw.png)

## A Note On Address Identification
So the [Uber API identifies time](https://developer.uber.com/docs/riders/references/api/v1.2/estimates-time-get) and price estimates based on a coordinate and not an address. In order to support those
that don't know their exact coordinates at any given time, I'm using the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to identify coordinates based on an input address.
