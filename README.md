<img src="https://github.com/jstanley490/grace_shopper/blob/main/src/assets/logo.svg" align ="right" style="height: 64px" />

# Welcome to the ```back end``` repository of "Team Munchies" E-Commerce Website!
Within this website, you will be able to register a user, login as a user, select and add treats and/or merchandise to your cart and checkout with your cart!

* To use the correct features within app, make sure you are logged in correctly as either admin or user.

# Problems? Please let us know!
* If you run into any problems or issues, **please** let us know so we can address and fix them right away.

# Getting Started
* Install Packages:

```npm i```

* Initialize Database:

```npm run server:dev```

* Run Seed Script:

```npm run db:build```


# Endpoints

## ``` GET /api/merch ```

This endpoint is the most open. It will return all merch currently within our database.

```
{
    "merch": [
    {
       "id": 1,
       "type": "shirt",
       "size": "medium",
       "color": "light gray",
       "price": 20
    },
    {
       "id": 2,
       "type": "shirt",
       "size": "large",
       "color": "light gray",
       "price": 20
    },
    {
       "id": 3,
       "type": "shirt",
       "size": "xl",
       "color": "light gray",
       "price": 20
    },
    {
       "id": 4,
       "type": "shirt",
       "size": "2xl",
       "color": "light gray",
       "price": 20
    }
  ]
}
```

## ``` PATCH /api/merch/:merchId ```

This is the route for creating new merch. The admin will have to supply a JSON Body like so:

```
{
        "id": 18,
        "type": "baseball cap",
        "size": "xl",
        "color": "english oak",
        "price": 25,
}
```

## ``` DELETE /api/merch/:merchId ```

This is the route for deleting a piece or pieces of merch. The user has to supply a JSON Body like so:

```
{
        "id": 26,
        "type": "beanie",
        "size": "xl",
        "color": "english oak",
        "price": 25,
}
```

## ``` GET /api/treats ```

This endpoint is the most open. It will return all treats currently within our database.

```
{
    "treats": [
    {
        "id": 1
       "type": "chocolate chip cookie",
       "price": 1.00,
       "stock": 25
    },
    {
        "id": 2
       "type": "fudge brownie",
       "price": 2.50,
       "stock": 52
    },
    {
        "id": 3
       "type": "choclate pretzel",
       "price": 1.50,
       "stock": 45
    },
  ]
}
```

## ``` PATCH /api/treats/:treatsId ```

This is the route for creating new treats. The admin will have to supply a JSON Body like so:

```
{
    "id": 70
    "type": "Electronic Bronze Soap",
    "price": 6.00,
    "stock": 65
}
```

## ``` DELETE /api/treats/:treatsId ```

This is the route for deleting a piece or pieces of treats. The user has to supply a JSON Body like so:

```
{
    "id": 83
    "type": "Intelligent Steel Cheese",
    "price": 7.00,
    "stock": 17
}
```

# Database Adapter

We will also create a database adapter with the following exported methods:

## ```getAllMerch()```

This relates to our first route within merch, which allows us to collect all merch in our database.


## ```updateMerch()```

This relates to our next route concerning merch. This allows us to update said merch fields.

## ```deleteMerch()```

This is our last route pertaining to merch. This last route allows us to delete said merch and it's fields.

## ```getAllTreats()```

This relates to our first route within treats, which allows us to collect all treats in our database.

## ```updateTreats()```

This relates to our next route concerning treats. This allows us to update said treats fields.


## ```deleteTreats()```

This is our last route pertaining to treats. This last route allows us to delete said treats and it's fields.

# The Server

We created a pretty basic server. It will have the following:

* ```app.js``` (top level) - this is your server file
* ```api/index.js``` - this is your routes file
* ```db/index.js``` - this is your database adapter file

# Database Adapter

This is testable by running ```npm run db:build```, which runs the table drop, table build, and testing functions.

# API

You can test these api routes by using ```'thunderclient'``` if you'd like.

## *Click here to view our ```front end repository!```*:point_down:
* [```Team Munchies front end repository!```](https://github.com/jstanley490/grace_shopper/tree/main)
