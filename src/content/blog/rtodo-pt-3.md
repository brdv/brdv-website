---
title: "rtodo: Marking todos as done"
date: 2024-06-29
slug: "rtodo-mark-as-done"
description: "On marking todos as done"
---

_In the [last post](/blog/rtodo-adding-todos), I implemented adding todos to the application. This was quite easy since I did quite some work in the [session before](/blog/rtodo-listing-todos-handling-ids), where I implemented my custom ID handling by saving it into a config file._

This week, I'm working on the last command to finish version 0.1.0. The final task for me is to add the 'do' command. The command should work as follows. Assuming you have the following list:

```bash
$ rtodo list

[ ] 000 Add app initialization
[ ] 001 Add 'list' command
[ ] 002 Add 'add' command
[ ] 003 Add 'do' command
```

When I want to mark a specific todo as done, I need to run the following command (with the ID):

```bash
$ rtodo do 0

Moved todo with id 0 to /.rtodo/done/0.add-app-initalization.rtodo.md

# rerunning the list command
$ rtodo list -a

[x] 000 Add app initialization
[ ] 001 Add 'list' command
[ ] 002 Add 'add' command
[ ] 003 Add 'do' command
```

## Implementation

To handle the 'do' command, we need to do two things:

1. Find the todo.
   - If the app can't find it, handle the error.
2. Mark the todo as done in the system.

Luckily, the previous features/code will help a lot in building this one.

### Finding the Todo

To get all todos, we can use the method `get_todos` on the Todo struct. (I've refactored small bits of the code in between this post and the previous one). When we have all todos, we need to find the one we're looking for by filtering the collection on ID. The base code is as follows:

```rust
let item = Todo::get_todos(false)
        .into_iter()
        .find(|todo| todo.id == id);
```

This will result in an `Option<Todo>` type since it's possible the given ID is not a valid one. We can handle this case in many ways, but I've chosen to propagate the issue to the caller of my function (as you'll see later in this article)

### Marking a Todo as Done

If we **do** find a todo, we have to mark it as done. But what does done mean in this case? Basically, it means moving it from the `.rtodo/todo` directory to `.rtodo/done`. As I found while implementing, this is quite easy. Rust's file system implementation has a method called `rename` that takes two arguments, `from` and `to`. We already have `from`, being the path on the todo object, so we only need to find a way to create the `to` path. I've created this path as follows:

```rust
// note: self is the todo in this case. It's implemented as a method on the Todo struct.
let new_path = format!(
	"{}/{}.{}.rtodo.md",
	get_rtodo_done_location(),
	self.id,
	create_slug(&self.task)
);
```

This will give us the path we want to move the todo to. Before we can return the mutated todo, we have to update the status and path to `Done` and `new_path` respectively. Then, we want to return the todo to whatever called this method. Since the `rename` method can result in an error, we need to take that into account.

This leaves us with the following result:

```rust
use std::{fs, io::Result};

pub fn mark_done(mut self) -> Result<Self> {
	let new_path = format!(
		"{}/{}.{}.rtodo.md",
		get_rtodo_done_location(),
		self.id,
		create_slug(&self.task)
	);

	fs::rename(self.path, &new_path)?;

	self.status = TodoStatus::Done;
	self.path = new_path;

	Ok(self)
}
```

### Putting it together

We now have the todo we want to mark as done and a method to mark the todo as done. If we combine these two, we'll find the command to be nearly complete.

```rust
pub fn do_todo(id: u32) -> Option<Todo> {
    let item = Todo::get_todos(false)
        .into_iter()
        .find(|todo| todo.id == id);

    item.map(|todo| todo.mark_done().expect("whoops"))
}
```

As you can see, we get all todos and check if there's one with the given ID. Then, we try to mark that one as done by calling the `mark_done` method on it. Since `item` is an `Option<Todo>`, the `map` method will ensure either a `None` value will be returned if the value of `item` is `None`, or it will return the result of the `map` method. In the example above (and an earlier version of my code), we handle the error from the `mark_done` method by calling `expect`, which will panic if the `Result` is not an `Ok` object.

Finally, we need to handle the command in the CLI app by adding the following code to the `main` function of the application:

```rust
// ...

match rtodo.command {
	// ... other comands
	Commands::Do { id } => match do_todo(id) {
        Some(todo) => println!("Moved todo with id {} to {}", id, todo.path),
        None => eprintln!("Todo with id {} could not be found", id),
    },
}

// ...
```

This will handle both the cases: when we have or have not found a todo. Quite nice, right?

## v0.1.0 is Ready

This means v0.1.0 is ready! We can list, add, and do todos, making rtodo an actual - very basic - todo app! v0.1.0 is definitely not the final product. We can add quite a few more features. Think about editing, deleting todos, or different lists/projects. Commands like reset - deleting all files and folders, check - ID in config still makes sense, are also on my mind. Oh, and of course configuration like custom paths. A lot to think about and a lot to keep on building.

## Next Steps

So, this was actually quite fun! My first 'blogging' and 'building in public' experience. I especially liked that it made me not just build the app, but also needing to explain what I did and why. It's probably still not perfect - both the app and blog posts - but it's more than I've ever done before. That's a win for me. But what shall I do next? First, I'll add some CI to the codebase to check style, tests, etc. Then, I'll try to figure out how I can get others to run the application without having to build it from source. This way, I can get some friends to use it. Eventually, I'll start working out a plan about v0.2.0, which you'll read about first here! 😜

See you next time!
