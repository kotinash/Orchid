# Orchid

JavaScript, but with extra features.

## Features

* Built-in enum support.
* Built-in library for console colors.
* `public`/`private` keywords.
* Compile-time code optimization.
* Now you can use `await` outside a function.
* Support for bundling multiple files into one (BETA).
* Extended Math library.
* A large amount of built-in functions.

## Examples

```ts
console.log("Hello, World!");
```

```ts
enum UserType {
    Default,
    Premium
}

class User {
    constructor(username, type) {
        enforceType(username, DataTypes.String);

        this.username = username;
        this.type = type;
        this.age = Math.nRandom(1, 100);
        this.isConnected = true;
    }

    private disconnect(reason) {
        if (!this.isConnected) {
            throw new Error("Cannot disconnect an already offline user.");
        }

        console.log(`${this.username} disconnected! (${reason})`);

        this.isConnected = false;
    }

    public say(message) {
        if (!isDefined(message)) {
            this.disconnect("Message is not defined.");
        }

        console.log(`${this.username} (${this.age}): ${message}`);
    }
}

if (getRunningEnv() == RunningEnvironments.Browser) {
    throw new Error("Oops! You can't run this in a browser!");
}

const user1 = new User("user1", UserType.Default);
const user2 = new User("user2", UserType.Premium);

const users = [ user1, user2 ]

user1.say("Hello!");
user1.say("I am " + user1.age + " years old!");
user1.say("The square of my age is " + Math.square(user1.age));

await sleep(1000);

user2.say("Hello!");
user2.say("I am " + user2.age + " years old!");
user2.say("The square of my age is " + Math.square(user2.age));

console.log("Random user", users.random());
```

```ts
// Bundling example

// hello.oc
module.exports = {
    main: () => {
        console.log("Hello!");
    }
}

// main.oc
hello.main();
```

## Compiling

### With Hyacinth

We strongly recommend using [Hyacinth](https://github.com/kotinash/Hyacinth) for compiling Orchid projects. It simplifies the compilation process, to just running 1 file.

### Without Hyacinth

1. Install Node.js.
1. Clone this repository.
3. Download all dependencies (`npm install`).
4. Usage:
* `npm run dev` for a development version. 
* `npm run release` for a release version. 
* `npm run bundle` for a bundled version.

## Planned features

1. Macro support.
2. Built-in logging library with support for log levels and saving the logs into a file.
