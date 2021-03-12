---
title: Input
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `Input`
#### `public`
#### `new Input(canvas: HTMLCanvasElement, dragTime: number)`
*Description needed*

---


## Properties

*No public accessible properties on Input*

### `canvas: HTMLCanvasElement`
#### `private`
*Description needed*

### `prevMousePos: any`
#### `private`
*Description needed*

### `mousePos: any`
#### `private`
*Description needed*

### `mouseDown: boolean`
#### `private`
*Description needed*

### `mouseDownPos: any`
#### `private`
*Description needed*

### `mouseDownButton: number`
#### `private`
*Description needed*

### `isDragging: boolean`
#### `private`
*Description needed*

### `startTapTime: number`
#### `private`
*Description needed*

### `touchCount: number`
#### `private`
*Description needed*

### `listeners: Listener[]`
#### `private`
*Description needed*

### `keysDown: Map<number, boolean>`
#### `private`
*Description needed*

### `dragTime: number`
#### `private`
*Description needed*

### `blocked: boolean`
#### `private`
*Description needed*

---


## Methods

### `isPreventedCombination()`
#### `private`
#### `isPreventedCombination(newKey: number) => boolean`
*Description needed*

### `hookupKeyboardEvents()`
#### `private`
#### `hookupKeyboardEvents() => void`
*Description needed*

### `hookupMouseEvents()`
#### `private`
#### `hookupMouseEvents() => void`
*Description needed*

### `hookupTouchEvents()`
#### `private`
#### `hookupTouchEvents() => void`
*Description needed*

### `setupHammer()`
#### `private`
#### `setupHammer() => void`
*Description needed*

### `reset()`
#### `public`
#### `reset() => void`
*Description needed*

### `block()`
#### `public`
#### `block() => void`
*Description needed*

### `unblock()`
#### `public`
#### `unblock() => void`
*Description needed*

### `addListener()`
#### `public`
#### `addListener(listener: Listener) => void`
*Description needed*

### `isMouseDown()`
#### `public`
#### `isMouseDown() => boolean`
*Description needed*

### `isKeyDown()`
#### `public`
#### `isKeyDown(key: number) => boolean`
*Description needed*

### `isShiftKeyDown()`
#### `public`
#### `isShiftKeyDown() => boolean`
*Description needed*

### `isModifierKeyDown()`
#### `public`
#### `isModifierKeyDown() => boolean`
*Description needed*

### `isOptionKeyDown()`
#### `public`
#### `isOptionKeyDown() => boolean`
*Description needed*

### `getMousePos()`
#### `public`
#### `getMousePos() => any`
*Description needed*

### `getMouseDownPos()`
#### `public`
#### `getMouseDownPos() => any`
*Description needed*

### `getDeltaMousePos()`
#### `public`
#### `getDeltaMousePos() => any`
*Description needed*

### `getTouchCount()`
#### `public`
#### `getTouchCount() => number`
*Description needed*

### `onKeyDown()`
#### `protected`
#### `onKeyDown(key: number) => void`
*Description needed*

### `onKeyUp()`
#### `protected`
#### `onKeyUp(key: number) => void`
*Description needed*

### `onClick()`
#### `protected`
#### `onClick(_: any, button?: number) => void`
*Description needed*

### `onDoubleClick()`
#### `protected`
#### `onDoubleClick(button: number) => void`
*Description needed*

### `onScroll()`
#### `protected`
#### `onScroll(delta: number) => void`
*Description needed*

### `onMouseDown()`
#### `protected`
#### `onMouseDown(pos: any, button?: number) => void`
*Description needed*

### `onMouseMove()`
#### `protected`
#### `onMouseMove(pos: any) => void`
*Description needed*

### `onMouseUp()`
#### `protected`
#### `onMouseUp(button?: number) => void`
*Description needed*

### `onMouseEnter()`
#### `protected`
#### `onMouseEnter() => void`
*Description needed*

### `onMouseLeave()`
#### `protected`
#### `onMouseLeave() => void`
*Description needed*

### `onTouchStart()`
#### `protected`
#### `onTouchStart(touches: any[]) => void`
*Description needed*

### `onTouchMove()`
#### `protected`
#### `onTouchMove(touches: any[]) => void`
*Description needed*

### `onTouchEnd()`
#### `protected`
#### `onTouchEnd() => void`
*Description needed*

### `onBlur()`
#### `protected`
#### `onBlur() => void`
*Description needed*

### `callListeners()`
#### `private`
#### `callListeners(event: Event) => void`
*Description needed*

---


## Static Methods

*No static methods on Input*

---
