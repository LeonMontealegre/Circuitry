---
title: Vector
description: Utility class to represent a 2D vector
---


## Overview
A representation of a vector in 2D space. Commonly used to represent points, but also sizes, rays, and any other collection of 2-numbers. 

It should be noted that although the Vector itself is *not* immutable (since its `x` and `y` properties are settable), all methods on the Vector will return new Vectors with the performed operation.

---


## Constructor 

### `V`
#### `public`
A shorthand utility constructor that allows you to construct a Vector without writing `new Vector(...)`. This is generally the preferred way to construct Vectors in OpenCircuits.
#### `V()`
Initializes a blank Vector with default x, y values of 0, 0
#### `V(other: Vector)`
Creates a Vector with the x and y values of the `other` Vector
#### `V(val: number)`
Initialize a Vector with the same x and y values as `val`
#### `V(x: number, y: number)`
Initialize a Vector with x values `x` and y value `y`

### `Vector`
#### `public`
#### `new Vector()`
Initializes a blank Vector with default x, y values of 0, 0
#### `new Vector(other: Vector)`
Creates a Vector with the x and y values of the `other` Vector
#### `new Vector(val: number)`
Initialize a Vector with the same x and y values as `val`
#### `new Vector(x: number, y: number)`
Initialize a Vector with x values `x` and y value `y`

---


## Properties

### `x: number`
#### `public`
The x-component of this Vector

### `y: number`
#### `public`
The y-component of this Vector

---


## Methods

### `add()`
#### `public`
#### `add(other: Vector): Vector`
Returns a new Vector with `this` Vector's x and y components added to `other`'s components.
#### `add(val: number): Vector`
Returns a new Vector with `this` Vector's x and y components added by `val` to each component.
#### `add(x: number, y: number): Vector`
Return a new Vector with `this` Vector's x and y components added by `x` and `y` respectively.

### `sub()`
#### `public`
#### `sub(other: Vector): Vector`
Returns a new Vector with `this` Vector's x and y components subtracted by `other`'s components.
#### `sub(val: number): Vector`
Returns a new Vector with `this` Vector's x and y components subtracted by `val` to each component.
#### `sub(x: number, y: number): Vector`
Return a new Vector with `this` Vector's x and y components subtracted by `x` and `y` respectively.

### `scale()`
#### `public`
#### `scale(other: Vector): Vector`
Returns a new Vector with `this` Vector's x and y components multiplied by `other`'s components.
#### `scale(val: number): Vector`
Returns a new Vector with `this` Vector's x and y components multiplied by `val` to each component.

### `abs()`
#### `public`
#### `abs(): Vector`
Returns a new Vector with the absolute value of `this` Vector's x and y components.

### `normalize()`
#### `public`
#### `normalize(): Vector`
Returns a new Vector as the normalized, unit directional vector of `this`. If `this` has a length of 0, the method will return a vector with components 0,0 since it is an invalid call.

### `len()`
#### `public`
#### `len(): number`
Returns the Euclidean length of the vector (i.e. the Euclidean distance between the origin and this vector => $\sqrt{x^2 + y^2}$)

### `len2()`
#### `public`
#### `len2(): number`
Returns the squared-Euclidean length of the vector. (i.e. $x^2 + y^2$). This is mainly used to compare lengths since it's much faster than `.len()`.

### `angle()`
#### `public`
#### `angle(): number`
Returns the angle (in radians) the Vector makes with the positive x-axis. Between $[-\pi, \pi]$.

### `distanceTo()`
#### `public`
#### `distanceTo(other: Vector): number`
Returns the Euclidean distance between `this` Vector and `other`.

### `dot()`
#### `public`
#### `dot(other: Vector): number`
Returns the inner product in Euclidean space (i.e. the dot product) between `this` Vector and `other`.

### `project()`
#### `public`
#### `project(other: Vector): Vector`
Returns the Euclidean projection of `this` Vector on `other`.

### `negativeReciprocal()`
#### `public`
#### `negativeReciprocal(): Vector`
Returns the negative reciprocal of this vector.

### `copy()`
#### `public`
#### `copy(): Vector`
Return a copy of this vector with the same components.

---


## Static Methods

### `min()`
#### `public`
#### `min(...vectors: Vector[]): Vector`
Returns the vector that has the individual minimum components of the provided `vectors`.

### `max()`
#### `public`
#### `max(...vectors: Vector[]): Vector`
Returns the vector that has the individual maximum components of the provided `vectors`.

### `clamp()`
#### `public`
#### `clamp(v: Vector, low: Vector, high: Vector): Vector`
Return a vector with `v`'s components clamped between the components of `low` and `high`

---