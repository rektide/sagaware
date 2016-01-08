var
  Immutable= require( "immutable")

function Sagaware( state, after){
	if(typeof state !== "object"){
		throw new Error("Invalid starting state")
	}
	if( !Immutable.Iterable.isIterable){
		state= Immutable.fromJS(state)
	}

	var saga= Immutable.List.of()
	function saga(){
		return saga
	}
	function putState( state){
		saga= saga.push( state)
		Object.defineProperty( state, "saga", {
			get: saga
		})
		if(after){
			after(saga)
		}
		return state
	}
	return putState(state)
}

module.exports= Sagaware
