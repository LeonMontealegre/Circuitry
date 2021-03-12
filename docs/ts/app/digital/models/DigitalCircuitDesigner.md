---
title: DigitalCircuitDesigner
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `DigitalCircuitDesigner`
#### `public`
#### `new DigitalCircuitDesigner(propagationTime: number)`
*Description needed*

---


## Properties

*No public accessible properties on DigitalCircuitDesigner*

### `ics: ICData[]`
#### `private`
*Description needed*

### `objects: DigitalComponent[]`
#### `private`
*Description needed*

### `wires: DigitalWire[]`
#### `private`
*Description needed*

### `propagationQueue: Propagation[]`
#### `private`
*Description needed*

### `updateRequests: number`
#### `private`
*Description needed*

### `propagationTime: number`
#### `private`
*Description needed*

### `updateCallbacks: ((ev: DigitalEvent) => void)[]`
#### `private`
*Description needed*

---


## Methods

### `reset()`
#### `public`
#### `reset() => void`
*Description needed*

### `addCallback()`
#### `public`
#### `addCallback(callback: (ev: DigitalEvent) => void) => void`
*Description needed*

### `removeCallback()`
#### `public`
#### `removeCallback(callback: (ev: DigitalEvent) => void) => void`
*Description needed*

### `callback()`
#### `private`
#### `callback(ev: DigitalEvent) => void`
*Description needed*

### `forceUpdate()`
#### `public`
#### `forceUpdate() => void`
*Description needed*

### `propagate()`
#### `public`
#### `propagate(receiver: DigitalComponent | DigitalWire, signal: boolean) => void`
*Description needed*

### `update()`
#### `private`
#### `update() => boolean`
*Description needed*

### `createWire()`
#### `public`
#### `createWire(p1: OutputPort, p2?: InputPort): DigitalWire`
*Description needed*
#### `createWire(p2: InputPort, p1?: OutputPort): DigitalWire`
*Description needed*

### `addGroup()`
#### `public`
#### `addGroup(group: IOObjectSet) => void`
*Description needed*

### `addICData()`
#### `public`
#### `addICData(data: ICData) => void`
*Description needed*

### `removeICData()`
#### `public`
#### `removeICData(data: ICData) => void`
*Description needed*

### `addObjects()`
#### `public`
#### `addObjects(objects: DigitalComponent[]) => void`
*Description needed*

### `addObject()`
#### `public`
#### `addObject(obj: DigitalComponent) => void`
*Description needed*

### `addWire()`
#### `public`
#### `addWire(wire: DigitalWire) => void`
*Description needed*

### `remove()`
#### `public`
#### `remove(o: DigitalComponent | DigitalWire) => void`
*Description needed*

### `removeObject()`
#### `public`
#### `removeObject(obj: DigitalComponent) => void`
*Description needed*

### `removeWire()`
#### `public`
#### `removeWire(wire: DigitalWire) => void`
*Description needed*

### `replace()`
#### `public`
#### `replace(designer: DigitalCircuitDesigner) => void`
*Description needed*

### `shift()`
#### `public`
#### `shift(obj: DigitalComponent | DigitalWire, i?: number) => number`
*Description needed*

### `getGroup()`
#### `public`
#### `getGroup() => DigitalObjectSet`
*Description needed*

### `getObjects()`
#### `public`
#### `getObjects() => DigitalComponent[]`
*Description needed*

### `getWires()`
#### `public`
#### `getWires() => DigitalWire[]`
*Description needed*

### `getICData()`
#### `public`
#### `getICData() => ICData[]`
*Description needed*

---


## Static Methods

*No static methods on DigitalCircuitDesigner*

---
