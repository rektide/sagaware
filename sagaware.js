var
  Immutable= require( "immutable")

function Sagaware( state, after){
	if(typeof state !== "object"){
		throw new Error("Invalid starting state")
	}
	if( !Immutable.Iterable.isIterable(state)){
		console.log("convert")
		state= Immutable.fromJS(state)
	}

	var saga= Immutable.List.of()
	function getSaga(){
		return saga
	}
	function putState( state){
		saga= saga.push( state)
		Object.defineProperty( state, "saga", {
			get: getSaga
		})
		Object.defineProperty( state, "putState", {
			value: putState
		})
		if(after){
			after(saga)
		}
		return state
	}
	return putState(state)
}

module.exports= Sagaware
