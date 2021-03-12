---
title: Transform
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `Transform`
#### `public`
#### `new Transform(pos: Vector, size: Vector, angle: number)`
*Description needed*

---


## Properties

*No public accessible properties on Transform*

### `parent: Transform`
#### `private`
*Description needed*

### `pos: Vector`
#### `private`
*Description needed*

### `scale: Vector`
#### `private`
*Description needed*

### `angle: number`
#### `private`
*Description needed*

### `size: Vector`
#### `private`
*Description needed*

### `corners: Vector[]`
#### `private`
*Description needed*

### `localCorners: Vector[]`
#### `private`
*Description needed*

### `dirty: boolean`
#### `private`
*Description needed*

### `dirtySize: boolean`
#### `private`
*Description needed*

### `dirtyCorners: boolean`
#### `private`
*Description needed*

### `prevParentMatrix: Matrix2x3`
#### `private`
*Description needed*

### `matrix: Matrix2x3`
#### `private`
*Description needed*

### `inverse: Matrix2x3`
#### `private`
*Description needed*

### `radius: number`
#### `private`
*Description needed*

---


## Methods

### `updateMatrix()`
#### `private`
#### `updateMatrix() => void`
*Description needed*

### `updateSize()`
#### `private`
#### `updateSize() => void`
*Description needed*

### `updateCorners()`
#### `private`
#### `updateCorners() => void`
*Description needed*

### `rotateAbout()`
#### `public`
#### `rotateAbout(a: number, c: Vector) => void`
*Description needed*

### `setRotationAbout()`
#### `public`
#### `setRotationAbout(a: number, c: Vector) => void`
*Description needed*

### `setParent()`
#### `public`
#### `setParent(t: Transform) => void`
*Description needed*

### `setPos()`
#### `public`
#### `setPos(p: Vector) => void`
*Description needed*

### `setAngle()`
#### `public`
#### `setAngle(a: number) => void`
*Description needed*

### `setScale()`
#### `public`
#### `setScale(s: Vector) => void`
*Description needed*

### `setSize()`
#### `public`
#### `setSize(s: Vector) => void`
*Description needed*

### `setWidth()`
#### `public`
#### `setWidth(w: number) => void`
*Description needed*

### `setHeight()`
#### `public`
#### `setHeight(h: number) => void`
*Description needed*

### `toLocalSpace()`
#### `public`
#### `toLocalSpace(v: Vector) => Vector`
*Description needed*

### `toWorldSpace()`
#### `public`
#### `toWorldSpace(v: Vector) => Vector`
*Description needed*

### `getParent()`
#### `public`
#### `getParent() => Transform`
*Description needed*

### `getPos()`
#### `public`
#### `getPos() => Vector`
*Description needed*

### `getAngle()`
#### `public`
#### `getAngle() => number`
*Description needed*

### `getScale()`
#### `public`
#### `getScale() => Vector`
*Description needed*

### `getSize()`
#### `public`
#### `getSize() => Vector`
*Description needed*

### `getRadius()`
#### `public`
#### `getRadius() => number`
*Description needed*

### `getMatrix()`
#### `public`
#### `getMatrix() => Matrix2x3`
*Description needed*

### `getInverseMatrix()`
#### `public`
#### `getInverseMatrix() => Matrix2x3`
*Description needed*

### `getTopLeft()`
#### `public`
#### `getTopLeft() => Vector`
*Description needed*

### `getTopRight()`
#### `public`
#### `getTopRight() => Vector`
*Description needed*

### `getBottomRight()`
#### `public`
#### `getBottomRight() => Vector`
*Description needed*

### `getBottomLeft()`
#### `public`
#### `getBottomLeft() => Vector`
*Description needed*

### `getCorners()`
#### `public`
#### `getCorners() => Vector[]`
*Description needed*

### `getLocalCorners()`
#### `public`
#### `getLocalCorners() => Vector[]`
*Description needed*

### `copy()`
#### `public`
#### `copy() => Transform`
*Description needed*

---


## Static Methods


### `fromCorners()`
#### `public`
#### `fromCorners(p1: Vector, p2: Vector) => Transform`
*Description needed*

---
