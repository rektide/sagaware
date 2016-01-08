var
  Immutable= require( "immutable"),
  Tape= require( "tape")
var
  Sagaware= require( "..")

Tape("Base use", function( t){
	var
	  expected1= {"hi": "ho"},
	  state1= Sagaware( expected1)
	t.ok( state1.saga, "state1 as a saga")
	t.ok( Immutable.Iterable.isIterable(state1.saga), "state1 saga is iterable immutable")
	t.deepEqual( state1.toJS(), expected1, "state1 starts equal")
	t.deepEqual( state1.saga.get(0).toJS(), expected1, "state1 has a saga entry")

	var
	  state2= state1.set("toWork", "we go"),
	  expected2= {
	  	"hi": "ho",
	  	"toWork": "we go"}
	state1.putState(state2)
	t.ok( state2.saga, "state2 has a saga")
	t.ok( Immutable.Iterable.isIterable(state2.saga), "state2 aga is iterable immutable")
	t.deepEqual( state2.toJS(), expected2, "Starts equal")
	t.deepEqual( state1.saga.get(0).toJS(), expected1, "Has first saga entry")
	t.deepEqual( state1.saga.get(1).toJS(), expected2, "Has first saga entry")

	t.end()
})
