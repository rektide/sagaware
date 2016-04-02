var
  Immutable= require( "immutable")

function Sagaware( state, after){
	if( this=== global|| !this){
		return new Sagaware( state, after)
	}
	if( state== undefined){
		state= {}
	}
	if( typeof state !== "object"){
		throw new Error("Invalid starting state "+ typeof state)
	}
	if( !Immutable.Iterable.isIterable( state)){
		state= Immutable.fromJS( state)
	}

	this.saga= Immutable.List.of( state)
	Object.defineProperties(this, {
		state: {
			get: ()=> this.saga.get( 0)
		},
		clone: {
			value: ()=> {
				var s= Sagaware()
				s.saga= this.saga
				return s
			}
		},
		putState: {
			value: newState=> {
				this.saga= this.saga.unshift( newState)
				if (after){
					after( this.saga)
				}
				return this
			}
		}
	})
	return this
}

module.exports= Sagaware
