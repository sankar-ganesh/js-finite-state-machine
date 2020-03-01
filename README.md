# js-finite-state-machine

Javascript Finite State Machine

[![Build Status](https://travis-ci.org/sankar-ganesh/js-finite-state-machine.svg?branch=master)](https://travis-ci.org/sankar-ganesh/js-finite-state-machine) [![codecov](https://codecov.io/gh/sankar-ganesh/js-finite-state-machine/branch/master/graph/badge.svg)](https://codecov.io/gh/sankar-ganesh/js-finite-state-machine) [![NPM version](https://img.shields.io/npm/v/js-finite-state-machine.svg)](https://www.npmjs.com/package/js-finite-state-machine) [![gzip size](https://img.badgesize.io/https://unpkg.com/js-finite-state-machine/dist/fsm.js?compression=gzip)](https://www.npmjs.com/package/js-finite-state-machine) [![dependencies Status](https://david-dm.org/sankar-ganesh/js-finite-state-machine/status.svg)](https://david-dm.org/sankar-ganesh/js-finite-state-machine)

## Design

- `entity` any distinct javascript object

- `state` any particular condition of the `entity` in a specific time

- `transition` period of changing from one `state` or condition to another

- `lifecycle` series of changes in the life of an `entity`

- `fsm` javascript object to represent the finite number of `state` & `transition` for a particular `entity`

## API

### setFSMId

Sets the unique id for the fsm object

**Parameters**

- `id` identifier for the fsm object

**Example**

- `fsm.setFSMId(id)` sets the unique identifier `id` for the fsm object

### getFSMId

Returns the unique id for the fsm object

**Example**

- `fsm.getFSMId()` returns the identifier for the fsm object

### setFSMName

Sets the unique name for the fsm object

**Parameters**

- `name` name for the fsm object

**Example**

- `fsm.setFSMName(name)` sets the unique `name` for the fsm object

### getFSMName

Returns the unique name for the fsm object

**Example**

- `fsm.getFSMName()` returns the name for the fsm object

### getEntity

Returns the fsm entity object

**Example**

- `fsm.getEntity()` returns the fsm `entity` object

### getEntityId

Returns the fsm entity object identifier

**Example**

- `fsm.getEntityId()` returns the fsm `entity` object identifier

### getEntityName

Returns the fsm entity object name

**Example**

- `fsm.getEntityName()` returns the fsm `entity` object name

### setEntityState

Sets the current state for the fsm entity object

**Parameters**

- `state` the current state for the fsm `entity` object

**Example**

- `fsm.setEntityState(state)` sets the current `state` for the fsm `entity` object

### getEntityState

Returns the fsm entity object current state

**Example**

- `fsm.getEntityState()` returns the fsm `entity` object `state`

### setStates

Sets all possible states for the fsm entity object

**Parameters**

- `states` array of states for the fsm `entity` object

**Example**

- `fsm.setStates(states)` sets all possible `state` for the fsm `entity` object

### getStates

Returns the array of all possible states for the fsm entity object

**Example**

- `fsm.getStates()` returns the array of `state` for the fsm `entity` object

### setTransitions

Sets all possible transitions for the fsm entity object

**Parameters**

- `transitions` array of transitions for the fsm `entity` object

**Example**

- `fsm.setTransitions(transitions)` sets all possible `transition` for the fsm `entity` object

### getTransitions

Returns the array of all possible transitions for the fsm entity object

**Example**

- `fsm.getTransitions()` returns the array of `transition` for the fsm `entity` object

## Usage

```javascript
// Sample Marketplace Design

let onSaleEnter = function() {
    	console.log('Printing Sale Enter...')
    },
    onSaleLeave = function() {
    	console.log('Printing Sale Leave...')
    },
    onSaleReached = function() {
    	console.log('Printing Sale Reached...')
    },
    onSaleEntered = function() {
    	console.log('Printing Sale Entered...')
    },
    onSaleLeft = function() {
    	console.log('Printing Sale Left...')
    },
    onWishListEnter = function() {
    	console.log('Printing WishList Enter...')
    },
    onWishListLeave = function() {
    	console.log('Printing WishList Leave...')
    },
    onWishListReached = function() {
    	console.log('Printing WishList Reached...')
    },
    onWishListEntered = function() {
    	console.log('Printing WishList Entered...')
    },
    onWishListLeft = function() {
    	console.log('Printing WishList Left...')
    },
    onCartEnter = function() {
    	console.log('Printing Cart Enter...')
    },
    onCartLeave = function() {
    	console.log('Printing Cart Leave...')
    },
    onCartReached = function() {
    	console.log('Printing Cart Reached...')
    },
    onCartEntered = function() {
    	console.log('Printing Cart Entered...')
    },
    onCartLeft = function() {
    	console.log('Printing Cart Left...')
    },
    onSoldEnter = function() {
    	console.log('Printing Sold Enter...')
    },
    onSoldLeave = function() {
    	console.log('Printing Sold Leave...')
    },
    onSoldReached = function() {
    	console.log('Printing Sold Reached...')
    },
    onSoldEntered = function() {
    	console.log('Printing Sold Entered...')
    },
    onSoldLeft = function() {
    	console.log('Printing Sold Left...')
    },
    onReturnEnter = function() {
    	console.log('Printing Return Enter...')
    },
    onReturnLeave = function() {
    	console.log('Printing Return Leave...')
    },
    onReturnReached = function() {
    	console.log('Printing Return Reached...')
    },
    onReturnEntered = function() {
    	console.log('Printing Return Entered...')
    },
    onReturnLeft = function() {
    	console.log('Printing Return Left...')
    },
    onRevertPaymentEnter = function() {
    	console.log('Printing Revert Payment Enter...')
    },
    onRevertPaymentLeave = function() {
    	console.log('Printing Revert Payment Leave...')
    },
    onRevertPaymentReached = function() {
    	console.log('Printing Revert Payment Reached...')
    },
    onRevertPaymentEntered = function() {
    	console.log('Printing Revert Payment Entered...')
    },
    onRevertPaymentLeft = function() {
    	console.log('Printing Revert Payment Left...')
    },
    onAddToWishListBefore = function() {
    	console.log('Printing AddToWishList Before...')
    },
    onAddToWishListAfter = function() {
    	console.log('Printing AddToWishList After...')
    },
    onAddToWishListStart = function() {
    	console.log('Printing AddToWishList Start...')
    },
    onRemoveFromWishListBefore = function() {
    	console.log('Printing RemoveFromWishList Before...')
    },
    onRemoveFromWishListAfter = function() {
    	console.log('Printing RemoveFromWishList After...')
    },
    onRemoveFromWishListStart = function() {
    	console.log('Printing RemoveFromWishList Start...')
    },
    onAddToCartBefore = function() {
    	console.log('Printing AddToCart Before...')
    },
    onAddToCartAfter = function() {
    	console.log('Printing AddToCart After...')
    },
    onAddToCartStart = function() {
    	console.log('Printing AddToCart Start...')
    },
    onRemoveFromCartBefore = function() {
    	console.log('Printing RemoveFromCart Before...')
    },
    onRemoveFromCartAfter = function() {
    	console.log('Printing RemoveFromCart After...')
    },
    onRemoveFromCartStart = function() {
    	console.log('Printing RemoveFromCart Start...')
    },
    onAddFromWishListToCartBefore = function() {
    	console.log('Printing AddFromWishListToCart Before...')
    },
    onAddFromWishListToCartAfter = function() {
    	console.log('Printing AddFromWishListToCart After...')
    },
    onAddFromWishListToCartStart = function() {
    	console.log('Printing AddFromWishListToCart Start...')
    },
    onPayCartItemBefore = function() {
    	console.log('Printing onPayCartItem Before...')
    },
    onPayCartItemAfter = function() {
    	console.log('Printing onPayCartItem After...')
    },
    onPayCartItemStart = function() {
    	console.log('Printing onPayCartItem Start...')
    },
		onReturnItemBefore = function() {
    	console.log('Printing onReturnItem Before...')
    },
    onReturnItemAfter = function() {
    	console.log('Printing onReturnItem After...')
    },
    onReturnItemStart = function() {
    	console.log('Printing onReturnItem Start...')
    },
		onRevertPaymentBefore = function() {
    	console.log('Printing onRevertPayment Before...')
    },
    onRevertPaymentAfter = function() {
    	console.log('Printing onRevertPayment After...')
    },
    onRevertPaymentStart = function() {
    	console.log('Printing onRevertPayment Start...')
    },
    onReturnToSaleBefore = function() {
    	console.log('Printing Return To Sale Before...')
    },
    onReturnToSaleAfter = function() {
    	console.log('Printing Return To Sale After...')
    },
    onReturnToSaleStart = function() {
    	console.log('Printing Return To Sale Start...')
    };

	let onSale = new window.FSM.State({
        id: 'onSale',
        name: 'onSale',
        methods: {
          enter: onSaleEnter,
          leave: onSaleLeave,
          entered: onSaleEntered,
          left: onSaleLeft,
          reached: onSaleReached
        }
      }),
      onWishList = new window.FSM.State({
        id: 'onWishList',
        name: 'onWishList',
        methods: {
          enter: onWishListEnter,
          leave: onWishListLeave,
          entered: onWishListEntered,
          left: onWishListLeft,
          reached: onWishListReached
        }
      }),
      onCart = new window.FSM.State({
        id: 'onCart',
        name: 'onCart',
        methods: {
          enter: onCartEnter,
          leave: onCartLeave,
          entered: onCartEntered,
          left: onCartLeft,
          reached: onCartReached
        }
      }),
			onSold = new window.FSM.State({
        id: 'onSold',
        name: 'onSold',
        methods: {
          enter: onSoldEnter,
          leave: onSoldLeave,
          entered: onSoldEntered,
          left: onSoldLeft,
          reached: onSoldReached
        }
      }),
			onReturn = new window.FSM.State({
        id: 'onReturn',
        name: 'onReturn',
        methods: {
          enter: onReturnEnter,
          leave: onReturnLeave,
          entered: onReturnEntered,
          left: onReturnLeft,
          reached: onReturnReached
        }
      }),
      onRevertPayment = new window.FSM.State({
        id: 'onRevertPayment',
        name: 'onRevertPayment',
        methods: {
          enter: onRevertPaymentEnter,
          leave: onRevertPaymentLeave,
          entered: onRevertPaymentEntered,
          left: onRevertPaymentLeft,
          reached: onRevertPaymentReached
        }
      }),
      marketplaceItem = new window.FSM.Entity({id: 'marketplaceItem', name: 'marketplaceItem', state: onSale}),
      addToWishList = new window.FSM.Transition({
        id: 'addToWishList',
        name: 'addToWishList',
        from: [onSale, onCart],
        to: onWishList,
        methods: {
          start: onAddToWishListStart,
          after: onAddToWishListAfter,
          before: onAddToWishListBefore
        }
      }),
      removeFromWishList = new window.FSM.Transition({
        id: 'removeFromWishList',
        name: 'removeFromWishList',
        from: [onWishList],
        to: onSale,
        methods: {
          start: onRemoveFromWishListStart,
          after: onRemoveFromWishListAfter,
          before: onRemoveFromWishListBefore
        }
      }),
      addToCart = new window.FSM.Transition({
        id: 'addToCart',
        name: 'addToCart',
        from: [onSale, onWishList],
        to: onCart,
        methods: {
          start: onAddToCartStart,
          after: onAddToCartAfter,
          before: onAddToCartBefore
        }
      }),
      removeFromCart = new window.FSM.Transition({
        id: 'removeFromCart',
        name: 'removeFromCart',
        from: [onCart],
        to: onSale,
        methods: {
          start: onRemoveFromCartStart,
          after: onRemoveFromCartAfter,
          before: onRemoveFromCartBefore
        }
      }),
      payCartItem = new window.FSM.Transition({
        id: 'payCartItem',
        name: 'payCartItem',
        from: [onCart],
        to: onSold,
        methods: {
          start: onPayCartItemStart,
          after: onPayCartItemAfter,
          before: onPayCartItemBefore
        }
      }),
      returnItem = new window.FSM.Transition({
        id: 'returnItem',
        name: 'returnItem',
        from: [onSold],
        to: onReturn,
        methods: {
          start: onReturnItemStart,
          after: onReturnItemAfter,
          before: onReturnItemBefore
        }
      }),
      revertPayment = new window.FSM.Transition({
        id: 'revertPayment',
        name: 'revertPayment',
        from: [onReturn],
        to: onRevertPayment,
        methods: {
          start: onRevertPaymentStart,
          after: onRevertPaymentAfter,
          before: onRevertPaymentBefore
        }
      }),
      returnToSale = new window.FSM.Transition({
        id: 'returnToSale',
        name: 'returnToSale',
        from: [onRevertPayment],
        to: onSale,
        methods: {
          start: onReturnToSaleStart,
          after: onReturnToSaleAfter,
          before: onReturnToSaleBefore
        }
      });

// Initially the marketplace item is available for sale
let marketplaceFSM = new window.FSM({
  id: "marketplaceFSMId",
  name: "marketplaceFSMName",
  entity: marketplaceItem,
  states: [onSale, onCart, onWishList, onSold, onReturn, onRevertPayment],
  transitions: [addToWishList, removeFromWishList, addToCart, removeFromCart, payCartItem, returnItem, revertPayment, returnToSale]
});

// To add the marketplace item to the wish list
marketplaceFSM.addToWishList();

// To remove the marketplace item from the wish list
marketplaceFSM.removeFromWishList();

// To add the marketplace item from sale / wish list to the cart
marketplaceFSM.addToCart();

// To remove the marketplace item from the cart
marketplaceFSM.removeFromCart();

// To checkout the marketplace item placed in the cart
marketplaceFSM.payCartItem();

// To return the purchased marketplace item
marketplaceFSM.returnItem();

// To revert back the payment for the returned marketplace item
marketplaceFSM.revertPayment();

// To return back the returned item and put it back on sale
marketplaceFSM.returnToSale();

// To track all events
marketplaceFSM.setEventCallback(function(eventType, payload) {
  /*
   * Transition Event Types
   *   a) transition.start
   *   b) transition.before
   *   c) transition.after
   *
   * State Event Types
   *   a) state.leave
   *   b) state.left
   *   c) state.enter
   *   d) state.entered
   *   e) state.reached
   *
   * Paylooad is the transition object
   */
});

// To stop tracking all events
marketplaceFSM.resetEventCallback();
```

## Installation

* `yarn add js-finite-state-machine`