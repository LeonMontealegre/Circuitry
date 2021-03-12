---
title: Camera
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `Camera`
#### `public`
#### `new Camera(width: number, height: number, startPos: Vector, startZoom: number)`
*Description needed*

---


## Properties

*No public accessible properties on Camera*

### `pos: Vector`
#### `private`
*Description needed*

### `zoom: number`
#### `private`
*Description needed*

### `transform: Transform`
#### `private`
*Description needed*

### `mat: Matrix2x3`
#### `private`
*Description needed*

### `inv: Matrix2x3`
#### `private`
*Description needed*

### `width: number`
#### `private`
*Description needed*

### `height: number`
#### `private`
*Description needed*

### `dirty: boolean`
#### `private`
*Description needed*

---


## Methods

### `updateMatrix()`
#### `private`
#### `updateMatrix() => void`
*Description needed*

### `resize()`
#### `public`
#### `resize(width: number, height: number) => void`
*Description needed*

### `setPos()`
#### `public`
#### `setPos(pos: Vector) => void`
*Description needed*

### `setZoom()`
#### `public`
#### `setZoom(zoom: number) => void`
*Description needed*

### `translate()`
#### `public`
#### `translate(dv: Vector) => void`
*Description needed*

### `zoomTo()`
#### `public`
#### `zoomTo(c: Vector, z: number) => void`
*Description needed*

### `zoomBy()`
#### `public`
#### `zoomBy(s: number) => void`
*Description needed*

### `cull()`
#### `public`
#### `cull(transform: Transform) => boolean`
*Description needed*

### `getCenter()`
#### `public`
#### `getCenter() => Vector`
*Description needed*

### `getPos()`
#### `public`
#### `getPos() => Vector`
*Description needed*

### `getZoom()`
#### `public`
#### `getZoom() => number`
*Description needed*

### `getTransform()`
#### `public`
#### `getTransform() => Transform`
*Description needed*

### `getMatrix()`
#### `public`
#### `getMatrix() => Matrix2x3`
*Description needed*

### `getInverseMatrix()`
#### `public`
#### `getInverseMatrix() => Matrix2x3`
*Description needed*

### `getScreenPos()`
#### `public`
#### `getScreenPos(v: Vector) => Vector`
*Description needed*

### `getWorldPos()`
#### `public`
#### `getWorldPos(v: Vector) => Vector`
*Description needed*

---


## Static Methods

*No static methods on Camera*

---
