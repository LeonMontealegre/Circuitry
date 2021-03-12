---
title: HistoryManager
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `HistoryManager`
#### `public`
#### `new HistoryManager()`
*Description needed*

---


## Properties

*No public accessible properties on HistoryManager*

### `undoStack: Action[]`
#### `private`
*Description needed*

### `redoStack: Action[]`
#### `private`
*Description needed*

### `disabled: boolean`
#### `private`
*Description needed*

### `callbacks: HistoryCallback[]`
#### `private`
*Description needed*

---


## Methods

### `callback()`
#### `private`
#### `callback(type: HistoryCallbackType) => void`
*Description needed*

### `addCallback()`
#### `public`
#### `addCallback(callback: HistoryCallback) => void`
*Description needed*

### `removeCallback()`
#### `public`
#### `removeCallback(callback: HistoryCallback) => void`
*Description needed*

### `setDisabled()`
#### `public`
#### `setDisabled(disabled?: boolean) => void`
*Description needed*

### `add()`
#### `public`
#### `add(action: Action) => HistoryManager`
*Description needed*

### `undo()`
#### `public`
#### `undo() => HistoryManager`
*Description needed*

### `redo()`
#### `public`
#### `redo() => HistoryManager`
*Description needed*

### `reset()`
#### `public`
#### `reset() => void`
*Description needed*

---


## Static Methods

*No static methods on HistoryManager*

---
