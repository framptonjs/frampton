# Frampton-File

Frampton-File wraps the FileReader API in a Frampton.Task, a IO monad similar to a Promise.

## Installation

```sh
$ npm install --save @frampton/file
```

## Usage

Frampton-File is exposed as a commonJS module.

```typescript
import * as Files from '@frampton/file';
```

## arrayBuffer

Reads given file as an ArrayBuffer.

```typescript
import { arrayBuffer, Response } from '@frampton/file';

const selectedFile: File = document.getElementById('input').files[0];

arrayBuffer(selectedFile).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  },
  progress(prog: Response): void {
    console.log('progress: ', prog)
  }
})
```

## binaryString

Reads given file as raw binary data.

```typescript
import { binaryString, Response } from '@frampton/file';

const selectedFile: File = document.getElementById('input').files[0];

binaryString(selectedFile).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  },
  progress(prog: Response): void {
    console.log('progress: ', prog)
  }
})
```

## dataURL

Reads given file as base64 encoded data URL.

```typescript
import { dataURL, Response } from '@frampton/file';

const selectedFile: File = document.getElementById('input').files[0];

dataURL(selectedFile).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  },
  progress(prog: Response): void {
    console.log('progress: ', prog)
  }
})
```

## text

Reads given file as utf-8 encoded text.

```typescript
import { text, Response } from '@frampton/file';

const selectedFile: File = document.getElementById('input').files[0];

text(selectedFile).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  },
  progress(prog: Response): void {
    console.log('progress: ', prog)
  }
})
```