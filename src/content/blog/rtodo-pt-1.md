---
title: "rtodo - part 1: Listing todos and handling ids"
date: 2024-06-05
slug: "rtodo-listing-todos-handling-ids"
description: "Listing todos and handling ids for the CLI app"
---

_This one was written over two days. There was quite a period between the two day due to me being sick and being bit busy with other things. Read the first part [here](/blog/rtodo-initialisation) and checkout the code [here](https://github.com/brdv/rtodo)_

In the previous part, I’ve started with setting up the initialisation of the app. Right now, I have a codebase that simply sets up the files and folders that I’ll be using for the application. The next thing to add, is listing todos

I want to be able to run the following command:

```bash
$ rtodo list

[ ] 001 Get milk
[ ] 002 Get dough
[ ] 003 Make cookies

// show todos that are done
$ rtodo list -d

[x] 004 Make list

// show all todos
$ rtodo list -a

[ ] 001 Get milk
[ ] 002 Get dough
[ ] 003 Make cookies
[x] 004 Make list
```

This command simply lists all available todo’s. This means it looks into the directory `~/.rtodo/todo` and creates a todo from all files there. I also want to make options available to list all todos or only todos that are done.

## First steps

At first, I started with an implementation that expected each todo as a file following the pattern `task.rtodo.md`. This way, `.rtodo` makes it easier to see what files are part of the app. The markdown extension makes the files usable in other apps, [Obsidian](https://obsidian.md/) for example.

To get in the flow however, I’m going to start with some basic validation. I want to read filenames and 1) check if it’s a valid todo. If so, create a Todo object from it. This was straightforward but important. Simply put, the filename of a todo has to adhere to the rtodo pattern. So we can check if a give string matches that pattern:

_Note: this snippet is from after I added the ID to the pattern._

```rust
fn is_valid_todo_string(string: &str) -> bool {
    let split: Vec<&str> = string.split(".").collect();

    split.len() == 4
        // id is valid u32
        && split[0].trim().parse::<u32>().is_ok()
        // task is not empty
        && !split[1].trim().is_empty()
        // contains rtodo suffix
        && split[2].trim() == "rtodo"
        // is md file
        && split[3].trim() == "md"
}
```

This was pretty easily done - as expected. The next step was to implement the list command, meaning I had to write a function that looks for all files in the `~/.rtodo/todo` directory and - if valid - map them to a Todo object.

The biggest ‘issue’ I encountered here is my lack of actual Rust knowledge and experience. I’ve been fighting with the `Result` and `Option` types mostly. Or maybe more figuring out how to use them properly. After a bit of hassling - and quite some learning - I came up with a solution that I’m ok with for now. Wanted to add a snippet, but I’d become too long. Check the implementation [here](https://github.com/brdv/rtodo/tree/main/src).

While working on this, I’ve also refactored the way I build the paths to the folders to functions in a `utils.rs` file that can be used throughout the app.

# The problem

During development I ran into the problem - in my mind - that it’s quite hard to link todos to an id that’s not determined at runtime. This could cause problems, where you enter an id to perform an action on, but the way ids are determined at runtime shifts or is flaky. I wanted to make the id actually part of the saved todo, but couldn’t come up with a way to do so without a database.

After quite a long struggle and a lot of thinking about it, I’ve decided to save ids in the todo file itself. The pattern would then become `id.task.rtodo.md`. This caused another problem; how to know what the latest id is, without going through all todos? Well, I came up with a config file (`/.rtodo/.config`) where I’ll store the latest used id (and maybe other configs in the future). This way, I can read that file when creating new todos (a feature yet to be build).

I’m not yet sure if this implementation will work in the long run, but it worked for now. Maybe in the future I’ll still have to implement a database, but I want to stay away from that for as long as possible.

## Options

The last thing I needed to do was to add two options `all` and `done`. These options should be passable to the `list` command which than handles it properly. Luckily, the package I’m using for the CLI app - [CLAP](https://docs.rs/clap/latest/clap/) - has this feature builtin. I was just left with writing the logic to handle the options, if given.

## Learnings

Developing this command has taught me quite a lot (again) about Rust an maybe development in general. Currently the code is working, but I still feel that it’s not Rust-approved or even good at all. I’ve also still managed to stay away from tests, since every time I start adding them, it gets out of hand. I end up testing filesystem things and having to do a lot of setup or mocking. So for now, I test by hand! 😅

Another thing that I’ve come to re-learn the importance of is to keep your changes small and commit often. Which I did not. So after about a week and a half of not looking at the project, it took me quite some time to remember what changes I made previously.

## Next steps

Next ups is adding a todo. Up until now, I’ve repeatedly been creating, deleting and moving files by ‘hand’ to test the app. Once I’m able to add todos, the app will start looking more as I imagine. To set a goal for myself; in two weeks I have a day off, I want to spend at least a couple of hours that day to implement the ‘add’ command.

See you next time.

_Have some comments or suggestions? Send me a message at rtodo [at] brdv [dot] nl !_
