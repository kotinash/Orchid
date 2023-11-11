# Orchid

JavaScript, but with extra features.

## Features

* Built-in enum support.
* Built-in library for console colors.
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
    constructor(username, type, age = Math.nRandom(1, 100)) {
        enforceType(username, DataTypes.String);
        enforceType(age, DataTypes.Number);

        this.username = username;
        this.type = type;
        this.age = age;
    }

    say(message) {
        if (!isDefined(message)) {
            throw new Error("Oops! Message is not defined");
        }

        console.log(`${this.username}: ${message}`);
    }
}

if (getRunningEnv() == RunningEnvironments.Browser) {
    throw new Error("Oops! You can't run this in a browser!");
}

const user1 = new User("user1", UserType.Default);
const user2 = new User("user2", UserType.Premium);

const users = [ user1, user2 ]

user1.say("Hello!");
user1.say("My age is " + user1.age);
user1.say("Square of my age is " + Math.square(user1.age));

await sleep(1000);

user2.say("Hello!");
user2.say("My age is " + user2.age);
user2.say("Square of my age is " + Math.square(user2.age));

console.log("Random user: ", users.random());
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
