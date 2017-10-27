# Frampton-Http

Wraps the XMLHttpRequest object in a Frampton.Task, an IO monad similar to a Promise.


## Installation

Frampton is a set of small libraries. Many of them are peer-dependent.

```sh
$ npm install --save @frampton/http
```

## Usage

Frampton-Http wraps the most common Http request methods in easy to use functions that return predictable wrapper objects that allow safe and convinient usage of remote endpoints.

### deleteRequest

```typescript
import { deleteRequest, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith'
}

deleteRequest('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### getRequest

```typescript
import { getRequest, Response } from '@frampton/http'

getRequest('http://mysite.com').run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### patchRequest

```typescript
import { patchRequest, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@fake.com'
}

patchRequest('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### postJSON

Post data as 'Content-Type': 'application/json'.

```typescript
import { postJSON, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@fake.com'
}

postJSON('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### postString

Post data as 'Content-Type': 'application/x-www-form-urlencoded'. If an object is passed this method will url encode the data.

```typescript
import { postString, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@fake.com'
}

postString('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### postRequest

Post data as 'Content-Type': 'application/x-www-form-urlencoded'.

```typescript
import { postRequest, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@fake.com'
}

postRequest('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### putRequest

```typescript
import { putRequest, Response } from '@frampton/http'

const user: User = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@fake.com'
}

putRequest('http://mysite.com', user).run({
  reject(err: any): void {
    console.log('error: ', err)
  },
  resolve(res: Response): void {
    console.log('response: ', res)
  }
})
```

### uploadMany

Upload an array of files.

```typescript
import { uploadMany, Response } from '@frampton/http'

const files: Array<File> = [ file1, file2, file3 ]

uploadMany('http://mysite.com', files).run({
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

### upload

Upload a single file.

```typescript
import { upload, Response } from '@frampton/http'

upload('http://mysite.com', file).run({
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