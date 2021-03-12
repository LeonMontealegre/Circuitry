---
title: BezierCurve
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `BezierCurve`
#### `public`
#### `new BezierCurve(p1: Vector, p2: Vector, c1: Vector, c2: Vector)`
*Description needed*

---


## Properties

*No public accessible properties on BezierCurve*

### `p1: Vector`
#### `private`
*Description needed*

### `p2: Vector`
#### `private`
*Description needed*

### `c1: Vector`
#### `private`
*Description needed*

### `c2: Vector`
#### `private`
*Description needed*

### `boundingBox: Transform`
#### `private`
*Description needed*

### `dirty: boolean`
#### `private`
*Description needed*

---


## Methods

### `getT()`
#### `private`
#### `getT(a: number, b: number, c: number, mod: 1 | -1, end: number) => number`
*Description needed*

### `updateBoundingBox()`
#### `private`
#### `updateBoundingBox() => void`
*Description needed*

### `setP1()`
#### `public`
#### `setP1(v: Vector) => void`
*Description needed*

### `setP2()`
#### `public`
#### `setP2(v: Vector) => void`
*Description needed*

### `setC1()`
#### `public`
#### `setC1(v: Vector) => void`
*Description needed*

### `setC2()`
#### `public`
#### `setC2(v: Vector) => void`
*Description needed*

### `getP1()`
#### `public`
#### `getP1() => Vector`
*Description needed*

### `getP2()`
#### `public`
#### `getP2() => Vector`
*Description needed*

### `getC1()`
#### `public`
#### `getC1() => Vector`
*Description needed*

### `getC2()`
#### `public`
#### `getC2() => Vector`
*Description needed*

### `getX()`
#### `public`
#### `getX(t: number) => number`
*Description needed*

### `getY()`
#### `public`
#### `getY(t: number) => number`
*Description needed*

### `getPos()`
#### `public`
#### `getPos(t: number) => Vector`
*Description needed*

### `getDX()`
#### `public`
#### `getDX(t: number) => number`
*Description needed*

### `getDY()`
#### `public`
#### `getDY(t: number) => number`
*Description needed*

### `getDerivative()`
#### `public`
#### `getDerivative(t: number) => Vector`
*Description needed*

### `getDDX()`
#### `public`
#### `getDDX(t: number) => number`
*Description needed*

### `getDDY()`
#### `public`
#### `getDDY(t: number) => number`
*Description needed*

### `get2ndDerivative()`
#### `public`
#### `get2ndDerivative(t: number) => Vector`
*Description needed*

### `getBoundingBox()`
#### `public`
#### `getBoundingBox() => Transform`
*Description needed*

---


## Static Methods

*No static methods on BezierCurve*

---
