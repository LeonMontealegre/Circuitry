---
title: ICData
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### `ICData`
#### `public`
#### `new ICData(collection: DigitalObjectSet)`
*Description needed*

---


## Properties

*No public accessible properties on ICData*

### `name: string`
#### `private`
*Description needed*

### `transform: any`
#### `private`
*Description needed*

### `collection: DigitalObjectSet`
#### `private`
*Description needed*

### `inputPorts: InputPort[]`
#### `private`
*Description needed*

### `outputPorts: OutputPort[]`
#### `private`
*Description needed*

---


## Methods

### `calculateSize()`
#### `private`
#### `calculateSize() => void`
*Description needed*

### `createPorts()`
#### `private`
#### `createPorts(type: typeof InputPort | typeof OutputPort, ports: Port[], arr: IOObject[], side: 1 | -1) => void`
*Description needed*

### `positionPorts()`
#### `public`
#### `positionPorts() => void`
*Description needed*

### `setName()`
#### `public`
#### `setName(name: string) => void`
*Description needed*

### `setSize()`
#### `public`
#### `setSize(v: any) => void`
*Description needed*

### `getName()`
#### `public`
#### `getName() => string`
*Description needed*

### `getInputCount()`
#### `public`
#### `getInputCount() => number`
*Description needed*

### `getOutputCount()`
#### `public`
#### `getOutputCount() => number`
*Description needed*

### `getSize()`
#### `public`
#### `getSize() => any`
*Description needed*

### `getInputPort()`
#### `public`
#### `getInputPort(i: number) => InputPort`
*Description needed*

### `getOutputPort()`
#### `public`
#### `getOutputPort(i: number) => OutputPort`
*Description needed*

### `getPorts()`
#### `public`
#### `getPorts() => Port[]`
*Description needed*

### `getGroup()`
#### `public`
#### `getGroup() => DigitalObjectSet`
*Description needed*

### `copy()`
#### `public`
#### `copy() => DigitalObjectSet`
*Description needed*

---


## Static Methods


### `IsValid()`
#### `public`
#### `IsValid(objects: IOObject[] | DigitalObjectSet) => boolean`
*Description needed*

### `Create()`
#### `public`
#### `Create(objects: IOObject[]) => ICData`
*Description needed*

---
