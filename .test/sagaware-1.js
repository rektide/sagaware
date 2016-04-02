#!/usr/bin/env node
"use strict"

var
  Immutable= require( "immutable"),
  Tape= require( "tape")
var
  Sagaware= require( "..")

Tape("Base use", function( t){
	var
	  expected1= {"hi": "ho"},
	  saga1= Sagaware( expected1)
	t.ok( saga1.saga, "saga1 as a saga")
	t.ok( saga1.state, "saga1 has a state")
	t.ok( Immutable.Iterable.isIterable(saga1.saga), "saga1 saga is iterable immutable")
	t.deepEqual( saga1.state.toJS(), expected1, "saga1 starts equal")
	t.deepEqual( saga1.saga.get(0).toJS(), expected1, "saga1 has a saga entry")

	var
	  saga2= saga1.clone()
	t.equal( saga2.saga.size, 1, "clone has one saga entry")
	t.deepEqual( saga2.state.toJS(), expected1, "clone has state")
	t.deepEqual( saga2.saga.get(0).toJS(), expected1, "clone has saga entry")

     var
	  state2= saga1.state.set( "toWork", "we go"),
	  expected2= {
	  	"hi": "ho",
	  	"toWork": "we go"}
	saga2.putState( state2)
	t.ok( saga2.saga, "saga2 has a saga")
	t.ok( Immutable.Iterable.isIterable(saga2.saga), "saga2 aga is iterable immutable")
	t.equal( saga2.saga.size, 2, "saga2 has two elements")
	t.deepEqual( saga2.state.toJS(), expected2, "Starts equal")
	t.deepEqual( saga2.saga.get(0).toJS(), expected2, "Has first saga entry")
	t.deepEqual( saga2.saga.get(1).toJS(), expected1, "Has first saga entry")
	t.equal( saga1.saga.size, 1, "Original saga correct size")

	t.end()
})
