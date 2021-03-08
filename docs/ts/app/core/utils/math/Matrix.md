---
title: Matrix 2x3
description: Utility class to represent a 2x3 Matrix
---


## Overview
A representation of a 2x3 Matrix. Commonly used to represent the transform of a 2D object.
This matrix really represents a 3x3 matrix with the last row being $[0, 0, 1]$.
The first two columns represent the scale and rotation of the object (indices [0, 3]), while the last column represents the translation of the object (indices [4, 5]).

The indices are laid out in column-major order:
$$
\begin{bmatrix}
0 & 2 & 4 \\
1 & 3 & 5
\end{bmatrix}
$$

---


## Constructor 

### `Matrix2x3`
#### `new Matrix2x3()`
Initializes a 2x3 Identity Matrix with all zeros except indices 0, 3 as ones.
#### `new Matrix2x3(other: Matrix2x3)`
Creates a 2x3 Matrix with values copied from `other`.

---


## Properties

*No publicly accessible properties on Matrix2x3*

---


## Methods

### `zero()`
#### `zero(): Matrix2x3`
Sets all of the values in `this` Matrix to 0.

### `identity()`
#### `identity(): Matrix2x3`
Zeros all the values in `this` Matrix except at index 0 and 3 which are set to 1 to represent an Identity matrix.

### `mul()`
#### `mul(other: Vector): Vector`
Return the result of `this` Matrix multiplied by the `other` Vector, resulting in a Vector.

### `mult()`
#### `mult(other: Matrix2x3): Matrix2x3`
Returns the result of `this` Matrix multiplied with the `other` Matrix, resulting in another 2x3 Matrix.

### `setTranslation(t: Vector)`
#### `setTranslation(t: Vector): void`
Sets the translation of `this` Matrix (last column) to `t`. 

### `translate()`
#### `translate(t: Vector): void`
Adds the given translation, `t`, to the current translation (last column) of this `this` Matrix.

### `rotate()`
#### `rotate(theta: number): void`
Rotates `this` matrix by `theta` (in radians).

### `scale()`
#### `scale(s: Vector): void`
Scales `this` matrix non-uniformly by the given vector, `s`.
#### `scale(s: number): void`
Scales `this` matrix uniformly by the given scalar, `s`.

### `inverse()`
#### `inverse(): Matrix2x3`
Returns a new matrix that is the inverse of `this` matrix, (i.e. `this.mult(this.inverse()) === identity()`).

### `get()`
#### `get(i: number): number`
Returns the matrix element at index `i`. ($i \in [0, 5]$).

### `getTranslation()`
#### `getTranslation(): Vector`
Returns the translation of `this` matrix, (the last column).

### `equals()`
#### `equals(other: Matrix2x3): boolean`
Returns whether or not `this` matrix has the same components as `other`.

### `copy()`
#### `copy(): Vector`
Return a copy of this vector with the same components.

### `print()`
#### `print(): void`
Prints `this` matrix to the console.

---


## Static Methods

*No static methods on Matrix2x3*

---