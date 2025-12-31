---
title: "rtodo - part 0: Initialisation"
date: 2024-04-24
slug: "rtodo-initialisation"
description: "Setting up the rtodo project"
---

This post is the first in a hopefully long and complete list of articles I'm writing about my app [rtodo](https://github.com/brdv/rtodo).

## The idea

I’m making a CLI todo app written in Rust. There’s two main reasons for this. First, I like todo’s, personal productivity and todo apps. Second, I want to learn Rust (better).

I’m building it in the CLI to make sure I focus mostly on Rust as the language, and not all possible ways to create an interface for the application. Therefore, it will be mainly a command based todo app. It’s use will look as follows:

```bash
$ rtodo list

[x] 001 Write shopping list
[ ] 002 Get Milk
[ ] 003 Get Dough
[ ] 004 Get Chocolate Chips

$ rtodo add Make chocolate chip cookies

Added todo with the title 'Make chocolate chip cookies'

$ rtodo list

[x] 001 Write shopping list
[ ] 002 Get milk
[ ] 003 Get dough
[ ] 004 Get chocolate chips
[ ] 005 Make chocolate chip cookies

$ rtodo do 2

Marked todo #2 with title 'Get milk' as Done!

$ rtodo list

[x] 001 Write shopping list
[x] 002 Get milk
[ ] 003 Get dough
[ ] 004 Get chocolate chips
[ ] 005 Make chocolate chip cookies
```

Some more commands will be added in the future. For now I’m focussing on building the bare minimum, so the goal is clear and achievable.

## But first

Before we dive into building the application, I need to talk about the implementation for a bit. While experimenting with the idea of rtodo, I built an app that save all todo’s in a file like `title::status`. This was great to get the base logic working, but caused some limitations. I found no practical way to identify todo’s without using an index and rewriting the whole todo file on, for example, completing a todo. This was because I needed to read the whole file into memory, mark the specific todo as done, and then write the memory stream to the file. I did not want this.

The aforementioned colleague said something in the lines of “but why don’t you make each todo a file?” Genius. This way, I could extend existing filesystem functionality, easily create, manage and use lists, and more easily identify todo’s.

Therefore, the implementation will be that each todo will be its own file. There will be a global `.rtodo` folder in the root (maybe configurable later on) where - at first - two folders will exist: `todo` and `done`. Each will hold their own collection of todo’s. This way, it will be easier to identify todo’s, simply by using their path.

## First steps

Before I can (or want to) start with building the todo logic, I want to build something that will initialise the application. I.e. setup the necessary folder structure mentioned before. This means at least:

- Creating some kind of check to see if the app is initialised correctly.
- If ^ is false, initialise the app.

### Initialisation

The initialisation of the application should create three folders:

- $HOME/.rtodo
- $HOME/.rtodo/todo
- $HOME/.rtodo/done

Now that I’m thinking about it, we might also need to create some way to verify the version/settings of the application. So I might also throw in a config file.

I finished writing ^ and dove into coding. I came up with the following solution.

When you run the program, it executes a function `initialise_if_needed()` which basically does what it says. It first checks if some directories exist, if not, it creates them. Simple, but effective.
There’s still some improvement opportunities left, but this’ll do for now.

## Learnings

I think building this first version taught me quite a lot.

First, just start and figure it out on the go.

Secondly, I know very little Rust. The added functionality is probably just 50 lines, but took me around 4 hours to figure out. Partially because I did not exactly know what I wanted to build, but also because I still suck at Rust.

Lastly, don’t overdo testing. I’m a big fan of testing code, however, I found myself writing tests that are not actually that worthwhile. Namely that the function that checks if directories actually exist, well... checks if the directories actually exist. Which took about half an hour to an hour to complete. Realising this wasn’t as valuable, ended up removing the tests all together.

## Up next

Well that was it for the first post and first day. I’m actually quite happy with the result and can’t wait to continue working on it. The next things I want to do: add basic CI to test and build the code and add the `list` command’s functionality.
