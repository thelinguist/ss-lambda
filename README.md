# ss-lambda

All aboard the S.S. Lambda!

A super-simple lambda wrapper to make Lambda easy to work with in API gateways (or function URLs). Adds simple setup and types for a JSON request body, response body, and header overrides

# installation

`npm i ss-lambda`

**WIP**

# Usage

```ts
import ssLambda from "ss-lambda"

interface ExampleReqBody {
    id: string
    myType: number
}

interface ExampleQueryStringParams {
    id: string
}

export const post = ssLambda<ExampleReqBody, ExampleQueryStringParams>(
    async event => {
        const subscription = await getSubscriptionById(event.queryStringParameters.id)
        return { subscription }
    },
    {
        validators: [headersChecker],
    }
)
```

# Validators

```ts
import { ApiError, WrapperValidator } from "ss-lambda"

const headersChecker: WrapperValidator = event => {
    if (!event.queryStringParameters.id) {
        // ApiError will always be 500 unless you specify one
        throw new ApiError("invalid request", 400)
    }
}
```

then add the function to the `opts` in ssLambda, ex:

```ts
export const post = ssLambda<ExampleReqBody, ExampleQueryStringParams>(
    async event => {
        const subscription = await getSubscriptionById(event.queryStringParameters.id)
        return { subscription }
    },
    {
        // highlight-next-line
        validators: [headersChecker],
    }
)
```
